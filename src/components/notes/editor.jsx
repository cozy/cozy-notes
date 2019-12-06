import React, { useCallback, useState, useEffect, useMemo } from 'react'

import { withClient } from 'cozy-client'

import EditorView from './editor-view'
import EditorLoading from './editor-loading'

import CollabProvider from '../../lib/collab/provider'
import ServiceClient from '../../lib/collab/stack-client'

function shortNameFromClient(client) {
  const url = new URL(client.getStackClient().uri)
  return url.hostname + Math.floor(Math.random() * 100)
}

const Editor = withClient(function(props) {
  const { client, noteId } = props
  const userName = useMemo(
    () => props.userName || shortNameFromClient(client),
    [props.userName]
  )

  // alias for later shortcuts
  const docId = noteId
  const userId = userName
  const cozyClient = client

  // state
  const [loading, setLoading] = useState(true)
  const [doc, setDoc] = useState(undefined)
  const [title, setTitle] = useState(undefined)

  // plugins and config
  const serviceClient = useMemo(
    () => {
      return new ServiceClient({ userId, userName, cozyClient })
    },
    [noteId]
  )
  const docVersion = doc && doc.version
  //console.log("docVersion", doc, doc && doc.version, docVersion)
  const collabProvider = useMemo(
    () => {
      //console.log("collab provider memo", docVersion)
      if (docVersion !== undefined) {
        //console.log('new collabProvider')
        const provider = new CollabProvider(
          { version: doc.version, docId },
          serviceClient
        )
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
    [noteId, docVersion, userName, serviceClient]
  )
  //console.log("end collabProviderMemo", collabProvider)

  // fetch the actual note on load
  useEffect(
    () => {
      const fn = async function() {
        try {
          if (!loading) {
            setLoading(true)
          }
          const doc = await serviceClient.getDoc(noteId)
          setTitle(doc.title || '')
          setDoc(doc)
        } catch (e) {
          setTitle(false)
          setDoc(false)
        }
        setLoading(false)
      }
      fn()
    },
    [noteId]
  )

  // callbacks
  const onContentChange = useCallback(() => null, [noteId])
  const onLocalTitleChange = useCallback(
    e => {
      const newTitle = e.target.value
      const modifiedTitle = newTitle
      if (title != modifiedTitle) {
        setTitle(modifiedTitle)
        serviceClient.setTitle(noteId, modifiedTitle)
      }
    },
    [noteId, setTitle, serviceClient]
  )
  const onRemoteTitleChange = useCallback(
    modifiedTitle => {
      if (title != modifiedTitle) {
        setTitle(modifiedTitle)
      }
    },
    [noteId, setTitle]
  )
  useMemo(
    () => {
      serviceClient.onTitleUpdated(noteId, onRemoteTitleChange)
    },
    [onRemoteTitleChange, serviceClient]
  )

  // Failure in loading the note ?
  useEffect(() => {
    if (!loading && !doc) {
      console.warn(`Could not load note ${noteId}`)
      window.setTimeout(() => props.history.push(`/`), 0)
    }
  })

  // rendering
  if (loading || !doc) {
    return <EditorLoading />
  } else {
    return (
      <EditorView
        onTitleChange={onLocalTitleChange}
        onContentChange={onContentChange}
        collabProvider={collabProvider}
        defaultTitle={'Ici votre titre…'}
        defaultValue={{ ...doc.doc, version: doc.version }}
        title={title && title.length > 0 ? title : undefined}
      />
    )
  }
})
)

export default Editor
