import useTitleChanges from './useTitleChanges'
import { renderHook, act } from '@testing-library/react-hooks'

import {} from 'lib/utils.js'
jest.mock('lib/utils.js')

function createServiceClient() {
  return {
    setTitle: jest.fn(),
    onTitleUpdated: jest.fn()
  }
}
function createTitleChangeEvent(title) {
  return { target: { value: title } }
}

const serviceClient = createServiceClient()
const setTitle = jest.fn()
const noteId = '1234'
const title = 'my title'

describe('useTitleChanges', () => {
  describe('onLocalTitleChange', () => {
    it('is a function', () => {
      const params = { noteId, title, setTitle, serviceClient }
      const { result } = renderHook(() => useTitleChanges(params))
      expect(result.current.onLocalTitleChange).toBeInstanceOf(Function)
    })

    it('forwards to setTitle', async () => {
      const setTitle = jest.fn()
      const params = { noteId, title, setTitle, serviceClient }
      const { result, waitForNextUpdate } = renderHook(() =>
        useTitleChanges(params)
      )
      const next = waitForNextUpdate
      const { onLocalTitleChange } = result.current
      act(() => {
        const event = createTitleChangeEvent('new title')
        onLocalTitleChange(event)
      })
      await next
      expect(setTitle).toHaveBeenCalledWith('new title')
    })

    it('forwards to the stack', async () => {
      const serviceClient = createServiceClient()
      const params = { noteId, title, setTitle, serviceClient }
      const { result, waitForNextUpdate } = renderHook(() =>
        useTitleChanges(params)
      )
      const next = waitForNextUpdate
      const { onLocalTitleChange } = result.current
      act(() => {
        const event = createTitleChangeEvent('new title')
        onLocalTitleChange(event)
      })
      await next
      expect(serviceClient.setTitle).toHaveBeenCalledWith(noteId, 'new title')
    })

    describe('when the title does not change', () => {
      it('does not forward to setTitle', async () => {
        const setTitle = jest.fn()
        const params = { noteId, title, setTitle, serviceClient }
        const { result, waitForNextUpdate } = renderHook(() =>
          useTitleChanges(params)
        )
        const next = waitForNextUpdate
        const { onLocalTitleChange } = result.current
        act(() => {
          const event = createTitleChangeEvent(title)
          onLocalTitleChange(event)
        })
        await next
        expect(setTitle).not.toHaveBeenCalled()
      })

      it('does not forward to the stack', async () => {
        const serviceClient = createServiceClient()
        const params = { noteId, title, setTitle, serviceClient }
        const { result, waitForNextUpdate } = renderHook(() =>
          useTitleChanges(params)
        )
        const next = waitForNextUpdate
        const { onLocalTitleChange } = result.current
        act(() => {
          const event = createTitleChangeEvent(title)
          onLocalTitleChange(event)
        })
        await next
        expect(serviceClient.setTitle).not.toHaveBeenCalled()
      })
    })
    describe('for a title with line feeds', () => {
      it('does remove the line feeds', async () => {
        const setTitle = jest.fn()
        const params = { noteId, title, setTitle, serviceClient }
        const { result, waitForNextUpdate } = renderHook(() =>
          useTitleChanges(params)
        )
        const next = waitForNextUpdate
        const { onLocalTitleChange } = result.current
        act(() => {
          const event = createTitleChangeEvent('new\r\ntitle')
          onLocalTitleChange(event)
        })
        await next
        expect(setTitle).toHaveBeenCalledWith('new title')
      })
    })
  })
})
