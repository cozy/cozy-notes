// #region Imports
import { Selection } from 'prosemirror-state'
import { TableMap } from '@atlaskit/editor-tables/table-map'
import {
  addColumnAt as addColumnAtPMUtils,
  addRowAt,
  createTable as createTableNode,
  findTable,
  selectedRect
} from '@atlaskit/editor-tables/utils'
import { safeInsert } from 'prosemirror-utils'
import { AddColumnStep } from '@atlaskit/adf-schema/steps'
import { getPluginState } from '../pm-plugins/plugin-factory'
import { checkIfHeaderRowEnabled, copyPreviousRow } from '../utils'
import { getAllowAddColumnCustomStep } from '../utils/get-allow-add-column-custom-step' // #endregion

function addColumnAtCustomStep(column) {
  return tr => {
    const table = findTable(tr.selection)

    if (table) {
      return tr.step(AddColumnStep.create(tr.doc, table.pos, column))
    }

    return tr
  }
}

function addColumnAt(column, allowAddColumnCustomStep = false) {
  if (allowAddColumnCustomStep) {
    return addColumnAtCustomStep(column)
  }

  return addColumnAtPMUtils(column)
} // :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Command to add a column before the column with the selection.

export const addColumnBefore = (state, dispatch) => {
  const table = findTable(state.selection)

  if (!table) {
    return false
  }

  if (dispatch) {
    let rect = selectedRect(state)
    dispatch(
      addColumnAt(rect.left, getAllowAddColumnCustomStep(state))(state.tr)
    )
  }

  return true
} // :: (EditorState, dispatch: ?(tr: Transaction)) → bool
// Command to add a column after the column with the selection.

export const addColumnAfter = (state, dispatch) => {
  const table = findTable(state.selection)

  if (!table) {
    return false
  }

  if (dispatch) {
    let rect = selectedRect(state)
    dispatch(
      addColumnAt(rect.right, getAllowAddColumnCustomStep(state))(state.tr)
    )
  }

  return true
} // #region Commands

export const insertColumn = column => (state, dispatch) => {
  const tr = addColumnAt(column, getAllowAddColumnCustomStep(state))(state.tr)
  const table = findTable(tr.selection)

  if (!table) {
    return false
  } // move the cursor to the newly created column

  const pos = TableMap.get(table.node).positionAt(0, column, table.node)

  if (dispatch) {
    dispatch(tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))))
  }

  return true
}
export const insertRow = (row, moveCursorToTheNewRow) => (state, dispatch) => {
  // Don't clone the header row
  const headerRowEnabled = checkIfHeaderRowEnabled(state)
  const clonePreviousRow =
    (headerRowEnabled && row > 1) || (!headerRowEnabled && row > 0) // When the table have header row
  // we should not add row on the position zero

  if (row === 0 && headerRowEnabled) {
    return false
  }

  const tr = clonePreviousRow
    ? copyPreviousRow(state.schema)(row)(state.tr)
    : addRowAt(row)(state.tr)
  const table = findTable(tr.selection)

  if (!table) {
    return false
  }

  if (dispatch) {
    const { selection } = state

    if (moveCursorToTheNewRow) {
      // move the cursor to the newly created row
      const pos = TableMap.get(table.node).positionAt(row, 0, table.node)
      tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos)))
    } else {
      tr.setSelection(selection.map(tr.doc, tr.mapping))
    }

    dispatch(tr)
  }

  return true
}
export const createTable = (state, dispatch) => {
  if (!getPluginState(state)) {
    return false
  }

  const table = createTableNode(state.schema)

  if (dispatch) {
    dispatch(safeInsert(table)(state.tr).scrollIntoView())
  }

  return true
} // #endregion
