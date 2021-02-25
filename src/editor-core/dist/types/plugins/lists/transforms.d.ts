import { Slice, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
export declare function liftFollowingList(state: EditorState, from: number, to: number, rootListDepth: number, tr: Transaction): Transaction;
export declare function liftSelectionList(state: EditorState, tr: Transaction): Transaction;
export declare const splitParagraphs: (slice: Slice, schema: Schema) => Slice;
export declare const upgradeTextToLists: (slice: Slice, schema: Schema) => Slice;
