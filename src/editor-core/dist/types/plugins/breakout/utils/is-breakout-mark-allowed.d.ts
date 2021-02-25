import { EditorState } from 'prosemirror-state';
/**
 * Check if breakout should be allowed for the current selection. If a node is selected,
 * can this node be broken out, if text, can the enclosing parent node be broken out.
 *
 * Currently breakout of a node is not possible if it's nested in anything but the document, however
 * this logic supports this changing.
 */
export declare function isBreakoutMarkAllowed(state: EditorState): boolean;
