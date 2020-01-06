import { Channel } from './channel'
import { getVersion, sendableSteps } from 'prosemirror-collab'

jest.mock('prosemirror-collab', () => {
  return { getVersion: jest.fn(), sendableSteps: jest.fn() }
})

const docId = 'myDocId'
const config = { docId }
const service = {
  pushSteps: jest.fn(),
  onStepsCreated: jest.fn(),
  onTelepointerUpdated: jest.fn(),
  join: jest.fn(),
  getSteps: jest.fn(),
  pushTelepointer: jest.fn()
}

describe('Channel', () => {
  describe('backoff', () => {
    describe('inscreaseBackoff', () => {
      it('should emit "needcatchup" after 4 failures', done => {
        const callback = () => done()
        const channel = new Channel(config, service)
        channel.on('needcatchup', callback)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
      })

      it('should not go over 5 minutes', () => {
        const fiveMinutes = 5 * 60 * 1000
        const channel = new Channel(config, service)
        for (var i = 0; i < 50; i++) channel.increaseBackoff()
        expect(channel.backoff).not.toBeGreaterThan(fiveMinutes)
      })
    })

    describe('afterBackoff', () => {
      it('should return a promise', async () => {
        const channel = new Channel(config, service)
        await channel.afterBackoff()
      })

      it('should resolve immediatly when no failures', async () => {
        const channel = new Channel(config, service)
        const race = Promise.race([
          new Promise(function(resolve) {
            window.setTimeout(() => resolve('backoff is > 100ms'), 100)
          }),
          channel.afterBackoff().then(() => 'backoff is < 100ms')
        ])
        await expect(race).resolves.toBe('backoff is < 100ms')
      })

      it('should wait for some time after an error', async () => {
        const channel = new Channel(config, service)
        channel.increaseBackoff()
        channel.increaseBackoff()
        const race = Promise.race([
          new Promise(function(resolve) {
            window.setTimeout(() => resolve('backoff is > 50ms'), 50)
          }),
          channel.afterBackoff().then(() => 'backoff is < 50ms')
        ])
        await expect(race).resolves.toBe('backoff is > 50ms')
      })
    })

    describe('resetBackoff', () => {
      it('should allow backoff to resolve immediatly after being reseted', async () => {
        const channel = new Channel(config, service)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.resetBackoff()
        const race = Promise.race([
          new Promise(function(resolve) {
            window.setTimeout(() => resolve('backoff is > 100ms'), 100)
          }),
          channel.afterBackoff().then(() => 'backoff is < 100ms')
        ])
        await expect(race).resolves.toBe('backoff is < 100ms')
      })
    })
  })

  describe('Steps queue', () => {
    const steps = {
      getState: jest.fn(),
      state: { is: 'first' },
      localSteps: { steps: [{ first: 42 }, { second: 666 }] }
    }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should have an empty queue by default', () => {
      const channel = new Channel(config, service)
      expect(channel.hasQueuedSteps()).toBeFalsy()
    })

    describe('enqueueSteps', () => {
      it("should add a step if there isn't any", () => {
        const channel = new Channel(config, service)
        expect(channel.hasQueuedSteps()).toBeFalsy()
        channel.enqueueSteps(steps)
        expect(channel.hasQueuedSteps()).toBeTruthy()
        const data = channel.dequeueSteps()
        expect(data).toHaveProperty('state', steps.state)
      })

      it('should replace previous step if there was any', () => {
        const channel = new Channel(config, service)
        channel.enqueueSteps(steps)
        const otherState = { is: 'new' }
        const otherSteps = {
          getState: jest.fn(),
          state: otherState,
          localSteps: []
        }
        channel.enqueueSteps(otherSteps)
        const data = channel.dequeueSteps()
        expect(data).toHaveProperty('state', otherState)
      })
    })

    describe('dequeueSteps', () => {
      it('should return the step given', () => {
        const channel = new Channel(config, service)
        expect(channel.hasQueuedSteps()).toBeFalsy()
        channel.enqueueSteps(steps)
        expect(channel.hasQueuedSteps()).toBeTruthy()
        const data = channel.dequeueSteps()
        expect(data).toHaveProperty('state', steps.state)
      })

      it('should rebuild the localSteps part if missing', () => {
        const localSteps = { steps: [{ a: 1 }, { b: 2 }] }
        const channel = new Channel(config, service)
        sendableSteps.mockImplementation(() => localSteps)
        channel.enqueueSteps({ ...steps, localSteps: undefined })
        const data = channel.dequeueSteps()
        expect(sendableSteps).toHaveBeenLastCalledWith(steps.state)
        expect(data).toHaveProperty('state', steps.state)
        expect(data).toHaveProperty('localSteps', localSteps)
      })

      it('should rebuild the state part if missing', () => {
        const localState = { is: 'new state' }
        const channel = new Channel(config, service)
        steps.getState.mockImplementation(() => localState)
        channel.enqueueSteps({
          ...steps,
          state: undefined,
          localSteps: undefined
        })
        const data = channel.dequeueSteps()
        expect(steps.getState).toHaveBeenCalled()
        expect(data).toHaveProperty('state', localState)
      })

      it('should default to an empty list of steps', () => {
        const channel = new Channel(config, service)
        sendableSteps.mockImplementation(() => undefined)
        channel.enqueueSteps({ ...steps, localSteps: undefined })
        const data = channel.dequeueSteps()
        expect(sendableSteps).toHaveBeenLastCalledWith(steps.state)
        expect(data).toHaveProperty('localSteps.steps', [])
      })
    })

    describe('rebaseStepsInQueue', () => {
      it('should do nothing in absence of steps', () => {
        const channel = new Channel(config, service)
        expect(channel.hasQueuedSteps()).toBeFalsy()
        channel.rebaseStepsInQueue()
        expect(channel.hasQueuedSteps()).toBeFalsy()
      })

      it('should do remove state and localSteps in the queued step', () => {
        const localState = { is: 'new state' }
        const localSteps = { steps: [{ a: 1 }, { b: 2 }] }
        steps.getState.mockImplementation(() => localState)
        sendableSteps.mockImplementation(() => localSteps)

        const channel = new Channel(config, service)
        channel.enqueueSteps(steps)
        channel.rebaseStepsInQueue()
        const data = channel.dequeueSteps()
        expect(data).toHaveProperty('state', localState)
        expect(data).toHaveProperty('localSteps', localSteps)
      })
    })

    describe('process queue', () => {
      it('sends steps to the servers if any is available', async () => {
        getVersion.mockImplementation(() => 42)
        const channel = new Channel(config, service)
        channel.enqueueSteps(steps)
        await channel.processQueue()
        expect(service.pushSteps).toHaveBeenCalledTimes(1)
      })

      it('does nothing if already processing the queue', async () => {
        getVersion.mockImplementation(() => 42)
        const channel = new Channel(config, service)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.enqueueSteps(steps)
        const first = channel.processQueue()
        channel.enqueueSteps(steps)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        const second = channel.processQueue()
        const race = Promise.race([
          first.then(() => 'first'),
          second.then(() => 'second')
        ])
        await expect(race).resolves.toBe('second')
        await Promise.all([first, second])
        expect(service.pushSteps).toHaveBeenCalledTimes(1)
      })

      it('does nothing if no queued steps', async () => {
        const channel = new Channel(config, service)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        const data = channel.processQueue()
        const time = new Promise(function(resolve) {
          window.setTimeout(() => resolve(), 100)
        })
        const race = Promise.race([
          time.then(() => 'process is > 100ms'),
          data.then(() => 'process is < 100ms')
        ])
        await expect(race).resolves.toBe('process is < 100ms')
        await Promise.all([data, time])
        expect(service.pushSteps).toHaveBeenCalledTimes(0)
      })

      it('does nothing if prosemirror has not started', async () => {
        expect(service.pushSteps).toHaveBeenCalledTimes(0)
        getVersion.mockImplementation(() => undefined)
        const channel = new Channel(config, service)
        channel.enqueueSteps(steps)
        await channel.processQueue()
        expect(service.pushSteps).toHaveBeenCalledTimes(0)
      })

      it('does nothing if steps are empty', async () => {
        getVersion.mockImplementation(() => 42)
        const channel = new Channel(config, service)
        channel.enqueueSteps({ ...steps, localSteps: { steps: [] } })
        await channel.processQueue()
        expect(service.pushSteps).toHaveBeenCalledTimes(0)
      })

      it('reset backoff after success', async () => {
        getVersion.mockImplementation(() => 42)
        const channel = new Channel(config, service)
        channel.enqueueSteps(steps)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.resetBackoff = jest.fn()
        await channel.processQueue()
        expect(channel.resetBackoff).toHaveBeenCalledTimes(1)
      })

      it('should emit the response if there is any', async done => {
        const callback = () => done()
        getVersion.mockImplementation(() => 42)
        service.pushSteps.mockImplementation(() => {
          return { steps: [{}, {}] }
        })
        const channel = new Channel(config, service)
        channel.enqueueSteps(steps)
        channel.on('data', callback)
        await channel.processQueue()
      })

      it('process the queue again', async () => {
        getVersion.mockImplementation(() => 42)
        const channel = new Channel(config, service)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.enqueueSteps(steps)
        const first = channel.processQueue()
        channel.processQueue = jest.fn()
        await first
        expect(channel.processQueue).toHaveBeenCalledTimes(1)
      })

      it('allows to process the queue again', async () => {
        getVersion.mockImplementation(() => 42)
        const channel = new Channel(config, service)
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.increaseBackoff()
        channel.enqueueSteps(steps)
        const first = channel.processQueue()
        const processQueue = channel.processQueue
        channel.processQueue = jest.fn()
        await first
        channel.processQueue = processQueue
        channel.enqueueSteps(steps)
        await channel.processQueue()
        expect(service.pushSteps).toHaveBeenCalledTimes(2)
      })

      describe('when in error (conflict?)', () => {
        beforeEach(() => {
          getVersion.mockImplementation(() => 42)
          service.pushSteps.mockImplementation(() => {
            throw 'ERROR'
          })
        })

        it('should leave a rebased step in queue', async () => {
          const channel = new Channel(config, service)
          channel.increaseBackoff()
          channel.increaseBackoff()
          channel.increaseBackoff()
          channel.enqueueSteps(steps)
          const first = channel.processQueue()
          channel.processQueue = jest.fn() // stop the recursion
          await first
          const localState = { is: 'new state' }
          const localSteps = { steps: [{ a: 1 }, { b: 2 }] }
          steps.getState.mockImplementation(() => localState)
          sendableSteps.mockImplementation(() => localSteps)
          const data = channel.dequeueSteps()
          expect(data).toHaveProperty('state', localState)
          expect(data).toHaveProperty('localSteps', localSteps)
        })

        it('should increase backoff', async () => {
          const channel = new Channel(config, service)
          channel.increaseBackoff = jest.fn()
          channel.enqueueSteps(steps)
          await channel.processQueue()
          expect(channel.increaseBackoff).toHaveBeenCalled()
        })

        it('should try to resend the steps after a rebase', async () => {
          const firstVersion = 1
          const lastVersion = 96
          const lastSteps = {
            steps: [{ a: 1 }, { b: 2 }]
          }
          service.pushSteps.mockImplementation((_, version) => {
            if (version == firstVersion) throw 'ERROR'
            else return { steps: [{}, {}] }
          })
          getVersion.mockImplementation(state => state.version || firstVersion)
          steps.getState.mockImplementation(() => ({ version: lastVersion }))
          sendableSteps.mockImplementation(() => lastSteps)
          const channel = new Channel(config, service)
          channel.enqueueSteps(steps)
          await channel.processQueue()
          // wait for reprocess
          await new Promise(resolve => window.setTimeout(resolve, 500))
          expect(service.pushSteps).toHaveBeenNthCalledWith(
            1,
            docId,
            firstVersion,
            steps.localSteps.steps
          )
          expect(service.pushSteps).toHaveBeenNthCalledWith(
            2,
            docId,
            lastVersion,
            lastSteps.steps
          )
          expect(service.pushSteps).toHaveBeenCalledTimes(2)
        })
      })
    })
  })

  describe('connect', () => {
    const version = 46
    const doc = { is: 'a doc' }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('join the server for this document', async () => {
      const channel = new Channel(config, service)
      await channel.connect(
        version,
        doc
      )
      expect(service.join).toHaveBeenCalledWith(docId)
    })

    it('emits for new steps from the server', async done => {
      const step = { a: 1, version }
      const channel = new Channel(config, service)
      channel.on('data', data => {
        expect(data.steps).toEqual([step])
        expect(data.version).toBe(version)
        done()
      })
      await channel.connect(
        version,
        doc
      )
      expect(service.onStepsCreated).toHaveBeenCalledTimes(1)
      const callback = service.onStepsCreated.mock.calls[0][1]
      callback(step)
    })

    it('emits for new telepointers from the server', async done => {
      const payload = { telepointer: 'example' }
      const channel = new Channel(config, service)
      channel.on('telepointer', data => {
        expect(data).toBe(payload)
        done()
      })
      await channel.connect(
        version,
        doc
      )
      expect(service.onTelepointerUpdated).toHaveBeenCalledTimes(1)
      const callback = service.onTelepointerUpdated.mock.calls[0][1]
      callback(payload)
    })

    it('emit "connected"', async done => {
      const channel = new Channel(config, service)
      channel.on('connected', data => {
        expect(data.doc).toBe(doc)
        expect(data.version).toBe(version)
        done()
      })
      await channel.connect(
        version,
        doc
      )
    })
  })

  describe('ensureEmptyQueue', () => {
    const steps = {
      getState: jest.fn(),
      state: { is: 'first' },
      localSteps: { steps: [{ first: 42 }, { second: 666 }] }
    }

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should resolve immediatly by default', async () => {
      const channel = new Channel(config, service)
      expect(channel.hasQueuedSteps()).toBeFalsy()
      const race = Promise.race([
        new Promise(function(resolve) {
          window.setTimeout(() => resolve('ensureEmptyQueue is > 50ms'), 50)
        }),
        channel.ensureEmptyQueue().then(() => 'ensureEmptyQueue is < 50ms')
      ])
      await expect(race).resolves.toBe('ensureEmptyQueue is < 50ms')
    })

    it('should resolve immediatly after emptying the queue', async () => {
      getVersion.mockImplementation(() => 42)
      const channel = new Channel(config, service)
      const callback = jest.fn()
      // generate some wait
      channel.increaseBackoff()
      channel.increaseBackoff()
      channel.increaseBackoff()
      const send = channel.sendSteps(
        steps.getState,
        steps.state,
        steps.localSteps
      )
      channel.ensureEmptyQueue().then(callback)
      expect(callback).not.toHaveBeenCalled()
      await send
      expect(callback).toHaveBeenCalled()
    })

    it('should should not resolve if something is not processed in the queue', async () => {
      getVersion.mockImplementation(() => 42)
      const channel = new Channel(config, service)
      const callback = jest.fn()
      channel.enqueueSteps(steps)
      channel.ensureEmptyQueue().then(callback)
      expect(callback).not.toHaveBeenCalled()
      await channel.processQueue()
      expect(callback).toHaveBeenCalled()
    })

    it('should not resolve when the queue is in conflict', async () => {
      getVersion.mockImplementation(() => 42)
      const localState = { is: 'new state' }
      const localSteps = { steps: [{ a: 1 }, { b: 2 }] }
      steps.getState.mockImplementation(() => localState)
      sendableSteps.mockImplementation(() => localSteps)
      service.pushSteps.mockImplementation(() => {
        throw 'ERROR'
      })
      const channel = new Channel(config, service)
      const callback = jest.fn()
      channel.enqueueSteps(steps)
      channel.ensureEmptyQueue().then(callback)
      const process = channel.processQueue()
      await new Promise(function(resolve) {
        window.setTimeout(() => resolve(), 500)
      })
      expect(callback).not.toHaveBeenCalled()
      service.pushSteps.mockImplementation(() => {})
      await process
      expect(callback).toHaveBeenCalled()
    })
  })
})
