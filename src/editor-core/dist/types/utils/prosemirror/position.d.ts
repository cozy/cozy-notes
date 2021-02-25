import { ResolvedPos } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
export declare function atTheEndOfDoc(state: EditorState): boolean;
export declare function atTheBeginningOfDoc(state: EditorState): boolean;
export declare function atTheEndOfBlock(state: EditorState): boolean;
export declare function atTheBeginningOfBlock(state: EditorState): boolean;
export declare function startPositionOfParent(resolvedPos: ResolvedPos): number;
export declare function endPositionOfParent(resolvedPos: ResolvedPos): number;
