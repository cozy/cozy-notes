import { Node as PMNode } from 'prosemirror-model';
export interface ColumnState {
    index: number;
    width: number;
    minWidth: number;
}
export declare const getColumnStateFromDOM: (cells: HTMLElement[], index: number, minWidth: number) => ColumnState;
export declare const getFreeSpace: (state: ColumnState) => number;
export declare const getCellsRefsInColumn: (columnIndex: number, table: PMNode, tableStart: number, domAtPos: (pos: number) => {
    node: Node;
    offset: number;
}) => HTMLElement[];
export declare const calculateColumnWidth: (cells: HTMLElement[], calculateColumnWidthCb: (css: CSSStyleDeclaration, cellRef: HTMLElement, colSpan: number) => number) => number;
export declare const addContainerLeftRightPadding: (amount: number, css: CSSStyleDeclaration) => number;
