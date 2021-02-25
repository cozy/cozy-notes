import { findParentNodeClosestToPos } from 'prosemirror-utils';
import { isListNode, isListItemNode } from './node';
export function findFirstNestedList($pos) {
  const currentNode = $pos.doc.nodeAt($pos.pos);
  let currentListItemPos = null;

  if (isListItemNode(currentNode)) {
    currentListItemPos = $pos.pos;
  } else {
    const result = findParentNodeClosestToPos($pos, isListItemNode);
    currentListItemPos = (result === null || result === void 0 ? void 0 : result.pos) || null;
  }

  if (!currentListItemPos) {
    return null;
  }

  const currentListItemNode = $pos.doc.nodeAt(currentListItemPos);

  if (!currentListItemNode) {
    return null;
  }

  const lastListItemChild = currentListItemNode.child(currentListItemNode.childCount - 1);

  if (!isListNode(lastListItemChild)) {
    return null;
  }

  const firstNestedListPosition = currentListItemNode.nodeSize - lastListItemChild.nodeSize;
  const firstNestedListNode = $pos.doc.nodeAt(firstNestedListPosition);

  if (!isListNode(firstNestedListNode)) {
    return null;
  }

  return $pos.doc.resolve(firstNestedListPosition);
}
export function findFirstParentListNode($pos) {
  const currentNode = $pos.doc.nodeAt($pos.pos);
  let listNodePosition = null;

  if (isListNode(currentNode)) {
    listNodePosition = $pos.pos;
  } else {
    const result = findParentNodeClosestToPos($pos, isListNode);
    listNodePosition = result && result.pos;
  }

  if (listNodePosition == null) {
    return null;
  }

  const node = $pos.doc.nodeAt(listNodePosition);

  if (!node) {
    return null;
  }

  return {
    node,
    pos: listNodePosition
  };
}
export function findFirstParentListItemNode($pos) {
  const currentNode = $pos.doc.nodeAt($pos.pos);
  const listItemNodePosition = isListItemNode(currentNode) ? $pos : findParentNodeClosestToPos($pos, isListItemNode);

  if (!listItemNodePosition || listItemNodePosition.pos === null) {
    return null;
  }

  const node = $pos.doc.nodeAt(listItemNodePosition.pos);

  if (!node) {
    return null;
  }

  return {
    node: node,
    pos: listItemNodePosition.pos
  };
}
export function findRootParentListNode($pos) {
  const {
    doc
  } = $pos;

  if ($pos.depth === 0) {
    return doc.resolve($pos.pos + 1);
  }

  const currentNode = doc.nodeAt($pos.pos);
  const beforePosition = $pos.before();
  const nodeBefore = doc.nodeAt(beforePosition);

  if (isListNode(currentNode) && !isListItemNode(nodeBefore)) {
    return doc.resolve($pos.pos + 1);
  }

  const parentList = findParentNodeClosestToPos($pos, isListNode);

  if (!parentList) {
    return null;
  }

  const listNodePosition = doc.resolve(parentList.pos);
  return findRootParentListNode(listNodePosition);
}