import { EditorState } from 'prosemirror-state';
import { NodeWithPos, DomAtPos } from 'prosemirror-utils';
export declare const getSelectedExtension: (state: EditorState, searchParent?: boolean) => import("prosemirror-utils").ContentNodeWithPos | undefined;
export declare const getSelectedNonContentExtension: ({ schema, selection, }: EditorState) => NodeWithPos | undefined;
export declare const getSelectedDomElement: (domAtPos: DomAtPos, selectedExtensionNode?: NodeWithPos | undefined, isContentExtension?: boolean) => HTMLElement | undefined;
