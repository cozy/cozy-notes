import useCollaborationState from './useCollaborationState'
import { renderHook, cleanup, act } from '@testing-library/react-hooks'
import { Channel } from '../lib/collab/channel'

import { getVersion } from 'prosemirror-collab'
jest.mock('prosemirror-collab', () => {
  return { getVersion: jest.fn(), sendableSteps: jest.fn() }
})

const noteId = 'myNoteId'
const config = { noteId }
const service = {
  pushSteps: jest.fn(),
  onStepsCreated: jest.fn(),
  onTelepointerUpdated: jest.fn(),
  join: jest.fn(),
  getSteps: jest.fn(),
  pushTelepointer: jest.fn()
}

const getCollabProvider = () => {
  return {
    channel: new Channel(config, service)
  }
}

async function wait(amount) {
  return new Promise(resolve => {
    window.setTimeout(resolve, amount)
  })
}

describe('useCollaborationState', () => {
  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  beforeEach(() => {
    getVersion.mockImplementation(state => state.version)
  })

  describe('with a `null` provider', () => {
    const getCollabProvider = () => null

    it('should not throw', async () => {
      expect(() => {
        renderHook(() => useCollaborationState(getCollabProvider()))
      }).not.toThrow()
    })

    it('should return a falsy lastSave', () => {
      const { result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { lastSave } = result.current
      expect(lastSave).toBeFalsy()
    })

    it('should return a falsy dirtySince', () => {
      const { result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { dirtySince } = result.current
      expect(dirtySince).toBeFalsy()
    })

    it('should return a falsy isDirty', () => {
      const { result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { isDirty } = result.current
      expect(isDirty).toBeFalsy()
    })
  })

  describe('with a fresh new Channel', () => {
    it('should not throw', async () => {
      expect(() => {
        renderHook(() => useCollaborationState(getCollabProvider()))
      }).not.toThrow()
    })

    it('should return a fresh date in lastSave', () => {
      const { result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { lastSave } = result.current
      expect(lastSave).toBeInstanceOf(Date)
      expect(lastSave.getTime()).toBeGreaterThan(Date.now() - 250)
    })

    it('should return a falsy dirtySince', () => {
      const { result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { dirtySince } = result.current
      expect(dirtySince).toBeFalsy()
    })

    it('should return a falsy isDirty', () => {
      const { result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { isDirty } = result.current
      expect(isDirty).toBeFalsy()
    })

    it('should not update lastSave in future calls', done => {
      const { rerender, result } = renderHook(() =>
        useCollaborationState(getCollabProvider())
      )
      const { lastSave } = result.current
      window.setTimeout(function() {
        rerender()
        expect(result.current.lastSave).toBe(lastSave)
        done()
      }, 250)
    })
  })

  describe('when a step is in queue', () => {
    const steps = {
      getState: jest.fn(),
      state: { is: 'first' },
      localSteps: { steps: [{ first: 42 }, { second: 666 }] }
    }

    it('should have a truthy isDirty', () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      channel.enqueueSteps(steps)
      const { result } = renderHook(() => useCollaborationState(provider))
      const { isDirty } = result.current
      expect(isDirty).toBeTruthy()
    })

    it('should have a date as dirtySince', () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      channel.enqueueSteps(steps)
      const { result } = renderHook(() => useCollaborationState(provider))
      const { dirtySince } = result.current
      expect(dirtySince).toBeInstanceOf(Date)
    })

    it('dirtySince should be the date of the first object in queue', done => {
      const provider = getCollabProvider()
      const channel = provider.channel
      const { rerender, result } = renderHook(() =>
        useCollaborationState(provider)
      )
      channel.enqueueSteps(steps)
      rerender()
      const { dirtySince } = result.current
      window.setTimeout(() => {
        rerender()
        expect(result.current.dirtySince).toBe(dirtySince)
        done()
      }, 250)
    })

    it('should still return a date as lastSave', () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      const { rerender, result } = renderHook(() =>
        useCollaborationState(provider)
      )
      channel.enqueueSteps(steps)
      rerender()
      const { lastSave } = result.current
      expect(lastSave).toBeInstanceOf(Date)
    })
  })

  describe('when a step is sending', () => {
    let resolvePushSteps

    const steps = {
      getState: jest.fn(),
      state: { is: 'first' },
      localSteps: { steps: [{ first: 42 }, { second: 666 }] }
    }

    const remoteSteps = { steps: [{}, {}] }

    beforeEach(() => {
      const promise = new Promise(resolve => {
        resolvePushSteps = resolve
      })
      service.pushSteps.mockImplementation(async () => promise)
    })

    it('should have a truthy isDirty', () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      channel.sendSteps(steps.getState, steps.state, steps.localSteps)
      const { result } = renderHook(() => useCollaborationState(provider))
      const { isDirty } = result.current
      expect(isDirty).toBeTruthy()
      resolvePushSteps(remoteSteps)
    })

    it('should have a date as dirtySince', () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      channel.sendSteps(steps.getState, steps.state, steps.localSteps)
      const { result } = renderHook(() => useCollaborationState(provider))
      const { dirtySince } = result.current
      expect(dirtySince).toBeInstanceOf(Date)
      resolvePushSteps(remoteSteps)
    })

    it('dirtySince should be the date of the first object in queue', done => {
      const provider = getCollabProvider()
      const channel = provider.channel
      const { rerender, result } = renderHook(() =>
        useCollaborationState(provider)
      )
      channel.sendSteps(steps.getState, steps.state, steps.localSteps)
      rerender()
      const { dirtySince } = result.current
      window.setTimeout(() => {
        rerender()
        expect(result.current.dirtySince).toBe(dirtySince)
        done()
      }, 250)
      resolvePushSteps(remoteSteps)
    })

    it('should still return a date as lastSave', () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      const { rerender, result } = renderHook(() =>
        useCollaborationState(provider)
      )
      channel.sendSteps(steps.getState, steps.state, steps.localSteps)
      rerender()
      const { lastSave } = result.current
      expect(lastSave).toBeInstanceOf(Date)
      resolvePushSteps(remoteSteps)
    })
  })

  describe('after processing a step', () => {
    let resolvePushSteps

    const version = 42
    const steps = {
      getState: jest.fn(),
      state: { is: 'first', version },
      localSteps: { steps: [{ first: 42 }, { second: 666 }] }
    }

    const remoteSteps = { steps: [{}, {}] }

    beforeEach(() => {
      const promise = new Promise(resolve => {
        resolvePushSteps = resolve
      })
      service.pushSteps.mockImplementation(async () => promise)
    })

    const init = async () => {
      const provider = getCollabProvider()
      const channel = provider.channel
      const { rerender, result } = renderHook(() =>
        useCollaborationState(provider)
      )
      channel.sendSteps(steps.getState, steps.state, steps.localSteps)
      await rerender()
      const previous = {
        isDirty: result.current.isDirty,
        dirtySince: result.current.dirtySince,
        lastSave: result.current.lastSave
      }
      await act(async () => {
        resolvePushSteps(remoteSteps)
        await channel.ensureEmptyQueue()
        await wait(50)
      })
      await rerender()
      return { rerender, result, channel, previous }
    }

    it('should update lastSave', async () => {
      const { result, previous } = await init()
      expect(result.current.lastSave).not.toBe(previous.lastSave)
    })

    describe('there is nothing left in the queue', () => {
      it('should have a falsy isDirty', async () => {
        const { result } = await init()
        expect(result.current.isDirty).toBeFalsy()
      })

      it('should have a falsy dirtySince', async () => {
        const { result } = await init()
        expect(result.current.dirtySince).toBeFalsy()
      })
    })

    describe('there is something in the queue again', () => {
      const initAndQueue = async () => {
        const { rerender, result, channel, previous } = await init()
        const promise = new Promise(resolve => {
          resolvePushSteps = resolve
        })
        service.pushSteps.mockImplementation(async () => promise)
        await act(async () => {
          channel.sendSteps(steps.getState, steps.state, steps.localSteps)
          await wait(50)
        })
        await rerender()
        return { rerender, result, channel, previous }
      }

      const resolvePromise = async () => {
        return act(async () => {
          resolvePushSteps(remoteSteps)
          await wait(50)
        })
      }

      it('should have a truthy isDirty', async () => {
        const { result } = await initAndQueue()
        expect(result.current.isDirty).toBeTruthy()
        await resolvePromise()
      })

      it('should have a new dirtySince date', async () => {
        const { result, previous } = await initAndQueue()
        expect(result.current.dirtySince).not.toBe(previous.dirtySince)
        await resolvePromise()
      })
    })
  })
})
