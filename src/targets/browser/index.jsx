import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-sharing/dist/stylesheet.css'
import 'styles/index.css'

import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import memoize from 'lodash/memoize'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import { fr, en } from '@atlaskit/editor-core/i18n'

import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import CozyClient, { CozyProvider } from 'cozy-client'
import { RealtimePlugin } from 'cozy-realtime'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { Document } from 'cozy-doctypes'
import SharingProvider from 'cozy-sharing'
import { WebviewIntentProvider } from 'cozy-intent'

import IsPublicContext from 'components/IsPublicContext'
import {
  getDataset,
  getDataOrDefault,
  getPublicSharecode
} from 'lib/initFromDom'

import flag from 'cozy-flags'

const manifest = require('../../../manifest.webapp')

const frenchAtlaskitCozy = require(`locales/atlassian_missing_french.json`)

const locales = {
  en: {
    react: require('react-intl/locale-data/en'),
    atlaskit: en
  },
  fr: {
    react: require('react-intl/locale-data/fr'),
    atlaskit: { ...fr, ...frenchAtlaskitCozy }
  }
}

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const renderApp = function(appLocale, client, isPublic) {
  const App = require('components/app').default

  render(
    <WebviewIntentProvider>
      <I18n
        lang={appLocale}
        dictRequire={appLocale => require(`locales/${appLocale}`)}
      >
        <StylesProvider generateClassName={generateClassName}>
          <IntlProvider
            locale={appLocale}
            messages={locales[appLocale].atlaskit}
          >
            <CozyProvider client={client}>
              <MuiCozyTheme>
                <IsPublicContext.Provider value={isPublic}>
                  {!isPublic && (
                    <SharingProvider
                      doctype="io.cozy.files"
                      documentType="Notes"
                      previewPath="/preview/"
                    >
                      <App isPublic={isPublic} />
                    </SharingProvider>
                  )}
                  {isPublic && <App isPublic={isPublic} />}
                </IsPublicContext.Provider>
              </MuiCozyTheme>
            </CozyProvider>
          </IntlProvider>
        </StylesProvider>
      </I18n>
    </WebviewIntentProvider>,
    document.querySelector('[role=application]')
  )
}

// initial rendering of the application
export const initApp = () => {
  const data = getDataset()
  const appIcon = getDataOrDefault(
    data.app.icon,
    require('../vendor/assets/icon.svg')
  )
  const appNamePrefix = getDataOrDefault(
    data.app.prefix || manifest.name_prefix,
    ''
  )
  const appName = getDataOrDefault(data.app.name, manifest.name)
  const appSlug = getDataOrDefault(data.app.slug, manifest.slug)
  const appVersion = getDataOrDefault(data.app.version, manifest.version)

  const supportedLocales = ['en', 'fr']

  addLocaleData(locales.en.react)
  addLocaleData(locales.fr.react)

  const userLocale = getDataOrDefault(data.locale, 'en')
  const appLocale = supportedLocales.includes(userLocale) ? userLocale : 'en'

  const protocol = window.location ? window.location.protocol : 'https:'

  const shareCode = getPublicSharecode()
  const token = shareCode || data.token
  const isPublic = Boolean(shareCode || !token || token == '')

  // initialize the client to interact with the cozy stack
  const client = new CozyClient({
    uri: `${protocol}//${data.domain}`,
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
  client.registerPlugin(flag.plugin)

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
