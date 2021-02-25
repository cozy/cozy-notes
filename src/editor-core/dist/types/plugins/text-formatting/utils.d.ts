import { MarkType, Mark as PMMark } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
export declare const nodeLen: (node: Node) => number;
export declare const isIgnorable: (dom: any) => boolean;
export declare const isBlockNode: (dom: any) => boolean;
export declare const domIndex: (node: Node | null) => number | undefined;
export declare const hasCode: (state: EditorState, pos: number) => boolean;
/**
 * Determine if a mark (with specific attribute values) exists anywhere in the selection.
 */
export declare const markActive: (state: EditorState, mark: PMMark) => boolean;
/**
 * Determine if a mark of a specific type exists anywhere in the selection.
 */
export declare const anyMarkActive: (state: EditorState, markType: MarkType) => boolean;
export declare const checkFormattingIsPresent: (state: EditorState) => boolean;
