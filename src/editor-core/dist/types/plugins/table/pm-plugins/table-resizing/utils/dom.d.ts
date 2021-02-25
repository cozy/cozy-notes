import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const updateControls: (state: EditorState) => void;
export declare const isClickNear: (event: MouseEvent, click: {
    x: number;
    y: number;
}) => boolean;
export declare const getResizeCellPos: (view: EditorView, event: MouseEvent, lastColumnResizable: boolean) => number | null;
export declare const updateStickyMargins: (table: HTMLElement) => void;
export declare const applyColWidthsToStickyRow: (colGroup: HTMLTableColElement | null, headerRow: HTMLTableRowElement) => void;
export declare const syncStickyRowToTable: (tableRef?: HTMLElement | null | undefined) => void;
export declare const applyTableWidthToStickyRow: (tableRef: HTMLElement, headerRow: HTMLTableRowElement) => void;
