import { EventEmitter2 } from 'eventemitter2'
import { getVersion, sendableSteps } from 'prosemirror-collab'
import { logger } from './logger'

export class Channel {
  constructor(config, serviceClient) {
    this.config = config
    this.service = serviceClient
    this.eventEmitter = new EventEmitter2()
  }

  /**
   * Get initial document from service
   */
  async getDocument(previousVersion, previousDoc) {
    try {
      const { docId } = this.config
      const { doc, version } = await this.service.getDoc(docId, previousVersion, previousDoc)
      console.log("channel getDoc return value", { doc, version })
      return {
        doc,
        version
      }
    } catch (err) {
      logger(
        `Collab-Edit: Document "${
          this.config.docId
        }" does not exist. Creating one locally.`
      )
      return {
        doc: {"type":"doc","content":[{"type":"paragraph"}]},
        version: 1
      }
    }
  }

  /**
   * Connect to pubsub to start receiving events
   */
  async connect(previousVersion, previousDoc) {
    const { docId } = this.config
    const { doc, version } = await this.getDocument(previousVersion, previousDoc)

    this.service.join(docId)

    this.service.onStepsCreated(docId, data => {
      logger('Received FPS-payload', data)
      this.emit('data', data)
    })
    this.service.onTelepointerUpdated(docId, payload => {
      logger('Received telepointer-payload', { payload })
      this.emit('telepointer', payload)
    })

    this.eventEmitter.emit('connected', {
      doc,
      version
    })
  }

  debounce(getState) {
    logger(`Debouncing steps`)

    if (this.debounced) {
      clearTimeout(this.debounced)
    }

    this.debounced = window.setTimeout(() => {
      logger(`Sending debounced`)
      this.sendSteps(getState(), getState)
    }, 250)
  }

  /**
   * Send steps to service
   */
  async sendSteps(state, getState, localSteps) {
    const { docId } = this.config

    if (this.isSending) {
      this.debounce(getState)
      return
    }

    const version = getVersion(state)

    // Don't send any steps before we're ready.
    if (typeof version === undefined) {
      return
    }

    const { steps } = localSteps || sendableSteps(state) || { steps: [] } // sendableSteps can return null..

    if (steps.length === 0) {
      logger(`No steps to send. Aborting.`)
      return
    }

    this.isSending = true

    try {
      this.isSending = false
      const response = await this.service.pushSteps(docId, version, steps)
      logger(`Steps sent and accepted by service.`)
      this.emit('data', response)
    } catch (err) {
      this.debounce(getState)
      this.isSending = false
      logger(`Error sending steps: "${err}"`)
    }
  }

  /**
   * Get steps from version x to latest
   */
  async getSteps(version) {
    const { docId } = this.config
    return await this.service.getSteps(docId, version)
  }

  /**
   * Send telepointer
   */
  async sendTelepointer(data) {
    const { docId } = this.config
    logger(`Sending telepointer`, data)

    return await this.service.pushTelepointer(docId, data)
  }

  /**
   * Subscribe to events emitted by this channel
   */
  on(evt, handler) {
    this.eventEmitter.on(evt, handler)
    return this
  }

  /**
   * Unsubscribe from events emitted by this channel
   */
  off(evt, handler) {
    this.eventEmitter.off(evt, handler)
    return this
  }

  /**
   * Emit events to subscribers
   */
  emit(evt, data) {
    this.eventEmitter.emit(evt, data)
    return this
  }
}
