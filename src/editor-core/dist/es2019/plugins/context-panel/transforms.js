import { pluginKey } from './';
export const applyChange = tr => tr.setMeta(pluginKey, {
  changed: true
});