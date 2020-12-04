/* global cozy */
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-sharing/dist/stylesheet.css'
import 'styles/index.css'

import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import memoize from 'lodash/memoize'

import CozyClient, { CozyProvider } from 'cozy-client'
import { RealtimePlugin } from 'cozy-realtime'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { Document } from 'cozy-doctypes'
import SharingProvider from 'cozy-sharing'

import IsPublicContext from 'components/IsPublicContext'
import {
  getDataset,
  getDataOrDefault,
  getPublicSharecode
} from 'lib/initFromDom'

const manifest = require('../../../manifest.webapp')

const frenchAtlaskit = require('@atlaskit/editor-core/dist/cjs/i18n/fr').default
const frenchAtlaskitCozy = require(`locales/atlassian_missing_french.json`)

const locales = {
  en: {
    react: require('react-intl/locale-data/en'),
    atlaskit: require('@atlaskit/editor-core/dist/cjs/i18n/en').default
  },
  fr: {
    react: require('react-intl/locale-data/fr'),
    atlaskit: { ...frenchAtlaskit, ...frenchAtlaskitCozy }
  }
}

const renderApp = function(appLocale, client, isPublic) {
  const App = require('components/app').default

  render(
    <I18n
      lang={appLocale}
      dictRequire={appLocale => require(`locales/${appLocale}`)}
    >
      <IntlProvider locale={appLocale} messages={locales[appLocale].atlaskit}>
        <CozyProvider client={client}>
          <MuiCozyTheme>
            <IsPublicContext.Provider value={isPublic}>
              {!isPublic && (
                <SharingProvider doctype="io.cozy.files" documentType="Notes">
                  <App isPublic={isPublic} />
                </SharingProvider>
              )}
              {isPublic && <App isPublic={isPublic} />}
            </IsPublicContext.Provider>
          </MuiCozyTheme>
        </CozyProvider>
      </IntlProvider>
    </I18n>,
    document.querySelector('[role=application]')
  )
}

// initial rendering of the application
export const initApp = () => {
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

  const supportedLocales = ['en', 'fr']

  addLocaleData(locales.en.react)
  addLocaleData(locales.fr.react)

  const userLocale = getDataOrDefault(data.cozyLocale, 'en')
  const appLocale = supportedLocales.includes(userLocale) ? userLocale : 'en'

  const protocol = window.location ? window.location.protocol : 'https:'

  const shareCode = getPublicSharecode()
  const token = shareCode || data.cozyToken
  const isPublic = shareCode || !token || token == ''

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
  client.registerPlugin(RealtimePlugin)

  if (!isPublic) {
    // initialize the bar, common of all applications, it allows
    // platform features like apps navigation without doing anything

    // necessary to initialize the bar with the correct React instance
    window.React = React
    window.ReactDOM = ReactDOM
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
  return { appLocale, client, isPublic }
}

const memoizedInit = memoize(initApp)
const init = () => {
  const { appLocale, client, isPublic } = memoizedInit()
  renderApp(appLocale, client, isPublic)
}
document.addEventListener('DOMContentLoaded', init)

if (module.hot) {
  memoizedInit()
  module.hot.accept()
}
