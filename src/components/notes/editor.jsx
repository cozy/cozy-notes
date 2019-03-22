import React, { useState, useCallback, useRef, useEffect } from 'react'

import { Editor } from '@atlaskit/editor-core';
import { createTheme } from '@atlaskit/theme';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';

import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import debounce from 'lodash.debounce'

import Spinner from 'cozy-ui/react/Spinner'
import Input from 'cozy-ui/react/Input'
import Button from 'cozy-ui/react/Button'

import { queryConnect, withMutations } from 'cozy-client'

import doctype from './doctype'
import { defaultTitle } from './utils'

import HeaderMenu from '../header_menu.jsx'


const debounced = debounce(
  (saveDocument, document) => {
    return saveDocument(document)
  },
  5000,
  { leading: true, trailing: true }
)

const jsonTransformer = new JSONTransformer()

const Form = (props) => {
  const [note, setNote] = useState({ title: props.note.title, content: props.note.content })

  const serverNote = useRef(props.note)

  const save = (note) => {
    const doc = { ...serverNote.current, ...note }
    return debounced(props.saveDocument, doc)
  }

  useEffect( () => {
    serverNote.current = props.note
  }, [props.note._rev])

  useEffect( () => {
    serverNote.current = props.note
  }, [note.title, note.content])

  const onTitleChange = (e) => {
    const newTitle = e.target.value
    const title = (newTitle && (newTitle.trim().length > 0)) ? newTitle : null
    if (title != note.title) {
      const newNote = { ...note, title }
      setNote(newNote)
      save(newNote)
    }
  }

  const onContentChange = (editorView) => {
    console.log(editorView)
    const content = JSON.stringify(
      jsonTransformer.encode(editorView.state.doc),
      null,
      2,
    )
    if (content != note.content) {
      const newNote = { ...note, content }
      setNote(newNote)
      save(newNote)
    }
  }

  const title = note.title || ""

  return <React.Fragment>
    <Input fullwidth={true} defaultValue={title} onChange={onTitleChange} placeholder={defaultTitle(props.note)} style={{border: 'none', fontWeight: 'bold', fontSize:"1.5rem", marginBottom: "-1rem"}} />
    <div style={{position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow:'1'}}>
      <Editor allowLists={true} defaultValue={props.note.content} onChange={onContentChange} allowTables={true} allowRule={true} appearance="full-page" placeholder="Que voulez-vous dire ?" shouldFocus={true} />
    </div>
  </React.Fragment>
}


const MutatedForm = withMutations()(Form)


const FormOrSpinner = (props) => {
  const { notes: { data, fetchStatus } } = props
  const note = (data && data[0])
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'pending'

  if (!isLoading && !note) {
    console.log("note unknown")
    window.setTimeout( () => props.history.push(`/`), 0)
  }

  const showSpinner = isLoading || !note

  const left = <Button
    icon="back"
    tag={Link}
    to='/'
    className="sto-app-back"
    label='Retour à la liste'
    subtle
  />

  return <article style={{display:'flex', flexDirection:'column', height: '100%'}}>
    <HeaderMenu left={left} />
    {showSpinner ? <Spinner size="xxlarge" middle /> : <MutatedForm note={note} />}
  </article>
}

export default ({match}) => {
  const id = match.params.id
  const query = client => client.find(doctype).where( { _id: id } )
  const Component = queryConnect({
    notes: { query, as: 'notes' }
  })(withRouter(FormOrSpinner))
  return <Component />
}
