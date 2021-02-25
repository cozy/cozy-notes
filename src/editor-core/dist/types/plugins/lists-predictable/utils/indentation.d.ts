import { ResolvedPos } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
export declare const getListLiftTarget: (resPos: ResolvedPos) => number;
export declare const getNextSiblingListItemPosition: ($pos: ResolvedPos) => ResolvedPos | null;
export declare const hasValidListIndentationLevel: ({ tr, maxIndentation, }: {
    tr: Transaction;
    maxIndentation: number;
}) => boolean;
