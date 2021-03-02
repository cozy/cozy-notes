import { safeInsert } from 'prosemirror-utils'
import { createExternalMediaNode } from '../utils'
import { startUpload } from './actions'
import { stateKey } from './plugin-key'
export const insertExternalImage = options => (state, dispatch) => {
  console.error('insertExternalImage')
  const pluginState = stateKey.getState(state)

  if (!pluginState.enabled || !options.src) {
    return false
  }

  const mediaNode = createExternalMediaNode(options.src, state.schema)
  console.error({ mediaNode })
  if (!mediaNode) {
    return false
  }
  console.error('state', state)
  if (dispatch) {
    dispatch(
      safeInsert(mediaNode, state.selection.$to.pos)(state.tr).scrollIntoView()
    )
  }

  return true
}
export const startImageUpload = event => (state, dispatch) => {
  const pluginState = stateKey.getState(state)

  if (!pluginState.enabled) {
    return false
  }

  if (dispatch) {
    dispatch(startUpload(event)(state.tr))
  }

  return true
}
