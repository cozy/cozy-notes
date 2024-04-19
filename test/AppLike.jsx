import React from 'react'

import { CozyProvider, createMockClient } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import en from '../src/locales/en.json'

const TestI18n = ({ children }) => {
  return (
    <I18n lang="en" dictRequire={() => en}>
      {children}
    </I18n>
  )
}

const AppLike = ({ children, client }) => {
  const mockClient = createMockClient({})

  return (
    <BreakpointsProvider>
      <CozyProvider client={client || mockClient}>
        <TestI18n>{children}</TestI18n>
      </CozyProvider>
    </BreakpointsProvider>
  )
}

export { TestI18n, AppLike }
