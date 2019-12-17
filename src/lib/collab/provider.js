import { EventEmitter2 } from 'eventemitter2'
import { getVersion, sendableSteps } from 'prosemirror-collab'
import { JSONTransformer } from '@atlaskit/editor-json-transformer'
import { Channel } from './channel'
import { getParticipant } from './participant'

const jsonTransformer = new JSONTransformer()

/**
 * The CollabProvider is called directly by the
 * collaboration plugin of proseMirror.
 * It will then use `Channel` as communication
 * layer with the `ServiceClient`, which itself
 * talk to the server.
 */

export class CollabProvider {
  constructor(config, serviceClient) {
    this.config = config
    this.config['sessionId'] = serviceClient.getSessionId()
    this.config['userId'] = serviceClient.getUserId()
    this.serviceClient = serviceClient
    this.channel = config.channel || new Channel(config, serviceClient)
    this.eventEmitter = new EventEmitter2()
    this.queue = []
    this.getState = () => {}
    this.participants = new Map()
    this.pauseQueue = false
    this.initialVersion = config.version
    this.pauseQueue = false
  }

  /**
   * Initialze the collaboration provider
   * @param {Function} getState - How to get the proseMirror state
   */
  initialize(getState) {
    this.getState = getState
    this.channel.on('connected', ({ doc, version }) => {
      const { sessionId } = this.config
      this.emit('init', { sid: sessionId, doc, version }) // Set initial document
      this.emit('connected', { sid: sessionId }) // Let the plugin know that we're connected an ready to go
    })
    this.channel.on('data', this.onReceiveData)
    this.channel.on('telepointer', this.onReceiveTelepointer)
    this.channel.on('needcatchup', () => this.catchup())
    const state = getState()
    const doc = jsonTransformer.encode(state.doc)
    const usableVersion =
      this.initialVersion !== undefined ? this.initialVersion : doc.version
    const collabDoc = { ...doc, version: usableVersion }
    this.channel.connect(
      usableVersion,
      collabDoc
    )

    return this
  }

  /**
   * Send steps from transaction to other participants
   */
  send(tr, oldState, newState) {
    // Ignore transactions without steps
    if (!tr.steps || !tr.steps.length) {
      return
    }

    this.channel.sendSteps(this.getState, newState)
  }

  /**
   * Send messages, such as telepointers, to other participants.
   */
  sendMessage(data) {
    if (!data) {
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
    const orderedQueue = [...this.queue, data].sort((a, b) => {
      // order by starting version
      const aStart = a.version - a.steps.length
      const bStart = b.version - b.steps.length
      if (aStart > bStart) return 1
      if (aStart < bStart) return -1
      // for same starting version, keep first the one going further
      if (a.version > b.version) return -1
      if (a.version > b.version) return 1
      return 0
    })
    this.queue = orderedQueue
  }

  /**
   * Catchup after multiple errors
   * @param {Function} getState - filled when requested from channel
   */
  async catchup() {
    this.pauseQueue = true
    const currentVersion = getVersion(this.getState())
    try {
      const { doc, version, steps } = await this.channel.getSteps(
        currentVersion
      )
      if (doc) {
        // we lag too much, server did send us the whole document
        const { sessionId } = this.config
        // get local steps
        const { steps: localSteps = [] } = sendableSteps(this.getState()) || {}
        // Replace local document and version number
        this.emit('init', { sid: sessionId, doc, version })
        // Re-aply local steps
        if (localSteps.length) {
          this.emit('local-steps', { steps: localSteps })
        }
      } else {
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
}

export default CollabProvider
