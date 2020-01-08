import { useMemo } from 'react'
import CollabProvider from 'lib/collab/provider'

function useCollabProvider({ docVersion, noteId, serviceClient }) {
  return useMemo(
    () => {
      if (serviceClient && docVersion !== undefined) {
        const provider = new CollabProvider(
          { version: docVersion, noteId },
          serviceClient
        )
        // The following object is defined in an Atlassian API.
        // `provider` expects a Promise, even if we wouldn't
        //  need it ourselves.
        return {
          useNativePlugin: true,
          provider: Promise.resolve(provider),
          inviteToEditHandler: () => undefined,
          isInviteToEditButtonSelected: false,
          userId: serviceClient.getSessionId()
        }
      } else {
        return null
      }
    },
    [noteId, docVersion, serviceClient]
  )
}

export default useCollabProvider
