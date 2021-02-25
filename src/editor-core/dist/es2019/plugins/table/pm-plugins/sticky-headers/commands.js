import { createCommand } from './plugin-state';
export const updateStickyState = rowState => createCommand({
  name: 'UPDATE',
  state: rowState
}, tr => tr.setMeta('addToHistory', false));
export const removeStickyState = pos => createCommand({
  name: 'REMOVE',
  pos
}, tr => tr.setMeta('addToHistory', false));