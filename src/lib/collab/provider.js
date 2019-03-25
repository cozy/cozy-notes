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
    this.channel = config.channel || new Channel(config, serviceClient)
    this.eventEmitter = new EventEmitter2()
    this.queue = []
    this.getState = () => {}
    this.participants = new Map()
    this.pauseQueue = false
  }

  initialize(getState) {
    this.getState = getState
    this.channel.on('connected', ({ doc, version }) => {
      const { userId } = this.config

      logger(`Joined collab-session. The document version is ${version}`)

      this.emit('init', { sid: userId, doc, version }) // Set initial document
      this.emit('connected', { sid: userId }) // Let the plugin know that we're connected an ready to go
    })
    this.channel.on('data', this.onReceiveData)
    this.channel.on('telepointer', this.onReceiveTelepointer)
    const state = getState()
    console.log(state)
    const doc = jsonTransformer.encode(state.doc)
    const version = doc.version
    this.channel.connect(version, doc)

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
    logger(`Queuing data for version ${data.version}`)
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
    this.pauseQueue = true

    logger(`Too far behind - fetching data from service`)

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
        logger(`Replacing document.`)
        const { userId } = this.config

        const { steps: localSteps = [] } = sendableSteps(this.getState()) || {}

        // Replace local document and version number
        this.emit('init', { sid: userId, doc, version })

        // Re-aply local steps
        if (localSteps.length) {
          console.log("apply local steps", localSteps)
          this.emit('local-steps', { steps: localSteps })
        }

        clearTimeout(this.queueTimeout)
        this.pauseQueue = false
        this.queueTimeout = undefined
      } else if (steps) {
        logger(`Applying the new steps. Version: ${version}`, steps)
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
      logger(`Queue is paused. Aborting.`)
      return
    }

    logger(`Looking for proccessable data`)

    if (this.queue.length === 0) {
      return
    }

    const [firstItem] = this.queue
    const currentVersion = getVersion(this.getState())
    console.log("process queue currentVersion", currentVersion)
    const expectedVersion = currentVersion + firstItem.steps.length

    if (firstItem.version === expectedVersion) {
      logger(`Applying data from queue!`)
      this.queue.splice(0, 1)
      this.processRemoteData(firstItem)
    }
  }

  processRemoteData = (data, forceApply) => {
    if (this.pauseQueue && !forceApply) {
      logger(`Queue is paused. Aborting.`)
      return
    }

    const { version, steps } = data

    logger(`Processing data. Version: ${version}`)

    if (steps && steps.length) {
      console.log("applying steps", steps)
      const userIds = steps.map(step => step.userId || step.sessionId)
      this.emit('data', { json: steps, version, userIds })
    }

    this.processQeueue()
  }

  onReceiveData = (data, forceApply) => {
    const currentVersion = getVersion(this.getState())
    const expectedVersion = currentVersion + data.steps.length

    if (data.version === currentVersion) {
      logger(`Received data we already have. Ignoring.`)
    } else if (data.version === expectedVersion) {
      this.processRemoteData(data, forceApply)
    } else if (data.version > expectedVersion) {
      logger(
        `Version too high. Expected ${expectedVersion} but got ${
          data.version
        }. Current local version is ${currentVersion}`
      )
      this.queueData(data)
    }
  }

  onReceiveTelepointer = data => {
    const { sessionId } = data

    if (sessionId === this.config.userId) {
      return
    }

    const participant = this.participants.get(sessionId)

    if (participant && participant.lastActive > data.timestamp) {
      logger(`Old telepointer event. Ignoring.`)
      return
    }

    this.updateParticipant(sessionId, data.timestamp)
    logger(`Remote telepointer from ${sessionId}`)

    this.emit('telepointer', data)
  }

  updateParticipant(userId, timestamp) {
    // TODO: Make batch-request to backend to resolve participants
    const { name = '', email = '', avatar = '' } = getParticipant(userId)

    this.participants.set(userId, {
      name,
      email,
      avatar,
      sessionId: userId,
      lastActive: timestamp
    })

    const joined = [this.participants.get(userId)]

    // Filter out participants that's been inactive for
    // more than 5 minutes.

    const now = new Date().getTime()
    const left = Array.from(this.participants.values()).filter(
      p => (now - p.lastActive) / 1000 > 300
    )

    left.forEach(p => this.participants.delete(p.sessionId))

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
}

export default CollabProvider
