import throttle from 'lodash/throttle'
import { useState, useCallback, useEffect } from 'react'

const throttleValue = 200 // milliseconds

/**
 * Reacts to change in the collaboration state of a collaboration provider
 * @param {CollabProvider} collabProvider
 */
export default function useCollabStateChange(collabProvider) {
  const [, setCollabStateChange] = useState(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onCollabStateChange = useCallback(
    throttle(() => setCollabStateChange(new Date()), throttleValue),
    [setCollabStateChange]
  )
  useEffect(() => {
    collabProvider.on('collab-state-change', onCollabStateChange)
    return () => collabProvider.off('collab-state-change', onCollabStateChange)
  }, [collabProvider, onCollabStateChange])
}
