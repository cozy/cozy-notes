import { Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export declare type DecorationTransformer = ({ decorationSet, tr, }: {
    decorationSet: DecorationSet;
    tr: Transaction;
}) => DecorationSet;
