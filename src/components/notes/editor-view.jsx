import React, { useCallback, useRef, useEffect } from 'react'

import { Editor, WithEditorActions } from '@atlaskit/editor-core'

import { MainTitle } from 'cozy-ui/react/Text'
import Textarea from 'cozy-ui/react/Textarea'

import editorConfig from 'components/notes/editor_config'
import BackFromEditing from 'components/notes/back_from_editing'
import HeaderMenu from 'components/header_menu'
import { translate } from 'cozy-ui/react/I18n'
import styles from 'components/notes/editor-view.styl'
function updateTextareaHeight(target) {
  target.style.height = `${target.scrollHeight}px`
}

function EditorView(props) {
  const {
    defaultValue,
    onTitleChange,
    onContentChange,
    defaultTitle,
    title,
    collabProvider,
    returnUrl,
    t
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
    <article className={styles['note-article']}>
      <style>#coz-bar {'{ display: none }'}</style>
      <HeaderMenu
        left={<BackFromEditing returnUrl={returnUrl} />}
        className="note-header-menu--editing"
        right={props.actions}
      />
      <section className="note-editor-container">
        <Editor
          collabEdit={collabProvider}
          onChange={onContentChange}
          defaultValue={defaultValue}
          {...editorConfig}
          appearance="full-page"
          placeholder={t('Notes.EditorView.main_placeholder')}
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

export default translate()(EditorView)
