import React, { useState, useEffect, useMemo } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, HashRouter, withRouter } from 'react-router-dom'
import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'
import Spinner from 'cozy-ui/react/Spinner'
import { Empty } from 'cozy-ui/transpiled/react'

import { List, Editor } from './notes'
import { getReturnUrl, getSharedDocument } from './../lib/utils.js'

const RoutedEditor = withRouter(props => {
  const returnUrl = getReturnUrl()

  return <Editor noteId={props.match.params.id} returnUrl={returnUrl} />
})

const PrivateContext = () => (
  <Switch>
    <Route path="/n/:id" component={RoutedEditor} />
    <Route path="/" component={List} />
  </Switch>
)

const Unshared = translate()(({ t }) => (
  <Empty
    icon={'warning-circle'}
    title={t(`Error.unshared_title`)}
    text={t(`Error.unshared_text`)}
  />
))

const PublicContext = withClient(({ client }) => {
  const [sharedDocumentId, setSharedDocumentId] = useState(null)
  const returnUrl = useMemo(() => getReturnUrl(), [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getSharedDocument(client)
        setSharedDocumentId(id)
      } catch {
        setSharedDocumentId(false)
      }
    }
    fetchData()
  }, [])
  if (sharedDocumentId) {
    return <Editor noteId={sharedDocumentId} returnUrl={returnUrl || false} />
  } else if (sharedDocumentId !== null) {
    return <Unshared />
  } else {
    return <Spinner size="xxlarge" middle />
  }
})

const App = ({ isPublic }) => (
  <HashRouter>
    <Layout monoColumn={true}>
      <Main>
        <Content className="app-content">
          {isPublic ? <PublicContext /> : <PrivateContext />}
        </Content>
      </Main>
      <IconSprite />
    </Layout>
  </HashRouter>
)

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
