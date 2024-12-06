import React from 'react'

import { Empty } from 'cozy-ui/transpiled/react'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

function EditorLoadingError(props) {
  const { returnUrl } = props
  const { t } = useI18n()
  return (
    <Empty
      icon="cross-small"
      title={t(`Error.loading_error_title`)}
      text={
        <>
          <p className="u-mb-half">
            {t(`Error.loading_error_text_noReturnUrl`)}
          </p>

          {returnUrl && (
            <Button variant="text" label={t('Error.back')} href={returnUrl} />
          )}
        </>
      }
    />
  )
}

export default EditorLoadingError
