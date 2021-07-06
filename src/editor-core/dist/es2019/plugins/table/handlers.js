// #region Imports
import { findParentNodeOfType } from 'prosemirror-utils'
import { findTable } from '@atlaskit/editor-tables/utils'
import { isTextInput } from '../../utils/is-text-input'
import { defaultTableSelection } from './pm-plugins/default-table-selection'
import { pluginKey as tableResizingPluginKey } from './pm-plugins/table-resizing'
import { TableSortStep } from './utils/sort-step' // #endregion

const nextTableSorting = (tr, table) => {
  const tableSortStep = tr.steps.find(step => step instanceof TableSortStep)
  return tableSortStep && table && table.pos === tableSortStep.pos
    ? tableSortStep.next
    : undefined
}

const nextResizeHandleColumnIndex = (tr, resizeHandleColumnIndex) => {
  if (tr.getMeta(tableResizingPluginKey)) {
    return undefined
  }

  return resizeHandleColumnIndex
}

const updateTargetCellPosition = ({ tr, table }) => pluginState => {
  const tableNode = table && table.node

  if (!tableNode) {
    return { ...pluginState, targetCellPosition: undefined }
  }

  const { tableCell, tableHeader } = tr.doc.type.schema.nodes
  const cell = findParentNodeOfType([tableCell, tableHeader])(tr.selection)
  const targetCellPosition = cell ? cell.pos : undefined

  if (pluginState.targetCellPosition === targetCellPosition) {
    return pluginState
  }

  return { ...pluginState, targetCellPosition }
}

const updateTableNodePluginState = ({ tr, table }) => pluginState => {
  const tableNode = table && table.node

  if (!tableNode || isTextInput(tr)) {
    return pluginState
  }

  return {
    ...pluginState,
    ...defaultTableSelection,
    tableNode,
    ordering: nextTableSorting(tr, table),
    resizeHandleColumnIndex: nextResizeHandleColumnIndex(
      tr,
      pluginState.resizeHandleColumnIndex
    )
  }
}

const buildPluginState = builders => props => pluginState => {
  if (!props.table) {
    return pluginState.targetCellPosition
      ? { ...pluginState, targetCellPosition: undefined }
      : pluginState
  }

  return builders.reduce(
    (_pluginState, transform) => transform(props)(_pluginState),
    pluginState
  )
}

export const handleDocOrSelectionChanged = (tr, pluginState) =>
  buildPluginState([updateTargetCellPosition, updateTableNodePluginState])({
    tr,
    table: findTable(tr.selection)
  })(pluginState)
