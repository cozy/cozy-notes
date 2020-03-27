/* global cozy */
import React, { useState, useEffect, useMemo } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, HashRouter, withRouter } from 'react-router-dom'
import { withClient } from 'cozy-client'

import { Alerter, withBreakpoints } from 'cozy-ui/react'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'
import Spinner from 'cozy-ui/react/Spinner'
import AppTitle from 'cozy-ui/react/AppTitle'
import { BreakpointsProvider } from 'cozy-ui/react/hooks/useBreakpoints'

const manifest = require('../../manifest.webapp')
import { List, Editor, Unshared, New } from 'components/notes'
import { getReturnUrl, getSharedDocument } from 'lib/utils'
import { useFlagSwitcher } from 'lib/debug'

import { getDataOrDefault } from 'lib/initFromDom'
import { fetchIfIsNoteReadOnly } from '../lib/utils'

const RoutedEditor = withRouter(props => {
  const returnUrl = getReturnUrl()

  return <Editor noteId={props.match.params.id} returnUrl={returnUrl} />
})

const PrivateContext = () => (
  <Switch>
    <Route path="/n/new" component={New} />
    <Route path="/n/:id" component={RoutedEditor} />
    <Route path="/" component={List} />
  </Switch>
)

const PublicContext = withClient(({ client }) => {
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
      <Editor
        readOnly={readOnly}
        noteId={sharedDocumentId}
        returnUrl={returnUrl || false}
      />
    )
  } else if (sharedDocumentId !== null) {
    return <Unshared />
  } else {
    return <Spinner size="xxlarge" middle />
  }
})

const App = ({ isPublic, breakpoints: { isMobile }, client }) => {
  let appName = ''
  if (isMobile) {
    const data = client.getInstanceOptions()
    appName = getDataOrDefault(data.cozyAppName, manifest.name)
  }
  const { BarCenter } = cozy.bar
  const FlagSwitcher = useFlagSwitcher()
  return (
    <BreakpointsProvider>
      <HashRouter>
        <Layout monoColumn={true}>
          {!isPublic && isMobile && (
            <BarCenter>
              <AppTitle>{appName}</AppTitle>
            </BarCenter>
          )}
          <Main>
            <Content>
              {isPublic ? <PublicContext /> : <PrivateContext />}
            </Content>
          </Main>
          <IconSprite />
          <Alerter />
          <FlagSwitcher />
        </Layout>
      </HashRouter>
    </BreakpointsProvider>
  )
}

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(withBreakpoints()(withClient(App)))
