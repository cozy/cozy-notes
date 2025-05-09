import { useIntent } from 'components/intents/IntentProvider'
import useServiceClient from 'hooks/useServiceClient'
import useUser from 'hooks/useUser'
import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import log from 'cozy-logger'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
    left: 0
  }
})

const SaveButton = ({ title, actions }) => {
  const { t } = useI18n()
  const styles = useStyles()
  const cozyClient = useClient()
  const { service } = useIntent()
  const { userName, userId } = useUser()
  const serviceClient = useServiceClient({
    cozyClient,
    userId,
    userName
  })
  const [isBusy, setIsBusy] = useState(false)

  const handleClick = actions => async ev => {
    // because the button is on top of the note and propagation
    // opens the keyboard on the mobile phone
    ev.stopPropagation()
    try {
      setIsBusy(true)
      const doc = await actions.getValue()
      const { data } = await serviceClient.create(title, undefined, doc)
      service.terminate({ id: data.id })
      setIsBusy(false)
    } catch (error) {
      log('error', error)
      service.cancel()
    }
  }

  return (
    <>
      <style>
        html .akEditor&gt;div:first-child
        {'{ bottom: calc(env(safe-area-inset-bottom) + 5rem) }'}
      </style>
      <Buttons
        classes={styles}
        label={t('Intents.save')}
        busy={isBusy}
        fullWidth
        onClick={handleClick(actions)}
      />
    </>
  )
}

export default SaveButton
