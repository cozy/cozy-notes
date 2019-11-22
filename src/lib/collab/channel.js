import { EventEmitter2 } from 'eventemitter2'
import { getVersion, sendableSteps } from 'prosemirror-collab'

export class Channel {
  constructor(config, serviceClient) {
    this.config = config
    this.service = serviceClient
    this.eventEmitter = new EventEmitter2()
  }

  /**
   * Connect to pubsub to start receiving events
   */
  async connect(version, doc) {
    const { docId } = this.config
    this.service.join(docId)
    this.service.onStepsCreated(docId, data => {
      this.emit('data', { version: data.version, steps: [data] })
    })
    this.service.onTelepointerUpdated(docId, payload => {
      this.emit('telepointer', payload)
    })
    this.eventEmitter.emit('connected', {
      doc,
      version
    })
  }

  debounce(getState) {
    if (this.debounced) {
      clearTimeout(this.debounced)
    }

    this.debounced = window.setTimeout(() => {
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
      return
    }

    this.isSending = true
    try {
      const response = await this.service.pushSteps(docId, version, steps)
      this.isSending = false
      if (response && response.steps && response.steps.length > 0) {
        this.emit('data', response)
      }
    } catch (err) {
      this.debounce(getState)
      this.isSending = false
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
