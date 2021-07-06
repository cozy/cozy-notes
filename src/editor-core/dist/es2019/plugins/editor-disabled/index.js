import { Plugin, PluginKey } from 'prosemirror-state'
import { pluginFactory } from '../../utils/plugin-state-factory'
export const pluginKey = new PluginKey('editorDisabledPlugin')

function reducer(_pluginState, meta) {
  return meta
}

const { createPluginState, getPluginState } = pluginFactory(pluginKey, reducer)
/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/

export function createPlugin(dispatch) {
  return new Plugin({
    key: pluginKey,
    state: createPluginState(dispatch, {
      editorDisabled: false
    }),
    view: () => {
      return {
        update(view) {
          if (getPluginState(view.state).editorDisabled !== !view.editable) {
            const tr = view.state.tr.setMeta(pluginKey, {
              editorDisabled: !view.editable
            })
            tr.setMeta('isLocal', true)
            view.dispatch(tr)
          }
        }
      }
    }
  })
}

const editorDisabledPlugin = () => ({
  name: 'editorDisabled',
  pmPlugins: () => [
    {
      name: 'editorDisabled',
      plugin: ({ dispatch }) => createPlugin(dispatch)
    }
  ]
})

export default editorDisabledPlugin
