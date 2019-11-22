import { EventEmitter2 } from 'eventemitter2'
import { getVersion, sendableSteps } from 'prosemirror-collab'
import { JSONTransformer } from '@atlaskit/editor-json-transformer'
import { Channel } from './channel'
import { logger } from './logger'
import { getParticipant } from './participant'

const jsonTransformer = new JSONTransformer()

export class CollabProvider {
  constructor(config, serviceClient) {
    this.config = config
    this.config['sessionId'] = serviceClient.getSessionId()
    this.config['userId'] = serviceClient.getUserId()
    console.debug("Collab.Provider: new")
    this.serviceClient = serviceClient
    this.channel = config.channel || new Channel(config, serviceClient)
    this.eventEmitter = new EventEmitter2()
    this.queue = []
    this.getState = () => {}
    this.participants = new Map()
    this.pauseQueue = false
    this.initialVersion = config.version
  }

  initialize(getState) {
    console.debug("Collab.Provider: initialize")
    this.getState = getState
    this.channel.on('connected', ({ doc, version }) => {
      const { sessionId } = this.config
      console.debug("Collab.Provider: init with sid", sessionId)
      this.emit('init', { sid: sessionId, doc, version }) // Set initial document
      this.emit('connected', { sid: sessionId }) // Let the plugin know that we're connected an ready to go
    })
    this.channel.on('data', this.onReceiveData)
    this.channel.on('telepointer', this.onReceiveTelepointer)
    const state = getState()
    const doc = jsonTransformer.encode(state.doc)
    const usableVersion =
      this.initialVersion !== undefined ? this.initialVersion : doc.version
    const collabDoc = { ...doc, version: usableVersion }
    console.debug("Collab.Provider: initialize", this.config['sessionId'], usableVersion)
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

    this.channel.sendSteps(newState, this.getState)
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

  queueData(data) {
    console.debug("Collab.Provider: queue", data)
    const orderedQueue = [...this.queue, data].sort((a, b) =>
      a.version > b.version ? 1 : -1
    )

    this.queue = orderedQueue

    if (!this.queueTimeout && !this.pauseQueue) {
      this.queueTimeout = window.setTimeout(() => {
        this.catchup()
      }, 1000)
    }
  }

  async catchup() {
    console.debug("Collab.Provider: catchup")
    this.pauseQueue = true

    const currentVersion = getVersion(this.getState())

    try {
      const { doc, version, steps } = await this.channel.getSteps(
        currentVersion
      )

      /**
       * Remove steps from queue where the version is older than
       * the version we received from service. Keep steps that might be
       * newer.
       */
      this.queue = this.queue.filter(data => data.version > version)

      // We are too far behind - replace the entire document
      if (doc) {
        const { sessionId } = this.config

        const { steps: localSteps = [] } = sendableSteps(this.getState()) || {}

        // Replace local document and version number
        this.emit('init', { sid: sessionId, doc, version })

        // Re-aply local steps
        if (localSteps.length) {
          this.emit('local-steps', { steps: localSteps })
        }

        clearTimeout(this.queueTimeout)
        this.pauseQueue = false
        this.queueTimeout = undefined
      } else if (steps) {
        this.onReceiveData({ steps, version }, true)
        clearTimeout(this.queueTimeout)
        this.pauseQueue = false
        this.queueTimeout = undefined
      }
    } catch (err) {
      logger(`Unable to get latest steps: ${err}`)
    }
  }

  processQeueue() {
    if (this.pauseQueue) {
      return
    }

    if (this.queue.length === 0) {
      return
    }

    console.debug("Collab.Provider: processQueue")
    const [firstItem] = this.queue
    const currentVersion = getVersion(this.getState())
    const expectedVersion = currentVersion + firstItem.steps.length

    if (firstItem.version === expectedVersion) {
      this.queue.splice(0, 1)
      this.processRemoteData(firstItem)
    }
  }

  processRemoteData = (data, forceApply) => {
    console.debug("Collab.Provider: processRemoteData", data, forceApply)
    if (this.pauseQueue && !forceApply) {
      return
    }

    const { version, steps } = data

    if (steps && steps.length) {
      const userIds = steps.map(
        step => step.userId || this.serviceClient.getUserId(step.sessionId)
      )
      const cleanSteps = steps.map(
        step => {
          delete step['timestamp']
          delete step['_id']
          delete step['_rev']
          delete step['doctype']
          delete step['sessionID']
          delete step['userId']
          delete step['version']
          return step
        }
      )
      console.debug("Collab.Provider: processRemoteData emit data", { json: cleanSteps, version, userIds })
      this.emit('data', { json: cleanSteps, version, userIds })
    }

    this.processQeueue()
  }

  onReceiveData = (data, forceApply) => {
    const currentVersion = getVersion(this.getState())
    const expectedVersion = currentVersion + data.steps.length

    if (data.version === currentVersion) {
      // Received data we already have. Ignoring
      console.debug("Collab.Provider: onReceiveData - same version, ignoring", currentVersion)
    } else if (data.version === expectedVersion) {
      console.debug("Collab.Provider: onReceiveData", data.version, data)
      this.processRemoteData(data, forceApply)
    } else if (data.version > expectedVersion) {
      console.debug("Collab.Provider: onReceiveData - future version, queue", data.version)
      this.queueData(data)
    }
  }

  onReceiveTelepointer = data => {
    const { sessionId } = data
    const userId = this.serviceClient.getUserId(sessionId)
    if (userId === this.config.userId) {
      console.debug("Collab.Provider: onReceiveTelepointer - receive own telepointer", userId)
      return
    }

    const participant = this.participants.get(userId)
    if (participant && participant.lastActive > data.timestamp) {
      console.debug("Collab.Provider: onReceiveTelepointer - has more recent telepointer", userId)
      return
    }

    console.debug("Collab.Provider: onReceiveTelepointer - emit", userId)
    this.updateParticipant(userId, data.timestamp)
    this.emit('telepointer', data)
  }

  updateParticipant(sessionId, timestamp) {
    const userId = this.serviceClient.getUserId(sessionId)
    const participant = getParticipant(userId)

    this.participants.set(userId, {
      name: '',
      email: '',
      avatar: '',
      sessionId: userId,
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
