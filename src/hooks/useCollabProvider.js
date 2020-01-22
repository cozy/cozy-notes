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
        return {
          collabProvider: provider,
          // The following `collabProviderPlugin` object is defined
          // in an Atlassian API. The attribute `provider` is expected
          // to be a Promise, even if we don't need one ourselves here.
          collabProviderPlugin: {
            useNativePlugin: true,
            provider: Promise.resolve(provider),
            inviteToEditHandler: () => undefined,
            isInviteToEditButtonSelected: false,
            userId: serviceClient.getSessionId()
          }
        }
      } else {
        return {}
      }
    },
    [noteId, docVersion, serviceClient]
  )
}

export default useCollabProvider
