import { Node as PMNode } from 'prosemirror-model';
import { Selection, Transaction } from 'prosemirror-state';
import { StatusType } from './types';
export declare const mayGetStatusAtSelection: (selection: Selection) => StatusType | null;
export declare const mayGetStatusAtPos: (pos: number | null, doc: PMNode) => StatusType | null;
export declare const isEmptyStatus: (node: StatusType) => boolean;
export declare const setSelectionNearPos: (tr: Transaction, pos: number) => Transaction;
export declare const setNodeSelectionNearPos: (tr: Transaction, pos: number) => Transaction;
