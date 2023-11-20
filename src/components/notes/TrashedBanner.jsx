import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Banner from 'cozy-ui/transpiled/react/Banner'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import TrashDuotoneIcon from 'cozy-ui/transpiled/react/Icons/TrashDuotone'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useClient, generateWebLink } from 'cozy-client'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

const TrashedBanner = ({ noteId }) => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const { showAlert } = useAlert()

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
    <Banner
      icon={<Icon icon={TrashDuotoneIcon} />}
      text={t('TrashedBanner.text')}
      bgcolor="var(--contrastBackgroundColor)"
      buttonOne={
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
              variant="text"
              label={t('TrashedBanner.redirect')}
              onClick={onClick}
              disabled={isBusy}
            />
          )}
        </AppLinker>
      }
      buttonTwo={
        <Buttons
          variant="text"
          label={t('TrashedBanner.restore')}
          onClick={restore}
          busy={isBusy}
        />
      }
      inline
    />
  )
}

export { TrashedBanner }
