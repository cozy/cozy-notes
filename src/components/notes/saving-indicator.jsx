import React, { useEffect, useCallback, useState } from 'react'
import { useI18n } from 'cozy-ui/react/I18n'
import { Text } from 'cozy-ui/react/Text'
import usePeriodicRender from 'cozy-ui/react/hooks/usePeriodicRender'
import styles from 'components/notes/saving-indicator.styl'
import throttle from 'lodash/throttle'

// constants
const sec = 1000
const min = 60 * sec
const hour = 60 * min
const day = 24 * hour

// differents steps for message formating
// [age, key, unit, coef] :
// - `age`: the line applies only if the last saved
// was done less than this `age` ago
// (only the first match will apply)
// - `key` is the traduction key for the message
// - `unit` is the unit in which we will send the time
// to the translated message
// - `coef` is  the granularity in which we will send
// the time (`min, 5` is "by 5 minutes slices")
const steps = [
  [10 * sec, 'saved_just_now', sec, 1],
  [1 * min, 'saved_secs_ago', sec, 10],
  [2 * min, 'saved_min_ago', min, 1],
  [5 * min, 'saved_mins_ago', min, 1],
  [20 * min, 'saved_mins_ago', min, 5],
  [1 * hour, 'saved_mins_ago', min, 10],
  [2 * hour, 'saved_hour_ago', hour, 1],
  [1 * day, 'saved_hours_ago', hour, 1],
  [2 * day, 'saved_day_ago', day, 1],
  [Infinity, 'saved_days_ago', day, 1]
]

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
  let interval = false

  if (isDirty) {
    const age = now - dirtySince
    if (age > 30 * sec) {
      message = (
        <>
          {t('Notes.SavingIndicator.saving_impossible')}
          <br />
          {t('Notes.SavingIndicator.new_attempt')}
        </>
      )
      interval = false
    } else {
      message = t('Notes.SavingIndicator.saving')
      interval = 31 * sec
    }
  } else {
    const age = now - (lastSave || now)
    const step = steps.find(el => age < el[0])
    const [, key, unit, coef] = step
    message = t(`Notes.SavingIndicator.${key}`, {
      time: Math.floor(age / unit / coef) * coef
    })
    interval = unit * coef
  }
  usePeriodicRender(interval)

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
