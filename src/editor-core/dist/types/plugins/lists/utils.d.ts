import { Schema, ResolvedPos, NodeType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
export declare const isWrappingPossible: (nodeType: NodeType, state: EditorState) => boolean;
export declare const isPosInsideParagraph: ($pos: ResolvedPos) => boolean;
export declare const isPosInsideList: ($pos: ResolvedPos) => boolean;
export declare const isInsideListItem: (state: EditorState) => boolean;
export declare const canJoinToPreviousListItem: (state: EditorState) => boolean;
export declare const canOutdent: (state: EditorState) => boolean;
export declare const getListLiftTarget: (schema: Schema, resPos: ResolvedPos) => number;
