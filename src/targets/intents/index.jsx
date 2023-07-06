import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/index.css'

import React from 'react'
import { render } from 'react-dom'

import Intents from 'cozy-interapp'
import CozyClient, { CozyProvider } from 'cozy-client'
import flag from 'cozy-flags'
import I18n from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

const manifest = require('../../../manifest.webapp')

import { getDataset, getDataOrDefault } from 'lib/initFromDom'
import IntentEditorView from 'components/intents/IntentEditorView'
import IntentProvider from 'components/intents/IntentProvider'

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
    <I18n
      lang={data.locale}
      dictRequire={lang => require(`../../locales/${lang}`)}
    >
      <CozyProvider client={client}>
        <IntentProvider intentId={intentId}>
          <MuiCozyTheme>
            <IntentEditorView />
          </MuiCozyTheme>
        </IntentProvider>
      </CozyProvider>
    </I18n>,
    document.querySelector('[role=application]')
  )
})
