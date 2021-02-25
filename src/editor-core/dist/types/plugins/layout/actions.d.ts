import { Node } from 'prosemirror-model';
import { Command } from '../../types/command';
import { EditorState, Transaction } from 'prosemirror-state';
import { Change, PresetLayout } from './types';
import { TOOLBAR_MENU_TYPE } from '../insert-block/ui/ToolbarInsertBlock/types';
export declare const TWO_COL_LAYOUTS: PresetLayout[];
export declare const THREE_COL_LAYOUTS: PresetLayout[];
/**
 * Finds layout preset based on the width attrs of all the layoutColumn nodes
 * inside the layoutSection node
 */
export declare const getPresetLayout: (section: Node) => PresetLayout | undefined;
export declare const getSelectedLayout: (maybeLayoutSection: Node | undefined, current: PresetLayout) => PresetLayout;
export declare const createDefaultLayoutSection: (state: EditorState) => Node<any>;
export declare const insertLayoutColumns: Command;
export declare const insertLayoutColumnsWithAnalytics: (inputMethod: TOOLBAR_MENU_TYPE) => Command;
export declare function forceSectionToPresetLayout(state: EditorState, node: Node, pos: number, presetLayout: PresetLayout): Transaction;
export declare const setPresetLayout: (layout: PresetLayout) => Command;
export declare const fixColumnSizes: (changedTr: Transaction, state: EditorState) => Change | undefined;
export declare const fixColumnStructure: (state: EditorState) => Transaction<any> | undefined;
export declare const deleteActiveLayoutNode: Command;
