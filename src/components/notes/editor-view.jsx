import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react'

import { Editor, WithEditorActions } from '@atlaskit/editor-core'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'
import Overlay from 'cozy-ui/transpiled/react/deprecated/Overlay'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import TextField from 'cozy-ui/transpiled/react/TextField'

import { imageUploadProvider } from 'lib/image-upload-provider'
import editorConfig from 'components/notes/editor_config'

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
    onContentChange,
    readOnly,
    bannerRef,
    headerMenu,
    isIntent,
    children
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

  const [isUploading, setUploading] = useState(false)

  return (
    <article
      className={`${styles['note-article']}${
        isIntent ? ' ' + styles['note-article--intents'] : ''
      }`}
    >
      {isUploading && (
        <Overlay>
          <Spinner size="xxlarge" middle />
        </Overlay>
      )}
      <style>#coz-bar {'{ display: none }'}</style>
      {headerMenu}
      <section className="note-editor-container">
        <Editor
          {...editorConfig}
          disabled={collabProvider ? false : readOnly}
          collabEdit={collabEdit}
          onChange={onContentChange || nullCallback}
          defaultValue={defaultValue}
          appearance="full-page"
          placeholder={t('Notes.EditorView.main_placeholder')}
          shouldFocus={!readOnly}
          legacyImageUploadProvider={imageUploadProvider({
            collabProvider,
            t,
            setUploading
          })}
          contentComponents={
            <WithEditorActions
              render={actions => (
                <>
                  <aside ref={bannerRef} className={styles.banner}></aside>
                  <TextField
                    ref={titleEl}
                    className={styles.title}
                    multiline
                    minRows={1}
                    value={title}
                    placeholder={defaultTitle}
                    fullWidth={true}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                      className: styles.titleInput,
                      readOnly: !!readOnly
                    }}
                    onChange={readOnly ? nullCallback : onTitleEvent}
                  />
                  {React.Children.map(children, child =>
                    React.isValidElement(child)
                      ? React.cloneElement(child, { actions })
                      : null
                  )}
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
