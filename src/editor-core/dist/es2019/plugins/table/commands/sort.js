import { Selection } from 'prosemirror-state';
import { TableMap } from '@atlaskit/editor-tables/table-map';
import { findCellRectClosestToPos } from '@atlaskit/editor-tables/utils';
import { convertArrayOfRowsToTableNode, convertTableNodeToArrayOfRows, findTable, getSelectionRect, isSelectionType } from '@atlaskit/editor-tables/utils';
import { createCompareNodes } from '@atlaskit/editor-common';
import { pluginKey } from '../../card/pm-plugins/main';
import { createCommand, getPluginState } from '../pm-plugins/plugin-factory';
import { SortOrder } from '../types';
import { TableSortStep } from '../utils';

function createGetInlineCardTextFromStore(state) {
  const cardState = pluginKey.getState(state);

  if (!cardState) {
    // If not card state, return null always
    return () => null;
  }

  return attrs => {
    const {
      url: cardUrl
    } = attrs;

    if (cardUrl) {
      const card = cardState.cards.find(({
        url
      }) => url === cardUrl);

      if (card && card.title) {
        return card.title;
      }
    }

    return null;
  };
}

export const sortByColumn = (columnIndex, order = SortOrder.DESC) => createCommand(state => ({
  type: 'SORT_TABLE',
  data: {
    ordering: {
      columnIndex,
      order
    }
  }
}), (tr, state) => {
  const table = findTable(tr.selection);

  if (!table || !table.node) {
    return tr;
  }

  const selectionRect = isSelectionType(tr.selection, 'cell') ? getSelectionRect(tr.selection) : findCellRectClosestToPos(tr.selection.$from);

  if (!selectionRect) {
    return tr;
  }

  const tablePluginState = getPluginState(state);
  const tableArray = convertTableNodeToArrayOfRows(table.node);
  let headerRow;

  if (tablePluginState.isHeaderRowEnabled) {
    headerRow = tableArray.shift();
  }

  const compareNodesInOrder = createCompareNodes({
    getInlineCardTextFromStore: createGetInlineCardTextFromStore(state)
  }, order);
  const sortedTable = tableArray.sort((rowA, rowB) => compareNodesInOrder(rowA[columnIndex], rowB[columnIndex]));

  if (headerRow) {
    sortedTable.unshift(headerRow);
  }

  const newTableNode = convertArrayOfRowsToTableNode(table.node, sortedTable);
  tr.replaceWith(table.pos, table.pos + table.node.nodeSize, newTableNode);
  const pos = TableMap.get(table.node).positionAt(selectionRect.top, columnIndex, table.node);
  const prev = tablePluginState.ordering;
  const next = {
    columnIndex,
    order
  };
  tr.step(new TableSortStep(table.pos, prev, next));
  return tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos)));
});