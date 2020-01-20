import { useCallback } from 'react'

function useForceSync({ doc, collabProvider }) {
  const noteId = doc && doc.file.id

  const serviceClient = collabProvider && collabProvider.serviceClient
  const channel = collabProvider && collabProvider.channel

  // Be sure to save everything before leaving
  // and force sync with the io.cozy.file
  const forceSync = useCallback(
    async function forceSync() {
      if (doc && channel && serviceClient) {
        // wait for every event to finish
        await channel.ensureEmptyQueue()
        // then force a server sync
        await serviceClient.sync(noteId)
      }
    },
    [doc, channel, serviceClient]
  )

  // Sync on unload will probably be stopped by the browser,
  // as most async code on unload, but let's try anyway
  const emergencySync = useCallback(
    function() {
      if (noteId && serviceClient) {
        serviceClient.sync(noteId) // force a server sync
      }
    },
    [noteId, serviceClient]
  )

  return { forceSync, emergencySync }
}

export default useForceSync
