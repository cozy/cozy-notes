import React, { useEffect, useCallback, useState } from 'react'
import { useI18n } from 'cozy-ui/react/I18n'
import { Text } from 'cozy-ui/react/Text'
import usePeriodicRender from 'cozy-ui/react/hooks/usePeriodicRender'
import useEventListener from 'cozy-ui/react/hooks/useEventListener'
import useBreakpoints from 'cozy-ui/react/hooks/useBreakpoints'
import styles from 'components/notes/saving-indicator.styl'
import throttle from 'lodash/throttle'
import { relativeAge } from 'lib/utils'
import OfflineIndicator from 'components/notes/offline-indicator'
// constants
const sec = 1000
const keepOfflineOpenFor = 5 * sec
const outOfSyncAfter = 30 * sec

/**
 * @typedef {object} SavingIndicatorProps
 * @property {CollabProviderDate} collabProvider
 * @property {Ref} bannerRef - Where to display banners
 */

/**
 * Displays a saving indicator in the bottom right
 * and an offline indicator if needed
 *
 * @param {SavingIndicatorProps} props
 */
function SavingIndicator(props) {
  const { t } = useI18n()
  const now = new Date()
  const { isMobile } = useBreakpoints()

  const [, setLastChange] = useState(undefined)
  const [offlineSince, setOfflineSince] = useState(undefined)
  const [isNavigatorOffline, setIsNavigatorOffline] = useState(
    window && window.navigator && window.navigator.onLine === false
  )
  const setNavigatorOffline = useCallback(() => setIsNavigatorOffline(true), [
    setIsNavigatorOffline
  ])
  const setNavigatorOnline = useCallback(() => setIsNavigatorOffline(false), [
    setIsNavigatorOffline
  ])
  useEventListener(window, 'online', setNavigatorOnline)
  useEventListener(window, 'offline', setNavigatorOffline)

  const { collabProvider } = props
  const isDirty = collabProvider.isDirty()
  const dirtySince = collabProvider.getDirtySince()
  const lastSave = collabProvider.getLastSaveOrSync()

  let message

  const savedAge = now - (lastSave || now)
  const dirtyAge = now - dirtySince
  const outOfSync = isDirty && dirtyAge && dirtyAge > outOfSyncAfter

  const { key, time, interval } = relativeAge(savedAge)

  if (isDirty) {
    if (outOfSync) {
      message = t(`Notes.SavingIndicator.out_of_sync.${key}`, { time })
    } else if (dirtyAge > 5 * sec) {
      message = t('Notes.SavingIndicator.still_saving')
    } else {
      message = t('Notes.SavingIndicator.saving')
    }
  } else {
    message = t(`Notes.SavingIndicator.saved.${key}`, { time })
  }

  const isOffline = isNavigatorOffline || outOfSync
  useEffect(() => {
    setOfflineSince(isOffline && now)
  }, [isOffline])

  const offlineAge = isOffline && offlineSince && now - offlineSince
  const isOfflineIndicatorOpen =
    !offlineSince || (offlineAge && offlineAge < keepOfflineOpenFor)
  const offlineInterval =
    isOfflineIndicatorOpen &&
    offlineSince &&
    offlineSince + keepOfflineOpenFor - now

  usePeriodicRender(
    (offlineInterval && Math.min(offlineInterval, interval)) || interval
  )

  const onCollabStateChange = useCallback(
    throttle(() => setLastChange(new Date()), 200),
    [setLastChange]
  )
  useEffect(() => {
    collabProvider.on('collab-state-change', onCollabStateChange)
  }, [collabProvider, onCollabStateChange])

  const text = <Text className={styles['saving-indicator']}>{message}</Text>
  if (isOffline) {
    return (
      <OfflineIndicator
        open={isOfflineIndicatorOpen}
        bannerRef={props.bannerRef}
      >
        {text}
      </OfflineIndicator>
    )
  } else {
    if (isMobile) {
      return null
    } else {
      return text
    }
  }
}

export default SavingIndicator
