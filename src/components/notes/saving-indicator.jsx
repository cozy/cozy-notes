import React, { useEffect, useCallback, useState } from 'react'
import { useI18n } from 'cozy-ui/react/I18n'
import { Text } from 'cozy-ui/react/Text'
import usePeriodicRender from 'cozy-ui/react/hooks/usePeriodicRender'
import styles from 'components/notes/saving-indicator.styl'
import throttle from 'lodash/throttle'
import { relativeAge } from 'lib/utils'

// constants
const sec = 1000

/**
 * @typedef {object} SavingIndicatorProps
 * @property {CollabProviderDate} collabProvider
 */

/**
 * Displays a saving indicator in the bottom right
 *
 * @param {SavingIndicatorProps} props
 */
function SavingIndicator(props) {
  const { t } = useI18n()
  const now = new Date()

  const [, setLastChange] = useState(undefined)

  const { collabProvider } = props
  const isDirty = collabProvider.isDirty()
  const dirtySince = collabProvider.getDirtySince()
  const lastSave = collabProvider.getLastSaveOrSync()

  let message

  const savedAge = now - (lastSave || now)
  const dirtyAge = now - dirtySince
  const { key, time, interval } = relativeAge(savedAge)
  usePeriodicRender(interval)

  if (isDirty) {
    if (dirtyAge > 30 * sec) {
      message = t(`Notes.SavingIndicator.out_of_sync.${key}`, { time })
    } else if (dirtyAge > 5 * sec) {
      message = t('Notes.SavingIndicator.still_saving')
    } else {
      message = t('Notes.SavingIndicator.saving')
    }
  } else {
    message = t(`Notes.SavingIndicator.saved.${key}`, { time })
  }

  const onCollabStateChange = useCallback(
    throttle(() => setLastChange(new Date()), 200),
    [setLastChange]
  )
  useEffect(() => {
    collabProvider.on('collab-state-change', onCollabStateChange)
  }, [collabProvider, onCollabStateChange])
  return <Text className={styles['saving-indicator']}>{message}</Text>
}

export default SavingIndicator
