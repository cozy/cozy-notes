import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { Component } from 'react'
import { browser } from '@atlaskit/editor-common'
import { hoverRows, selectRow } from '../../commands'
import { isSelectionUpdated } from '../../utils'
import CornerControls from './CornerControls'
import NumberColumn from './NumberColumn'
import RowControls from './RowControls'
export default class TableFloatingControls extends Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'selectRow', (row, expand) => {
      const { editorView } = this.props
      const { state, dispatch } = editorView // fix for issue ED-4665

      if (browser.ie_version === 11) {
        editorView.dom.blur()
      }

      selectRow(row, expand)(state, dispatch)
    })

    _defineProperty(this, 'hoverRows', (rows, danger) => {
      const { state, dispatch } = this.props.editorView
      hoverRows(rows, danger)(state, dispatch)
    })
  }

  shouldComponentUpdate(nextProps) {
    const {
      tableRef,
      isInDanger,
      isResizing,
      isHeaderRowEnabled,
      isNumberColumnEnabled,
      hoveredRows,
      selection,
      tableHeight,
      tableActive,
      isHeaderColumnEnabled,
      ordering,
      headerRowHeight,
      stickyHeader
    } = this.props
    return (
      ordering !== nextProps.ordering ||
      tableRef !== nextProps.tableRef ||
      tableHeight !== nextProps.tableHeight ||
      tableActive !== nextProps.tableActive ||
      isInDanger !== nextProps.isInDanger ||
      isResizing !== nextProps.isResizing ||
      hoveredRows !== nextProps.hoveredRows ||
      isHeaderRowEnabled !== nextProps.isHeaderRowEnabled ||
      isHeaderColumnEnabled !== nextProps.isHeaderColumnEnabled ||
      isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
      isSelectionUpdated(selection, nextProps.selection) ||
      headerRowHeight !== nextProps.headerRowHeight ||
      stickyHeader !== nextProps.stickyHeader
    )
  }

  render() {
    const {
      editorView,
      tableRef,
      isInDanger,
      isResizing,
      isNumberColumnEnabled,
      isHeaderRowEnabled,
      isHeaderColumnEnabled,
      tableActive,
      hasHeaderRow,
      hoveredRows,
      stickyHeader
    } = this.props

    if (!tableRef) {
      return null
    }

    const stickyTop =
      stickyHeader && stickyHeader.sticky ? stickyHeader.top : undefined
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        onMouseDown: e => e.preventDefault()
      },
      isNumberColumnEnabled
        ? /*#__PURE__*/ React.createElement(NumberColumn, {
            editorView: editorView,
            hoverRows: this.hoverRows,
            tableRef: tableRef,
            tableActive: tableActive,
            hoveredRows: hoveredRows,
            hasHeaderRow: hasHeaderRow,
            isInDanger: isInDanger,
            isResizing: isResizing,
            selectRow: this.selectRow,
            stickyTop: stickyTop
          })
        : null,
      /*#__PURE__*/ React.createElement(CornerControls, {
        editorView: editorView,
        tableRef: tableRef,
        isInDanger: isInDanger,
        isResizing: isResizing,
        isHeaderRowEnabled: isHeaderRowEnabled,
        isHeaderColumnEnabled: isHeaderColumnEnabled,
        hoveredRows: hoveredRows,
        stickyTop: tableActive ? stickyTop : undefined
      }),
      /*#__PURE__*/ React.createElement(RowControls, {
        editorView: editorView,
        tableRef: tableRef,
        hoverRows: this.hoverRows,
        hoveredRows: hoveredRows,
        isInDanger: isInDanger,
        isResizing: isResizing,
        selectRow: this.selectRow,
        stickyTop: tableActive ? stickyTop : undefined
      })
    )
  }
}

_defineProperty(TableFloatingControls, 'displayName', 'TableFloatingControls')
