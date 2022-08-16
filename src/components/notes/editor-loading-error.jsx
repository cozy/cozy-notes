import React from 'react'
import { Empty } from 'cozy-ui/transpiled/react'
import { translate } from 'cozy-ui/transpiled/react/I18n'

function EditorLoadingError(props) {
  const { t, returnUrl } = props

  return (
    <Empty
      icon="cross-small"
      title={t(`Error.loading_error_title`)}
      text={
        <p
          className="u-mb-half"
          dangerouslySetInnerHTML={{
            __html: returnUrl
              ? t(`Error.loading_error_text_returnUrl`, { url: returnUrl })
              : t(`Error.loading_error_text_noReturnUrl`)
          }}
        />
      }
    />
  )
}

export default translate()(EditorLoadingError)
