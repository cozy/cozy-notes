import { Node, NodeType, ResolvedPos } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Command } from '../../../types';
import { INPUT_METHOD } from '../../analytics';
export declare type InputMethod = INPUT_METHOD.KEYBOARD | INPUT_METHOD.TOOLBAR;
export declare const deletePreviousEmptyListItem: Command;
export declare const joinToPreviousListItem: Command;
export declare const enterKeyCommand: Command;
export declare const backspaceKeyCommand: Command;
export declare const deleteKeyCommand: Command;
export declare function outdentList(inputMethod?: InputMethod): Command;
export declare function indentList(inputMethod?: InputMethod): Command;
export declare function liftListItems(): Command;
/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it's possible for a selection to start or end at an empty node at the very end of
 * a line. This isn't obvious by looking at the editor and it's likely not what the
 * user intended - so we need to adjust the selection a bit in scenarios like that.
 */
export declare function adjustSelectionInList(doc: Node, selection: TextSelection): TextSelection;
export declare const rootListDepth: (pos: ResolvedPos, nodes: Record<string, NodeType>) => number | undefined;
export declare const numberNestedLists: (resolvedPos: ResolvedPos, nodes: Record<string, NodeType>) => number;
export declare const toggleList: (state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView, listType: 'bulletList' | 'orderedList', inputMethod: InputMethod) => boolean;
export declare function toggleListCommand(listType: 'bulletList' | 'orderedList'): Command;
export declare const toggleListCommandWithAnalytics: (inputMethod: InputMethod, listType: 'bulletList' | 'orderedList') => Command;
export declare function toggleBulletList(view: EditorView, inputMethod?: InputMethod): boolean;
export declare function toggleOrderedList(view: EditorView, inputMethod?: InputMethod): boolean;
export declare function wrapInList(nodeType: NodeType): Command;
