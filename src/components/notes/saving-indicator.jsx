import React, { useMemo } from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Text } from 'cozy-ui/transpiled/react/Text'
import usePeriodicRender from 'cozy-ui/transpiled/react/hooks/usePeriodicRender'
import useBrowserOffline from 'cozy-ui/transpiled/react/hooks/useBrowserOffline'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import styles from 'components/notes/saving-indicator.styl'
import { relativeAge } from 'lib/utils'
import OfflineIndicator from 'components/notes/offline-indicator'
import useCollabStateChange from 'hooks/useCollabStateChange'

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
 * Checks if the server is out of sync
 * (our changes were not successfully sent and accepted for too much time)
 * @param {object} params
 * @param {boolean} params.isDirty - if there are changes to be sent
 * @param {integer} params.dirtyAge - number of milliseconds waiting
 *                                    with changes to be sent
 * @returns {boolean}
 */
function checksOutOfSync({ isDirty, dirtyAge }) {
  return isDirty && dirtyAge && dirtyAge > outOfSyncAfter
}

/**
 * Checks for disconnection (browser offline or out of sync)
 *
 * @param {object} params
 * @param {boolean} params.isOutOfSync
 * @returns {{isDisconnected, disconnectedAge}}
 */
function useDisconnection({ isOutOfSync }) {
  const now = new Date()
  const isBrowserOffline = useBrowserOffline()
  const isDisconnected = isBrowserOffline || isOutOfSync
  const disconnectedSince = useMemo(() => new Date(), [isDisconnected])
  const disconnectedAge = isDisconnected ? now - disconnectedSince : 0
  return { isDisconnected, disconnectedAge }
}

/**
 * Should we open the offline indicator tooltip?
 *
 * We open it for a few seconds when we go offline
 * then close it (it is still accessible when hovering over)
 * @param {object} params
 * @param {integer} params.disconnectedAge - milliseconds since when we are disconnected
 * @param {boolean} params.isDisconnected
 * @returns {boolean}
 */
function useOpenOfflineIndicator({ disconnectedAge, isDisconnected }) {
  const isOpen = isDisconnected && disconnectedAge < keepOfflineOpenFor

  // When open, rerender when the indicator should close again
  const interval = keepOfflineOpenFor - disconnectedAge
  usePeriodicRender(isOpen && interval)

  return isOpen
}

/**
 * Displays a saving indicator in the bottom right
 * and an offline indicator if needed
 *
 * @param {SavingIndicatorProps} props
 */
function SavingIndicator(props) {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const now = new Date()

  // collaboration state
  const { collabProvider } = props
  const lastSave = collabProvider.getLastSaveOrSync()
  const savedAge = now - (lastSave || now)
  const isDirty = collabProvider.isDirty()
  const dirtySince = collabProvider.getDirtySince()
  const dirtyAge = now - dirtySince

  // trigger a rerender if collaboration state changes
  useCollabStateChange(collabProvider)

  // Disconnected state
  const isOutOfSync = checksOutOfSync({ isDirty, dirtyAge })
  const { isDisconnected, disconnectedAge } = useDisconnection({
    isOutOfSync
  })

  // should we open the offline indicator?
  const offlineIndicatorOpen = useOpenOfflineIndicator({
    isDisconnected,
    disconnectedAge
  })

  // display data
  const age = isDisconnected ? disconnectedAge : isDirty ? dirtyAge : savedAge
  const { key, time, interval } = relativeAge(age)
  usePeriodicRender(interval)

  // indicator message
  let translation
  if (isDirty) {
    if (isDisconnected) {
      translation = `saving_impossible.${key}`
    } else if (dirtyAge > 5 * sec) {
      translation = 'still_saving'
    } else {
      translation = 'saving'
    }
  } else {
    if (isDisconnected) {
      translation = `out_of_sync.${key}`
    } else {
      translation = 'saved.default'
    }
  }
  const message = t(`Notes.SavingIndicator.${translation}`, { time })

  // actual rendering
  const text = <Text className={styles['saving-indicator']}>{message}</Text>
  if (isDisconnected) {
    return (
      <OfflineIndicator open={offlineIndicatorOpen} bannerRef={props.bannerRef}>
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
