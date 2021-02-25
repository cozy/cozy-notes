import { Transaction } from 'prosemirror-state';
declare type MergeNextListAtPositionProps = {
    listPosition: number;
    tr: Transaction;
};
export declare function mergeNextListAtPosition({ tr, listPosition, }: MergeNextListAtPositionProps): void;
export {};
