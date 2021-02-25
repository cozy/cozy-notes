import { EditorState } from 'prosemirror-state';
export declare const contentInSelection: ({ selection, doc, }: EditorState) => {
    nodeTypes: string[];
    markTypes: string[];
};
