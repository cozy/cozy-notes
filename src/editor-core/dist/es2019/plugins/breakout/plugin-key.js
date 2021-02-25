import { PluginKey } from 'prosemirror-state';
export const pluginKey = new PluginKey('breakoutPlugin');
export const getPluginState = state => pluginKey.getState(state);