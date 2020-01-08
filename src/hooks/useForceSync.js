import { useCallback } from 'react'

function useForceSync({ doc, serviceClient, collabProvider }) {
  const noteId = doc && doc.file.id

  // Be sure to save everything before leaving
  // and force sync with the io.cozy.file
  const forceSync = useCallback(
    async function forceSync() {
      if (doc && collabProvider && serviceClient) {
        // wait for every event to finish
        const provider = await collabProvider.provider
        await provider.channel.ensureEmptyQueue()
        // then force a server sync
        await serviceClient.sync(noteId)
      }
    },
    [doc, collabProvider]
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
