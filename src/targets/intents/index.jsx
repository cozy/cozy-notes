import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/index.css'

import React from 'react'
import { render } from 'react-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import { WebviewIntentProvider } from 'cozy-intent'
import Intents from 'cozy-interapp'
import CozyClient, { CozyProvider } from 'cozy-client'
import flag from 'cozy-flags'
import I18n from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

const manifest = require('../../../manifest.webapp')

import { getDataset, getDataOrDefault } from 'lib/initFromDom'
import IntentEditorView from 'components/intents/IntentEditorView'
import IntentProvider from 'components/intents/IntentProvider'

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

document.addEventListener('DOMContentLoaded', () => {
  const data = getDataset()
  const token = data.token
  const appSlug = getDataOrDefault(data.app.slug, manifest.slug)
  const appVersion = getDataOrDefault(data.app.version, manifest.version)

  const protocol = window.location.protocol
  const client = new CozyClient({
    uri: `${protocol}//${data.domain}`,
    token,
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
          <CozyProvider client={client}>
            <IntentProvider intentId={intentId}>
              <MuiCozyTheme>
                <IntentEditorView />
              </MuiCozyTheme>
            </IntentProvider>
          </CozyProvider>
        </StylesProvider>
      </I18n>
    </WebviewIntentProvider>,
    document.querySelector('[role=application]')
  )
})
