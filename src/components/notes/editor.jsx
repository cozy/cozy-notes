import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react'

import { withRouter } from 'react-router-dom'

import { withClient } from 'cozy-client'

import EditorView from './editor-view'
import EditorLoading from './editor-loading'

import CollabProvider from '../../lib/collab/provider'
import ServiceClient from '../../lib/collab/stack-client'

function shortNameFromClient(client) {
  return client.getStackClient().getCozyURL().hostname
}

const Editor = withClient(function(props) {
  const { client, noteId } = props
  const userName = props.userName || shortNameFromClient(client)

  // alias for later shortcuts
  const docId = noteId
  const userId = userName
  const sessionId = userName
  const cozyClient = client

  // state
  const [loading, setLoading] = useState(true)
  const [doc, setDoc] = useState(undefined)
  const currentTitle = useRef(undefined)

  // plugins and config
  const serviceClient = useMemo(
    () => {
      return new ServiceClient(docId, userId, sessionId, cozyClient)
    },
    [noteId]
  )
  const collabProvider = useMemo(
    () => ({
      useNativePlugin: true,
      provider: Promise.resolve(
        new CollabProvider({ docId, userId, sessionId }, serviceClient)
      ),
      inviteToEditHandler: () => undefined,
      isInviteToEditButtonSelected: false,
      userId
    }),
    [noteId, userName, serviceClient]
  )

  // fetch the actual note on load
  useEffect(
    async () => {
      try {
        if (!loading) {
          setLoading(true)
        }
        const doc = await serviceClient.getDoc(noteId)
        currentTitle.current = doc.attributes.metadata.title || ''
        setDoc(doc)
      } catch (e) {
        setDoc(false)
      }
      setLoading(false)
    },
    [noteId]
  )

  // callbacks
  const onTitleChange = useCallback(
    e => {
      const newTitle = e.target.value
      const title = newTitle && newTitle.trim().length > 0 ? newTitle : null
      if (title != currentTitle.current) {
        currentTitle.current = title
        serviceClient.setTitle(noteId, title)
      }
    },
    [noteId]
  )
  const onContentChange = useCallback(() => null, [noteId])

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
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
        collabProvider={collabProvider}
        defaultTitle={doc.attributes.metadata.title}
        defaultValue={doc.attributes.metadata.content}
      />
    )
  }
})

export default withRouter(({ match, userName }) => (
  <Editor noteId={match.params.id} userName={userName} />
))
