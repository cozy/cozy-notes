import { EditorState, Transaction } from 'prosemirror-state';
export declare function transformToCodeBlockAction(state: EditorState, attrs?: any): Transaction;
export declare function isConvertableToCodeBlock(state: EditorState): boolean;
