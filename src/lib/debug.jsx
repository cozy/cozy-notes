import { useEffect } from 'react'
import { useFlag } from 'cozy-flags'
import set from 'lodash/set'
import get from 'lodash/get'
import flag, { FlagSwitcher } from 'cozy-flags'

import { getVersion, sendableSteps } from 'prosemirror-collab'

/**
 * Sets a value in a global debug object
 *
 * If the corresponding 'debug.{name}' flag is activated
 * then you'll find the value in 'window.cozy.debug.{name}'
 *
 * @param {string} name
 * @param {object} value
 */
export function useDebugValue(name, value) {
  const activated = useFlag(`debug.${name}`)
  useEffect(() => {
    if (activated) setDebugValue(name, value)
  }, [activated, name, value])
}

/**
 * Returns a React component that will show
 * the flag switcher from cozy-flags
 * when the flag 'swicher' is activated
 */
export function useFlagSwitcher() {
  useFlag('switcher')
  return FlagSwitcher
}

export function setDebugValue(name, value) {
  set(window, `cozy.debug.${name}`, value)
}

// Sets a global 'window.cozy.debug.showSwitcher()'
// that will activate the cozy-flag switcher
set(window, `cozy.debug.showSwitcher`, () => flag('switcher', true))

set(window, 'cozy.debug.notes.debugCollab', async function debugCollab() {
  // activate all needed flags
  flag('debug.client', true)
  flag('debug.notes.service', true)
  flag('debug.notes.collabProvider', true)
  flag('debug.notes.channel', true)
  flag('debug.notes.noteId', true)
  flag('debug.notes.doc', true)
  flag('debug.notes.file', true)
  flag('debug.notes.returnUrl', true)
  flag('debug.notes.dirtyRef', true)
  flag('debug.notes.lastPatchError', true)

  // then wait and trigger the collab  debug
  return await new Promise(resolve => {
    window.setTimeout(async () => {
      const collabProvider = get(window, 'cozy.debug.notes.collabProvider')
      const channel = get(window, 'cozy.debug.notes.channel')
      const data = { date: new Date().toISOString() }

      data.noteId = get(window, 'cozy.debug.notes.noteId')
      data.initialVersion = get(window, 'cozy.debug.notes.initialVersion')
      data.returnUrl = get(window, 'cozy.debug.notes.returnUrl')

      const state = collabProvider && collabProvider.getState()
      const version = collabProvider && state && getVersion(state)
      const { steps } = (state && sendableSteps(state)) || { steps: [] }
      data.state = { version, steps, length: steps && steps.length }

      const backoff = channel && channel.backoff
      const failures = channel && channel.failures
      const isDirty = channel && channel.isDirty()
      const isSending = channel && channel.isSending
      const hasQueue = channel && channel.hasQueuedSteps()
      const queued = channel && channel.queuedStep
      const queuedState = queued && queued.state
      const queuedVersion = queuedState && getVersion(queuedState)
      const queuedSteps = queued && queued.localSteps && queued.localSteps.steps
      data.queue = {
        backoff,
        failures,
        isDirty,
        isSending,
        hasQueue,
        version: queuedVersion,
        steps: queuedSteps,
        length: queuedSteps && queuedSteps.length
      }

      const dirtySince = collabProvider.isDirty()
      const lastRemoteSync = collabProvider.getLastRemoteSync()
      const lastLocalSave = collabProvider.getLastLocalSave()
      data.collabState = {
        dirtySince,
        lastRemoteSync,
        lastLocalSave
      }

      const realtime = collabProvider && collabProvider.serviceClient
      const socket = realtime && realtime._socket
      const websocket = socket && socket._webSocket
      data.realtime = {
        hasRealtime: !!realtime,
        hasSocket: !!socket,
        hasWebsocket: !!websocket,
        isOpen: socket && socket.isOpen(),
        isConnecting: socket && socket.isConnecting(),
        token: socket && socket._token,
        readyState: websocket && websocket.readyState,
        bufferedAmount: websocket && websocket.bufferedAmount,
        url: websocket && websocket.url
      }

      const client = get(window, 'cozy.debug.client')
      data.client = {
        token: client.stackClient.token,
        credentials: client.stackClient.getCredentials(),
        authorization: client.stackClient.getAuthorizationHeader(),
        uri: client.uri
      }

      let error = get(window, 'cozy.debug.notes.lastPatchError')
      if (!error && isDirty) {
        while (channel.isSending) {
          await new Promise(resolve => window.setTimeout(resolve, 50))
        }
        channel.resetBackoff()
        channel.processQueue()
        await Promise.race([
          new Promise(resolve => window.setTimeout(resolve, 2000)),
          new Promise(resolve => {
            const fn = async () => {
              let err = get(window, 'cozy.debug.notes.lastPatchError')
              while (!err) {
                await new Promise(resolve => window.setTimeout(resolve, 50))
                err = get(window, 'cozy.debug.notes.lastPatchError')
              }
              error = err
              resolve()
            }
            fn()
          })
        ])
        if (channel.isDirty()) {
          channel.backoff = backoff
          channel.failures = failures
        }
      }
      let msg = error && error.message
      try {
        msg = JSON.parse(error.message)
      } catch (e) {
        // nothing
      }
      data.lastPatchError = {
        name: error && error.name,
        status: error && error.status,
        message: msg
      }

      resolve(data)
    }, 250)
  })
})
