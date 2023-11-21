import React from 'react'
import { IntlProvider } from 'react-intl'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import { fr, en } from '@atlaskit/editor-core/i18n'

import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { CozyProvider } from 'cozy-client'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import { WebviewIntentProvider } from 'cozy-intent'

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

const AppProviders = ({ appLocale, client, children }) => {
  return (
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
              <MuiCozyTheme>{children}</MuiCozyTheme>
            </CozyProvider>
          </IntlProvider>
        </StylesProvider>
      </I18n>
    </WebviewIntentProvider>
  )
}

export { AppProviders }
