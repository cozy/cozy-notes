import React, { useCallback, useRef, useEffect, useMemo } from 'react'

import { JSONTransformer } from '@atlaskit/editor-json-transformer'

import { withRouter } from 'react-router-dom'

import debounce from 'lodash.debounce'

import { queryConnect, withMutations } from 'cozy-client'

import EditorView from './editor-view'
import EditorLoading from './editor-loading'

import doctype from './doctype'
import { defaultTitle } from './utils'
import CollabProvider from '../../lib/collab/provider'
import ServiceClient from '../../lib/collab/client'

const jsonTransformer = new JSONTransformer()

const withCollab = true
const collabUrl = 'https://poc-collab.cozycloud.cc/'
const allowPublicCollab = true

const Form = props => {
  const { autoSave } = props

  // first note received in the props, to avoid useless changes in defaultValue
  const firstNote = useMemo(
    () => ({ title: props.note.title, content: props.note.content }),
    [props.note._id]
  )
  // same with the title placeholder
  const defaultTitleValue = useMemo(
    () => props.note.defaultTitle || defaultTitle(props.note),
    [props.note._id]
  )
  // then with the collabProvider to avoid an init at each render
  const userId = useMemo(() => `user${Math.floor(Math.random() * 1000)}`, [])
  const sessionId = userId
  const docId = props.note._id
  const collabProvider = useMemo(
    () => ({
      useNativePlugin: true,
      provider: Promise.resolve(
        new CollabProvider(
          { docId, userId, sessionId },
          new ServiceClient({ url: collabUrl, docId, userId, sessionId })
        )
      ),
      inviteToEditHandler: () => undefined,
      isInviteToEditButtonSelected: true,
      userId
    }),
    [props.note._id, userId]
  )
  // get the previous note in a ref to be able to fetch the last _rev
  // when sending the update to the couch server
  const serverNote = useRef(props.note)
  useEffect(
    () => {
      serverNote.current = props.note
    },
    [props.note._rev]
  )

  // we do note use the state in our callbacks to
  // avoid a capture of an old {note} variable
  const currentNote = useRef({
    title: props.note.title,
    content: props.note.content
  })

  // do not save more often than 5000ms
  // it will generate conflict with _rev of couchdb
  // and will overload couch database with useless versions
  const save = useMemo(
    () =>
      debounce(
        () =>
          props.saveDocument({ ...serverNote.current, ...currentNote.current }),
        5000,
        { leading: true, trailing: true }
      ),
    [props.note._id]
  )
  // always save immediatly when leaving the editor
  useEffect(() => () => save.flush(), [props.note._id])

  // fix callbacks
  const onTitleChange = useCallback(
    e => {
      const newTitle = e.target.value
      const title = newTitle && newTitle.trim().length > 0 ? newTitle : null
      if (title != currentNote.current.title) {
        currentNote.current = { ...currentNote.current, title }
        window.setTimeout(() => save())
      }
    },
    [props.note._id]
  )

  const onContentChange = useCallback(
    editorView => {
      const content = JSON.stringify(
        jsonTransformer.encode(editorView.state.doc),
        null,
        2
      )
      if (content != currentNote.current.content) {
        currentNote.current = { ...currentNote.current, content }
        window.setTimeout(() => save())
      }
    },
    [props.note._id]
  )

  // then memoize the rendering, the rest is pureComponent
  return useMemo(
    () => (
      <EditorView
        onTitleChange={autoSave ? onTitleChange : undefined}
        onContentChange={autoSave ? onContentChange : undefined}
        collabProvider={withCollab ? collabProvider : undefined}
        defaultTitle={defaultTitleValue}
        defaultValue={firstNote}
      />
    ),
    [props.note._id]
  )
}

const MutatedForm = withMutations()(Form)

const FormOrSpinner = props => {
  const {
    notes: { data, fetchStatus }
  } = props
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'pending'

  const couchNote = data && data[0]
  const fakeNote = useMemo(
    () => {
      if (allowPublicCollab && withCollab) {
        return {
          _id: props.id,
          id: props.id,
          title: 'Note collaborative'
        }
      } else {
        return undefined
      }
    },
    [props.id, allowPublicCollab]
  )

  const note = couchNote || fakeNote

  if (!isLoading && !note) {
    window.setTimeout(() => props.history.push(`/`), 0)
  }

  const showSpinner = isLoading || !note

  return showSpinner ? (
    <EditorLoading />
  ) : (
    <MutatedForm note={note} autoSave={couchNote ? true : false} />
  )
}

export default ({ match }) => {
  const id = match.params.id
  const query = client => client.find(doctype).where({ _id: id })
  const Component = queryConnect({
    notes: { query, as: 'notes' }
  })(withRouter(FormOrSpinner))
  return <Component id={id} />
}
