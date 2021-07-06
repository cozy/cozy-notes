import { Plugin, PluginKey } from 'prosemirror-state'
export const pluginKey = new PluginKey('widthPlugin')
export function createPlugin(dispatch) {
  return new Plugin({
    key: pluginKey,
    state: {
      init: () => ({
        width: document.body.offsetWidth
      }),

      apply(tr, pluginState) {
        const meta = tr.getMeta(pluginKey)

        if (!meta) {
          return pluginState
        }

        const newPluginState = { ...pluginState, ...meta }

        if (
          newPluginState &&
          (pluginState.width !== newPluginState.width ||
            pluginState.lineLength !== newPluginState.lineLength)
        ) {
          dispatch(pluginKey, newPluginState)
          return newPluginState
        }

        return pluginState
      }
    }
  })
}

const widthPlugin = () => ({
  name: 'width',
  pmPlugins: () => [
    {
      name: 'width',
      plugin: ({ dispatch }) => createPlugin(dispatch)
    }
  ],

  // do this early here, otherwise we have to wait for WidthEmitter to debounce
  // which causes anything dependent on lineLength to jump around
  contentComponent({ editorView, containerElement }) {
    const newState = {
      lineLength: editorView.dom.clientWidth
    }

    if (containerElement) {
      newState.width = containerElement.offsetWidth
    }

    const tr = editorView.state.tr.setMeta(pluginKey, newState)
    editorView.dispatch(tr)
    return null
  }
})

export default widthPlugin
