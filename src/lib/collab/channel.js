import { EventEmitter2 } from 'eventemitter2'
import { getVersion, sendableSteps } from 'prosemirror-collab'

const minimumBackoff = 128 // 128ms
const maximumBackoff = 1000 * 60 * 5 // Max 5 minutes
const failuresBeforeCatchup = 4

const resolvablePromise = () => {
  let resolveFunction
  const promise = new Promise(resolve => {
    resolveFunction = resolve
  })
  promise.resolved = false
  promise.resolve = function() {
    resolveFunction()
    promise.resolved = true
    return promise
  }
  return promise
}

export class Channel {
  constructor(config, serviceClient) {
    this.config = config
    this.service = serviceClient
    this.eventEmitter = new EventEmitter2()
    this.resetBackoff()
    this.initializeStepsQueue()
    this.isSending = false
    this.emptyQueuePromise = resolvablePromise().resolve()
  }

  /**
   * Reset the backoff
   */
  resetBackoff() {
    this.backoff = 0
    this.failures = 0
  }

  /**
   * Increase the backoff
   */
  increaseBackoff() {
    this.failures = this.failures + 1
    if (this.failures % failuresBeforeCatchup == 0) {
      this.emit('needcatchup', { failures: this.failures })
    }

    this.backoff = Math.max(
      Math.min(this.backoff * 2, maximumBackoff),
      minimumBackoff
    )
  }

  /**
   * Program something after backoff
   * @returns {Promise}
   */
  afterBackoff() {
    const fn = resolve => {
      if (this.backoff < minimumBackoff) {
        resolve()
      } else {
        window.setTimeout(resolve, this.backoff)
      }
    }
    return new Promise(fn)
  }

  /**
   * Initialize the steps queue
   */
  initializeStepsQueue() {
    this.queuedStep = undefined
  }

  /**
   * Ensures all local steps are sent to the server
   */
  async ensureEmptyQueue() {
    return this.emptyQueuePromise
  }

  /**
   * Enqueue steps
   * @param {Function} getState - function to get a current proseMirror state
   * @param {Object} state - proseMirror state
   * @param {Object[]} localSteps - local steps to send
   */
  enqueueSteps({ getState, state, localSteps }) {
    if (this.emptyQueuePromise.resolved) {
      this.emptyQueuePromise = resolvablePromise()
    }
    this.queuedStep = { getState, state, localSteps }
  }

  /**
   * Dequeue steps
   * @returns {getState, state, localSteps}
   */
  dequeueSteps() {
    const queued = this.queuedStep
    const getState = queued.getState
    const state = queued.state || getState()
    const localSteps = queued.localSteps ||
      sendableSteps(state) || { steps: [] }
    this.queuedStep = undefined

    return { getState, state, localSteps }
  }

  /**
   * Test if there is a queued step
   * @returns {boolean}
   */
  hasQueuedSteps() {
    return !!this.queuedStep
  }

  /**
   * Rebase steps in queue
   */
  rebaseStepsInQueue() {
    if (this.queuedStep) {
      this.queuedStep = { getState: this.queuedStep.getState }
    }
  }

  /**
   * Program a push for new steps to the service
   * @param {Object} state - state from proseMirror internals
   * @param {Function} getState - returns current proseMirror state
   * @param {Object} localSteps - localSteps object from proseMirror internals
   * Today the provider calling `sendSteps` do not fill the localSteps
   * parameter. This parameter is however provisionned in the demo code from
   * Atlaskit. I prefer not to remove it, in case we need it later.
   */
  async sendSteps(getState, state, localSteps) {
    this.enqueueSteps({ getState, state, localSteps })
    await this.processQueue()
  }

  /**
   * Send steps in queue
   */
  async processQueue() {
    if (this.isSending) {
      return
    }
    if (!this.hasQueuedSteps()) {
      this.emptyQueuePromise.resolve()
      return
    }

    this.isSending = true
    await this.afterBackoff()

    const {
      getState,
      state,
      localSteps: { steps }
    } = this.dequeueSteps()
    const version = getVersion(state)

    // Don't send any steps before we're ready.
    if (typeof version === 'undefined') return
    // Nothing to do if no steps
    if (steps.length === 0) return

    try {
      const { docId } = this.config
      const response = await this.service.pushSteps(docId, version, steps)
      this.rebaseStepsInQueue()
      this.resetBackoff()
      this.isSending = false
      if (response && response.steps && response.steps.length > 0) {
        this.emit('data', response)
      }
    } catch (err) {
      if (this.hasQueuedSteps()) {
        // will retry later with more steps
        this.rebaseStepsInQueue()
      } else {
        // send again the current steps
        this.enqueueSteps({ getState })
      }
      this.increaseBackoff()
      this.isSending = false
    }
    // if ever there was something waiting
    await this.processQueue()
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
    this.emit('connected', {
      doc,
      version
    })
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
