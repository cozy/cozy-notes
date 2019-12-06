/* global cozy */

import 'styles'

import React from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/react/I18n'
import { schema } from 'components/notes'
import IsPublic from 'components/IsPublic'

let appLocale
const renderApp = function(client, isPublic) {
  const App = require('components/app').default
  render(
    <I18n
      lang={appLocale}
      dictRequire={appLocale => require(`locales/${appLocale}`)}
    >
      <CozyProvider client={client}>
        <IsPublic.provider value={isPublic}>
          <App isPublic={isPublic} />
        </IsPublic.provider>
      </CozyProvider>
    </I18n>,
    document.querySelector('[role=application]')
  )
}

// return a defaultData if the template hasn't been replaced by cozy-stack
const getDataOrDefault = function(toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

const getDataset = function() {
  const root = document.querySelector('[role=application]')
  return root.dataset
}

const getToken = function(dataset) {
  if (
    dataset &&
    dataset.cozyToken &&
    dataset.cozyToken.length > 0 &&
    dataset.cozyToken[0] != '{'
  ) {
    return { isPublic: false, token: dataset.cozyToken }
  } else {
    const arrToObj = (obj = {}, [key, val = true]) => {
      obj[key] = val
      return obj
    }
    const { sharecode } = window.location.search
      .substring(1)
      .split('&')
      .map(varval => varval.split('='))
      .reduce(arrToObj, {})
    return { isPublic: true, token: sharecode }
  }
}

// initial rendering of the application
document.addEventListener('DOMContentLoaded', () => {
  const data = getDataset()

  const appIcon = getDataOrDefault(
    data.cozyIconPath,
    require('../vendor/assets/icon.svg')
  )

  const appNamePrefix = getDataOrDefault(
    data.cozyAppNamePrefix || require('../../../manifest.webapp').name_prefix,
    ''
  )

  const appName = getDataOrDefault(
    data.cozyAppName,
    require('../../../manifest.webapp').name
  )

  const appSlug = getDataOrDefault(
    data.cozyAppSlug,
    require('../../../manifest.webapp').slug
  )

  const appVersion = getDataOrDefault(
    data.cozyAppVersion,
    require('../../../manifest.webapp').version
  )

  appLocale = getDataOrDefault(data.cozyLocale, 'en')

  const protocol = window.location ? window.location.protocol : 'https:'

  const { isPublic, token } = getToken(data)

  // initialize the client to interact with the cozy stack
  const client = new CozyClient({
    uri: `${protocol}//${data.cozyDomain}`,
    token: token,
    schema,
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  })

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
