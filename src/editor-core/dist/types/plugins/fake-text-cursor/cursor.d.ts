import { EditorState, Selection, SelectionBookmark, Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { Slice, Node, ResolvedPos } from 'prosemirror-model';
import { Mappable } from 'prosemirror-transform';
export declare class FakeTextCursorBookmark {
    pos: undefined | number;
    visible: boolean;
    constructor(pos: number);
    map(mapping: Mappable): FakeTextCursorBookmark;
    resolve(doc: Node): Selection;
}
export declare class FakeTextCursorSelection extends Selection {
    constructor($pos: ResolvedPos);
    map(doc: Node, mapping: Mappable): Selection;
    static content(): Slice;
    eq(other: Selection): boolean;
    toJSON(): {
        type: string;
        pos: number;
    };
    static fromJSON(doc: Node, json: {
        pos: number;
    }): Selection;
    getBookmark(): SelectionBookmark;
}
export declare const addFakeTextCursor: (state: EditorState, dispatch: (tr: Transaction) => void) => void;
export declare const removeFakeTextCursor: (state: EditorState, dispatch: (tr: Transaction) => void) => void;
export declare const drawFakeTextCursor: (state: EditorState) => DecorationSet | null;
