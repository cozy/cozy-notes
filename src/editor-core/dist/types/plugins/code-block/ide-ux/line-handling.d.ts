import { EditorState } from 'prosemirror-state';
export declare const isSelectionEntirelyInsideCodeBlock: (state: EditorState) => boolean;
export declare const isCursorInsideCodeBlock: (state: EditorState) => boolean;
export declare const getStartOfCurrentLine: (state: EditorState) => {
    text: string;
    pos: number;
};
export declare const getEndOfCurrentLine: (state: EditorState) => {
    text: string;
    pos: number;
};
export declare function getLinesFromSelection(state: EditorState): {
    text: string;
    start: number;
    end: number;
};
export declare const forEachLine: (text: string, callback: (line: string, offset: number) => void) => void;
export declare const getLineInfo: (line: string) => {
    indentToken: {
        token: string;
        size: number;
        regex: RegExp;
    };
    indentText: string;
};
