import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { INPUT_METHOD } from '../../analytics';
import { clearFormattingWithAnalytics } from '../commands/clear-formatting';
export function keymapPlugin() {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.clearFormatting.common, clearFormattingWithAnalytics(INPUT_METHOD.SHORTCUT), list);
  return keymap(list);
}
export default keymapPlugin;