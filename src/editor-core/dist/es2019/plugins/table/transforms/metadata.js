import { pluginKey } from '../pm-plugins/plugin-factory';
import { fireAnalytics } from './fix-tables'; // Set metadata on a ProseMirror transaction for debugging purposes in Synchrony

export const setMeta = meta => tr => {
  if ('problem' in meta) {
    // Send analytics event whenever we encounter with a problem
    fireAnalytics(meta);
  }

  return tr.setMeta(pluginKey, meta);
};