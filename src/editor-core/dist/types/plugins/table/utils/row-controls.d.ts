import { Schema } from 'prosemirror-model';
import { Selection, Transaction } from 'prosemirror-state';
export interface RowParams {
    startIndex: number;
    endIndex: number;
    height: number;
}
export declare const getRowHeights: (tableRef: HTMLTableElement) => number[];
export declare const isRowDeleteButtonVisible: (selection: Selection) => boolean;
export declare const getRowDeleteButtonParams: (rowsHeights: Array<number | undefined>, selection: Selection, offsetTop?: number) => {
    top: number;
    indexes: number[];
} | null;
export declare const getRowsParams: (rowsHeights: Array<number | undefined>) => RowParams[];
export declare const getRowClassNames: (index: number, selection: Selection, hoveredRows?: number[], isInDanger?: boolean | undefined, isResizing?: boolean | undefined) => string;
export declare const copyPreviousRow: (schema: Schema) => (insertNewRowIndex: number) => (tr: Transaction) => Transaction<any>;
