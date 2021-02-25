import { PluginKey } from 'prosemirror-state';
export const pluginKey = new PluginKey('customAutoformatPlugin');
export const getPluginState = editorState => pluginKey.getState(editorState);
export const autoformatAction = (tr, action) => {
  return tr.setMeta(pluginKey, action);
};