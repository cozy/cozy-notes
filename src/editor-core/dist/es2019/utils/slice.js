import { Fragment, Slice } from 'prosemirror-model'
/**
 * A helper to get the underlying array of a fragment.
 */

export function getFragmentBackingArray(fragment) {
  return fragment.content
}
export function mapFragment(content, callback, parent = null) {
  const children = []

  for (let i = 0, size = content.childCount; i < size; i++) {
    const node = content.child(i)
    const transformed = node.isLeaf
      ? callback(node, parent, i)
      : callback(
          node.copy(mapFragment(node.content, callback, node)),
          parent,
          i
        )

    if (transformed) {
      if (transformed instanceof Fragment) {
        children.push(...getFragmentBackingArray(transformed))
      } else if (Array.isArray(transformed)) {
        children.push(...transformed)
      } else {
        children.push(transformed)
      }
    }
  }

  return Fragment.fromArray(children)
}
export function mapSlice(slice, callback) {
  const fragment = mapFragment(slice.content, callback)
  return new Slice(fragment, slice.openStart, slice.openEnd)
}
export function flatmap(fragment, callback) {
  const fragmentContent = []

  for (let i = 0; i < fragment.childCount; i++) {
    const child = callback(fragment.child(i), i, fragment)

    if (Array.isArray(child)) {
      fragmentContent.push(...child)
    } else {
      fragmentContent.push(child)
    }
  }

  return Fragment.fromArray(fragmentContent)
}
export function mapChildren(node, callback) {
  const array = []

  for (let i = 0; i < node.childCount; i++) {
    array.push(
      callback(node.child(i), i, node instanceof Fragment ? node : node.content)
    )
  }

  return array
}
