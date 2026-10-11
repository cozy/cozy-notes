import { Editor, WithEditorActions } from '@atlaskit/editor-core'
import styles from 'components/notes/editor-view.styl'
import editorConfig from 'components/notes/editor_config'
import { imageUploadProvider } from 'lib/image-upload-provider'
import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react'
import { useI18n } from 'twake-i18n'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import TextField from 'cozy-ui/transpiled/react/TextField'
import Overlay from 'cozy-ui/transpiled/react/deprecated/Overlay'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'

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
  useMemo(
    () => collabProvider && collabProvider.setReadOnly(!!readOnly),
    [readOnly, collabProvider]
  )

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
  const isDisabled = readOnly ? true : collabProvider ? false : readOnly
  const editorContainerRef = useRef(null)

  // Handle link clicks when editor is disabled
  useEffect(() => {
    const container = editorContainerRef.current
    if (!container) return
    if (!isDisabled) return
    const handleLinkClick = e => {
      // Find the closest link element
      const linkElement = e.target.closest('a[href]')
      if (linkElement && linkElement.href) {
        e.preventDefault()
        e.stopPropagation()
        // Open link in new tab
        window.open(linkElement.href, '_blank', 'noopener,noreferrer')
      }
    }

    // Use capture phase to intercept clicks before editor handles them
    container.addEventListener('click', handleLinkClick, true)

    return () => {
      container.removeEventListener('click', handleLinkClick, true)
    }
  }, [isDisabled])

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
      <style>#cozy-bar {'{ display: none }'}</style>
      {headerMenu}
      <section
        className={`note-editor-container${
          readOnly ? ' note-editor-container--readonly' : ''
        }`}
        ref={editorContainerRef}
      >
        <Editor
          {...editorConfig}
          disabled={isDisabled}
          collabEdit={collabEdit}
          onChange={onContentChange || nullCallback}
          defaultValue={defaultValue}
          appearance="full-page"
          placeholder={
            readOnly ? undefined : t('Notes.EditorView.main_placeholder')
          }
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
