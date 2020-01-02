import { CollabProvider } from './provider'
import { getVersion, sendableSteps } from 'prosemirror-collab'
import isEqual from 'lodash/isEqual'

jest.mock('prosemirror-collab', () => {
  return { getVersion: jest.fn(), sendableSteps: jest.fn() }
})

const docId = 'myDocId'
const version = 96
const userId = 'myuser'
const sessionId = `${userId}:1425`
const doc = { content: [], type: 'doc', version }
const channel = {
  on: jest.fn(),
  connect: jest.fn(),
  sendSteps: jest.fn(),
  sendTelepointer: jest.fn(),
  getSteps: jest.fn()
}
const service = {
  getSessionId: jest.fn(),
  getUserId: jest.fn()
}
const config = { docId, version, channel }
const getState = jest.fn()
const steps = [{ example: version + 1 }, { example: version + 2 }]

const wait = async amount => {
  await new Promise(resolve => window.setTimeout(resolve, amount))
}

function stripSessionId(arr) {
  return arr.map(val => ({ ...val, sessionId: undefined }))
}

function hasReceivedSteps(fn, steps, version) {
  expect(fn).toHaveBeenCalled()
  const strippedSteps = stripSessionId(steps)
  const reduce = function(prev, curr) {
    const given = curr[0]
    if (prev) return true
    if (version && given.version != version) return false
    const givenSteps = given.json
    if (givenSteps.length != steps.length) return false
    if (isEqual(stripSessionId(givenSteps), strippedSteps)) {
      return true
    }
    return false
  }
  const hasSame = fn.mock.calls.reduce(reduce, false)
  expect(hasSame).toBe(true)
}

describe('CollabProvider', () => {
  beforeEach(() => {
    getState.mockImplementation(() => ({ doc }))
    getVersion.mockImplementation(doc => doc.version || version)
    sendableSteps.mockImplementation(() => ({ steps }))
    service.getSessionId.mockImplementation(() => sessionId)
    service.getUserId.mockImplementation(() => userId)
    const getSteps = () => ({ steps: [], version })
    channel.getSteps.mockImplementation(getSteps)
  })
  afterEach(() => jest.resetAllMocks())

  it('should not throw at instanciation', () => {
    expect(() => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)
    }).not.toThrow()
  })

  describe('initialize', () => {
    it('should connect to the channel', () => {
      let callback
      channel.on.mockImplementation((evt, fn) => {
        if (evt == 'connected') callback = fn
      })

      const collab = new CollabProvider(config, service)

      const onInit = jest.fn()
      collab.on('init', onInit)
      const onConnected = jest.fn()
      collab.on('connected', onConnected)

      collab.initialize(getState)
      expect(channel.connect).toHaveBeenCalledTimes(1)
      expect(channel.connect).toHaveBeenCalledWith(version, doc)

      callback({ doc, version })
      expect(onInit).toHaveBeenCalledTimes(1)
      expect(onInit).toHaveBeenCalledWith({ sid: sessionId, doc, version })
      expect(onConnected).toHaveBeenCalledTimes(1)
      expect(onConnected).toHaveBeenCalledWith({ sid: sessionId })
    })

    it('should return `this`', () => {
      const collab = new CollabProvider(config, service)
      expect(collab.initialize(getState)).toBe(collab)
    })
  })

  describe('queueData', () => {
    it('has an empty queue by default', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)
      expect(collab.queue).toHaveLength(0)
    })

    it('should add data to the queue', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const data = { version: 103, steps: [{}, {}] }
      collab.queueData(data)
      expect(collab.queue).toHaveLength(1)
      collab.queueData(data)
      collab.queueData(data)
      expect(collab.queue).toHaveLength(3)
    })

    it('should have the change that begins first, in first', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const first = { version: 103, steps: [{}, {}] } // start at 101
      const second = { version: 106, steps: [{}, {}, {}] } // start at 103
      const third = { version: 105, steps: [{}] } // start at 104

      collab.queueData(second)
      collab.queueData(third)
      collab.queueData(first)

      expect(collab.queue).toEqual([first, second, third])
    })

    it('should favor longer changes', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const long = { version: 104, steps: [{}, {}, {}] } // start at 101
      const medium = { version: 103, steps: [{}, {}] } // start at 101
      const short = { version: 102, steps: [{}] } // start at 101
      const first = { version: 101, steps: [{}] } // start at 100

      collab.queueData(medium)
      collab.queueData(short)
      collab.queueData(first)
      collab.queueData(long)

      expect(collab.queue).toEqual([first, long, medium, short])
    })
  })

  describe('catchup', () => {
    const makeTheCatchupWait = (amount = 200, callback = () => {}) => {
      channel.getSteps.mockImplementation(async version => {
        await wait(amount)
        return callback(version)
      })
    }

    it('forbids to process new steps while catchup', async () => {
      const nextVersion = version + steps.length
      const getSteps = () => ({ steps, version: nextVersion })
      makeTheCatchupWait(200, getSteps)

      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const catchup = collab.catchup()
      collab.queueData({ version: nextVersion, steps: [{}, {}] })
      collab.processQueue()
      expect(collab.queue).not.toHaveLength(0)
      await catchup
    })

    it('allows to process new steps after catchup', async () => {
      const nextVersion = version + steps.length
      const getSteps = () => ({ steps, version: nextVersion })
      makeTheCatchupWait(200, getSteps)

      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const catchup = collab.catchup()
      collab.queueData({ version: nextVersion + 2, steps: [{}, {}] })
      collab.processQueue()

      await catchup
      expect(collab.queue).toHaveLength(0)
    })

    it('gets all missing steps from server', async () => {
      const nextVersion = version + steps.length
      const getSteps = () => ({ steps, version: nextVersion })
      channel.getSteps.mockImplementation(getSteps)

      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const processSteps = jest.fn()
      collab.on('data', processSteps)
      await collab.catchup()

      expect(processSteps).toHaveBeenCalled()
      hasReceivedSteps(processSteps, steps, nextVersion)
    })

    it('reinit the full doc if the server cannot give the missing steps', async () => {
      const getSteps = () => ({ doc, version: version })
      channel.getSteps.mockImplementation(getSteps)

      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const init = jest.fn()
      collab.on('init', init)
      await collab.catchup()

      expect(init).toHaveBeenCalledWith({ doc, version, sid: sessionId })
    })

    it('keeps the local steps when reinitialization of the full document', async () => {
      const getSteps = () => ({ doc, version: version })
      channel.getSteps.mockImplementation(getSteps)

      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextSteps = [{ example: '1' }, { example: '2' }]
      sendableSteps.mockImplementation(() => {
        return { steps: nextSteps }
      })

      const localSteps = jest.fn()
      collab.on('local-steps', localSteps)
      await collab.catchup()

      expect(localSteps).toHaveBeenCalled()
      expect(localSteps).toHaveBeenCalledWith({ steps: nextSteps })
    })

    it('then process changes that came during the catchup', async () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextVersion = version + steps.length
      collab.queueData({ version: nextVersion, steps })

      const processSteps = jest.fn()
      collab.on('data', processSteps)

      await collab.catchup()

      expect(processSteps).toHaveBeenCalled()
      hasReceivedSteps(processSteps, steps, nextVersion)
    })

    it('cancel a planned catched if there was any', async () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)
      collab.programCatchup()
      expect(collab.queueTimeout).toBeTruthy()
      await collab.catchup()
      expect(collab.queueTimeout).not.toBeTruthy()
    })

    it('plans a new catchup later in case of error', async () => {
      const getSteps = () => {
        throw 'ERROR'
      }
      channel.getSteps.mockImplementation(getSteps)

      const collab = new CollabProvider(config, service)
      collab.initialize(getState)
      await collab.catchup()
      expect(collab.queueTimeout).toBeTruthy()
    })
  })

  describe('programCatchup', () => {
    it('programs a new catchup after a few seconds', done => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)
      collab.catchup = () => done()
      collab.programCatchup()
    })
  })

  describe('cancelCatchup', () => {
    it('cancel the programmed catchup', async () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)
      collab.catchup = jest.fn()
      collab.programCatchup()
      collab.cancelCatchup()
      await wait(4500)
      expect(collab.catchup).not.toHaveBeenCalled()
    })
  })

  describe('processQueue', () => {
    it('process all runnable data', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextVersion = version + steps.length
      collab.queueData({ version: nextVersion, steps })
      collab.queueData({ version: nextVersion + steps.length, steps })

      const processSteps = jest.fn()
      collab.on('data', processSteps)

      collab.processQueue()

      expect(processSteps).toHaveBeenCalled()
      hasReceivedSteps(processSteps, steps, nextVersion)
      hasReceivedSteps(processSteps, steps, nextVersion + steps.length)
      expect(collab.queue).toHaveLength(0)
    })

    it('cancels catchup if runnable data is found', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextVersion = version + steps.length
      collab.queueData({ version: nextVersion, steps })

      collab.programCatchup()
      expect(collab.queueTimeout).toBeTruthy()

      collab.processQueue()
      expect(collab.queueTimeout).not.toBeTruthy()
    })

    it('discards old data', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextVersion = version + steps.length
      collab.queueData({ version: nextVersion - 10, steps })

      const processSteps = jest.fn()
      collab.on('data', processSteps)

      collab.processQueue()

      expect(processSteps).not.toHaveBeenCalled()
      expect(collab.queue).toHaveLength(0)
    })

    it('does not process the next item when missing data', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextVersion = version + steps.length
      collab.queueData({ version: nextVersion + 10, steps })

      const processSteps = jest.fn()
      collab.on('data', processSteps)

      collab.programCatchup = jest.fn()

      collab.processQueue()
      expect(processSteps).not.toHaveBeenCalled()
      expect(collab.queue).toHaveLength(1)
    })

    it('programs a catchup for missing data', () => {
      const collab = new CollabProvider(config, service)
      collab.initialize(getState)

      const nextVersion = version + steps.length
      collab.queueData({ version: nextVersion + 10, steps })

      const processSteps = jest.fn()
      collab.on('data', processSteps)

      collab.programCatchup = jest.fn()

      collab.processQueue()
      expect(processSteps).not.toHaveBeenCalled()
      expect(collab.programCatchup).toHaveBeenCalled()
    })
  })
})
