import { pmHistoryPluginKey } from './pm-history-types';
export const getPmHistoryPlugin = state => {
  return state.plugins.find(plugin => plugin.key === pmHistoryPluginKey);
};
export const getPmHistoryPluginState = state => {
  const pmHistoryPlugin = getPmHistoryPlugin(state);

  if (!pmHistoryPlugin) {
    return;
  }

  return pmHistoryPlugin.getState(state);
};