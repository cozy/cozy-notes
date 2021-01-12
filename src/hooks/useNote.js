import { useState, useEffect } from 'react'
import { getSchemaVersion, schemaOrdered } from 'lib/collab/schema'

function useNote({ serviceClient, noteId }) {
  // `docId` is the id of the note for which we have a state.
  // `noteId` is the id of the requested note.
  const [docId, setDocId] = useState(noteId)
  const [loading, setLoading] = useState(true)
  const [doc, setDoc] = useState(undefined)
  const [title, setTitle] = useState(undefined)

  useEffect(
    () => {
      async function loadNote() {
        try {
          if (!loading) setLoading(true)
          let doc = await serviceClient.getDoc(docId)
          // If the note's schema doesn't correspond to the App one
          // that means that the App's schema has been updated but
          // not the on for the Note. We need to update it in order
          // to be able to use the latest features brought by
          // the new schema
          if (doc.schemaVersion !== getSchemaVersion()) {
            doc = await serviceClient.updateSchema(docId, schemaOrdered)
          }
          setTitle(doc.title || '')
          setDoc(doc)
        } catch (e) {
          setTitle(false)
          setDoc(false)
          // eslint-disable-next-line no-console
          console.warn(`Could not load note ${docId}`)
        }
        setLoading(false)
      }

      if (docId !== noteId) {
        // reload if ever noteId changes
        setLoading(true)
        setTitle(undefined)
        setDoc(undefined)
        setDocId(noteId)
      } else if (serviceClient) {
        // load the note if needed
        if (!doc || doc.file.id !== docId) loadNote()
      }
    },
    // `loading` and `doc` are willingly not included in the dependencies
    // eslint-disable-next-line
    [noteId, docId, setDocId, setLoading, serviceClient, setDoc, setTitle]
  )

  if (docId === noteId) return { loading, title, doc, setTitle }
  else return { loading: true, title: undefined, doc: undefined, setTitle }
}

export default useNote
