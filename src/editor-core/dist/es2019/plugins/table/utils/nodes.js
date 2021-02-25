import { TableMap } from '@atlaskit/editor-tables/table-map';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { findTable } from '@atlaskit/editor-tables/utils';
import { pluginKey } from '../pm-plugins/plugin-factory';
export const isIsolating = node => {
  return !!node.type.spec.isolating;
};
export const containsHeaderColumn = (state, table) => {
  const map = TableMap.get(table); // Get cell positions for first column.

  const cellPositions = map.cellsInRect({
    left: 0,
    top: 0,
    right: 1,
    bottom: map.height
  });

  for (let i = 0; i < cellPositions.length; i++) {
    try {
      const cell = table.nodeAt(cellPositions[i]);

      if (cell && cell.type !== state.schema.nodes.tableHeader) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return true;
};
export const containsHeaderRow = (state, table) => {
  const map = TableMap.get(table);

  for (let i = 0; i < map.width; i++) {
    const cell = table.nodeAt(map.map[i]);

    if (cell && cell.type !== state.schema.nodes.tableHeader) {
      return false;
    }
  }

  return true;
};
export const checkIfHeaderColumnEnabled = state => filterNearSelection(state, findTable, containsHeaderColumn, false);
export const checkIfHeaderRowEnabled = state => filterNearSelection(state, findTable, containsHeaderRow, false);
export const checkIfNumberColumnEnabled = state => filterNearSelection(state, findTable, (_, table) => !!table.attrs.isNumberColumnEnabled, false);
export const isLayoutSupported = state => {
  const {
    permittedLayouts
  } = pluginKey.getState(state).pluginConfig;
  const {
    bodiedExtension,
    layoutSection,
    expand
  } = state.schema.nodes;
  return !hasParentNodeOfType([expand, layoutSection, bodiedExtension])(state.selection) && permittedLayouts && (permittedLayouts === 'all' || permittedLayouts.indexOf('default') > -1 && permittedLayouts.indexOf('wide') > -1 && permittedLayouts.indexOf('full-page') > -1);
};
export const getTableWidth = node => {
  return getTableWidths(node).reduce((acc, current) => acc + current, 0);
};
export const tablesHaveDifferentColumnWidths = (currentTable, previousTable) => {
  let currentTableWidths = getTableWidths(currentTable);
  let previousTableWidths = getTableWidths(previousTable);
  const sameWidths = currentTableWidths.every((value, index) => {
    return value === previousTableWidths[index];
  });
  return sameWidths === false;
};
export const tablesHaveDifferentNoOfColumns = (currentTable, previousTable) => {
  const prevMap = TableMap.get(previousTable);
  const currentMap = TableMap.get(currentTable);
  return prevMap.width !== currentMap.width;
};

function filterNearSelection(state, findNode, predicate, defaultValue) {
  const found = findNode(state.selection);

  if (!found) {
    return defaultValue;
  }

  return predicate(state, found.node, found.pos);
}

function getTableWidths(node) {
  if (!node.content.firstChild) {
    return [];
  }

  let tableWidths = [];
  node.content.firstChild.content.forEach(cell => {
    if (Array.isArray(cell.attrs.colwidth)) {
      const colspan = cell.attrs.colspan || 1;
      tableWidths.push(...cell.attrs.colwidth.slice(0, colspan));
    }
  });
  return tableWidths;
}