/* eslint-disable import/order */
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-bar/dist/stylesheet.css'
import 'cozy-sharing/dist/stylesheet.css'
import 'cozy-search/dist/stylesheet.css'
import 'styles/index.css'

import { fr, en } from '@atlaskit/editor-core/i18n'
import IntentEditorView from 'components/intents/IntentEditorView'
import IntentProvider from 'components/intents/IntentProvider'
import { getDataset, getDataOrDefault } from 'lib/initFromDom'
import React from 'react'
import { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'

import CozyClient, { CozyProvider } from 'cozy-client'
import flag from 'cozy-flags'
import { WebviewIntentProvider } from 'cozy-intent'
import Intents from 'cozy-interapp'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

const manifest = require('../../../manifest.webapp')
const frenchAtlaskitCozy = require(`locales/atlassian_missing_french.json`)

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

document.addEventListener('DOMContentLoaded', () => {
  const data = getDataset()
  const token = data.token
  const appSlug = getDataOrDefault(data.app.slug, manifest.slug)
  const appVersion = getDataOrDefault(data.app.version, manifest.version)
  addLocaleData(locales.en.react)
  addLocaleData(locales.fr.react)
  const userLocale = getDataOrDefault(data.locale, 'en')
  const supportedLocales = ['en', 'fr']
  const appLocale = supportedLocales.includes(userLocale) ? userLocale : 'en'

  const protocol = window.location.protocol
  const client = new CozyClient({
    uri: `${protocol}//${data.domain}`,
    token,
    store: true,
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  })
  const intents = new Intents({ client })
  client.intents = intents
  client.registerPlugin(flag.plugin)

  const intentId = new URLSearchParams(window.location.search).get('intent')

  render(
    <WebviewIntentProvider>
      <I18n
        lang={data.locale}
        dictRequire={lang => require(`../../locales/${lang}`)}
      >
        <StylesProvider generateClassName={generateClassName}>
          <IntlProvider
            locale={appLocale}
            messages={locales[appLocale].atlaskit}
          >
            <BreakpointsProvider>
              <CozyProvider client={client}>
                <IntentProvider intentId={intentId}>
                  <CozyTheme>
                    <IntentEditorView />
                  </CozyTheme>
                </IntentProvider>
              </CozyProvider>
            </BreakpointsProvider>
          </IntlProvider>
        </StylesProvider>
      </I18n>
    </WebviewIntentProvider>,
    document.querySelector('[role=application]')
  )
})
