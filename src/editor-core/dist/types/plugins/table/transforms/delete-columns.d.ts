import { Transaction } from 'prosemirror-state';
import { Rect } from '@atlaskit/editor-tables/table-map';
export declare const deleteColumns: (rect: Rect, allowAddColumnCustomStep?: boolean) => (tr: Transaction) => Transaction;
