import { Slice, Schema } from 'prosemirror-model';
import { Transaction, Selection } from 'prosemirror-state';
export declare function liftFollowingList(from: number, to: number, rootListDepth: number, tr: Transaction): Transaction;
export declare function liftSelectionList(selection: Selection, tr: Transaction): Transaction;
export declare const splitParagraphs: (slice: Slice, schema: Schema) => Slice;
export declare const upgradeTextToLists: (slice: Slice, schema: Schema) => Slice;
