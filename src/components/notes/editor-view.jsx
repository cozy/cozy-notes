import React, { useCallback, useRef, useEffect } from 'react'

import { Editor, WithEditorActions } from '@atlaskit/editor-core'

import { Link } from 'react-router-dom'

import Button from 'cozy-ui/react/Button'
import { MainTitle } from 'cozy-ui/react/Text'
import Textarea from 'cozy-ui/react/Textarea'

import editorConfig from './editor_config'

import HeaderMenu from '../header_menu'

function updateTextareaHeight(target) {
  target.style.height = 'inherit'
  target.style.height = `${target.scrollHeight}px`
}

export default function EditorView(props) {
  const {
    defaultValue,
    onTitleChange,
    onContentChange,
    defaultTitle,
    collabProvider
  } = props

  const titleEl = useRef(null)

  const onTitleEvent = useCallback(
    e => {
      const target = e.target
      updateTextareaHeight(target)
      if (onTitleChange) onTitleChange(e)
    },
    [onTitleChange]
  )

  useEffect(() => updateTextareaHeight(titleEl.current), [])

  const left = (
    <React.Fragment>
      <Button
        icon="previous"
        tag={Link}
        to="/"
        className="sto-app-back"
        subtle
      />
    </React.Fragment>
  )

  return (
    <article className="note-article">
      <style>#coz-bar {'{ display: none }'}</style>
      <HeaderMenu left={left} className="note-header-menu--editing" />
      <section className="note-editor-container">
        <Editor
          collabEdit={collabProvider}
          onChange={onContentChange}
          defaultValue={defaultValue.content}
          {...editorConfig}
          appearance="full-page"
          placeholder="Que voulez-vous dire ?"
          shouldFocus={true}
          contentComponents={
            <WithEditorActions
              render={() => (
                <MainTitle tag="h1" className="note-title">
                  <Textarea
                    ref={titleEl}
                    rows="1"
                    fullwidth={true}
                    defaultValue={defaultValue.title}
                    onChange={onTitleEvent}
                    readOnly={!onTitleChange}
                    placeholder={defaultTitle}
                    className="note-title-input"
                  />
                </MainTitle>
              )}
            />
          }
        />
      </section>
    </article>
  )
}
