import React from 'react'

import { I18n } from 'cozy-ui/transpiled/react/I18n'
import en from '../src/locales/en.json'

export const AppLike = ({ children }) => {
  return (
    <I18n lang="en" dictRequire={() => en}>
      {children}
    </I18n>
  )
}
