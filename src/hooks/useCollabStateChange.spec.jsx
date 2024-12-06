import { renderHook, act } from '@testing-library/react-hooks'

import useCollabStateChange from './useCollabStateChange'

function createProvider() {
  const listeners = []
  const on = jest.fn().mockImplementation((name, fn) => listeners.push(fn))
  const off = jest.fn()
  return { listeners, on, off }
}

describe('useCollabStateChange', () => {
  describe('when state changes', () => {
    it('rerenders', async () => {
      const collabProvider = createProvider()
      const { waitForNextUpdate } = renderHook(() =>
        useCollabStateChange(collabProvider)
      )
      expect(collabProvider.on).toHaveBeenCalled()
      const update = waitForNextUpdate()
      act(() => {
        collabProvider.listeners[0]()
      })
      await update
      // should not time out
    })
  })
  describe('after unmount', () => {
    it('removes the listener', async () => {
      const collabProvider = createProvider()
      const { unmount } = renderHook(() => useCollabStateChange(collabProvider))
      await unmount()
      expect(collabProvider.off).toHaveBeenCalled()
    })
  })
})
