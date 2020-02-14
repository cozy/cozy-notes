import useUser from './useUser'

import { renderHook } from '@testing-library/react-hooks'

describe('useUser', () => {
  describe('with an explicit username in the url', () => {
    it('should return  this username', () => {
      window.history.pushState(
        {},
        'Test Title',
        '/test.html?username=hello+world'
      )
      const { result } = renderHook(() => useUser({}))
      expect(result.current.userName).toEqual('hello world')
    })
  })
})
