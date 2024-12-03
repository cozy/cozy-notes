import { JSONTransformer } from '@atlaskit/editor-json-transformer'
import { EventEmitter2 } from 'eventemitter2'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { getVersion, sendableSteps } from 'prosemirror-collab'

import { Channel } from './channel'
import { getParticipant } from './participant'

const jsonTransformer = new JSONTransformer()
// Using the jsonTransformer directly introduce a bug for empty documents
// with only one paragraph. The transformed document has no content
// (not even the paragraph) and makes the Editor to always when think
// it is as version=0. This would break the catchup logic.
// This patch fixes this unique case, creating a correct empty document with
// an empty paragraph
const oldEncode = jsonTransformer.encode.bind(jsonTransformer)
jsonTransformer.encode = function (doc) {
  const transformed = oldEncode(doc)
  if (transformed.content.length === 0 && doc.content.length != 0) {
    return {
      content: [{ type: 'paragraph', content: [] }],
      type: 'doc'
    }
  } else {
    return transformed
  }
}

/**
 * The CollabProvider is called directly by the
 * collaboration plugin of proseMirror.
 * It will then use `Channel` as communication
 * layer with the `ServiceClient`, which itself
 * talk to the server.
 */

export class CollabProvider {
  constructor(config, serviceClient) {
    this.config = { ...config }
    this.config['sessionId'] = serviceClient.getSessionId()
    this.config['userId'] = serviceClient.getUserId()
    // this debounce is primary here to introduce a short delay so that
    // the local step is definitively applied in the editor. The debounce
    // is the optional additional value to avoid reseting the state too much
    this.cancelLocalChanges = debounce(this.cancelLocalChanges.bind(this), 100)
    this.setReadOnly(!!this.config['readOnly'])
    this.serviceClient = serviceClient
    this.channel = config.channel || new Channel(this.config, serviceClient)
    this.eventEmitter = new EventEmitter2()
    this.queue = []
    this.getState = () => {}
    this.participants = new Map()
    this.pauseQueue = false
    this.initialVersion = config.version
    this.initialDate = config.updatedAt || new Date()
    this.pauseQueue = false
  }

  /**
   * Initialze the collaboration provider
   * @param {Function} getState - How to get the proseMirror state
   */
  initialize(getState) {
    this.getState = getState
    this.channel.on('connected', ({ doc, version, updatedAt }) => {
      const { sessionId } = this.config
      this.emit('init', { sid: sessionId, doc, version }) // Set initial document
      this.emit('connected', { sid: sessionId }) // Let the plugin know that we're connected an ready to go
      this.listenStateEvents({ lastRemoteSync: updatedAt })
    })
    this.channel.on('data', this.onReceiveData)
    this.channel.on('telepointer', this.onReceiveTelepointer)
    this.channel.on('schemaupdated', this.onReceiveSchemaUpdated)
    this.channel.on('needcatchup', () => this.catchup())
    const state = getState()
    const doc = jsonTransformer.encode(state.doc)
    const usableVersion =
      this.initialVersion !== undefined ? this.initialVersion : doc.version
    const collabDoc = { ...doc, version: usableVersion }
    this.channel.connect({
      version: usableVersion,
      doc: collabDoc,
      updatedAt: this.initialDate
    })
    return this
  }

  /**
   * Send steps from transaction to other participants
   */
  send(tr, oldState, newState) {
    // Ignore transactions without steps
    if (!tr.steps || !tr.steps.length) return

    // cancel changes on a readonly document
    if (this.isReadOnly()) {
      this.cancelLocalChanges()
      return
    }

    this.channel.sendSteps(this.getState, newState)
  }

  /**
   * Send messages, such as telepointers, to other participants.
   */
  sendMessage(data) {
    if (!data || this.isReadOnly()) {
      return
    }

    const { type } = data
    switch (type) {
      case 'telepointer':
        this.channel.sendTelepointer({
          ...data,
          timestamp: new Date().getTime()
        })
    }
  }

  /**
   * Queue new steps from the server which should
   * be applied to the local editor
   * @param {Object} data - new steps
   */
  queueData(data) {
    // If a change couldn't be applied or discarded, it will
    // block the queue, waiting for missing steps
    // Let order changes, putting first the one that could be
    // applied (or discarded) first, and avoir dead-locks
    const orderedQueue = [...this.queue, data].sort((a, b) => {
      // order by document version before applying the change
      const aStart = a.version - a.steps.length
      const bStart = b.version - b.steps.length
      if (aStart > bStart) return 1
      if (aStart < bStart) return -1
      // for same starting version, keep first the one going further
      // we could apply the shorter, but then we'd have to discard
      // the longer, and may miss some step contained in it
      if (a.version > b.version) return -1
      if (a.version < b.version) return 1
      return 0
    })
    this.queue = orderedQueue
  }

  /**
   * Catchup after multiple errors
   * @param {Function} getState - filled when requested from channel
   */
  async catchup() {
    // forbids other changes to be accepted during the catchup
    // we will process them later
    this.pauseQueue = true
    const currentVersion = getVersion(this.getState())
    try {
      const { doc, version, steps } = await this.channel.getSteps(
        currentVersion
      )
      if (doc) {
        // we lag too much, server did send us the whole document
        const { sessionId } = this.config
        // get local steps and re-emit them after reinit the whole document
        const { steps: localSteps = [] } = sendableSteps(this.getState()) || {}
        this.emit('init', { sid: sessionId, doc, version })
        if (localSteps.length && !this.isReadOnly()) {
          this.emit('local-steps', { steps: localSteps })
        }
      } else if (steps.length > 0) {
        // we got steps to apply
        this.onReceiveData({ steps, version }, true)
      }
      // processQueue again
      this.queueTimeout = undefined
      this.pauseQueue = false
      this.processQueue()
    } catch (err) {
      // something got wrong, try to catchup again
      // TODO : maybe try to reinit the full doc ?
      this.pauseQueue = false
      this.programCatchup()
    }
  }

  /**
   * Something got wrong, we program a catchup,
   * waiting 1s in case we receive new message
   * that may resolve our problems
   */
  programCatchup() {
    if (!this.queueTimeout) {
      this.queueTimeout = window.setTimeout(() => {
        this.catchup()
      }, 1000)
    }
  }

  /**
   * When received new messages that resolve a previous
   * problem: Cancelling the programed catchup
   */
  cancelCatchup() {
    if (this.queueTimeout) {
      window.clearTimeout(this.queueTimeout)
      this.queueTimeout = undefined
    }
  }

  /**
   * Process the message queue (new steps from the servers)
   */
  processQueue() {
    if (this.queue.length > 0 && !this.pauseQueue) {
      let currentVersion = getVersion(this.getState())
      while (this.queue.length > 0) {
        const first = this.queue[0]
        const firstVersion = first.version
        const expectedVersion = first.steps.length + currentVersion
        if (firstVersion == expectedVersion) {
          // process item
          this.cancelCatchup()
          this.queue.shift()
          this.processRemoteData(first)
          currentVersion = firstVersion
        } else {
          if (firstVersion <= expectedVersion) {
            // item is obsolete, we won't be able to process it
            this.queue.shift()
          }
          if (firstVersion > expectedVersion) {
            // we miss some steps
            this.programCatchup()
            break
          }
        }
      }
    }
  }

  /**
   * Send new steps from the server to the local proseMirror editor
   * These steps should be previously checked and ordered
   */
  processRemoteData = data => {
    const { version, steps } = data

    if (steps && steps.length) {
      const userIds = steps.map(
        step => step.sessionId || this.serviceClient.getUserId(step.sessionId)
      )
      this.emit('data', { json: steps, version, userIds })
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Collab.Provider: processRemoteData no steps ? ',
        steps,
        data
      )
    }
  }

  /**
   * We receive new steps  from the server
   */
  onReceiveData = data => {
    this.queueData(data)
    this.processQueue()
  }

  /**
   * We receive new user cursor positions from the server
   */
  onReceiveTelepointer = data => {
    const { sessionId } = data
    const userId = this.serviceClient.getUserId(sessionId)
    if (userId === this.config.userId) {
      return
    }

    const participant = this.participants.get(userId)
    if (participant && participant.lastActive > data.timestamp) {
      return
    }

    this.updateParticipant(sessionId, data.timestamp)
    this.emit('telepointer', data)
  }
  /**
   * We receive an update of the schema from the server
   * We reload the page
   */
  onReceiveSchemaUpdated = () => {
    window.location.reload(true)
  }
  updateParticipant(sessionId, timestamp) {
    const userId = this.serviceClient.getUserId(sessionId)
    const participant = getParticipant({ userId, sessionId })

    this.participants.set(userId, {
      name: '',
      email: '',
      avatar: '',
      sessionId: sessionId,
      userId: userId,
      ...participant,
      lastActive: timestamp
    })

    const joined = [this.participants.get(userId)]

    // Filter out participants that's been inactive for
    // more than 5 minutes.

    const now = new Date().getTime()
    const left = Array.from(this.participants.values()).filter(
      p => (now - p.lastActive) / 1000 > 300
    )

    left.forEach(p => this.participants.delete(p.userId))
    this.emit('presence', { joined, left })
  }

  /**
   * Emit events to subscribers
   */
  emit(evt, data) {
    this.eventEmitter.emit(evt, data)
    return this
  }

  /**
   * Subscribe to events emitted by this provider
   */
  on(evt, handler) {
    this.eventEmitter.on(evt, handler)
    return this
  }

  /**
   * Unsubscribe from events emitted by this provider
   */
  off(evt, handler) {
    this.eventEmitter.off(evt, handler)
    return this
  }

  /**
   * Unsubscribe all listeners for this event
   */
  unsubscribeAll(evt) {
    this.eventEmitter.removeAllListeners(evt)
  }

  /**
   * Checks if something is not fully sent to the server
   *
   * @returns {bool}
   */
  isDirty() {
    return !!this.dirtySince
  }

  /**
   * Date since which something is waiting to be sent to the server
   *
   * @returns {Date|undefined} undefined if the state is not dirty
   */
  getDirtySince() {
    return this.dirtySince
  }

  /**
   * Date of the last save of local state to the server
   *
   * @returns {Date|undefined}
   */
  getLastLocalSave() {
    return this.lastLocalSave
  }

  /**
   * Date of the last sync with data from the server
   *
   * @returns {Date|undefined}
   */
  getLastRemoteSync() {
    return this.lastRemoteSync
  }

  /**
   * Date of last update with the server (both in or out)
   *
   * @returns {Date|undefined}
   */
  getLastSaveOrSync() {
    return this.lastLocalSave > this.lastRemoteSync
      ? this.lastLocalSave
      : this.lastRemoteSync
  }

  /**
   * When we successfuly save local changes to the server
   *
   * @private
   */
  onLocalSave() {
    this.lastLocalSave = new Date()
    this.emit('collab-state-change')
  }

  /**
   * When we successfuly get remote changes from the server
   *
   * @private
   */
  onRemoteSync() {
    this.lastRemoteSync = new Date()
    this.emit('collab-state-change')
  }

  /**
   * When we empty the queue of data to be sent to the server
   * and none is being sent at the moment
   *
   * @private
   */
  onChannelEmptyQueue() {
    this.dirtySince = undefined
    this.emit('collab-state-change')
  }

  /**
   * When we add  something to the queue of data to be sent to the server
   *
   * @private
   */
  onChannelEnqueue() {
    if (!this.dirtySince) {
      this.dirtySince = new Date()
      this.emit('collab-state-change')
    }
  }

  /**
   * Listen to events from and to the server
   * to update the current dirty state and last save dates
   *
   * @private
   */
  listenStateEvents({ lastRemoteSync } = {}) {
    this.channel.on('emptyQueue', this.onChannelEmptyQueue.bind(this))
    this.channel.on('enqueueSteps', this.onChannelEnqueue.bind(this))
    this.channel.on('successfulPatch', this.onLocalSave.bind(this))
    this.on('data', this.onRemoteSync.bind(this))
    this.on('init', this.onRemoteSync.bind(this))
    if (lastRemoteSync) this.lastRemoteSync = lastRemoteSync
  }

  /**
   * Checks if the editor should be readonly
   *
   * @returns {bool}
   */
  isReadOnly() {
    return this.readOnly
  }

  /**
   * Set the editor readonly or readwrite
   *
   * @param {bool} readOnly - true by default
   */
  setReadOnly(readOnly = true) {
    this.readOnly = !!readOnly
    if (this.readOnly) this.cancelLocalChanges()
  }

  /**
   * Remove all local changes  and go back to the server state
   */
  cancelLocalChanges() {
    const currentState = this.getState && this.getState()
    if (currentState) {
      const rawDoc = get(currentState, 'collab$.unconfirmed[0].origin.docs[0]')
      const version = get(currentState, 'collab$.version')
      const sid = this.config['sessionId']
      if (rawDoc && version && sid) {
        const doc = rawDoc.toJSON()
        this.emit('init', { doc, version, sid })
      }
    }
  }
}

export default CollabProvider
