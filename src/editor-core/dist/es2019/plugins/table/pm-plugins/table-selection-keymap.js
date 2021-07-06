import { keymap } from 'prosemirror-keymap'
import { bindKeymapWithCommand, moveRight, moveLeft } from '../../../keymaps'
import { arrowLeftFromTable, arrowRightFromTable } from '../commands/selection'
export function tableSelectionKeymapPlugin() {
  const list = {}
  bindKeymapWithCommand(moveRight.common, arrowRightFromTable, list)
  bindKeymapWithCommand(moveLeft.common, arrowLeftFromTable, list)
  return keymap(list)
}
export default tableSelectionKeymapPlugin
