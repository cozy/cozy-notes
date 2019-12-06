import React, { useState, useEffect } from 'react'
import get from 'lodash/get'
import { hot } from 'react-hot-loader'
import { Route, Switch, HashRouter, withRouter } from 'react-router-dom'
import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'
import Spinner from 'cozy-ui/react/Spinner'
import { Empty } from 'cozy-ui/transpiled/react'

import { List, Editor } from './notes'

const getSharedDocument = async client => {
  const { data: permissionsData } = await client
    .collection('io.cozy.permissions')
    .getOwnPermissions()

  const permissions = permissionsData.attributes.permissions
  // permissions contains several named keys, but the one to use depends on the situation. Using the first one is what we want in all known cases.
  const sharedDocumentId = get(Object.values(permissions), '0.values.0')

  return sharedDocumentId
}

const RoutedEditor = withRouter(props => (
  <Editor noteId={props.match.params.id} />
))

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
  useEffect(
    () =>
      getSharedDocument(client)
        .then(id => setSharedDocumentId(id))
        .catch(() => setSharedDocumentId(false)),
    []
  )
  if (sharedDocumentId) {
    return <Editor noteId={sharedDocumentId} />
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
