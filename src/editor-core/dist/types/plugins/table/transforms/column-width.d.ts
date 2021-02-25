import { Node as PMNode } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { ResizeState } from '../pm-plugins/table-resizing/utils';
export declare const updateColumnWidths: (resizeState: ResizeState, table: PMNode, start: number) => (tr: Transaction) => Transaction;
