import { Node as PMNode } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
export declare function mergeCells(tr: Transaction): Transaction;
export declare function canMergeCells(tr: Transaction): boolean;
export declare function removeEmptyColumns(table: PMNode): PMNode | null;
