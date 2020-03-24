import { useState, useCallback, useEffect } from 'react'
import throttle from 'lodash/throttle'

const throttleValue = 200 // milliseconds

/**
 * Reacts to change in the collaboration state of a collaboration provider
 * @param {CollabProvider} collabProvider
 */
export default function useCollabStateChange(collabProvider) {
  const [, setCollabStateChange] = useState(null)
  const onCollabStateChange = useCallback(
    throttle(() => setCollabStateChange(new Date()), throttleValue),
    [setCollabStateChange]
  )
  useEffect(() => {
    collabProvider.on('collab-state-change', onCollabStateChange)
    return () => collabProvider.off('collab-state-change', onCollabStateChange)
  }, [collabProvider, onCollabStateChange])
}
