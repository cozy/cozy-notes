import React from 'react'
import { MainTitle } from 'cozy-ui/transpiled/react/Text'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { withBreakpoints } from 'cozy-ui/transpiled/react'

// We don't display the Title this way in Mobile.
// We use Bar.centrer
const AppTitle = ({ t, breakpoints: { isMobile } }) => {
  return !isMobile && <MainTitle>{t('Notes.List.latest_notes')}</MainTitle>
}

const ConnectedAppTitle = withBreakpoints()(translate()(AppTitle))

export default ConnectedAppTitle
