import React from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { withBreakpoints } from 'cozy-ui/transpiled/react'
import Typography from 'cozy-ui/transpiled/react/Typography'

// We don't display the Title this way in Mobile.
// We use Bar.centrer
const AppTitle = ({ t, breakpoints: { isMobile } }) => {
  return (
    !isMobile && (
      <Typography variant="h3" component="h1">
        {t('Notes.List.latest_notes')}
      </Typography>
    )
  )
}

const ConnectedAppTitle = withBreakpoints()(translate()(AppTitle))

export default ConnectedAppTitle
