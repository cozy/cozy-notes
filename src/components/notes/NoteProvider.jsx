import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef
} from 'react'

import { useClient, useQuery } from 'cozy-client'

import useUser from 'hooks/useUser'
import useServiceClient from 'hooks/useServiceClient'
import { buildNoteByIdQuery } from 'lib/queries'
import { getSchemaVersion, schemaOrdered } from 'lib/collab/schema'

const NoteContext = createContext()

const useNoteContext = () => useContext(NoteContext)

const NoteProvider = ({ children, noteId, readOnly = false }) => {
  const client = useClient()

  const previousNoteId = useRef(noteId)
  const [status, setStatus] = useState('pending')
  const [title, setTitle] = useState()
  const [formatedDocument, setFormatedDocument] = useState()

  const { userName, userId } = useUser()
  const serviceClient = useServiceClient({
    userId,
    userName,
    cozyClient: client
  })

  const noteQuery = buildNoteByIdQuery(noteId)
  const noteResult = useQuery(noteQuery.definition, noteQuery.options)

  useEffect(() => {
    const format = async () => {
      setStatus('loading')
      try {
        let doc = serviceClient.getFormatedDoc(noteResult?.data)
        // If the note's schema doesn't correspond to the App one
        // that means that the App's schema has been updated but
        // not the on for the Note. We need to update it in order
        // to be able to use the latest features brought by
        // the new schema
        if (!readOnly && doc.schemaVersion !== getSchemaVersion()) {
          // Only attempt update if not previously failed, as this would trigger an infinite loop
          if (status !== 'failed') {
            doc = await serviceClient.updateSchema(noteId, schemaOrdered)
          }
        }
        setTitle(doc.title || '')
        setFormatedDocument(doc)
        setStatus('loaded')
      } catch {
        setStatus('failed')
      }
    }

    if (
      noteResult.fetchStatus === 'loaded' &&
      serviceClient &&
      status !== 'loading' &&
      formatedDocument === undefined
    ) {
      format()
    }
  }, [formatedDocument, noteId, noteResult, readOnly, serviceClient, status])

  useEffect(() => {
    if (noteId !== previousNoteId.current) {
      setStatus('pending')
      setTitle(undefined)
      setFormatedDocument(undefined)
    }
    previousNoteId.current = noteId
  }, [noteId])

  return (
    <NoteContext.Provider
      value={{
        doc: formatedDocument,
        serviceClient,
        status,
        title,
        setTitle
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export { NoteProvider, useNoteContext }
