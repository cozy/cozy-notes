import { toggleMark } from 'prosemirror-commands';
import { Fragment, Slice } from 'prosemirror-model';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import { findWrapping, liftTarget } from 'prosemirror-transform';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { FakeTextCursorSelection } from '../plugins/fake-text-cursor/cursor';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { isNodeEmpty } from './document';
import { atTheBeginningOfDoc, atTheEndOfDoc } from './prosemirror/position';
import { closest } from './dom';
export { isEmptyParagraph, hasVisibleContent, isNodeEmpty, isEmptyDocument, processRawValue, getStepRange, findFarthestParentNode, isSelectionEndOfParagraph, nodesBetweenChanged, getNodesCount } from './document';
export { cascadeCommands, getEditorValueWithMedia } from './action';
export { isMarkAllowedInRange, isMarkExcluded, removeBlockMarks, sanitiseSelectionMarksForWrapping, sanitiseMarksInSelection } from './mark';
export { isNodeTypeParagraph } from './nodes';
export { isChromeWithSelectionBug, normaliseNestedLayout, setNodeSelection, setAllSelection, setGapCursorSelection, setCellSelection, setTextSelection, isValidPosition } from './selection';
export { containsClassName } from './dom';

function validateNode(_node) {
  return false;
}

function isMarkTypeCompatibleWithMark(markType, mark) {
  return !mark.type.excludes(markType) && !markType.excludes(mark.type);
}

function isMarkTypeAllowedInNode(markType, state) {
  return toggleMark(markType)(state);
}

export function canMoveUp(state) {
  const {
    selection,
    doc
  } = state;
  /**
   * If there's a media element on the selection,
   * add text blocks with arrow navigation.
   * Also, the selection could be media | mediaGroup.
   */

  if (selection instanceof NodeSelection) {
    if (selection.node.type.name === 'media') {
      /** Weird way of checking if the previous element is a paragraph */
      const mediaAncestorNode = doc.nodeAt(selection.anchor - 3);
      return !!(mediaAncestorNode && mediaAncestorNode.type.name === 'paragraph');
    } else if (selection.node.type.name === 'mediaGroup') {
      const mediaGroupAncestorNode = selection.$anchor.nodeBefore;
      return !!(mediaGroupAncestorNode && mediaGroupAncestorNode.type.name === 'paragraph');
    }
  }

  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return !atTheBeginningOfDoc(state);
}
export function canMoveDown(state) {
  const {
    selection,
    doc
  } = state;
  /**
   * If there's a media element on the selection,
   * add text blocks with arrow navigation.
   * Also, the selection could be media | mediaGroup.
   */

  if (selection instanceof NodeSelection) {
    if (selection.node.type.name === 'media') {
      const nodeAfter = doc.nodeAt(selection.$head.after());
      return !!(nodeAfter && nodeAfter.type.name === 'paragraph');
    } else if (selection.node.type.name === 'mediaGroup') {
      return !(selection.$head.parentOffset === selection.$anchor.parent.content.size);
    }
  }

  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return !atTheEndOfDoc(state);
}
export function isSelectionInsideLastNodeInDocument(selection) {
  const docNode = selection.$anchor.node(0);
  const rootNode = selection.$anchor.node(1);
  return docNode.lastChild === rootNode;
}
export function getCursor(selection) {
  return selection.$cursor || undefined;
}
/**
 * Check if a mark is allowed at the current selection / cursor based on a given state.
 * This method looks at both the currently active marks on the transaction, as well as
 * the node and marks at the current selection to determine if the given mark type is
 * allowed.
 */

export function isMarkTypeAllowedInCurrentSelection(markType, state) {
  if (state.selection instanceof FakeTextCursorSelection) {
    return true;
  }

  if (!isMarkTypeAllowedInNode(markType, state)) {
    return false;
  }

  const {
    empty,
    $cursor,
    ranges
  } = state.selection;

  if (empty && !$cursor) {
    return false;
  }

  let isCompatibleMarkType = mark => isMarkTypeCompatibleWithMark(markType, mark); // Handle any new marks in the current transaction


  if (state.tr.storedMarks && !state.tr.storedMarks.every(isCompatibleMarkType)) {
    return false;
  }

  if ($cursor) {
    return $cursor.marks().every(isCompatibleMarkType);
  } // Check every node in a selection - ensuring that it is compatible with the current mark type


  return ranges.every(({
    $from,
    $to
  }) => {
    let allowedInActiveMarks = $from.depth === 0 ? state.doc.marks.every(isCompatibleMarkType) : true;
    state.doc.nodesBetween($from.pos, $to.pos, node => {
      allowedInActiveMarks = allowedInActiveMarks && node.marks.every(isCompatibleMarkType);
    });
    return allowedInActiveMarks;
  });
}
export function createSliceWithContent(content, state) {
  return new Slice(Fragment.from(state.schema.text(content)), 0, 0);
}
/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */

export function canJoinDown(selection, doc, nodeType) {
  return checkNodeDown(selection, doc, node => node.type === nodeType);
}
export function checkNodeDown(selection, doc, filter) {
  const ancestorDepth = findAncestorPosition(doc, selection.$to).depth; // Top level node

  if (ancestorDepth === 0) {
    return false;
  }

  const res = doc.resolve(selection.$to.after(ancestorDepth));
  return res.nodeAfter ? filter(res.nodeAfter) : false;
}
/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */

export function canJoinUp(selection, doc, nodeType) {
  const res = doc.resolve(selection.$from.before(findAncestorPosition(doc, selection.$from).depth));
  return res.nodeBefore && res.nodeBefore.type === nodeType;
}
/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */

export function getGroupsInRange(doc, $from, $to, isNodeValid = validateNode) {
  const groups = Array();
  const commonAncestor = hasCommonAncestor(doc, $from, $to);
  const fromAncestor = findAncestorPosition(doc, $from);

  if (commonAncestor || fromAncestor.depth === 1 && isNodeValid($from.node(1))) {
    groups.push({
      $from,
      $to
    });
  } else {
    let current = $from;

    while (current.pos < $to.pos) {
      let ancestorPos = findAncestorPosition(doc, current);

      while (ancestorPos.depth > 1) {
        ancestorPos = findAncestorPosition(doc, ancestorPos);
      }

      const endPos = doc.resolve(Math.min( // should not be smaller then start position in case of an empty paragraph for example.
      Math.max(ancestorPos.start(ancestorPos.depth), ancestorPos.end(ancestorPos.depth) - 3), $to.pos));
      groups.push({
        $from: current,
        $to: endPos
      });
      current = doc.resolve(Math.min(endPos.after(1) + 1, doc.nodeSize - 2));
    }
  }

  return groups;
}
/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */

export function findAncestorPosition(doc, pos) {
  const nestableBlocks = ['blockquote', 'bulletList', 'orderedList'];

  if (pos.depth === 1) {
    return pos;
  }

  let node = pos.node(pos.depth);
  let newPos = pos;

  while (pos.depth >= 1) {
    pos = doc.resolve(pos.before(pos.depth));
    node = pos.node(pos.depth);

    if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
      newPos = pos;
    }
  }

  return newPos;
}
/**
 * Determine if two positions have a common ancestor.
 */

export function hasCommonAncestor(doc, $from, $to) {
  let current;
  let target;

  if ($from.depth > $to.depth) {
    current = findAncestorPosition(doc, $from);
    target = findAncestorPosition(doc, $to);
  } else {
    current = findAncestorPosition(doc, $to);
    target = findAncestorPosition(doc, $from);
  }

  while (current.depth > target.depth && current.depth > 1) {
    current = findAncestorPosition(doc, current);
  }

  return current.node(current.depth) === target.node(target.depth);
}
/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */

export function liftSelection(tr, doc, $from, $to) {
  let startPos = $from.start($from.depth);
  let endPos = $to.end($to.depth);
  const target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);
  tr.doc.nodesBetween(startPos, endPos, (node, pos) => {
    if (node.isText || // Text node
    node.isTextblock && !node.textContent // Empty paragraph
    ) {
        const res = tr.doc.resolve(tr.mapping.map(pos));
        const sel = new NodeSelection(res);
        const range = sel.$from.blockRange(sel.$to);

        if (liftTarget(range) !== undefined) {
          tr.lift(range, target);
        }
      }
  });
  startPos = tr.mapping.map(startPos);
  endPos = tr.mapping.map(endPos);
  endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node

  tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));
  return {
    tr: tr,
    $from: tr.doc.resolve(startPos),
    $to: tr.doc.resolve(endPos)
  };
}
/**
 * Lift nodes in block to one level above.
 */

export function liftSiblingNodes(view) {
  const {
    tr
  } = view.state;
  const {
    $from,
    $to
  } = view.state.selection;
  const blockStart = tr.doc.resolve($from.start($from.depth - 1));
  const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
  const range = blockStart.blockRange(blockEnd);
  view.dispatch(tr.lift(range, blockStart.depth - 1));
}
/**
 * Lift sibling nodes to document-level and select them.
 */

export function liftAndSelectSiblingNodes(view) {
  const {
    tr
  } = view.state;
  const {
    $from,
    $to
  } = view.state.selection;
  const blockStart = tr.doc.resolve($from.start($from.depth - 1));
  const blockEnd = tr.doc.resolve($to.end($to.depth - 1)); // TODO: [ts30] handle void and null properly

  const range = blockStart.blockRange(blockEnd);
  tr.setSelection(new TextSelection(blockStart, blockEnd));
  tr.lift(range, blockStart.depth - 1);
  return tr;
}
export function wrapIn(nodeType, tr, $from, $to) {
  const range = $from.blockRange($to);
  const wrapping = range && findWrapping(range, nodeType);

  if (wrapping) {
    tr = tr.wrap(range, wrapping).scrollIntoView();
  }

  return tr;
}
const transformer = new JSONTransformer();
export function toJSON(node) {
  return transformer.encode(node);
}
/**
 * Repeating string for multiple times
 */

export function stringRepeat(text, length) {
  let result = '';

  for (let x = 0; x < length; x++) {
    result += text;
  }

  return result;
}
/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */

export function arrayFrom(obj) {
  return Array.prototype.slice.call(obj);
}
/*
 * From Modernizr
 * Returns the kind of transitionevent available for the element
 */

export function whichTransitionEvent() {
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      // Use a generic as the return type because TypeScript doesnt know
      // about cross browser features, so we cast here to align to the
      // standard Event spec and propagate the type properly to the callbacks
      // of `addEventListener` and `removeEventListener`.
      return transitions[t];
    }
  }

  return;
}
/**
 * Function will create a list of wrapper blocks present in a selection.
 */

function getSelectedWrapperNodes(state) {
  const nodes = [];

  if (state.selection) {
    const {
      $from,
      $to
    } = state.selection;
    const {
      blockquote,
      panel,
      orderedList,
      bulletList,
      listItem,
      codeBlock,
      decisionItem,
      decisionList,
      taskItem,
      taskList
    } = state.schema.nodes;
    state.doc.nodesBetween($from.pos, $to.pos, node => {
      if (node.isBlock && [blockquote, panel, orderedList, bulletList, listItem, codeBlock, decisionItem, decisionList, taskItem, taskList].indexOf(node.type) >= 0) {
        nodes.push(node.type);
      }
    });
  }

  return nodes;
}
/**
 * Function will check if changing block types: Paragraph, Heading is enabled.
 */


export function areBlockTypesDisabled(state) {
  const nodesTypes = getSelectedWrapperNodes(state);
  const {
    panel
  } = state.schema.nodes;
  return nodesTypes.filter(type => type !== panel).length > 0;
}
export const isTemporary = id => {
  return id.indexOf('temporary:') === 0;
};
export const isEmptyNode = schema => {
  const {
    doc,
    paragraph,
    codeBlock,
    blockquote,
    panel,
    heading,
    listItem,
    bulletList,
    orderedList,
    taskList,
    taskItem,
    decisionList,
    decisionItem,
    media,
    mediaGroup,
    mediaSingle
  } = schema.nodes;

  const innerIsEmptyNode = node => {
    switch (node.type) {
      case media:
      case mediaGroup:
      case mediaSingle:
        return false;

      case paragraph:
      case codeBlock:
      case heading:
      case taskItem:
      case decisionItem:
        return node.content.size === 0;

      case blockquote:
      case panel:
      case listItem:
        return node.content.size === 2 && innerIsEmptyNode(node.content.firstChild);

      case bulletList:
      case orderedList:
        return node.content.size === 4 && innerIsEmptyNode(node.content.firstChild);

      case taskList:
      case decisionList:
        return node.content.size === 2 && innerIsEmptyNode(node.content.firstChild);

      case doc:
        let isEmpty = true;
        node.content.forEach(child => {
          isEmpty = isEmpty && innerIsEmptyNode(child);
        });
        return isEmpty;

      default:
        return isNodeEmpty(node);
    }
  };

  return innerIsEmptyNode;
};
export const insideTable = state => {
  const {
    table,
    tableCell
  } = state.schema.nodes;
  return hasParentNodeOfType([table, tableCell])(state.selection);
};
export const insideTableCell = state => {
  const {
    tableCell,
    tableHeader
  } = state.schema.nodes;
  return hasParentNodeOfType([tableCell, tableHeader])(state.selection);
};
export const isElementInTableCell = element => {
  return closest(element, 'td') || closest(element, 'th');
};
export const isLastItemMediaGroup = node => {
  const {
    content
  } = node;
  return !!content.lastChild && content.lastChild.type.name === 'mediaGroup';
};
export const isInLayoutColumn = state => {
  return hasParentNodeOfType(state.schema.nodes.layoutSection)(state.selection);
};
export const isInListItem = state => {
  return hasParentNodeOfType(state.schema.nodes.listItem)(state.selection);
};
export const hasOpenEnd = slice => {
  return slice.openStart > 0 || slice.openEnd > 0;
};
export function filterChildrenBetween(doc, from, to, predicate) {
  const results = [];
  doc.nodesBetween(from, to, (node, pos, parent) => {
    if (predicate(node, pos, parent)) {
      results.push({
        node,
        pos
      });
    }
  });
  return results;
}
export function dedupe(list = [], iteratee = p => p) {
  /**
              .,
    .      _,'f----.._
    |\ ,-'"/  |     ,'
    |,_  ,--.      /
    /,-. ,'`.     (_
    f  o|  o|__     "`-.
    ,-._.,--'_ `.   _.,-`
    `"' ___.,'` j,-'
      `-.__.,--'
    Gotta go fast!
  */
  const seen = new Set();
  list.forEach(l => seen.add(iteratee(l)));
  return list.filter(l => {
    const it = iteratee(l);

    if (seen.has(it)) {
      seen.delete(it);
      return true;
    }

    return false;
  });
}
export const isTextSelection = selection => selection instanceof TextSelection;
/** Helper type for single arg function */

/**
 * Compose 1 to n functions.
 * @param func first function
 * @param funcs additional functions
 */
export function compose(func, ...funcs) {
  const allFuncs = [func, ...funcs];
  return function composed(raw) {
    return allFuncs.reduceRight((memo, func) => func(memo), raw);
  };
}
// rest
export function pipe(...fns) {
  if (fns.length === 0) {
    return a => a;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)));
}
export function shallowEqual(obj1 = {}, obj2 = {}) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return keys1.length === keys2.length && keys1.reduce((acc, key) => acc && obj1[key] === obj2[key], true);
}
export function sum(arr, f) {
  return arr.reduce((val, x) => val + f(x), 0);
}
export function nonNullable(value) {
  return value !== null && value !== undefined;
}
export { SetAttrsStep } from '@atlaskit/adf-schema/steps';