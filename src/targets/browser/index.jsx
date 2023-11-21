import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-sharing/dist/stylesheet.css'
import 'styles/index.css'

import React from 'react'
import { render } from 'react-dom'
import SharingProvider from 'cozy-sharing'

import IsPublicContext from 'components/IsPublicContext'
import { AppProviders } from 'components/AppProviders'
import { SHARING_LOCATION } from '../../constants/strings'
import { initApp } from 'lib/initApp'

const renderApp = function(appLocale, client) {
  const App = require('components/App').default

  render(
    <AppProviders appLocale={appLocale} client={client}>
      <IsPublicContext.Provider value={false}>
        <SharingProvider
          doctype="io.cozy.files"
          documentType="Notes"
          previewPath={SHARING_LOCATION}
        >
          <App isPublic={false} />
        </SharingProvider>
      </IsPublicContext.Provider>
    </AppProviders>,
    document.querySelector('[role=application]')
  )
}

const init = () => {
  const { appLocale, client } = initApp()
  renderApp(appLocale, client)
}
document.addEventListener('DOMContentLoaded', init)

if (module.hot) {
  initApp()
  module.hot.accept()
}
