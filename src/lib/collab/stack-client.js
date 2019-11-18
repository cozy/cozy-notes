import CozyRealtime from 'cozy-realtime'

import { schemaOrdered as defaultSchema } from './schema'

// Warning: sessionID on the server, sessionId on the client

export class ServiceClient {
  constructor(config) {
    const { cozyClient, sessionId, schema } = config
    this.sessionId = sessionId
    this.cozyClient = cozyClient
    this.stackClient = cozyClient.getStackClient()
    this.schema = schema
    this.onRealtimeEvent = this.onRealtimeEvent.bind(this)
    this.realtime = new CozyRealtime({ client: cozyClient })
    this.resetCallbacks()
  }

  resetCallbacks() {
    this.callbacks = {}
  }

  setCallback(type, id, callback) {
    this.callbacks[type] = this.callbacks[type] || {}
    this.callbacks[type][id] = callback
  }

  close() {
    this.realtime.unsubscribeAll()
    this.resetCallbacks()
  }

  defaultTitle() {
    new Date().toISOString()
  }

  path(id, sub) {
    return id ? (sub ? `/notes/${id}/${sub}` : `/notes/${id}`) : '/notes'
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
        attributes: {
          title: title
        }
      }
    }
    await this.stackClient.fetchJSON('PUT', this.path(docId, 'title'), titleDoc)
  }

  onRealtimeEvent(doc) {
    const id = doc.id
    const type = doc.type
    if (this.callbacks[type] && this.callbacks[type][id])
      this.callbacks[type][id](doc)
  }

  async join(docId) {
    await this.realtime.subscribe(
      'created',
      'io.cozy.notes.events',
      docId,
      this.onRealtimeEvent
    )
  }

  async onStepsCreated(docId, callback) {
    this.setCallback('io.cozy.notes.steps', docId, callback)
  }

  async onTelepointerUpdated(docId, callback) {
    this.setCallback('io.cozy.notes.telepointers', docId, callback)
  }

  async onTitleUpdated(docId, callback) {
    this.setCallback('io.cozy.notes.documents', docId, doc =>
      callback(doc.title)
    )
  }

  async getDoc(docId) {
    const res = await this.stackClient.fetchJSON('GET', this.path(docId))
    return {
      doc: res.data.attributes.metadata.content,
      version: res.data.attributes.metadata.version
    }
  }

  async pushSteps(docId, version, steps) {
    const options = { headers: { 'if-match': version } }
    const stepsDoc = {
      data: steps.map(step => ({
        type: 'io.cozy.notes.steps',
        attributes: { ...step.toJSON(), sessionID: this.sessionId }
      }))
    }
    // will throw in case of 412
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
            attributes: {
              ...step.attributes,
              sessionId: step.attributes.sessionId
            }
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
        // it responds with a full document
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
    const telepointerDoc = {
      data: {
        type: 'io.cozy.notes.telepointers',
        id: docId,
        attributes: {
          ...data,
          sessionID: this.sessionId
        }
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
