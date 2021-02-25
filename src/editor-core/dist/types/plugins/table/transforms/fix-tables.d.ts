import { Node as PMNode } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const fireAnalytics: (properties?: {}) => Promise<Response>;
export declare const removeExtraneousColumnWidths: (node: PMNode, basePos: number, tr: Transaction) => boolean;
export declare const fixTables: (tr: Transaction) => Transaction | undefined;
export declare const fixAutoSizedTable: (view: EditorView, tableNode: PMNode, tableRef: HTMLTableElement, tablePos: number, opts: {
    dynamicTextSizing: boolean;
    containerWidth: number;
}) => Transaction;
