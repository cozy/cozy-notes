import React from 'react'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import en from '../src/locales/en.json'

const TestI18n = ({ children }) => {
  return (
    <I18n lang="en" dictRequire={() => en}>
      {children}
    </I18n>
  )
}

const AppLike = ({ children, client }) => {
  return (
    <CozyProvider client={client}>
      <TestI18n>{children}</TestI18n>
    </CozyProvider>
  )
}

export { TestI18n, AppLike }
