import { TableDecorations } from '../../../types';
import { createResizeHandleDecoration, updateDecorations } from '../../../utils/decoration';
import { composeDecorations } from './compose-decorations';
const emptyDecorations = [[], []];

const updateColumnResizeHandle = columnResizesDecorations => ({
  decorationSet,
  tr
}) => updateDecorations(tr.doc, decorationSet, columnResizesDecorations, TableDecorations.COLUMN_RESIZING_HANDLE);

const updateLastCellElement = lastCellElementsDecorations => ({
  decorationSet,
  tr
}) => updateDecorations(tr.doc, decorationSet, lastCellElementsDecorations, TableDecorations.LAST_CELL_ELEMENT);

export const buildColumnResizingDecorations = columnEndIndex => ({
  tr,
  decorationSet
}) => {
  const [columnResizesDecorations, lastCellElementsDecorations] = columnEndIndex < 0 ? emptyDecorations : createResizeHandleDecoration(tr, {
    right: columnEndIndex
  });
  return composeDecorations([updateColumnResizeHandle(columnResizesDecorations), updateLastCellElement(lastCellElementsDecorations)])({
    decorationSet,
    tr
  });
};