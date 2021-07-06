import { Plugin, PluginKey } from 'prosemirror-state'
import { isAlignable } from '../commands'
import { getActiveAlignment } from '../utils'
export function createInitialPluginState(editorState, pluginConfig) {
  return {
    align: getActiveAlignment(editorState) || pluginConfig.align,
    isEnabled: true
  }
}
export const pluginKey = new PluginKey('alignmentPlugin')
export function createPlugin(dispatch, pluginConfig) {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_config, editorState) {
        return createInitialPluginState(editorState, pluginConfig)
      },

      apply(_tr, state, _prevState, nextState) {
        const nextPluginState = getActiveAlignment(nextState)
        const isEnabled = isAlignable(nextPluginState)(nextState)
        const newState = { ...state, align: nextPluginState, isEnabled }

        if (nextPluginState !== state.align || isEnabled !== state.isEnabled) {
          dispatch(pluginKey, newState)
        }

        return newState
      }
    }
  })
}
