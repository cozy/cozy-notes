import { useMemo } from 'react'
import CollabProvider from 'lib/collab/provider'

/**
 * @typedef {object} useCollabProviderParams
 * @property {integer|undefined} docVersion - current version of the doc
 * @property {string} noteId - uuid of the io.cozy.files for the note
 * @property {ServiceClient|undefined} serviceClient - ServiceClient instance
 */

/**
 * Initialize a CollabProvider
 *
 * @param {useCollabProviderParams} params
 * @returns {CollabProvider|undefined}
 */
function useCollabProvider({ docVersion, noteId, serviceClient }) {
  return useMemo(
    () => {
      if (serviceClient && docVersion !== undefined) {
        const provider = new CollabProvider(
          { version: docVersion, noteId },
          serviceClient
        )
        return provider
      }
    },
    [noteId, docVersion, serviceClient]
  )
}

export default useCollabProvider
