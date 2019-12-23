import React from 'react'
import { Empty } from 'cozy-ui/react'
import { translate } from 'cozy-ui/react/I18n'

const Unshared = translate()(({ t }) => (
  <Empty
    icon={'unlink'}
    title={t(`Error.unshared_title`)}
    text={t(`Error.unshared_text`)}
  />
))

export default Unshared
