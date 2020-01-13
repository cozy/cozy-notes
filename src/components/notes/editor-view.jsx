import React, { useCallback, useRef, useEffect } from 'react'

import { Editor, WithEditorActions } from '@atlaskit/editor-core'

import { MainTitle } from 'cozy-ui/react/Text'
import Textarea from 'cozy-ui/react/Textarea'
import { translate } from 'cozy-ui/react/I18n'
import useEventListener from 'cozy-ui/react/hooks/useEventListener'

import editorConfig from 'components/notes/editor_config'
import HeaderMenu from 'components/header_menu'
import styles from 'components/notes/editor-view.styl'

function updateTextareaHeight(target) {
  target.style.height = `${target.scrollHeight}px`
}

const nullCallback = () => {}

function EditorView(props) {
  const {
    defaultValue,
    onTitleChange,
    onTitleBlur,
    defaultTitle,
    title,
    collabProvider,
    leftComponent,
    rightComponent,
    onContentChange,
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

  useEventListener(titleEl.current, 'blur', onTitleBlur)

  return (
    <article className={styles['note-article']}>
      <style>#coz-bar {'{ display: none }'}</style>
      <HeaderMenu
        left={leftComponent}
        className="note-header-menu--editing"
        right={rightComponent}
      />
      <section className="note-editor-container">
        <Editor
          collabEdit={collabProvider}
          onChange={onContentChange || nullCallback}
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
