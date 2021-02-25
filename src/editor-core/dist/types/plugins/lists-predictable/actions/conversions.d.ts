import { Transaction } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
export declare function convertListType({ tr, nextListNodeType, }: {
    tr: Transaction;
    nextListNodeType: NodeType;
}): void;
