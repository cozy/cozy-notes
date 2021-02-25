import { Transaction, Selection, EditorState } from 'prosemirror-state';
import { DecorationSet, EditorView } from 'prosemirror-view';
import { Node as PmNode, ResolvedPos } from 'prosemirror-model';
import { ContentNodeWithPos, NodeWithPos } from 'prosemirror-utils';
import { AnalyticsEventPayload } from '../analytics';
import { SelectionPluginState } from './types';
export declare function createSelectionClickHandler(nodes: string[], isValidTarget: (target: HTMLElement) => boolean, options: {
    useLongPressSelection: boolean;
    getNodeSelectionPos?: (state: EditorState, nodePos: number) => number;
}): (view: EditorView, pos: number, node: PmNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean;
export declare const getDecorations: (tr: Transaction) => DecorationSet;
export declare function getNodeSelectionAnalyticsPayload(selection: Selection): AnalyticsEventPayload | undefined;
export declare function getAllSelectionAnalyticsPayload(selection: Selection): AnalyticsEventPayload | undefined;
export declare function getCellSelectionAnalyticsPayload(state: EditorState): AnalyticsEventPayload | undefined;
/**
 * Use `getTopLevelNodesFromSelection` to collect and return
 * a list of only the outermost nodes of the given/passed `Selection`. This
 * function will ignore `paragraph` and `text` node types when collecting
 * top-level nodes. It will also ignore any top-level nodes that don't
 * completely sit within the given `Selection`.
 *
 * For example, using the following document:
 * ```
 * doc(p('{<}one'), blockquote(p('hello')), p(expand({ title: 'two' })(p('three'))), p('four{>}'))))
 * ```
 * we would expect `getTopLevelNodesFromSelection` to return:
 * ```
 * [blockquote(p('hello')), expand({ title: 'two' })(p('three')))]
 * ```
 */
export declare const getTopLevelNodesFromSelection: (selection: Selection, doc: PmNode) => {
    node: PmNode;
    pos: number;
}[];
export declare function getRangeSelectionAnalyticsPayload(selection: Selection, doc: PmNode): AnalyticsEventPayload | undefined;
export declare function shouldRecalcDecorations(pluginState: SelectionPluginState, state: EditorState): boolean;
export declare const isSelectableContainerNode: (node?: PmNode<any> | null | undefined) => boolean;
export declare const isSelectableChildNode: (node?: PmNode<any> | null | undefined) => boolean;
/**
 * Finds closest parent node that is a selectable block container node
 * If it finds a parent that is not selectable but supports gap cursor, will
 * return undefined
 */
export declare const findSelectableContainerParent: (selection: Selection) => ContentNodeWithPos | undefined;
/**
 * Finds node before that is a selectable block container node, starting
 * from $pos.depth + 1 and working in
 * If it finds a node that is not selectable but supports gap cursor, will
 * return undefined
 */
export declare const findSelectableContainerBefore: ($pos: ResolvedPos, doc: PmNode) => NodeWithPos | undefined;
/**
 * Finds node after that is a selectable block container node, starting
 * from $pos.depth + 1 and working in
 * If it finds a node that is not selectable but supports gap cursor, will
 * return undefined
 */
export declare const findSelectableContainerAfter: ($pos: ResolvedPos, doc: PmNode) => NodeWithPos | undefined;
/**
 * Finds first child node that is a selectable block container node OR that
 * supports gap cursor
 */
export declare const findFirstChildNodeToSelect: (parent: PmNode) => NodeWithPos | undefined;
/**
 * Finds last child node that is a selectable block container node OR that
 * supports gap cursor
 */
export declare const findLastChildNodeToSelect: (parent: PmNode) => NodeWithPos | undefined;
export declare const isSelectionAtStartOfParentNode: ($pos: ResolvedPos, selection: Selection) => boolean;
export declare const isSelectionAtEndOfParentNode: ($pos: ResolvedPos, selection: Selection) => boolean;
