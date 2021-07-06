import { receiveTransaction } from 'prosemirror-collab'
import { Step } from 'prosemirror-transform'
import { AllSelection, NodeSelection } from 'prosemirror-state'
import { replaceDocument } from './utils'
export const handleInit = (initData, view, options) => {
  const { doc, json, version } = initData

  if (doc) {
    const { state } = view
    const tr = replaceDocument(doc, state, version, options)
    tr.setMeta('isRemote', true)
    view.dispatch(tr)
  } else if (json) {
    applyRemoteSteps(json, undefined, view)
  }
}
export const handleConnection = (connectionData, view) => {
  const {
    state: { tr }
  } = view
  view.dispatch(tr.setMeta('sessionId', connectionData))
}
export const handlePresence = (presenceData, view) => {
  const {
    state: { tr }
  } = view
  view.dispatch(tr.setMeta('presence', presenceData))
}
export const applyRemoteData = (remoteData, view, options) => {
  const { json, userIds = [] } = remoteData

  if (json) {
    applyRemoteSteps(json, userIds, view, options)
  }
}
export const applyRemoteSteps = (json, userIds, view, options) => {
  if (!json || !json.length) {
    return
  }

  const {
    state,
    state: { schema }
  } = view
  const steps = json.map(step => Step.fromJSON(schema, step))
  let tr

  if (options && options.useNativePlugin && userIds) {
    tr = receiveTransaction(state, steps, userIds)
  } else {
    tr = state.tr
    steps.forEach(step => tr.step(step))
  }

  if (tr) {
    tr.setMeta('addToHistory', false)
    tr.setMeta('isRemote', true)
    const { from, to } = state.selection
    const [firstStep] = json
    /**
     * If the cursor is a the same position as the first step in
     * the remote data, we need to manually set it back again
     * in order to prevent the cursor from moving.
     */

    if (from === firstStep.from && to === firstStep.to) {
      tr.setSelection(state.selection.map(tr.doc, tr.mapping))
    }

    view.dispatch(tr)
  }
}
export const handleTelePointer = (telepointerData, view) => {
  const {
    state: { tr }
  } = view
  view.dispatch(tr.setMeta('telepointer', telepointerData))
}

function isAllSelection(selection) {
  return selection instanceof AllSelection
}

function isNodeSelection(selection) {
  return selection instanceof NodeSelection
}

export const getSendableSelection = selection => {
  /**
   * <kbd>CMD + A</kbd> triggers a AllSelection
   * <kbd>escape</kbd> triggers a NodeSelection
   */
  return {
    type: 'textSelection',
    anchor: selection.anchor,
    head:
      isAllSelection(selection) || isNodeSelection(selection)
        ? selection.head - 1
        : selection.head
  }
}
