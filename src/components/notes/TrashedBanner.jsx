import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Alert from 'cozy-ui/transpiled/react/Alert'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import TrashDuotoneIcon from 'cozy-ui/transpiled/react/Icons/TrashDuotone'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useClient, generateWebLink } from 'cozy-client'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

const TrashedBanner = ({ noteId }) => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const { isMobile } = useBreakpoints()

  const [isBusy, setBusy] = useState(false)

  const restore = async () => {
    try {
      const { data } = await client.collection('io.cozy.files').restore(noteId)
      navigate(`/n/${data.id}`, { replace: true })
    } catch {
      showAlert(t('TrashedBanner.restoreError'), 'error')
    } finally {
      setBusy(false)
    }
  }

  const cozyURL = new URL(client.getStackClient().uri)
  const redirectAppSlug = 'drive'
  const redirectPath = '/trash'
  const { subdomain: subDomainType } = client.getInstanceOptions()

  return (
    <Alert
      square
      severity="secondary"
      icon={<Icon icon={TrashDuotoneIcon} size={32} />}
      block={isMobile}
      action={
        <>
          <AppLinker
            app={{ slug: redirectAppSlug }}
            nativePath={redirectPath}
            href={generateWebLink({
              pathname: '/',
              cozyUrl: cozyURL.origin,
              slug: redirectAppSlug,
              hash: redirectPath,
              subDomainType
            })}
          >
            {({ onClick }) => (
              <Buttons
                size="small"
                variant="text"
                label={t('TrashedBanner.redirect')}
                onClick={onClick}
                disabled={isBusy}
              />
            )}
          </AppLinker>
          <Buttons
            size="small"
            variant="text"
            label={t('TrashedBanner.restore')}
            onClick={restore}
            busy={isBusy}
          />
        </>
      }
    >
      {t('TrashedBanner.text')}
    </Alert>
  )
}

export { TrashedBanner }
