import React, { useEffect, useMemo, useState } from 'react'
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'
import * as Sentry from '@sentry/react'

import CozyDevTools from 'cozy-client/dist/devtools'
import flag from 'cozy-flags'
import { BarProvider, BarComponent, BarCenter } from 'cozy-bar'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import BarTitle from 'cozy-ui/transpiled/react/BarTitle'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import useBreakpoints, {
  BreakpointsProvider
} from 'cozy-ui/transpiled/react/providers/Breakpoints'
import useClientErrors from 'cozy-client/dist/hooks/useClientErrors'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { ShareModal } from 'cozy-sharing'
import { RealTimeQueries, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'

const manifest = require('../../manifest.webapp')
import { AppRoutes } from 'constants/routes'
import { List, Editor, Unshared } from 'components/notes'
import { fetchIfIsNoteReadOnly } from 'lib/utils'
import { getDataOrDefault } from 'lib/initFromDom'
import { getReturnUrl, getSharedDocument } from 'lib/utils'
import RouteNew from 'components/notes/new-route'
import { NoteProvider } from 'components/notes/NoteProvider'

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

const RoutedEditor = () => {
  const { id } = useParams()
  const returnUrl = getReturnUrl()

  return (
    <NoteProvider noteId={id}>
      <Editor noteId={id} returnUrl={returnUrl} readOnly={false} />
    </NoteProvider>
  )
}

const PrivateContext = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  const ModalElement = () => (
    <ShareModal onClose={() => navigate(-1)} {...state.shareModalProps} />
  )

  return (
    <>
      <SentryRoutes location={state?.backgroundLocation || location}>
        <Route path={AppRoutes.New} element={<RouteNew />} />
        <Route path={AppRoutes.Root} element={<List />} />
        <Route path={AppRoutes.Editor} element={<RoutedEditor />} />
      </SentryRoutes>

      {state?.backgroundLocation && state?.shareModalProps && (
        <SentryRoutes>
          <Route path={AppRoutes.ShareFromEditor} element={<ModalElement />} />

          <Route path={AppRoutes.ShareFromList} element={<ModalElement />} />
        </SentryRoutes>
      )}
    </>
  )
}

const PublicContext = () => {
  const client = useClient()
  const [sharedDocumentId, setSharedDocumentId] = useState(null)
  const [readOnly, setReadOnly] = useState(false)
  const returnUrl = useMemo(() => getReturnUrl(), [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search)
        if (searchParams.has('id')) {
          // public route = /public/?sharecode=xxxx&id=xxxxx
          // The id of the note is necessary because the sharecode
          // may be about a folder and not a specific note.
          const id = searchParams.get('id')
          const readOnly = await fetchIfIsNoteReadOnly(client, id)
          setReadOnly(readOnly)
          setSharedDocumentId(id)
        } else {
          // public route = /public/?sharecode=xxxxx
          // There is no id. It should be a sharecode
          // dedicated to a unique note. We look into
          // permissions and try to open the first file.
          const { id, readOnly } = await getSharedDocument(client)
          setReadOnly(readOnly)
          setSharedDocumentId(id)
        }
      } catch {
        setSharedDocumentId(false)
      }
    }
    fetchData()
  }, [client])
  if (sharedDocumentId) {
    return (
      <NoteProvider noteId={sharedDocumentId}>
        <Editor
          readOnly={readOnly}
          noteId={sharedDocumentId}
          returnUrl={returnUrl}
        />
      </NoteProvider>
    )
  } else if (sharedDocumentId !== null) {
    return <Unshared />
  } else {
    return <Spinner size="xxlarge" middle />
  }
}

const App = ({ isPublic }) => {
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { ClientErrors } = useClientErrors()
  const { t } = useI18n()

  const appName = isMobile
    ? getDataOrDefault(client.getInstanceOptions().app.name, manifest.name)
    : ''

  return (
    <>
      <HashRouter>
        <Layout monoColumn={true}>
          <BarComponent />
          {!isPublic && isMobile && (
            <BarCenter>
              <BarTitle>{appName}</BarTitle>
            </BarCenter>
          )}

          <Main>
            <Content>
              <AlertProvider>
                {isPublic ? <PublicContext /> : <PrivateContext />}
              </AlertProvider>
              <RealTimeQueries doctype="io.cozy.settings" />
            </Content>
          </Main>
          <IconSprite />
          <Alerter t={t} />
          {flag('debug') && <CozyDevTools />}
        </Layout>
      </HashRouter>
      <ClientErrors />
    </>
  )
}

const WrappedApp = props => (
  <BarProvider>
    <BreakpointsProvider>
      <App {...props} />
    </BreakpointsProvider>
  </BarProvider>
)

export default WrappedApp
