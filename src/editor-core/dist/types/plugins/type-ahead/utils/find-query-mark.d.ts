import { MarkType, Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
export declare function findQueryMark(mark: MarkType, doc: Node, from: number, to: number): {
    start: number;
    end: number;
};
export declare function findTypeAheadQuery(state: EditorState): {
    start: number;
    end: number;
};
