/* global cozy */

import 'styles'

import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import CozyClient, { CozyProvider } from 'cozy-client'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/react/I18n'
import { Document } from 'cozy-doctypes'

import IsPublic from 'components/IsPublic'
import { getDataset, getDataOrDefault, getToken } from 'lib/initFromDom'

const manifest = require('../../../manifest.webapp')

let appLocale
const locales = {
  en: {
    react: require('react-intl/locale-data/en'),
    atlaskit: require('@atlaskit/editor-core/dist/cjs/i18n/en').default
  },
  fr: {
    react: require('react-intl/locale-data/fr'),
    atlaskit: require('@atlaskit/editor-core/dist/cjs/i18n/fr').default
  }
}
addLocaleData(locales.en.react)
addLocaleData(locales.fr.react)

const renderApp = function(client, isPublic) {
  const App = require('components/app').default

  render(
    <I18n
      lang={appLocale}
      dictRequire={appLocale => require(`locales/${appLocale}`)}
    >
      <IntlProvider locale={appLocale} messages={locales[appLocale].atlaskit}>
        <CozyProvider client={client}>
          <IsPublic.Provider value={isPublic}>
            <App isPublic={isPublic} />
          </IsPublic.Provider>
        </CozyProvider>
      </IntlProvider>
    </I18n>,
    document.querySelector('[role=application]')
  )
}

// initial rendering of the application
document.addEventListener('DOMContentLoaded', () => {
  const data = getDataset()

  const appIcon = getDataOrDefault(
    data.cozyIconPath,
    require('../vendor/assets/icon.svg')
  )
  const appNamePrefix = getDataOrDefault(
    data.cozyAppNamePrefix || manifest.name_prefix,
    ''
  )
  const appName = getDataOrDefault(data.cozyAppName, manifest.name)
  const appSlug = getDataOrDefault(data.cozyAppSlug, manifest.slug)
  const appVersion = getDataOrDefault(data.cozyAppVersion, manifest.version)

  appLocale = getDataOrDefault(data.cozyLocale, 'en')

  const protocol = window.location ? window.location.protocol : 'https:'

  const { isPublic, token } = getToken(data)

  // initialize the client to interact with the cozy stack
  const client = new CozyClient({
    uri: `${protocol}//${data.cozyDomain}`,
    token: token,
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  })
  if (!Document.cozyClient) {
    Document.registerClient(client)
  }

  if (!isPublic) {
    // initialize the bar, common of all applications, it allows
    // platform features like apps navigation without doing anything
    cozy.bar.init({
      appName: appName,
      appNamePrefix: appNamePrefix,
      iconPath: appIcon,
      lang: appLocale,
      replaceTitleOnMobile: true,
      cozyClient: client,
      isPublic: isPublic
    })
  }

  renderApp(client, isPublic)
})
