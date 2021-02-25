// Resize a given column by an amount from the current state
import { growColumn, shrinkColumn } from './resize-logic';
import { updateColgroup } from './resize-state';
export const resizeColumn = (resizeState, colIndex, amount, tableRef, selectedColumns) => {
  const newState = amount > 0 ? growColumn(resizeState, colIndex, amount, selectedColumns) : amount < 0 ? shrinkColumn(resizeState, colIndex, amount, selectedColumns) : resizeState;
  updateColgroup(newState, tableRef);
  return newState;
};