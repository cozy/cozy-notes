import React, { useCallback, useRef, useEffect, useMemo } from 'react'

import { Editor, WithEditorActions } from '@atlaskit/editor-core'

import { MainTitle } from 'cozy-ui/transpiled/react/Text'
import Textarea from 'cozy-ui/transpiled/react/Textarea'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'

import editorConfig from 'components/notes/editor_config'
import HeaderMenu from 'components/header_menu'
import styles from 'components/notes/editor-view.styl'

function updateTextareaHeight(target) {
  if (target) target.style.height = `${target.scrollHeight}px`
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
    readOnly,
    bannerRef
  } = props
  const { t } = useI18n()

  const titleEl = useRef(null)

  const onTitleEvent = useCallback(
    e => {
      if (onTitleChange) onTitleChange(e)
    },
    [onTitleChange]
  )

  // put the provider in readonly mode if requested and react to changes of values
  useMemo(() => collabProvider && collabProvider.setReadOnly(!!readOnly), [
    readOnly,
    collabProvider
  ])

  const collabEdit = useMemo(
    () =>
      collabProvider && {
        useNativePlugin: true,
        provider: Promise.resolve(collabProvider),
        inviteToEditHandler: () => undefined,
        isInviteToEditButtonSelected: false,
        userId: collabProvider.serviceClient.getSessionId()
      },
    [collabProvider]
  )

  useEffect(() => updateTextareaHeight(titleEl.current), [title])

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
          disabled={collabProvider ? false : readOnly}
          collabEdit={collabEdit}
          onChange={onContentChange || nullCallback}
          defaultValue={defaultValue}
          {...editorConfig}
          appearance="full-page"
          placeholder={t('Notes.EditorView.main_placeholder')}
          shouldFocus={!readOnly}
          contentComponents={
            <WithEditorActions
              render={() => (
                <>
                  <aside ref={bannerRef} className={styles.banner}></aside>
                  <MainTitle tag="h1" className={styles.title}>
                    <Textarea
                      ref={titleEl}
                      rows="1"
                      readOnly={!!readOnly}
                      fullwidth={true}
                      value={title}
                      onChange={readOnly ? nullCallback : onTitleEvent}
                      placeholder={defaultTitle}
                      className={styles.titleInput}
                    />
                  </MainTitle>
                </>
              )}
            />
          }
        />
      </section>
    </article>
  )
}

export default EditorView
