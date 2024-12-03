import IsPublicContext from 'components/IsPublicContext'
import HeaderMenu from 'components/header_menu'
import EditorCorner from 'components/notes/EditorCorner'
import { useNoteContext } from 'components/notes/NoteProvider'
import { TrashedBanner } from 'components/notes/TrashedBanner/TrashedBanner'
import BackFromEditing from 'components/notes/back_from_editing'
import EditorLoading from 'components/notes/editor-loading'
import EditorLoadingError from 'components/notes/editor-loading-error'
import EditorView from 'components/notes/editor-view'
import SavingIndicator from 'components/notes/saving-indicator'
import useCollabProvider from 'hooks/useCollabProvider'
import { useFixedToBottomOnIOS } from 'hooks/useFixedToBottomOnIos'
import useForceSync from 'hooks/useForceSync'
import { usePreview } from 'hooks/usePreview'
import useReturnUrl from 'hooks/useReturnUrl'
import useTitleChanges from 'hooks/useTitleChanges'
import { useDebugValue } from 'lib/debug'
import { buildFileByIdQuery } from 'lib/queries'
import PropTypes from 'prop-types'
import React, { useEffect, useContext, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useWindowEventListener } from 'rooks/dist/esm/hooks/useWindowEventListener'

import { RealTimeQueries, useClient, useQuery } from 'cozy-client'
import { SharingBannerPlugin } from 'cozy-sharing'
import useConfirmExit from 'cozy-ui/transpiled/react/hooks/useConfirmExit'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { SHARING_LOCATION } from '../../constants/strings'

export default function Editor(props) {
  // base parameters
  const cozyClient = useClient()
  const { noteId, readOnly } = props
  const { t } = useI18n()
  const bannerRef = useRef()
  const location = useLocation()
  const fileQuery = buildFileByIdQuery(noteId)
  const fileResult = useQuery(fileQuery.definition, fileQuery.options)
  // On iOS, the toolbar is fixed to the bottom of the screen manually
  // This is to avoid an issue with the keyboard that hides the toolbar
  useFixedToBottomOnIOS()

  // plugins and config
  const isPublic = useContext(IsPublicContext)
  const { doc, serviceClient, status, title, setTitle } = useNoteContext()

  const returnUrl = useReturnUrl({
    returnUrl: props.returnUrl || location?.state?.returnUrl,
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

  // when leaving the component
  useWindowEventListener('beforeunload', () => {
    forceSync()
  })

  // when changing doc
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

  const file = fileResult?.data
  const isTrashed = file?.trashed ?? false
  const isReadOnly = readOnly || isTrashed

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
  if (doc && file) {
    return (
      <>
        <RealTimeQueries doctype="io.cozy.files" />
        <EditorView
          bannerRef={bannerRef}
          readOnly={isReadOnly}
          onTitleChange={onLocalTitleChange}
          onTitleBlur={emergencySync}
          collabProvider={collabProvider}
          defaultTitle={t('Notes.Editor.title_placeholder')}
          defaultValue={{ ...doc.doc, version: doc.version }}
          title={title && title.length > 0 ? title : undefined}
          headerMenu={
            <HeaderMenu
              leftComponent={
                <div className="u-mr-1">
                  <BackFromEditing
                    returnUrl={returnUrl}
                    file={file}
                    requestToLeave={requestToLeave}
                  />
                </div>
              }
              rightComponent={
                <EditorCorner
                  file={file}
                  isPublic={isPublic}
                  isReadOnly={isReadOnly}
                  title={title}
                />
              }
              bannerComponent={
                isTrashed ? (
                  <TrashedBanner
                    noteId={noteId}
                    isPublic={isPublic}
                    returnUrl={returnUrl}
                  />
                ) : isPreview ? (
                  <SharingBannerPlugin previewPath={SHARING_LOCATION} />
                ) : null
              }
              homeHref={
                collabProvider.serviceClient.cozyClient.getStackClient().uri
              }
              isPublic={isPublic}
              file={file}
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
  }

  if (status === 'failed' || fileResult.fetchStatus === 'failed') {
    return <EditorLoadingError returnUrl={returnUrl} />
  }

  return <EditorLoading />
}

Editor.propTypes = {
  noteId: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  returnUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
}
