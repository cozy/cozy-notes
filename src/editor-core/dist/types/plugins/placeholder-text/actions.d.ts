import { EditorState, Transaction } from 'prosemirror-state';
export declare const showPlaceholderFloatingToolbar: (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
export declare const insertPlaceholderTextAtSelection: (value: string) => (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
export declare const hidePlaceholderFloatingToolbar: (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
