import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import useUser from './useUser'
import IsPublicContext from '../components/IsPublicContext'

function withPublicContext(value) {
  return props => (
    <IsPublicContext.Provider value={value}>
      {props.children}
    </IsPublicContext.Provider>
  )
}

function setUrlUsername(username) {
  const params = username ? 'username=' + encodeURI(username) : ''
  const url = '/test.html?' + params
  window.history.pushState({}, 'Test Title', url)
}

describe('useUser', () => {
  describe('with an explicit username in the url', () => {
    it('should return  this username', () => {
      setUrlUsername('hello world')
      const { result } = renderHook(() => useUser({}))
      expect(result.current.userName).toEqual('hello world')
    })
  })

  describe('for a public view', () => {
    it('shows an unknown initial', () => {
      const context = withPublicContext(true)
      setUrlUsername(null)
      const { result } = renderHook(() => useUser({}), { wrapper: context })
      expect(result.current.userName[0]).toEqual('?')
    })
  })
})
