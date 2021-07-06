import { getPluginState } from '../pm-plugins/plugin-factory'
export function getAllowAddColumnCustomStep(state) {
  const tablePluginState = getPluginState(state)
  return (
    Boolean(tablePluginState) &&
    Boolean(tablePluginState.pluginConfig.allowAddColumnWithCustomStep)
  )
}
