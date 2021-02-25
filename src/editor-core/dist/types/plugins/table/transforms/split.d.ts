import { Transaction } from 'prosemirror-state';
/**
 * Helper to split all the cells in a range of columns
 * @param tr
 * @param tablePos
 * @param columnStart - Start of the rect included (rect.left)
 * @param columnEnd - End of the rect not included (rect.right)
 */
export declare function splitCellsInColumns(tr: Transaction, tablePos: number, columnStart: number, columnEnd: number): Transaction;
