import { TextSelection } from 'prosemirror-state';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { TableMap } from '@atlaskit/editor-tables/table-map';
import { setMeta } from './metadata';
export const updateColumnWidths = (resizeState, table, start) => tr => {
  const map = TableMap.get(table);
  const updatedCellsAttrs = {}; // calculating new attributes for each cell

  for (let columnIndex = 0; columnIndex < map.width; columnIndex++) {
    for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
      const {
        width
      } = resizeState.cols[columnIndex];
      const mapIndex = rowIndex * map.width + columnIndex;
      const cellPos = map.map[mapIndex];
      const attrs = updatedCellsAttrs[cellPos] || { ...table.nodeAt(cellPos).attrs
      };
      const colspan = attrs.colspan || 1;

      if (attrs.colwidth && attrs.colwidth.length > colspan) {
        tr = setMeta({
          type: 'UPDATE_COLUMN_WIDTHS',
          problem: 'COLWIDTHS_BEFORE_UPDATE',
          data: {
            colwidths: attrs.colwidth,
            colspan
          }
        })(tr);
        attrs.colwidth = attrs.colwidth.slice(0, colspan);
      } // Rowspanning cell that has already been handled


      if (rowIndex && map.map[mapIndex] === map.map[mapIndex - map.width]) {
        continue;
      }

      const colspanIndex = colspan === 1 ? 0 : columnIndex - map.colCount(cellPos);

      if (attrs.colwidth && attrs.colwidth[colspanIndex] === width) {
        continue;
      }

      let colwidth = attrs.colwidth ? attrs.colwidth.slice() : Array.from({
        length: colspan
      }, _ => 0);
      colwidth[colspanIndex] = width;

      if (colwidth.length > colspan) {
        tr = setMeta({
          type: 'UPDATE_COLUMN_WIDTHS',
          problem: 'COLWIDTHS_AFTER_UPDATE',
          data: {
            colwidths: colwidth,
            colspan
          }
        })(tr);
        colwidth = colwidth.slice(0, colspan);
      }

      updatedCellsAttrs[cellPos] = { ...attrs,
        colwidth
      };
    }
  } // updating all cells with new attributes


  const rows = [];
  const seen = {};

  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const row = table.child(rowIndex);
    const cells = [];

    for (let columnIndex = 0; columnIndex < map.width; columnIndex++) {
      const mapIndex = rowIndex * map.width + columnIndex;
      const pos = map.map[mapIndex];
      const cell = table.nodeAt(pos);

      if (!seen[pos] && cell) {
        cells.push(cell.type.createChecked(updatedCellsAttrs[pos] || cell.attrs, cell.content, cell.marks));
        seen[pos] = true;
      }
    }

    rows.push(row.type.createChecked(row.attrs, cells, row.marks));
  }

  const tablePos = start - 1;
  const {
    selection
  } = tr;
  tr.replaceWith(tablePos, tablePos + table.nodeSize, table.type.createChecked(table.attrs, rows, table.marks)); // restore selection after replacing the table

  if (selection instanceof TextSelection) {
    tr.setSelection(new TextSelection(tr.doc.resolve(selection.$from.pos), tr.doc.resolve(selection.$to.pos)));
  } else if (selection instanceof CellSelection) {
    const newSelection = CellSelection.create(tr.doc, selection.$anchorCell.pos, selection.$headCell.pos); // TS complaints about missing "visible" prop in CellSelection type

    tr.setSelection(newSelection);
  }

  return tr;
};