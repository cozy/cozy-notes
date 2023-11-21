import React from 'react'
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'

import BarTitle from 'cozy-ui/transpiled/react/BarTitle'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { ShareModal } from 'cozy-sharing'
import { useClient } from 'cozy-client'

import { AppRoutes } from 'constants/routes'
import { List, Editor } from 'components/notes'
import { getReturnUrl } from 'lib/utils'
import { getDataOrDefault } from 'lib/initFromDom'
import RouteNew from 'components/notes/new-route'
import { AppLayout } from 'components/AppLayout'

const manifest = require('../../manifest.webapp')

const RoutedEditor = () => {
  const { id } = useParams()
  const returnUrl = getReturnUrl()

  return <Editor noteId={id} returnUrl={returnUrl} readOnly={false} />
}

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()
  const client = useClient()

  const appName = isMobile
    ? getDataOrDefault(client.getInstanceOptions().app.name, manifest.name)
    : ''
  const { BarCenter } = cozy.bar
  const state = location.state

  const ModalElement = () => (
    <ShareModal onClose={() => navigate(-1)} {...state.shareModalProps} />
  )

  return (
    <>
      {isMobile && (
        <BarCenter>
          <MuiCozyTheme>
            <BarTitle>{appName}</BarTitle>
          </MuiCozyTheme>
        </BarCenter>
      )}
      <Routes location={state?.backgroundLocation || location}>
        <Route path={AppRoutes.New} element={<RouteNew />} />
        <Route path={AppRoutes.Root} element={<List />} />
        <Route path={AppRoutes.Editor} element={<RoutedEditor />} />
      </Routes>

      {state?.backgroundLocation && state?.shareModalProps && (
        <Routes>
          <Route path={AppRoutes.ShareFromEditor} element={<ModalElement />} />
          <Route path={AppRoutes.ShareFromList} element={<ModalElement />} />
        </Routes>
      )}
    </>
  )
}

const AppWrapper = () => {
  return (
    <AppLayout>
      <App />
    </AppLayout>
  )
}

export default AppWrapper
