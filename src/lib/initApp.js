import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import { fr, en } from '@atlaskit/editor-core/i18n'
import memoize from 'lodash/memoize'

import CozyClient from 'cozy-client'
import { RealtimePlugin } from 'cozy-realtime'
import { Document } from 'cozy-doctypes'
import flag from 'cozy-flags'

import { getDataset, getDataOrDefault } from 'lib/initFromDom'

const manifest = require('../../manifest.webapp')

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

// initial rendering of the application
const initApp = memoize(({ isPublic = false } = {}) => {
  const data = getDataset()
  const appIcon = getDataOrDefault(
    data.app.icon,
    require('../targets/vendor/assets/icon.svg')
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
  const token = data.token

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
})

export { initApp }
