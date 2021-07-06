export function isQueryActive(mark, doc, from, to) {
  let active = false
  doc.nodesBetween(from, to, node => {
    if (!active && mark.isInSet(node.marks)) {
      active = true
    }
  })
  return active
}
