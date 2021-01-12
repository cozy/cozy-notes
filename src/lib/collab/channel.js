import { EventEmitter2 } from 'eventemitter2'
import { getVersion, sendableSteps } from 'prosemirror-collab'

import flag from 'cozy-flags'
import { setDebugValue } from '../debug'

const minimumBackoff = 128 // 128ms
const maximumBackoff = 1000 * 60 * 5 // Max 5 minutes
const failuresBeforeCatchup = 4

export class Channel {
  constructor(config, serviceClient) {
    this.config = config
    this.service = serviceClient
    this.eventEmitter = new EventEmitter2()
    this.resetBackoff()
    this.initializeStepsQueue()
    this.isSending = false
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
   * Checks if something is not fully sent to the server
   *
   * @returns {bool}
   */
  isDirty() {
    return this.hasQueuedSteps() || this.isSending
  }

  /**
   * Ensures all local steps are sent to the server
   */
  async ensureEmptyQueue() {
    return new Promise(resolve => {
      function onEmptyQueue() {
        this.off('emptyQueue', onEmptyQueue)
        resolve()
      }
      if (this.isDirty()) {
        this.on('emptyQueue', onEmptyQueue)
      } else {
        resolve()
      }
    })
  }

  /**
   * Enqueue steps
   * @param {Function} getState - function to get a current proseMirror state
   * @param {Object} state - proseMirror state
   * @param {Object[]} localSteps - local steps to send
   */
  enqueueSteps({ getState, state, localSteps }) {
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
    this.emit('enqueueSteps')
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
      this.emit('emptyQueue')
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
      const { noteId } = this.config
      const response = await this.service.pushSteps(noteId, version, steps)
      this.rebaseStepsInQueue()
      this.resetBackoff()
      this.emit('successfulPatch')
      this.isSending = false
      if (response && response.steps && response.steps.length > 0) {
        this.emit('data', response)
      }
    } catch (err) {
      if (flag('notes.lastPatchError')) {
        setDebugValue('notes.lastPatchError', err)
      }
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
  async connect({ version, doc, updatedAt }) {
    const { noteId } = this.config
    this.service.join(noteId)
    this.service.onStepsCreated(noteId, data => {
      this.emit('data', { version: data.version, steps: [data] })
    })
    this.service.onTelepointerUpdated(noteId, payload => {
      this.emit('telepointer', payload)
    })
    this.service.onSchemaUpdated(noteId, () => {
      this.emit('schemaupdated')
    })
    this.emit('connected', { version, doc, updatedAt })
  }

  /**
   * Get steps from version x to latest
   */
  async getSteps(version) {
    const { noteId } = this.config
    return await this.service.getSteps(noteId, version)
  }

  /**
   * Send telepointer
   */
  async sendTelepointer(data) {
    const { noteId } = this.config
    return await this.service.pushTelepointer(noteId, data)
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
