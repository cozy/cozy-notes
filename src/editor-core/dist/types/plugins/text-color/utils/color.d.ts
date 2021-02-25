import { EditorState } from 'prosemirror-state';
export declare const DEFAULT_COLOR: {
    color: string;
    label: string;
};
export declare const getActiveColor: (state: EditorState) => string | null;
