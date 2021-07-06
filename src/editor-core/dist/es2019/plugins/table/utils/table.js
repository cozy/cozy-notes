import { TableMap } from '@atlaskit/editor-tables/table-map'
import { findTable } from '@atlaskit/editor-tables/utils'
export const getMergedCellsPositions = tr => {
  const table = findTable(tr.selection)

  if (!table) {
    return []
  }

  const map = TableMap.get(table.node)
  const cellPositions = new Set()
  const mergedCells = []
  map.map.forEach(value => {
    if (cellPositions.has(value)) {
      mergedCells.push(value)
    } else {
      cellPositions.add(value)
    }
  })
  return mergedCells
}
