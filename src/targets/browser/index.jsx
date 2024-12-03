/* eslint-disable import/order */
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'

import { fr, en } from '@atlaskit/editor-core/i18n'
import { CaptureConsole } from '@sentry/integrations'
import * as Sentry from '@sentry/react'
import IsPublicContext from 'components/IsPublicContext'
import {
  getDataset,
  getDataOrDefault,
  getPublicSharecode
} from 'lib/initFromDom'
import memoize from 'lodash/memoize'
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from 'react-router-dom'
import 'styles/index.css'

import 'cozy-bar/dist/stylesheet.css'
import CozyClient, { CozyProvider } from 'cozy-client'
import { Document } from 'cozy-doctypes'
import flag from 'cozy-flags'
import { WebviewIntentProvider } from 'cozy-intent'
import { RealtimePlugin } from 'cozy-realtime'
import SharingProvider from 'cozy-sharing'
import 'cozy-sharing/dist/stylesheet.css'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

import { SHARING_LOCATION } from '../../constants/strings'

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

const renderApp = function (appLocale, client, isPublic) {
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
              <CozyTheme ignoreCozySettings={isPublic}>
                <IsPublicContext.Provider value={isPublic}>
                  {!isPublic && (
                    <SharingProvider
                      doctype="io.cozy.files"
                      documentType="Notes"
                      previewPath={SHARING_LOCATION}
                    >
                      <App isPublic={isPublic} />
                    </SharingProvider>
                  )}
                  {isPublic && <App isPublic={isPublic} />}
                </IsPublicContext.Provider>
              </CozyTheme>
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
  const appSlug = getDataOrDefault(data.app.slug, manifest.slug)
  const appVersion = getDataOrDefault(data.app.version, manifest.version)

  const supportedLocales = ['en', 'fr']

  addLocaleData(locales.en.react)
  addLocaleData(locales.fr.react)

  const userLocale = getDataOrDefault(data.locale, 'en')
  const appLocale = supportedLocales.includes(userLocale) ? userLocale : 'en'

  const protocol = window.location ? window.location.protocol : 'https:'

  const shareCode = getPublicSharecode()
  const token = data.token
  const isPublic = Boolean(shareCode)

  // initialize the client to interact with the cozy stack
  const client = new CozyClient({
    uri: `${protocol}//${data.domain}`,
    token: token,
    store: true,
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
    Sentry.init({
      dsn: 'https://16c26a60d9019eea9d9a9775573e3765@errors.cozycloud.cc/73',
      environment: process.env.NODE_ENV,
      release: manifest.version,
      integrations: [
        new CaptureConsole({ levels: ['error'] }), // We also want to capture the `console.error` to, among other things, report the logs present in the `try/catch`
        Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect: React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        })
      ],
      tracesSampleRate: 0.1,
      // React log these warnings(bad Proptypes), in a console.error, it is not relevant to report this type of information to Sentry
      ignoreErrors: [/^Warning: /],
      defaultIntegrations: false
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
