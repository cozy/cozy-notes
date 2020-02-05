import { useState, useEffect } from 'react'

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
          const doc = await serviceClient.getDoc(docId)
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
