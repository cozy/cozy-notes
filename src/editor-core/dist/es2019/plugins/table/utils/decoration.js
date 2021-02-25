import { TableMap } from '@atlaskit/editor-tables/table-map';
import { findTable, getCellsInRow, getSelectionRect } from '@atlaskit/editor-tables/utils';
import { Decoration } from 'prosemirror-view';
import { nonNullable } from '../../../utils';
import { TableCssClassName as ClassName, TableDecorations } from '../types';

const filterDecorationByKey = (key, decorationSet) => decorationSet.find(undefined, undefined, spec => spec.key.indexOf(key) > -1);

export const findColumnControlSelectedDecoration = decorationSet => filterDecorationByKey(TableDecorations.COLUMN_SELECTED, decorationSet);
export const findControlsHoverDecoration = decorationSet => filterDecorationByKey(TableDecorations.ALL_CONTROLS_HOVER, decorationSet);
export const createCellHoverDecoration = (cells, type) => cells.map(cell => Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, {
  class: ClassName.HOVERED_CELL_WARNING
}, {
  key: TableDecorations.CELL_CONTROLS_HOVER
}));
export const createControlsHoverDecoration = (cells, type, danger) => cells.map(cell => {
  const classes = [ClassName.HOVERED_CELL];

  if (danger) {
    classes.push(ClassName.HOVERED_CELL_IN_DANGER);
  }

  classes.push(type === 'column' ? ClassName.HOVERED_COLUMN : type === 'row' ? ClassName.HOVERED_ROW : ClassName.HOVERED_TABLE);
  let key;

  switch (type) {
    case 'row':
      key = TableDecorations.ROW_CONTROLS_HOVER;
      break;

    case 'column':
      key = TableDecorations.COLUMN_CONTROLS_HOVER;
      break;

    default:
      key = TableDecorations.TABLE_CONTROLS_HOVER;
      break;
  }

  return Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, {
    class: classes.join(' ')
  }, {
    key
  });
});
export const createColumnSelectedDecoration = tr => {
  const {
    selection,
    doc
  } = tr;
  const table = findTable(selection);
  const rect = getSelectionRect(selection);

  if (!table || !rect) {
    return [];
  }

  const map = TableMap.get(table.node);
  const cellPositions = map.cellsInRect(rect);
  return cellPositions.map((pos, index) => {
    const cell = doc.nodeAt(pos + table.start);
    return Decoration.node(pos + table.start, pos + table.start + cell.nodeSize, {
      class: ClassName.COLUMN_SELECTED
    }, {
      key: `${TableDecorations.COLUMN_SELECTED}_${index}`
    });
  });
};
export const createColumnControlsDecoration = selection => {
  const cells = getCellsInRow(0)(selection) || [];
  let index = 0;
  return cells.map(cell => {
    const colspan = cell.node.attrs.colspan || 1;
    const element = document.createElement('div');
    element.classList.add(ClassName.COLUMN_CONTROLS_DECORATIONS);
    element.dataset.startIndex = `${index}`;
    index += colspan;
    element.dataset.endIndex = `${index}`;
    return Decoration.widget(cell.pos + 1, // Do not delay the rendering for this Decoration
    // because we need to always render all controls
    // to keep the order safe
    element, {
      key: `${TableDecorations.COLUMN_CONTROLS_DECORATIONS}_${index}`,
      // this decoration should be the first one, even before gap cursor.
      side: -100
    });
  });
};
export const updateDecorations = (node, decorationSet, decorations, key) => {
  const filteredDecorations = filterDecorationByKey(key, decorationSet);
  const decorationSetFiltered = decorationSet.remove(filteredDecorations);
  return decorationSetFiltered.add(node, decorations);
};

const makeArray = n => Array.from(Array(n).keys());
/*
 * This function will create two specific decorations for each cell in a column index target,
 * for example given that table:
 *
 * ```
 *    0       1      2      3
 * _____________________ _______
 * |      |             |      |
 * |  B1  |     C1      |  A1  |
 * |______|______ ______|______|
 * |             |      |      |
 * |     B2      |      |  A2  |
 * |______ ______|      |______|
 * |      |      |  D1  |      |
 * |  B3  |  C2  |      |  A3  |
 * |______|______|______|______|
 *        ^      ^      ^      ^
 *        |      |      |      |
 *        |      |      |      |
 *        |      |      |      |
 *        0      1      3      4
 *         \     |      |     /
 *          \    |      |    /
 *           \   |      |   /
 *            \  |      |  /
 *             \ |      | /
 *         columnEndIndexTarget === CellColumnPositioning.right
 * ```
 *
 * When a user wants to resize a cell,
 * they need to grab and hold the end of that column,
 * and this will be the `columnEndIndexTarget` using
 * the CellColumnPositioning interface.
 *
 * Let's say the `columnEndIndexTarget.right` is 3,
 * so this function will return two types of decorations for each cell on that column,
 * that means 2 `resizerHandle` and 2 `lastCellElement`,
 * here is the explanation for each one of them :
 *
 * - resizerHandle:
 *
 *   Given the cell C1, this decoration will add a div to create this area
 * ```
 *    ▁▁▁▁▁▁▁▁▁▁▁▁▁
 *   |           ▒▒|
 *   |     C1    ▒▒|
 *   |           ▒▒|
 *    ▔▔▔▔▔▔▔▔▔▔▔▔▔
 * ```
 *   This ▒ represents the area where table resizing will start,
 *   and you can follow that using checking the class name `ClassName.RESIZE_HANDLE_DECORATION` on the code
 *
 * - lastCellElementDecoration
 *
 *   Given the content of the cell C1
 *    ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
 *   |                   |
 *   |   _____________   |
 *   |  |             |  |
 *   |  |     <p>     |  |
 *   |  |_____________|  |
 *   |                   |
 *   |   _____________   |
 *   |  |             |  |
 *   |  |   <media>   |  |
 *   |  |_____________|  |
 *   |                   |
 *   |   _____________   |
 *   |  |             |  |
 *   |  |   <media>   |  |
 *   |  |_____________|  |
 *   |                   |
 *    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *   Currently, we are removing the margin-bottom from the last media using this kind of CSS rule:
 *   `div:last-of-type`; This is quite unstable, and after we create the `resizerHandle` div,
 *   that logic will apply the margin in the wrong element, to avoid that,
 *   we will add a new class on the last item for each cell,
 *   hence the second media will receive this class `ClassName.LAST_ITEM_IN_CELL`
 */


export const createResizeHandleDecoration = (tr, columnEndIndexTarget) => {
  const emptyResult = [[], []];
  const table = findTable(tr.selection);

  if (!table || !table.node) {
    return emptyResult;
  }

  const map = TableMap.get(table.node);

  if (!map.width) {
    return emptyResult;
  }

  const createResizerHandleDecoration = (cellColumnPositioning, columnIndex, rowIndex, cellPos, cellNode) => {
    const element = document.createElement('div');
    element.classList.add(ClassName.RESIZE_HANDLE_DECORATION);
    element.dataset.startIndex = `${cellColumnPositioning.left}`;
    element.dataset.endIndex = `${cellColumnPositioning.right}`;
    const position = cellPos + cellNode.nodeSize - 1;
    return Decoration.widget(position, element, {
      key: `${TableDecorations.COLUMN_RESIZING_HANDLE}_${rowIndex}_${columnIndex}`
    });
  };

  const createLastCellElementDecoration = (cellColumnPositioning, cellPos, cellNode) => {
    let lastItemPositions;
    cellNode.forEach((childNode, offset, index) => {
      if (index === cellNode.childCount - 1) {
        const from = offset + cellPos + 1;
        lastItemPositions = {
          from,
          to: from + childNode.nodeSize
        };
      }
    });

    if (!lastItemPositions) {
      return null;
    }

    return Decoration.node(lastItemPositions.from, lastItemPositions.to, {
      class: ClassName.LAST_ITEM_IN_CELL
    }, {
      key: `${TableDecorations.LAST_CELL_ELEMENT}_${cellColumnPositioning.left}_${cellColumnPositioning.right}`
    });
  };

  const resizeHandleCellDecorations = [];
  const lastCellElementsDecorations = [];

  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const seen = {};

    for (let columnIndex = 0; columnIndex < map.width; columnIndex++) {
      const cellPosition = map.map[map.width * rowIndex + columnIndex];

      if (seen[cellPosition]) {
        continue;
      }

      seen[cellPosition] = true;
      const cellPos = table.start + cellPosition;
      const cell = tr.doc.nodeAt(cellPos);

      if (!cell) {
        continue;
      }

      const colspan = cell.attrs.colspan || 1;
      const startIndex = columnIndex;
      const endIndex = colspan + startIndex;

      if (endIndex !== columnEndIndexTarget.right) {
        continue;
      }

      const resizerHandleDec = createResizerHandleDecoration({
        left: startIndex,
        right: endIndex
      }, columnIndex, rowIndex, cellPos, cell);
      const lastCellDec = createLastCellElementDecoration({
        left: startIndex,
        right: endIndex
      }, cellPos, cell);
      resizeHandleCellDecorations.push(resizerHandleDec);
      lastCellElementsDecorations.push(lastCellDec);
    }
  }

  return [resizeHandleCellDecorations, lastCellElementsDecorations.filter(nonNullable)];
};
/*
 * This function will create a decoration for each cell using the right position on the CellColumnPositioning
 * for example given that table:
 *
 * ```
 *    0       1      2      3   <--- column indexes
 * _____________________ _______
 * |      |             |      |
 * |  B1  |     C1      |  A1  |
 * |______|______ ______|______|
 * |             |      |      |
 * |     B2      |  D1  |  A2  |
 * |______ ______|______|______|
 * |      |      |             |
 * |  B3  |  C2  |      D2     |
 * |______|______|_____________|
 * ```
 *
 * and given the left and right represents the C1 cell:
 *
 * ```
 *      left          right
 *        1             3
 *        |             |
 *        |             |
 *        |             |
 * _______∨_____________∨_______
 * |      |             |      |
 * |  B1  |     C1      |  A1  |
 * |______|______ ______|______|
 * |             |      |      |
 * |     B2      |  D1  |  A2  |
 * |______ ______|______|______|
 * |      |      |             |
 * |  B3  |  C2  |      D2     |
 * |______|______|_____________|
 * ```
 *
 * Taking that table, and the right as parameters,
 * this function will return two decorations applying a new class `ClassName.WITH_RESIZE_LINE`
 * only on the cells: `C1` and `D1`.
 */

export const createColumnLineResize = (selection, cellColumnPositioning) => {
  const table = findTable(selection);

  if (!table || cellColumnPositioning.right === null) {
    return [];
  }

  const columnIndex = cellColumnPositioning.right - 1;
  const map = TableMap.get(table.node);
  const cellPositions = makeArray(map.height).map(rowIndex => map.map[map.width * rowIndex + columnIndex]).filter((cellPosition, rowIndex) => {
    if (columnIndex === map.width) {
      return true; // If is the last column no filter applied
    }

    const nextPosition = map.map[map.width * rowIndex + columnIndex + 1];
    return cellPosition !== nextPosition; // Removed it if next position is merged
  });
  const cells = cellPositions.map(pos => ({
    pos: pos + table.start,
    node: table.node.nodeAt(pos)
  }));
  return cells.map((cell, index) => {
    if (!cell || !cell.node) {
      return;
    }

    return Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, {
      class: ClassName.WITH_RESIZE_LINE
    }, {
      key: `${TableDecorations.COLUMN_RESIZING_HANDLE_LINE}_${cellColumnPositioning.right}_${index}`
    });
  }).filter(nonNullable);
};