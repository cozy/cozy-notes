import { Node as PMNode } from 'prosemirror-model';
import { ResizeState } from './types';
export declare const getResizeState: ({ minWidth, maxSize, table, tableRef, start, domAtPos, }: {
    minWidth: number;
    maxSize: number;
    table: PMNode;
    tableRef: HTMLTableElement;
    start: number;
    domAtPos: (pos: number) => {
        node: Node;
        offset: number;
    };
}) => ResizeState;
export declare const updateColgroup: (state: ResizeState, tableRef: HTMLElement) => void;
export declare const getTotalWidth: ({ cols }: ResizeState) => number;
export declare const adjustColumnsWidths: (resizeState: ResizeState, maxSize: number) => ResizeState;
export declare const evenAllColumnsWidths: (resizeState: ResizeState) => ResizeState;
export declare const bulkColumnsResize: (resizeState: ResizeState, columnsIndexes: number[], sourceColumnIndex: number) => ResizeState;
export declare const areColumnsEven: (resizeState: ResizeState) => boolean;
