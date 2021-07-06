import { TableMap } from '@atlaskit/editor-tables/table-map'
import { CellSelection } from '@atlaskit/editor-tables/cell-selection'
import {
  findTable,
  getSelectionRangeInColumn,
  getSelectionRangeInRow,
  getSelectionRect,
  isSelectionType
} from '@atlaskit/editor-tables/utils'
export const isSelectionUpdated = (oldSelection, newSelection) =>
  !!(!newSelection && oldSelection) ||
  isSelectionType(oldSelection, 'cell') !==
    isSelectionType(newSelection, 'cell') ||
  (isSelectionType(oldSelection, 'cell') &&
    isSelectionType(newSelection, 'cell') &&
    oldSelection.ranges !== newSelection.ranges)

const isRectangularCellSelection = (selection, rect) => {
  const table = findTable(selection)

  if (!table) {
    return true
  }

  const { width, height, map } = TableMap.get(table.node)
  let indexTop = rect.top * width + rect.left
  let indexLeft = indexTop
  let indexBottom = (rect.bottom - 1) * width + rect.left
  let indexRight = indexTop + (rect.right - rect.left - 1)

  for (let i = rect.top; i < rect.bottom; i++) {
    if (
      (rect.left > 0 && map[indexLeft] === map[indexLeft - 1]) ||
      (rect.right < width && map[indexRight] === map[indexRight + 1])
    ) {
      return false
    }

    indexLeft += width
    indexRight += width
  }

  for (let i = rect.left; i < rect.right; i++) {
    if (
      (rect.top > 0 && map[indexTop] === map[indexTop - width]) ||
      (rect.bottom < height && map[indexBottom] === map[indexBottom + width])
    ) {
      return false
    }

    indexTop++
    indexBottom++
  }

  return true
}

export const normalizeSelection = tr => {
  const { selection } = tr
  const rect = getSelectionRect(selection)

  if (
    !rect ||
    !(selection instanceof CellSelection) ||
    isRectangularCellSelection(selection, rect)
  ) {
    return tr
  }

  if (selection.isColSelection()) {
    var _getSelectionRangeInC, _getSelectionRangeInC2

    const $anchor =
      (_getSelectionRangeInC = getSelectionRangeInColumn(rect.left)(tr)) ===
        null || _getSelectionRangeInC === void 0
        ? void 0
        : _getSelectionRangeInC.$anchor
    const $head =
      (_getSelectionRangeInC2 = getSelectionRangeInColumn(rect.right - 1)(
        tr
      )) === null || _getSelectionRangeInC2 === void 0
        ? void 0
        : _getSelectionRangeInC2.$head

    if ($anchor && $head) {
      return tr.setSelection(new CellSelection($anchor, $head))
    }
  }

  if (selection.isRowSelection()) {
    var _getSelectionRangeInR, _getSelectionRangeInR2

    const $anchor =
      (_getSelectionRangeInR = getSelectionRangeInRow(rect.top)(tr)) === null ||
      _getSelectionRangeInR === void 0
        ? void 0
        : _getSelectionRangeInR.$anchor
    const $head =
      (_getSelectionRangeInR2 = getSelectionRangeInRow(rect.bottom - 1)(tr)) ===
        null || _getSelectionRangeInR2 === void 0
        ? void 0
        : _getSelectionRangeInR2.$head

    if ($anchor && $head) {
      return tr.setSelection(new CellSelection($anchor, $head))
    }
  }

  return tr
}
export const getSelectedColumnIndexes = selectionRect => {
  const columnIndexes = []

  for (let i = selectionRect.left; i < selectionRect.right; i++) {
    columnIndexes.push(i)
  }

  return columnIndexes
}
export const getSelectedRowIndexes = selectionRect => {
  const rowIndexes = []

  for (let i = selectionRect.top; i < selectionRect.bottom; i++) {
    rowIndexes.push(i)
  }

  return rowIndexes
}
