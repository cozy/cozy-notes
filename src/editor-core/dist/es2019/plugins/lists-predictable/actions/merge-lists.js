import { isListNode } from '../utils/node';
export function mergeNextListAtPosition({
  tr,
  listPosition
}) {
  const listNodeAtPosition = tr.doc.nodeAt(listPosition);

  if (!isListNode(listNodeAtPosition)) {
    return;
  }

  const listPositionResolved = tr.doc.resolve(listPosition + listNodeAtPosition.nodeSize);
  const {
    pos,
    nodeAfter,
    nodeBefore
  } = listPositionResolved;

  if (!isListNode(nodeBefore) || !isListNode(nodeAfter)) {
    return;
  }

  if ((nodeAfter === null || nodeAfter === void 0 ? void 0 : nodeAfter.type.name) !== (nodeBefore === null || nodeBefore === void 0 ? void 0 : nodeBefore.type.name)) {
    const previousListPosition = pos - nodeBefore.nodeSize;
    tr.setNodeMarkup(previousListPosition, nodeAfter.type);
  }

  tr.join(pos);
}