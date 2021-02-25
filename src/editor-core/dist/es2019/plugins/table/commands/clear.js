// #region Imports
import { Selection } from 'prosemirror-state';
import { findCellClosestToPos, emptyCell, isSelectionType } from '@atlaskit/editor-tables/utils';
// #endregion
// #region Commands
export const clearMultipleCells = targetCellPosition => (state, dispatch) => {
  let cursorPos;
  let {
    tr
  } = state;

  if (isSelectionType(tr.selection, 'cell')) {
    const selection = tr.selection;
    selection.forEachCell((_node, pos) => {
      const $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
      tr = emptyCell(findCellClosestToPos($pos), state.schema)(tr);
    });
    cursorPos = selection.$headCell.pos;
  } else if (targetCellPosition) {
    const cell = findCellClosestToPos(tr.doc.resolve(targetCellPosition + 1));
    tr = emptyCell(cell, state.schema)(tr);
    cursorPos = cell.pos;
  }

  if (tr.docChanged && cursorPos) {
    const $pos = tr.doc.resolve(tr.mapping.map(cursorPos));
    const textSelection = Selection.findFrom($pos, 1, true);

    if (textSelection) {
      tr.setSelection(textSelection);
    }

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  }

  return false;
};
export const clearSelection = (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setSelection(Selection.near(state.selection.$from)).setMeta('addToHistory', false));
  }

  return true;
}; // #endregion