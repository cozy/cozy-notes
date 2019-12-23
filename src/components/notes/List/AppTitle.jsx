import React from 'react'
import { MainTitle } from 'cozy-ui/react/Text'
import { translate } from 'cozy-ui/react/I18n'
import { withBreakpoints } from 'cozy-ui/react'
import styles from 'components/notes/List/list.styl'

//We don't not display the Title this way in Mobile.
//We use Bar.centrer
const AppTitle = ({ t, breakpoints: { isMobile } }) => {
  return isMobile ? null : (
    <MainTitle className={styles.titlePadding}>
      {t('Notes.List.my_notes')}
    </MainTitle>
  )
}

const ConnectedAppTitle = withBreakpoints()(translate()(AppTitle))

export default ConnectedAppTitle
