import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-sharing/dist/stylesheet.css'
import 'styles/index.css'

import React from 'react'
import { render } from 'react-dom'

import IsPublicContext from 'components/IsPublicContext'
import { AppProviders } from 'components/AppProviders'
import { initApp } from 'lib/initApp'

const renderApp = function(appLocale, client) {
  const App = require('components/app').default
  const isPublic = true

  render(
    <AppProviders appLocale={appLocale} client={client}>
      <IsPublicContext.Provider value={isPublic}>
        <App isPublic={isPublic} />
      </IsPublicContext.Provider>
    </AppProviders>,
    document.querySelector('[role=application]')
  )
}

const init = () => {
  const { appLocale, client } = initApp({ isPublic: true })
  renderApp(appLocale, client)
}
document.addEventListener('DOMContentLoaded', init)

if (module.hot) {
  initApp({ isPublic: true })
  module.hot.accept()
}
