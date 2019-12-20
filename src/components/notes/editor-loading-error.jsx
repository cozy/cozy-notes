import React, { useContext } from 'react'
import { Empty } from 'cozy-ui/react'
import { translate } from 'cozy-ui/react/I18n'

import IsPublicContext from '../IsPublicContext'

function EditorLoadingError(props) {
  const isPublic = useContext(IsPublicContext)
  const returnUrl = props.returnUrl || (!isPublic && '/') || undefined
  const { t } = props

  return (
    <Empty
      icon={'cross-small'}
      title={t(`Error.loading_error_title`)}
      text={
        <p
          className="u-mb-half"
          dangerouslySetInnerHTML={{
            __html: returnUrl
              ? t(`Error.loading_error_text_returnUrl`).replace(
                  '%url%',
                  returnUrl
                )
              : t(`Error.loading_error_text_noReturnUrl`)
          }}
        />
      }
    />
  )
}

export default translate()(EditorLoadingError)
