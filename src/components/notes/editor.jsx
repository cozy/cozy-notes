import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext
} from 'react'

import { withClient } from 'cozy-client'

import EditorView from './editor-view'
import EditorLoading from './editor-loading'
import EditorLoadingError from './editor-loading-error'
import SharingWidget from './sharing'

import IsPublicContext from '../IsPublicContext'

import CollabProvider from '../../lib/collab/provider'
import ServiceClient from '../../lib/collab/stack-client'

import {
  getShortNameFromClient,
  getParentFolderLink,
  getAppFullName
} from '../../lib/utils.js'

import { translate } from 'cozy-ui/react/I18n'

function setPageTitle(appFullName, title) {
  document.title =
    title && title != '' ? `${appFullName} - ${title}` : appFullName
}

const Editor = translate()(
  withClient(function(props) {
    const { client, noteId, t } = props
    const userName = useMemo(
      () => props.userName || getShortNameFromClient(client),
      [props.userName]
    )
    const appFullName = useMemo(getAppFullName)
    const isPublic = useContext(IsPublicContext)

    // alias for later shortcuts
    const docId = noteId
    const userId = userName
    const cozyClient = client

    // state
    const [loading, setLoading] = useState(true)
    const [doc, setDoc] = useState(undefined)
    const [title, setTitle] = useState(undefined)

    // plugins and config
    const serviceClient = useMemo(
      () => {
        return new ServiceClient({ userId, userName, cozyClient })
      },
      [noteId]
    )
    const docVersion = doc && doc.version
    //console.log("docVersion", doc, doc && doc.version, docVersion)
    const collabProvider = useMemo(
      () => {
        //console.log("collab provider memo", docVersion)
        if (docVersion !== undefined) {
          //console.log('new collabProvider')
          const provider = new CollabProvider(
            { version: doc.version, docId },
            serviceClient
          )
          return {
            useNativePlugin: true,
            provider: Promise.resolve(provider),
            inviteToEditHandler: () => undefined,
            isInviteToEditButtonSelected: false,
            userId: serviceClient.getSessionId()
          }
        } else {
          return null
        }
      },
      [noteId, docVersion, userName, serviceClient]
    )
    //console.log("end collabProviderMemo", collabProvider)

    // fetch the actual note on load
    useEffect(
      () => {
        const fn = async function() {
          try {
            if (!loading) {
              setLoading(true)
            }
            const doc = await serviceClient.getDoc(noteId)
            setTitle(doc.title || '')
            setDoc(doc)
          } catch (e) {
            setTitle(false)
            setDoc(false)
          }
          setLoading(false)
        }
        fn()
      },
      [noteId]
    )

    // callbacks
    const onContentChange = useCallback(() => null, [noteId])
    const onLocalTitleChange = useCallback(
      e => {
        const newTitle = e.target.value
        const modifiedTitle = newTitle
        if (title != modifiedTitle) {
          setTitle(modifiedTitle)
          serviceClient.setTitle(noteId, modifiedTitle)
        }
      },
      [noteId, setTitle, serviceClient]
    )
    const onRemoteTitleChange = useCallback(
      modifiedTitle => {
        if (title != modifiedTitle) {
          setTitle(modifiedTitle)
        }
      },
      [noteId, setTitle]
    )
    useMemo(
      () => {
        serviceClient.onTitleUpdated(noteId, onRemoteTitleChange)
      },
      [onRemoteTitleChange, serviceClient]
    )

    useEffect(
      () => {
        setPageTitle(appFullName, title)
      },
      [title]
    )

    const returnUrl = useMemo(
      () => {
        if (props.returnUrl !== undefined) {
          return props.returnUrl
        } else if (doc) {
          return getParentFolderLink(client, doc.file)
        } else if (!isPublic) {
          return '/'
        } else {
          return undefined
        }
      },
      [props.returnUrl, doc]
    )

    // Failure in loading the note ?
    useEffect(
      () => {
        if (!loading && !doc) {
          // eslint-disable-next-line no-console
          console.warn(`Could not load note ${noteId}`)
        }
      },
      [loading, doc]
    )

    // rendering
    if (loading) {
      return <EditorLoading />
    } else if (doc) {
      return (
        <EditorView
          onTitleChange={onLocalTitleChange}
          onContentChange={onContentChange}
          collabProvider={collabProvider}
          defaultTitle={t('Notes.Editor.title_placeholder')}
          defaultValue={{ ...doc.doc, version: doc.version }}
          title={title && title.length > 0 ? title : undefined}
          returnUrl={returnUrl}
          actions={!isPublic && <SharingWidget file={doc.file} />}
        />
      )
    } else {
      return <EditorLoadingError returnUrl={returnUrl} />
    }
  })
)

export default Editor
