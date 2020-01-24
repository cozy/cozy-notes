import { useState, useEffect, useRef } from 'react'

let iterations = 0

/**
 * Return value of  useCollaborationState
 * @typedef {CollabState}
 * @property {boolean} isDirty - Is there something local still waiting to be sync?
 * @property {Date} dirtySince - Date of the older object waiting to be sync, falsy when in sync
 * @property {Date} lastSave - Date of the earlier object that has been correctly sync
 * @property {React.Reference} dirtyRef - React reference, which holds the most up to date
 * value of dirtySince in `.current`
 */

/**
 * Monitor the state of collaboration (React hook)
 *
 * Returns if something is still in process,
 * from which time, and the time of the last
 * successful save to the collab server
 *
 * @param {CollabProvider} provider
 * @returns {CollabState}
 */
function useCollaborationState(provider) {
  const channel = provider && provider.channel

  // using a ref and not a state because often the event
  // are triggering on and off before the next rendering
  // in  React, and that introduce an incoherent state
  // (as each event should use the previous state to
  // determine its behaviour)
  const dirtySince = useRef(null)
  const lastSave = useRef(null)
  // the state is only here to trigger a rerender when needed
  const [, setChanges] = useState(iterations)

  // init
  if (channel) {
    if (channel.isDirty()) {
      // always mark as dirty if the channel is dirty
      if (!dirtySince.current) dirtySince.current = new Date()
    } else {
      // first time it's not dirty, set a date for lastSave
      if (!lastSave.current) lastSave.current = new Date()
    }
  }

  // Removes dirtySince when the queue is empty
  function onEmptyQueue() {
    if (dirtySince.current) {
      dirtySince.current = null
      setChanges(iterations++)
    }
  }

  // Sets dirtySince when the queue fills up
  function onEnqueueSteps() {
    if (!dirtySince.current) {
      dirtySince.current = new Date()
      setChanges(iterations++)
    }
  }

  // Sets the last save date
  function onSuccessfulPatch() {
    lastSave.current = new Date()
    setChanges(iterations++)
  }

  useEffect(
    () => {
      if (channel) {
        channel.on('emptyQueue', onEmptyQueue)
        channel.on('enqueueSteps', onEnqueueSteps)
        channel.on('successfulPatch', onSuccessfulPatch)
        return function() {
          channel.off('emptyQueue', onEmptyQueue)
          channel.off('enqueueSteps', onEnqueueSteps)
          channel.off('successfulPatch', onSuccessfulPatch)
        }
      }
    },
    [provider, channel]
  )

  return {
    dirtySince: dirtySince.current,
    lastSave: lastSave.current,
    isDirty: !!dirtySince.current,
    dirtyRef: dirtySince
  }
}

export default useCollaborationState
