import React, { useState } from 'react'

import Alert from 'cozy-ui/transpiled/react/Alert'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import TrashDuotoneIcon from 'cozy-ui/transpiled/react/Icons/TrashDuotone'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useClient } from 'cozy-client'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { DestroyConfirm } from 'components/notes/TrashedBanner/DestroyConfirm'

const TrashedBanner = ({ noteId, isPublic, returnUrl }) => {
  const { t } = useI18n()
  const client = useClient()
  const { showAlert } = useAlert()
  const { isMobile } = useBreakpoints()
  const [
    isDestroyConfirmationDisplayed,
    setDestroyConfirmationDisplayed
  ] = useState(false)

  const [isBusy, setBusy] = useState(false)

  const restore = async () => {
    try {
      await client.collection('io.cozy.files').restore(noteId)
      showAlert({
        message: t('TrashedBanner.restoreSuccess'),
        severity: 'secondary'
      })
    } catch {
      showAlert({ message: t('TrashedBanner.restoreError'), severity: 'error' })
    } finally {
      setBusy(false)
    }
  }

  const destroy = async () => {
    setDestroyConfirmationDisplayed(true)
  }

  const handleDestroyCancel = () => {
    setDestroyConfirmationDisplayed(false)
  }

  const handleDestroyConfirm = () => {
    window.location = returnUrl
  }

  return (
    <>
      <Alert
        square
        severity="secondary"
        icon={<Icon icon={TrashDuotoneIcon} size={32} />}
        block={isMobile}
        action={
          !isPublic ? (
            <>
              <Buttons
                size="small"
                variant="text"
                label={t('TrashedBanner.restore')}
                onClick={restore}
                busy={isBusy}
              />
              <Buttons
                size="small"
                variant="text"
                label={t('TrashedBanner.destroy')}
                onClick={destroy}
                disabled={isBusy}
              />
            </>
          ) : null
        }
      >
        {t('TrashedBanner.text')}
      </Alert>
      {isDestroyConfirmationDisplayed ? (
        <DestroyConfirm
          noteId={noteId}
          onCancel={handleDestroyCancel}
          onConfirm={handleDestroyConfirm}
        />
      ) : null}
    </>
  )
}

export { TrashedBanner }
