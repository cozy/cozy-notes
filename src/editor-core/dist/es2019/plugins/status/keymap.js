import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../keymaps';
import { mayGetStatusAtSelection } from './utils';
export function keymapPlugin() {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.enter.common, consumeKeyEvent, list);
  keymaps.bindKeymapWithCommand(keymaps.tab.common, consumeKeyEvent, list);
  return keymap(list);
} // consume event to prevent status node problems with positioning and selection

const consumeKeyEvent = (state, _dispatch) => !!mayGetStatusAtSelection(state.tr.selection);

export default keymapPlugin;