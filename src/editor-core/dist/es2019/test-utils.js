import { TextSelection } from 'prosemirror-state'
import { sortByOrder } from './create-editor/sort-by-order'
import { Preset } from './labs/next/presets/preset'
import { createSchema } from './create-editor/create-schema'
import basePlugin from './plugins/base'
export { Preset } from './labs/next/presets/preset'

function lightProcessPluginsList(editorPlugins) {
  /**
   * First pass to collect pluginsOptions
   */
  const pluginsOptions = editorPlugins.reduce((acc, plugin) => {
    if (plugin.pluginsOptions) {
      Object.keys(plugin.pluginsOptions).forEach(pluginName => {
        if (!acc[pluginName]) {
          acc[pluginName] = []
        }

        acc[pluginName].push(plugin.pluginsOptions[pluginName])
      })
    }

    return acc
  }, {})
  /**
   * Process plugins
   */

  return editorPlugins.reduce(
    (acc, editorPlugin) => {
      if (editorPlugin.pmPlugins) {
        acc.plugins.push(
          ...editorPlugin.pmPlugins(
            editorPlugin.name ? pluginsOptions[editorPlugin.name] : undefined
          )
        )
      }

      if (editorPlugin.marks) {
        acc.marks.push(...editorPlugin.marks())
      }

      if (editorPlugin.nodes) {
        acc.nodes.push(...editorPlugin.nodes())
      }

      if (editorPlugin.onEditorViewStateUpdated) {
        acc.onEditorViewStateUpdatedCallbacks.push(
          editorPlugin.onEditorViewStateUpdated
        )
      }

      return acc
    },
    {
      nodes: [],
      marks: [],
      plugins: [],
      onEditorViewStateUpdatedCallbacks: []
    }
  )
}

export const createPMSchemaAndPlugins = (
  preset = new Preset()
) => pluginFactoryParams => {
  let editorPlugins = []

  if (!preset.has(basePlugin)) {
    preset.add(basePlugin)
  }

  editorPlugins = preset.getEditorPlugins()
  const editorConfig = lightProcessPluginsList(editorPlugins)
  const schema = createSchema(editorConfig)
  const plugins = editorConfig.plugins
    .sort(sortByOrder('plugins'))
    .map(({ plugin }) => plugin({ ...pluginFactoryParams, schema }))
    .filter(plugin => !!plugin)
  return {
    plugins,
    schema,
    onEditorViewStateUpdatedCallbacks:
      editorConfig.onEditorViewStateUpdatedCallbacks
  }
}
export { PortalProviderAPI } from './ui/PortalProvider'
export { EventDispatcher } from './event-dispatcher'
export {
  GapCursorSelection,
  Side as GapCursorSide
} from './plugins/selection/gap-cursor/selection'
export function setTextSelection(view, anchor, head) {
  const { state } = view
  const tr = state.tr.setSelection(
    TextSelection.create(state.doc, anchor, head)
  )
  view.dispatch(tr)
}
