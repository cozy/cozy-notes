import { Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const getColumnsWidths: (view: EditorView) => Array<number | undefined>;
export declare const isColumnDeleteButtonVisible: (selection: Selection) => boolean;
export declare const getColumnDeleteButtonParams: (columnsWidths: Array<number | undefined>, selection: Selection) => {
    left: number;
    indexes: number[];
} | null;
export declare const getColumnClassNames: (index: number, selection: Selection, hoveredColumns?: number[], isInDanger?: boolean | undefined, isResizing?: boolean | undefined) => string;
export declare const colWidthsForRow: (colGroup: HTMLTableColElement | null, tr: HTMLTableRowElement) => string;
