import { schemaOrdered as defaultSchema } from './schema'

// Warning: sessionID on the server, sessionId on the client

/**
 * This is the communication layer with the server
 */
export class ServiceClient {
  constructor(config) {
    const { userId, cozyClient, schema, realtime } = config
    const now = new Date()
    const sessionSuffix =
      now.getTime() + '.' + now.getMilliseconds() + '.' + Math.random()
    this.sessionId = userId + ':' + sessionSuffix
    this.userId = this.getUserId(userId)
    this.cozyClient = cozyClient
    this.stackClient = cozyClient.getStackClient()
    this.schema = schema
    this.onRealtimeEvent = this.onRealtimeEvent.bind(this)
    this.realtime = realtime || cozyClient.plugins['realtime']
    this.resetCallbacks()
  }

  /**
   * Remove event listeners
   */
  resetCallbacks() {
    this.callbacks = {}
  }

  /**
   * Adds event listeners
   */
  setCallback(type, id, callback) {
    this.callbacks[type] = this.callbacks[type] || {}
    this.callbacks[type][id] = callback
  }

  /**
   * @returns {string} Unique id for the user
   */
  getUserId(sessionId) {
    return sessionId ? sessionId.match(/[^:]+/)[0] : this.userId
  }

  /**
   * @returns {string} Unique id for the session
   * It contains the user id + some unique part
   */
  getSessionId() {
    return this.sessionId
  }

  /**
   * Close communication with the server
   * Remove all events listeners
   */
  close() {
    this.realtime.unsubscribeAll()
    this.resetCallbacks()
  }

  /**
   * Get a default title for the note
   */
  defaultTitle() {
    return new Date().toISOString()
  }

  /**
   * @param {uuid} id - id of the note
   * @param {string} sub - sub-path for the server route
   * @returns {string} path for an API route on the cozy-stack
   */
  path(id, sub) {
    return id ? (sub ? `/notes/${id}/${sub}` : `/notes/${id}`) : '/notes'
  }

  /**
   * Convert data from the client format to the server format
   */
  client2server(data) {
    return { sessionID: data.sessionId || this.sessionId, ...data }
  }

  /**
   * Convert data from the server format to the client format
   */
  server2client(data) {
    return {
      sessionId: data.sessionID,
      userId: this.getUserId(data.sessionID),
      ...data
    }
  }

  /**
   * Create a new note on the server
   * @param {string} title
   * @param {Object} schema
   */
  async create(title, schema) {
    const doc = {
      data: {
        type: 'io.cozy.notes.documents',
        attributes: {
          title: title || this.defaultTitle(),
          schema: schema || this.schema || defaultSchema
        }
      }
    }
    return this.stackClient.fetchJSON('POST', this.path(), doc)
  }

  /**
   * Force the note to be written to the io.cozy.files now
   * @param {uuid} noteId - note id
   */
  async sync(noteId) {
    await this.stackClient.fetchJSON('POST', this.path(noteId, 'sync'))
  }

  /**
   * Change the title of a note
   * @param {uuid} noteId
   * @param {string} title
   */
  async setTitle(noteId, title) {
    const titleDoc = {
      data: {
        type: 'io.cozy.notes.documents',
        id: noteId,
        attributes: this.client2server({ title: title })
      }
    }
    await this.stackClient.fetchJSON(
      'PUT',
      this.path(noteId, 'title'),
      titleDoc
    )
  }

  /**
   * Dispatch events from the server
   * @param {Object} doc - received from the realtime of cozy-stack
   */
  onRealtimeEvent(doc) {
    const id = doc.id || doc._id
    const type = doc.doctype
    if (this.callbacks[type] && this.callbacks[type][id]) {
      return this.callbacks[type][id](doc)
    } else {
      // eslint-disable-next-line no-console
      console.warn('Event not managed', type, id, this.callbacks)
    }
  }

  /**
   * Join a doc - listen to realtime events for this doc
   * @param {uui} noteId
   */
  async join(noteId) {
    await Promise.all([
      this.realtime.subscribe(
        null, // all events
        'io.cozy.notes.events',
        noteId,
        this.onRealtimeEvent
      )
    ])
  }

  /**
   * Listen for new steps from the server
   * @param {uuid} noteId
   * @param {Function} callback
   */
  async onStepsCreated(noteId, callback) {
    this.setCallback('io.cozy.notes.steps', noteId, data =>
      callback(this.server2client(data))
    )
  }

  /**
   * Listen for new cursors positions from the server
   * @param {uuid} noteId
   * @param {Function} callback
   */
  async onTelepointerUpdated(noteId, callback) {
    this.setCallback('io.cozy.notes.telepointers', noteId, data =>
      callback(this.server2client(data))
    )
  }

  /**
   * Listen for title changes in the document
   * @param {uuid} noteId
   * @param {Function} callback - function that get a title as paramerer
   */
  async onTitleUpdated(noteId, callback) {
    this.setCallback('io.cozy.notes.documents', noteId, doc => {
      return !doc.sessionID || doc.sessionID != this.sessionId
        ? callback(doc.title)
        : null
    })
  }

  /**
   * Get the full document for a note
   * @param {uuid} noteId
   */
  async getDoc(noteId) {
    const res = await this.stackClient.fetchJSON('GET', this.path(noteId))
    return {
      doc: res.data.attributes.metadata.content,
      version: res.data.attributes.metadata.version,
      title: res.data.attributes.metadata.title,
      updatedAt: new Date(res.data.attributes.updated_at),
      file: res.data
    }
  }

  /**
   * Push new local steps to the server
   * @param {uuid} noteId
   * @param {integer} version
   * @param {Object[]} steps
   */
  async pushSteps(noteId, version, steps) {
    const options = { headers: { 'if-match': version } }
    const stepsDoc = {
      data: steps.map(step => ({
        type: 'io.cozy.notes.steps',
        attributes: this.client2server(step.toJSON())
      }))
    }
    // will throw in case of 409
    // which will occurs if the server has more versions than us
    await this.stackClient.fetchJSON(
      'PATCH',
      this.path(noteId),
      stepsDoc,
      options
    )
    return null
  }

  /**
   * Fetch steps from the server since the provided versions
   * @param {uuid} noteId
   * @param {integer} version
   * @returns {{version, steps}|{doc, version}}
   * If the server doesn't have all requested steps in memory,
   * it could returns the whole document in its current version
   */
  async getSteps(noteId, version) {
    try {
      const res = await this.stackClient.fetchJSON(
        'GET',
        `${this.path(noteId, 'steps')}?Version=${version}`
      )
      if (res.data.length == 0) {
        return { steps: [], version }
      } else {
        const steps = res.data.map(step => this.server2client(step.attributes))
        const version = res.data[res.data.length - 1].attributes.version
        return { version, steps }
      }
    } catch (err) {
      const response = err.response
      const data = err.reason && err.reason.data
      const meta = data && data.attributes && data.attributes.metadata
      const doc = meta && meta.content
      const ver = meta && meta.version
      if (response.status == 412 && doc && ver) {
        // server does not have all steps we try to fetch
        // it responds with a full document and a title
        const ev = 'io.cozy.notes.documents'
        const realtimeDoc = {
          _id: noteId,
          _type: 'io.cozy.notes.events',
          doctype: ev,
          title: meta.title
        }
        if (this.callbacks[ev] && this.callbacks[ev][noteId]) {
          this.callbacks[ev][noteId](realtimeDoc)
        }
        return {
          doc: doc,
          version: ver
        }
      } else {
        throw err
      }
    }
  }

  /**
   * Push new local cursor position to the server
   * @param {uuid} noteId
   * @param {Object} data
   */
  async pushTelepointer(noteId, data) {
    const telepointerDoc = {
      data: {
        type: 'io.cozy.notes.telepointers',
        id: noteId,
        attributes: this.client2server(data)
      }
    }
    return this.stackClient.fetchJSON(
      'PUT',
      this.path(noteId, 'telepointer'),
      telepointerDoc
    )
  }
}
export default ServiceClient
