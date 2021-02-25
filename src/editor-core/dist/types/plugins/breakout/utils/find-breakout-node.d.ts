import { Selection } from 'prosemirror-state';
import { ContentNodeWithPos } from 'prosemirror-utils';
/**
 * Find the nearest parent node to the selection that supports breakout, or if the nearest
 * matching parent node is the doc, return undefined.
 * For depth, if a node is selected and supports breakout, return the depth of the node.
 * @param selection Current editor selection
 */
export declare function findSupportedNodeForBreakout(selection: Selection): ContentNodeWithPos | undefined;
