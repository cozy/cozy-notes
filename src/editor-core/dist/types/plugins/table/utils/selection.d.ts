import { Selection, Transaction } from 'prosemirror-state';
import { Rect } from '@atlaskit/editor-tables/table-map';
export declare const isSelectionUpdated: (oldSelection: Selection, newSelection?: Selection<any> | undefined) => boolean;
export declare const normalizeSelection: (tr: Transaction) => Transaction;
export declare const getSelectedColumnIndexes: (selectionRect: Rect) => number[];
export declare const getSelectedRowIndexes: (selectionRect: Rect) => number[];
