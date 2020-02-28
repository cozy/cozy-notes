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
function useCollabProvider({ doc, noteId, serviceClient }) {
  return useMemo(() => {
    const version = doc && doc.version
    const updatedAt = doc && doc.updatedAt
    if (serviceClient && doc !== undefined) {
      const provider = new CollabProvider(
        { version, noteId, updatedAt },
        serviceClient
      )
      return provider
    }
  }, [noteId, doc, serviceClient])
}

export default useCollabProvider
