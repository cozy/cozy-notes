import io from 'socket.io-client'

export class ServiceClient {
  constructor(config) {
    const { url, sessionId } = config
    console.log("construct service Client with", config)
    console.log(`init config with client ${sessionId}`)
    this.sessionId = sessionId
    this.socket = io.connect(url)
  }

  async join(docId) {
    this.socket.emit('join', this.sessionId, docId)
  }

  async onStepsCreated(docId, callback) {
    this.socket.on(`steps:created:${docId}`, data => callback(data))
  }

  async onTelepointerUpdated(docId, callback) {
    this.socket.on(`telepointer:updated:${docId}`, data => callback(data))
  }

  async getDoc(docId, version, doc) {
    return new Promise(resolve => {
      this.socket.emit('doc:get', this.sessionId, docId, 1, doc, data =>
        resolve({ ...data, docId })
      )
    })
  }

  async getSteps(docId, version) {
    return new Promise(resolve => {
      this.socket.emit('steps:get', this.sessionId, docId, version, data =>
        resolve({ ...data, docId })
      )
    })
  }

  async pushSteps(docId, version, steps) {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'steps:push',
        this.sessionId,
        docId,
        version,
        steps,
        data => {
          if (data) {
            resolve({ ...data, docId })
          } else {
            reject('Probable conflict')
          }
        }
      )
    })
  }

  async pushTelepointer(docId, data) {
    return new Promise(resolve => {
      this.socket.emit('telepointer:push', this.sessionId, docId, data, data =>
        resolve({ ...data, docId })
      )
    })
  }
}
export default ServiceClient
