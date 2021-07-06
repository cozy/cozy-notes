import { findSelectedNodeOfType, findParentNodeOfType } from 'prosemirror-utils'
import { Slice, Fragment } from 'prosemirror-model'
import { mapChildren } from '../../utils/slice'
export const findExpand = (state, selection) => {
  const { expand, nestedExpand } = state.schema.nodes
  return (
    findSelectedNodeOfType([expand, nestedExpand])(
      selection || state.selection
    ) ||
    findParentNodeOfType([expand, nestedExpand])(selection || state.selection)
  )
} // If the top level is a single expand, and the expand is not
// a part of copied content, then return unwrap contents.
// This is needed for handling content copied from expand.
// https://product-fabric.atlassian.net/browse/ED-9146

export const transformSliceToRemoveOpenExpand = (slice, schema) => {
  if (
    slice.openStart > 1 &&
    slice.openEnd > 1 &&
    slice.content.childCount === 1 &&
    slice.content.firstChild &&
    slice.content.firstChild.type === schema.nodes.expand
  ) {
    return new Slice(
      slice.content.firstChild.content,
      slice.openStart - 1,
      slice.openEnd - 1
    )
  }

  return slice
}
export const transformSliceNestedExpandToExpand = (slice, schema) => {
  const { expand, nestedExpand } = schema.nodes
  const children = []
  mapChildren(slice.content, node => {
    if (node.type === nestedExpand) {
      children.push(expand.createChecked(node.attrs, node.content, node.marks))
    } else {
      children.push(node)
    }
  })
  return new Slice(Fragment.fromArray(children), slice.openStart, slice.openEnd)
}
