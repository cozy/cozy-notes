import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { stateKey } from '../pm-plugins/plugin-key';
export function keymapPlugin() {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.undo.common, ignoreLinksInSteps, list);
  keymaps.bindKeymapWithCommand(keymaps.enter.common, splitMediaGroup, list);
  keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, splitMediaGroup, list);
  return keymap(list);
}

const ignoreLinksInSteps = state => {
  const mediaPluginState = stateKey.getState(state);
  mediaPluginState.ignoreLinks = true;
  return false;
};

const splitMediaGroup = state => {
  const mediaPluginState = stateKey.getState(state);
  return mediaPluginState.splitMediaGroup();
};

export default keymapPlugin;