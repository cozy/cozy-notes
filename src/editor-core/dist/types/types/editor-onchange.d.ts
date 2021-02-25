import { EditorView } from 'prosemirror-view';
export declare type EditorOnChangeHandler = (editorView: EditorView, meta: {
    source: 'local' | 'remote';
}) => void;
