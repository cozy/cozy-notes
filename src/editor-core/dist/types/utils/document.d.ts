import { Node, Schema, ResolvedPos } from 'prosemirror-model';
import { Transaction, EditorState } from 'prosemirror-state';
import { ContentNodeWithPos } from 'prosemirror-utils';
import { ProviderFactory, Transformer } from '@atlaskit/editor-common';
import { DispatchAnalyticsEvent } from '../plugins/analytics/types/dispatch-analytics-event';
/**
 * Checks if node is an empty paragraph.
 */
export declare function isEmptyParagraph(node?: Node | null): boolean;
/**
 * Returns false if node contains only empty inline nodes and hardBreaks.
 */
export declare function hasVisibleContent(node: Node): boolean;
/**
 * Checks if a node has any content. Ignores node that only contain empty block nodes.
 */
export declare function isNodeEmpty(node?: Node): boolean;
/**
 * Checks if a node looks like an empty document
 */
export declare function isEmptyDocument(node: Node): boolean;
export declare function hasDocAsParent($anchor: ResolvedPos): boolean;
export declare function isInEmptyLine(state: EditorState): boolean;
export declare function bracketTyped(state: EditorState): boolean;
export declare function processRawValue(schema: Schema, value?: string | object, providerFactory?: ProviderFactory, sanitizePrivateContent?: boolean, contentTransformer?: Transformer<string>, dispatchAnalyticsEvent?: DispatchAnalyticsEvent): Node | undefined;
export declare const getStepRange: (transaction: Transaction) => {
    from: number;
    to: number;
} | null;
/**
 * Find the farthest node given a condition
 * @param predicate Function to check the node
 */
export declare const findFarthestParentNode: (predicate: (node: Node) => boolean) => ($pos: ResolvedPos) => ContentNodeWithPos | null;
export declare const isSelectionEndOfParagraph: (state: EditorState) => boolean;
export declare function nodesBetweenChanged(tr: Transaction, f: (node: Node<any>, pos: number, parent: Node<any>, index: number) => boolean | null | undefined | void, startPos?: number): void;
export declare function getNodesCount(node: Node): Record<string, number>;
