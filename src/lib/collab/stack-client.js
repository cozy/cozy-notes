import CozyRealtime from 'cozy-realtime'

import { schemaOrdered as defaultSchema } from './schema'

// Warning: sessionID on the server, sessionId on the client

export class ServiceClient {
  constructor(config) {
    const { userId, cozyClient, schema } = config
    const now = new Date()
    const sessionSuffix =
      now.getTime() + '.' + now.getMilliseconds() + '.' + Math.random()
    this.sessionId = userId + ':' + sessionSuffix
    this.userId = userId
    this.cozyClient = cozyClient
    this.stackClient = cozyClient.getStackClient()
    this.schema = schema
    this.onRealtimeEvent = this.onRealtimeEvent.bind(this)
    this.realtime = new CozyRealtime({ client: cozyClient })
    this.resetCallbacks()
    console.debug("Collab.ServiceClient: Created new ServiceClient for", this.userId, "with session", this.sessionId)
  }

  resetCallbacks() {
    this.callbacks = {}
  }

  setCallback(type, id, callback) {
    this.callbacks[type] = this.callbacks[type] || {}
    this.callbacks[type][id] = callback
  }

  getUserId(sessionId) {
    return sessionId // ? sessionId.match(/[^:]+/)[0] : this.userId
  }

  getSessionId() {
    return this.sessionId
  }

  close() {
    console.debug("Collab.ServiceClient: Closed ServiceClient")
    this.realtime.unsubscribeAll()
    this.resetCallbacks()
  }

  defaultTitle() {
    new Date().toISOString()
  }

  path(id, sub) {
    return id ? (sub ? `/notes/${id}/${sub}` : `/notes/${id}`) : '/notes'
  }

  client2server(data) {
    return { sessionID: data.sessionId || this.sessionId, ...data }
  }

  server2client(data) {
    return {
      sessionId: data.sessionID,
      userId: this.getUserId(data.sessionID),
      ...data
    }
  }

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

  async setTitle(docId, title) {
    const titleDoc = {
      data: {
        type: 'io.cozy.notes.documents',
        id: docId,
        attributes: this.client2server({ title: title })
      }
    }
    await this.stackClient.fetchJSON('PUT', this.path(docId, 'title'), titleDoc)
  }

  onRealtimeEvent(doc) {
    const id = doc.id || doc._id
    const type = doc.doctype
    if (this.callbacks[type] && this.callbacks[type][id]) {
      return this.callbacks[type][id](doc)
    } else {
      console.warn('not managed event', type, id, this.callbacks)
    }
  }

  async join(docId) {
    console.debug("Collab.ServiceClient: Join", docId)
    const onRealtimeCreated = function(doc) {
      if (doc.id == docId) {
        return this.onRealtimeEvent(docId)
      } else {
        return undefined
      }
    }
    await Promise.all([
      this.realtime.subscribe(
        'created',
        'io.cozy.notes.events',
        onRealtimeCreated
      ),
      this.realtime.subscribe(
        'updated',
        'io.cozy.notes.events',
        docId,
        this.onRealtimeEvent
      ),
      this.realtime.subscribe(
        'deleted',
        'io.cozy.notes.events',
        docId,
        this.onRealtimeEvent
      )
    ])
  }

  async onStepsCreated(docId, callback) {
    this.setCallback('io.cozy.notes.steps', docId, data =>
      callback(this.server2client(data))
    )
  }

  async onTelepointerUpdated(docId, callback) {
    this.setCallback('io.cozy.notes.telepointers', docId, data =>
      callback(this.server2client(data))
    )
  }

  async onTitleUpdated(docId, callback) {
    this.setCallback('io.cozy.notes.documents', docId, doc => {
      return !doc.sessionID || doc.sessionID != this.sessionId
        ? callback(doc.title)
        : null
    })
  }

  async getDoc(docId) {
    console.debug("Collab.ServiceClient: getDoc", docId)
    const res = await this.stackClient.fetchJSON('GET', this.path(docId))
    return {
      doc: res.data.attributes.metadata.content,
      version: res.data.attributes.metadata.version,
      title: res.data.attributes.metadata.title
    }
  }

  async pushSteps(docId, version, steps) {
    console.debug("Collab.ServiceClient: pushSteps", docId, version, steps)
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
      this.path(docId),
      stepsDoc,
      options
    )
    return null
  }

  async getSteps(docId, version) {
    console.debug("Collab.ServiceClient: getSteps", docId, "since", version)
    try {
      const res = await this.stackClient.fetchJSON(
        'GET',
        `${this.path(docId, 'steps')}?Version=${version}`
      )
      if (res.data.length == 0) {
        return { steps: [], version }
      } else {
        return {
          version: res.data[res.data.length - 1].version,
          steps: res.data.map(step => ({
            ...step,
            attributes: this.client2server(step.attributes)
          }))
        }
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
        if (this.callbacks[ev] && this.callbacks[ev][doc.id || doc._id]) {
          this.callbacks[ev][doc.id || doc._id](doc)
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

  async pushTelepointer(docId, data) {
    console.debug("Collab.ServiceClient: pushTelepointer", docId, data)
    const telepointerDoc = {
      data: {
        type: 'io.cozy.notes.telepointers',
        id: docId,
        attributes: this.client2server(data)
      }
    }
    return this.stackClient.fetchJSON(
      'PUT',
      this.path(docId, 'telepointer'),
      telepointerDoc
    )
  }
}
export default ServiceClient
