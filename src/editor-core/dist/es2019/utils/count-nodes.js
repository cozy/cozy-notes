export function countNodes(state) {
  const nodes = {}
  state.doc.descendants(node => {
    if (node.type.name in nodes) {
      nodes[node.type.name]++
    } else {
      nodes[node.type.name] = 1
    }

    return true
  })
  return nodes
}
