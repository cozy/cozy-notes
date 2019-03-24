import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'

import { Editor } from '@atlaskit/editor-core'
import { JSONTransformer } from '@atlaskit/editor-json-transformer'

import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import debounce from 'lodash.debounce'

import Spinner from 'cozy-ui/react/Spinner'
import Input from 'cozy-ui/react/Input'
import Button from 'cozy-ui/react/Button'

import { queryConnect, withMutations } from 'cozy-client'

import doctype from './doctype'
import { defaultTitle } from './utils'
//import { collabEditProvider } from './collab_provider'
import CollabProvider from '../../lib/collab/provider'
import ServiceClient from '../../lib/collab/client'
import editorConfig from './editor_config'

import HeaderMenu from '../header_menu'

const jsonTransformer = new JSONTransformer()

const Form = props => {
  // current state of the note being edited, initialized from the props
  const [note, setNote] = useState({
    title: props.note.title,
    content: props.note.content
  })
  // first note received in the props, to avoid useless changes in defaultValue
  const firstNote = useMemo(
    () => ({ title: props.note.title, content: props.note.content }),
    [props.note._id]
  )
  // same with the title placeholder
  const defaultTitleValue = useMemo(() => defaultTitle(props.note), [
    props.note._id
  ])
  // then with the collabProvider to avoid an init at each render
  /*
  const collabProvider = useMemo(
    () => ({
      provider: collabEditProvider('rick', firstNote),
      inviteToEditHandler: () => undefined,
      isInviteToEditButtonSelected: true
    }),
    [props.note._id]
  )
  */
  const userId = 'john'
  const sessionId = userId
  const url = 'http://localhost:3000'
  const docId = props.note._id
  const collabProvider = useMemo(
    () => ({
      useNativePlugin: true,
      provider: Promise.resolve(
        new CollabProvider(
          { docId, userId, sessionId },
          new ServiceClient({ url, docId, userId, sessionId })
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
  // do not save more often than 5000ms
  // it will generate conflict with _rev of couchdb
  // and will overload couch database with useless versions
  const save = useMemo(
    () =>
      debounce(
        next => props.saveDocument({ ...serverNote.current, ...next }),
        5000,
        { leading: true, trailing: true }
      ),
    [props.note._id]
  )

  // fix callbacks
  const onTitleChange = useCallback(
    e => {
      const newTitle = e.target.value
      const title = newTitle && newTitle.trim().length > 0 ? newTitle : null
      if (title != note.title) {
        const newNote = { ...note, title }
        setNote(newNote)
        window.setTimeout(() => save(newNote))
      }
    },
    [props.note._id]
  )

  const onContentChange = useCallback(
    editorView => {
      console.log(editorView.state)
      const content = JSON.stringify(
        jsonTransformer.encode(editorView.state.doc),
        null,
        2
      )
      if (content != note.content) {
        const newNote = { ...note, content }
        setNote(newNote)
        window.setTimeout(() => save(newNote))
      }
    },
    [props.note._id]
  )

  const withCollab = true
  const collabOrChange = useMemo(
    () =>
      withCollab
        ? { collabEdit: collabProvider, onChange: onContentChange }
        : { onChange: onContentChange },
    [withCollab]
  )

  // then memoize the rendering, the rest is pureComponent
  return useMemo(
    () => (
      <React.Fragment>
        <Input
          fullwidth={true}
          defaultValue={firstNote.title}
          onChange={onTitleChange}
          placeholder={defaultTitleValue}
          style={{
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '-1rem'
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexGrow: '1'
          }}
        >
          <Editor
            {...collabOrChange}
            defaultValue={firstNote.content}
            {...editorConfig}
            appearance="full-page"
            placeholder="Que voulez-vous dire ?"
            shouldFocus={true}
          />
        </div>
      </React.Fragment>
    ),
    [props.note._id]
  )
}

const MutatedForm = withMutations()(Form)

const FormOrSpinner = props => {
  const {
    notes: { data, fetchStatus }
  } = props
  const note = data && data[0]
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'pending'

  if (!isLoading && !note) {
    window.setTimeout(() => props.history.push(`/`), 0)
  }

  const showSpinner = isLoading || !note

  const left = (
    <Button
      icon="back"
      tag={Link}
      to="/"
      className="sto-app-back"
      label="Retour à la liste"
      subtle
    />
  )

  return (
    <article
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <HeaderMenu left={left} />
      {showSpinner ? (
        <Spinner size="xxlarge" middle />
      ) : (
        <MutatedForm note={note} />
      )}
    </article>
  )
}

export default ({ match }) => {
  const id = match.params.id
  const query = client => client.find(doctype).where({ _id: id })
  const Component = queryConnect({
    notes: { query, as: 'notes' }
  })(withRouter(FormOrSpinner))
  return <Component />
}
