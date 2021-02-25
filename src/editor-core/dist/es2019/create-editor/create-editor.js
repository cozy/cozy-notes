import { ErrorReporter } from '@atlaskit/editor-common'
import { sortByOrder } from './sort-by-order'
import { InstrumentedPlugin } from '../utils/performance/instrumented-plugin'
export function sortByRank(a, b) {
  return a.rank - b.rank
}
export function fixExcludes(marks) {
  const markKeys = Object.keys(marks)
  const markGroups = new Set(markKeys.map(mark => marks[mark].group))
  markKeys.forEach(markKey => {
    const mark = marks[markKey]

    if (mark.excludes) {
      mark.excludes = mark.excludes
        .split(' ')
        .filter(group => markGroups.has(group))
        .join(' ')
    }
  })
  return marks
}
export function processPluginsList(plugins) {
  console.log('rest')
  /**
   * First pass to collect pluginsOptions
   */
  const pluginsOptions = plugins.reduce((acc, plugin) => {
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

  return plugins.reduce(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(
          ...plugin.pmPlugins(
            plugin.name ? pluginsOptions[plugin.name] : undefined
          )
        )
      }

      if (plugin.nodes) {
        acc.nodes.push(...plugin.nodes())
      }

      if (plugin.marks) {
        acc.marks.push(...plugin.marks())
      }

      if (plugin.contentComponent) {
        acc.contentComponents.push(plugin.contentComponent)
      }

      if (plugin.primaryToolbarComponent) {
        acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent)
      }

      if (plugin.secondaryToolbarComponent) {
        acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent)
      }

      if (plugin.onEditorViewStateUpdated) {
        acc.onEditorViewStateUpdatedCallbacks.push({
          pluginName: plugin.name,
          callback: plugin.onEditorViewStateUpdated
        })
      }

      return acc
    },
    {
      nodes: [],
      marks: [],
      pmPlugins: [],
      contentComponents: [],
      primaryToolbarComponents: [],
      secondaryToolbarComponents: [],
      onEditorViewStateUpdatedCallbacks: []
    }
  )
}
const TRACKING_DEFAULT = {
  enabled: false
}
export function createPMPlugins(config) {
  const { editorConfig, performanceTracking = {}, ...rest } = config
  const {
    uiTracking = TRACKING_DEFAULT,
    transactionTracking = TRACKING_DEFAULT
  } = performanceTracking
  const instrumentPlugin =
    uiTracking.enabled || transactionTracking.enabled
      ? plugin =>
          InstrumentedPlugin.fromPlugin(plugin, {
            uiTracking,
            transactionTracking
          })
      : plugin => plugin
  return editorConfig.pmPlugins
    .sort(sortByOrder('plugins'))
    .map(({ plugin }) => plugin(rest))
    .filter(plugin => typeof plugin !== 'undefined')
    .map(instrumentPlugin)
}
export function createErrorReporter(errorReporterHandler) {
  const errorReporter = new ErrorReporter()

  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler
  }

  return errorReporter
}
