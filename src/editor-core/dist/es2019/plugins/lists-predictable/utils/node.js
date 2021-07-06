import { Fragment } from 'prosemirror-model'
export function isDocumentNode(node) {
  return Boolean(node && node.type && node.type.name === 'doc')
}
export function isListNode(node) {
  return Boolean(
    node && node.type && ['orderedList', 'bulletList'].includes(node.type.name)
  )
}
export function isParagraphNode(node) {
  return Boolean(node && node.type && 'paragraph' === node.type.name)
}
export function isListItemNode(node) {
  return Boolean(node && node.type && 'listItem' === node.type.name)
}
export function isBulletList(node) {
  return Boolean(node && node.type && 'bulletList' === node.type.name)
}
export function isListNodeValidContent(node) {
  const { bulletList } = node.type.schema.nodes

  if (!bulletList) {
    return false
  }

  const listFragment = Fragment.from(bulletList.createAndFill())
  return !isListItemNode(node) && node.type.validContent(listFragment)
}
export let JoinDirection
;(function(JoinDirection) {
  JoinDirection[(JoinDirection['LEFT'] = 1)] = 'LEFT'
  JoinDirection[(JoinDirection['RIGHT'] = -1)] = 'RIGHT'
})(JoinDirection || (JoinDirection = {}))

export const joinSiblingLists = ({ tr, direction, forceListType }) => {
  const result = {
    orderedList: 0,
    bulletList: 0
  }
  const {
    doc,
    selection: { $from, $to },
    selection
  } = tr
  const range = $from.blockRange($to, isListNodeValidContent)

  if (!range) {
    return result
  }

  const rootListNode = doc.nodeAt(range.start)
  const from = isListNode(rootListNode) ? range.start : 0
  const to = isListNode(rootListNode) ? range.end : tr.doc.content.size
  const joins = []
  doc.nodesBetween(from, to, (node, pos, parent) => {
    const resolvedPos = doc.resolve(pos)
    const { nodeBefore, nodeAfter } = resolvedPos

    if (
      !nodeBefore ||
      !nodeAfter ||
      !isListNode(nodeBefore) ||
      !isListNode(nodeAfter)
    ) {
      return
    }

    const isNestedList = isListItemNode(parent)

    if (!isNestedList && nodeBefore.type !== nodeAfter.type && !forceListType) {
      return
    }

    const index = resolvedPos.index()
    const positionPreviousNode = resolvedPos.posAtIndex(index - 1)
    const positionCurrentNode = resolvedPos.posAtIndex(index)

    if (forceListType) {
      tr.setNodeMarkup(positionPreviousNode, forceListType)
      tr.setNodeMarkup(positionCurrentNode, forceListType)
    }

    if (isNestedList && nodeBefore.type !== nodeAfter.type) {
      const nodeType =
        direction === JoinDirection.RIGHT ? nodeAfter.type : nodeBefore.type
      tr.setNodeMarkup(positionPreviousNode, nodeType)
    }

    joins.push(pos)
  })

  if (selection.empty && rootListNode && isListNode(rootListNode)) {
    const resolvedPos = doc.resolve(range.start + rootListNode.nodeSize)
    const { nodeBefore, nodeAfter } = resolvedPos

    if (
      nodeBefore &&
      nodeAfter &&
      isListNode(nodeBefore) &&
      isListNode(nodeAfter) &&
      nodeAfter.type === nodeBefore.type
    ) {
      joins.push(resolvedPos.pos)
    }
  }

  for (let i = joins.length - 1; i >= 0; i--) {
    const listNode = tr.doc.nodeAt(joins[i])

    if (listNode) {
      const amount = result[listNode.type.name] || 0
      result[listNode.type.name] = amount + 1
    }

    tr.join(joins[i])
  }

  return result
}
