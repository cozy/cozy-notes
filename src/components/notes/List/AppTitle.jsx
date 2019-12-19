import React from 'react'
import { MainTitle } from 'cozy-ui/react/Text'
import { translate } from 'cozy-ui/react/I18n'
import { withBreakpoints } from 'cozy-ui/transpiled/react'

//We don't not display the Title this way in Mobile.
//We use Bar.centrer
const AppTitle = ({ t, breakpoints: { isMobile } }) => {
  return isMobile ? null : (
    <MainTitle className="titlePadding u-mt-1">
      {t('Notes.List.my_notes')}
    </MainTitle>
  )
}

const ConnectedAppTitle = withBreakpoints()(translate()(AppTitle))

export default ConnectedAppTitle
