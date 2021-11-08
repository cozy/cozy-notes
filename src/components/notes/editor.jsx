import React, { useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import { useClient } from 'cozy-client'
import { SharingBannerPlugin } from 'cozy-sharing'

import EditorView from 'components/notes/editor-view'
import EditorCorner from 'components/notes/EditorCorner'
import EditorLoading from 'components/notes/editor-loading'
import EditorLoadingError from 'components/notes/editor-loading-error'
import SavingIndicator from 'components/notes/saving-indicator'
import BackFromEditing from 'components/notes/back_from_editing'
import IsPublicContext from 'components/IsPublicContext'
import useNote from 'hooks/useNote'
import useServiceClient from 'hooks/useServiceClient'
import useCollabProvider from 'hooks/useCollabProvider'
import useTitleChanges from 'hooks/useTitleChanges'
import useForceSync from 'hooks/useForceSync'
import useReturnUrl from 'hooks/useReturnUrl'
import useUser from 'hooks/useUser'
import { usePreview } from 'hooks/usePreview'
import { useDebugValue } from 'lib/debug'

import useConfirmExit from 'cozy-ui/transpiled/react/hooks/useConfirmExit'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import HeaderMenu from 'components/header_menu'

export default function Editor(props) {
  // base parameters
  const cozyClient = useClient()
  const { noteId, readOnly } = props
  const { t } = useI18n()
  const bannerRef = useRef() // where to display banners

  // plugins and config
  const isPublic = useContext(IsPublicContext)
  const { userName, userId } = useUser({
    userName: props.userName,
    cozyClient
  })
  const serviceClient = useServiceClient({ userId, userName, cozyClient })
  const { loading, title, doc, setTitle } = useNote({
    serviceClient,
    noteId,
    readOnly
  })

  const returnUrl = useReturnUrl({
    returnUrl: props.returnUrl,
    cozyClient,
    doc
  })
  const collabProvider = useCollabProvider({
    noteId,
    serviceClient,
    doc
  })

  // callbacks
  const { onLocalTitleChange } = useTitleChanges({
    noteId,
    title,
    setTitle,
    serviceClient
  })
  const { forceSync, emergencySync } = useForceSync({
    doc,
    collabProvider
  })
  // when leaving the component or changing doc
  useEffect(() => forceSync, [noteId, doc, forceSync])
  // when quitting the webpage
  const activate = useCallback(() => collabProvider.isDirty(), [collabProvider])
  const { exitConfirmationModal, requestToLeave } = useConfirmExit({
    activate,
    onLeave: emergencySync,
    title: t('Notes.Editor.exit_confirmation_title'),
    message: t('Notes.Editor.exit_confirmation_message'),
    leaveLabel: t('Notes.Editor.exit_confirmation_leave'),
    cancelLabel: t('Notes.Editor.exit_confirmation_cancel')
  })

  const isPreview = usePreview(window.location.pathname)

  useDebugValue('client', cozyClient)
  useDebugValue('notes.service', serviceClient)
  useDebugValue('notes.collabProvider', collabProvider)
  useDebugValue('notes.channel', collabProvider && collabProvider.channel)
  useDebugValue('notes.noteId', noteId)
  useDebugValue('notes.doc', doc && { ...doc.doc, version: doc.version })
  useDebugValue('notes.file', doc && doc.file)
  useDebugValue('notes.returnUrl', returnUrl)

  // rendering
  if (loading) {
    return <EditorLoading />
  } else if (doc) {
    return (
      <>
        <EditorView
          bannerRef={bannerRef}
          readOnly={readOnly}
          onTitleChange={onLocalTitleChange}
          onTitleBlur={emergencySync}
          collabProvider={collabProvider}
          defaultTitle={t('Notes.Editor.title_placeholder')}
          defaultValue={{ ...doc.doc, version: doc.version }}
          title={title && title.length > 0 ? title : undefined}
          headerMenu={
            <HeaderMenu
              backFromEditing={
                <BackFromEditing
                  returnUrl={returnUrl}
                  file={doc.file}
                  requestToLeave={requestToLeave}
                />
              }
              editorCorner={
                <EditorCorner
                  doc={doc}
                  isPublic={isPublic}
                  isReadOnly={readOnly}
                  title={title}
                />
              }
              homeHref={
                collabProvider.serviceClient.cozyClient.getStackClient().uri
              }
              isPublic={isPublic}
              file={doc.file}
              client={collabProvider.serviceClient.cozyClient}
              primaryToolbarComponents={
                isPreview ? <SharingBannerPlugin /> : null
              }
            />
          }
        />
        <SavingIndicator
          collabProvider={collabProvider}
          bannerRef={bannerRef}
        />
        {exitConfirmationModal}
      </>
    )
  } else {
    return <EditorLoadingError returnUrl={returnUrl} />
  }
}

Editor.propTypes = {
  noteId: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  returnUrl: PropTypes.string
}
