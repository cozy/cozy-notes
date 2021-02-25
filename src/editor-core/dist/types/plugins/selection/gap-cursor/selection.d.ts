import { Selection } from 'prosemirror-state';
import { Mapping } from 'prosemirror-transform';
import { Slice, ResolvedPos, Node as PMNode } from 'prosemirror-model';
export declare enum Side {
    LEFT = "left",
    RIGHT = "right"
}
export declare const JSON_ID = "gapcursor";
export declare class GapCursorSelection extends Selection {
    readonly side: Side;
    readonly visible: boolean;
    /**
     * Construct a GapCursorSelection
     * @param {ResolvedPos} $pos resolved position
     * @param {Side} side side where the gap cursor is drawn
     */
    constructor($pos: ResolvedPos, side?: Side);
    static valid($pos: ResolvedPos): boolean;
    static findFrom($pos: ResolvedPos, dir: number, mustMove?: boolean): GapCursorSelection | null;
    static fromJSON(doc: PMNode, json: {
        pos: number;
        type: string;
        side: Side;
    }): GapCursorSelection;
    map(doc: PMNode, mapping: Mapping): Selection;
    eq(other: Selection): boolean;
    content(): Slice<any>;
    getBookmark(): GapBookmark;
    toJSON(): {
        pos: number;
        type: string;
        side: Side;
    };
}
export declare class GapBookmark {
    private readonly pos;
    constructor(pos: number);
    map(mapping: any): GapBookmark;
    resolve(doc: PMNode): GapCursorSelection | Selection;
}
