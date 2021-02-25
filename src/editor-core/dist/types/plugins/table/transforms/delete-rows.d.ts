import { Transaction } from 'prosemirror-state';
import { Rect } from '@atlaskit/editor-tables/table-map';
export declare const deleteRows: (rect: Rect, isHeaderRowRequired?: boolean) => (tr: Transaction) => Transaction;
