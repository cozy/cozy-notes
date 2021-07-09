import { Transaction, EditorState } from 'prosemirror-state';
import {
  Node as PMNode,
  Mark as PMMark,
  Slice,
  Fragment,
  NodeType,
  MarkType,
  Schema,
} from 'prosemirror-model';
import { Step } from 'prosemirror-transform';
import { CardAppearance } from '@atlaskit/smart-card';

/**
 * Finds all top level nodes affected by the transaction
 * Uses from/to positions in transaction's steps to work out which nodes will
 * be changed by the transaction
 */
export const findChangedNodesFromTransaction = (tr: Transaction): PMNode[] => {
  const nodes: PMNode[] = [];
  const steps = (tr.steps || []) as (Step & {
    from: number;
    to: number;
    slice?: Slice;
  })[];

  steps.forEach((step) => {
    const { to, from, slice } = step;
    const size = slice && slice.content ? slice.content.size : 0;
    for (let i = from; i <= to + size; i++) {
      if (i <= tr.doc.content.size) {
        const topLevelNode = tr.doc.resolve(i).node(1);
        if (topLevelNode && !nodes.find((n) => n === topLevelNode)) {
          nodes.push(topLevelNode);
        }
      }
    }
  });

  return nodes;
};

export const validNode = (node: PMNode): boolean => {
  try {
    node.check(); // this will throw an error if the node is invalid
  } catch (error) {
    return false;
  }
  return true;
};

/** Validates prosemirror nodes, and returns true only if all nodes are valid */
export const validateNodes = (nodes: PMNode[]): boolean =>
  nodes.every(validNode);

type PMEntities = PMNode | PMMark | null | undefined;

export const isType = (
  node: PMEntities,
  type: NodeType | MarkType | undefined,
) => type && node && node.type === type;

export const isParagraph = (node: PMEntities, schema: Schema) =>
  isType(node, schema.nodes.paragraph);

export const isText = (node: PMEntities, schema: Schema) =>
  isType(node, schema.nodes.text);

export const isLinkMark = (node: PMEntities, schema: Schema) =>
  isType(node, schema.marks.link);

export enum SelectedState {
  selectedInRange,
  selectedInside,
}

/**
 * Returns if the current selection from achor-head is selecting the node.
 * If the node is not selected then null is returned.
 * If the node is selected then an enum is returned that describes weather the node
 * is fully selected by a range or if the "inside" of the node has been selected or clicked.
 */
export const isNodeSelectedOrInRange = (
  anchorPosition: number,
  headPosition: number,
  nodePosition: number,
  nodeSize: number,
): SelectedState | null => {
  const rangeStart = Math.min(anchorPosition, headPosition);
  const rangeEnd = Math.max(anchorPosition, headPosition);
  const nodeStart = nodePosition;
  const nodeEnd = nodePosition + nodeSize;
  if (anchorPosition === headPosition) {
    return null;
  }
  if (
    (rangeStart <= nodeStart && nodeEnd < rangeEnd) ||
    (rangeStart < nodeStart && nodeEnd <= rangeEnd)
  ) {
    return SelectedState.selectedInRange;
  }
  if (nodeStart <= anchorPosition && headPosition <= nodeEnd) {
    return SelectedState.selectedInside;
  }
  return null;
};

/**
 * Checks if a particular node fragment is supported in the parent
 * @param state EditorState
 * @param fragment The fragment to be checked for
 */
export const isSupportedInParent = (
  state: EditorState,
  fragment: Fragment,
  currentAppearance?: CardAppearance,
): boolean => {
  const depth =
    currentAppearance === 'embed' || currentAppearance === 'block'
      ? undefined
      : -1;
  const parent = state.selection.$from.node(depth);
  return parent && parent.type.validContent(fragment);
};
