import { DOMSerializer } from 'prosemirror-model'
import { getFragmentBackingArray } from '../../../../../utils/slice'
export const generateColgroup = table => {
  const cols = []
  table.content.firstChild.content.forEach(cell => {
    const colspan = cell.attrs.colspan || 1

    if (Array.isArray(cell.attrs.colwidth)) {
      // We slice here to guard against our colwidth array having more entries
      // Than the we actually span. We'll patch the document at a later point.
      cell.attrs.colwidth.slice(0, colspan).forEach(width => {
        cols.push([
          'col',
          {
            style: `width: ${width}px;`
          }
        ])
      })
    } else {
      // When we have merged cells on the first row (firstChild),
      // We want to ensure we're creating the appropriate amount of
      // cols the table still has.
      cols.push(
        ...Array.from(
          {
            length: colspan
          },
          _ => ['col', {}]
        )
      )
    }
  })
  return cols
}
export const insertColgroupFromNode = (tableRef, table) => {
  let colgroup = tableRef.querySelector('colgroup')

  if (colgroup) {
    tableRef.removeChild(colgroup)
  }

  colgroup = renderColgroupFromNode(table)
  tableRef.insertBefore(colgroup, tableRef.firstChild)
  return colgroup.children
}
export const hasTableBeenResized = table => {
  return !!getFragmentBackingArray(table.content.firstChild.content).find(
    cell => cell.attrs.colwidth
  )
}

function renderColgroupFromNode(table) {
  const rendered = DOMSerializer.renderSpec(document, [
    'colgroup',
    {},
    ...generateColgroup(table)
  ])
  return rendered.dom
}
