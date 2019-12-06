import React, { useCallback, useRef, useEffect } from 'react'

import { Editor, WithEditorActions } from '@atlaskit/editor-core'

import { MainTitle } from 'cozy-ui/react/Text'
import Textarea from 'cozy-ui/react/Textarea'

import editorConfig from './editor_config'
import BackFromEditing from './back_from_editing'
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
    title,
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

  return (
    <article className="note-article">
      <style>#coz-bar {'{ display: none }'}</style>
      <HeaderMenu
        left={<BackFromEditing />}
        className="note-header-menu--editing"
      />
      <section className="note-editor-container">
        <Editor
          collabEdit={collabProvider}
          onChange={onContentChange}
          defaultValue={defaultValue}
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
                    value={title}
                    onChange={onTitleEvent}
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
