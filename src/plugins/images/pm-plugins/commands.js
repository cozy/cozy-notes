import { safeInsert } from 'prosemirror-utils'
import { createExternalMediaNode } from '../utils'
import { startUpload } from './actions'
import { stateKey } from './plugin-key'
export const insertExternalImage = options => (state, dispatch) => {
  console.log('insertExternalImage')
  const pluginState = stateKey.getState(state)

  if (!pluginState.enabled || !options.src) {
    return false
  }
  console.log('options', options)
  const mediaNode = createExternalMediaNode(options, state.schema)
  console.log({ mediaNode })
  if (!mediaNode) {
    return false
  }
  console.log('state', state)
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
