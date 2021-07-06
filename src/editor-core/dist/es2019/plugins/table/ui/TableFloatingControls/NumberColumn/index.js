import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { Component } from 'react'
import { Selection } from 'prosemirror-state'
import { isRowSelected } from '@atlaskit/editor-tables/utils'
import { clearHoverSelection } from '../../../commands'
import { TableCssClassName as ClassName } from '../../../types'
import { getRowHeights } from '../../../utils'
export default class NumberColumn extends Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'hoverRows', index =>
      this.props.tableActive ? this.props.hoverRows([index]) : null
    )

    _defineProperty(this, 'selectRow', (index, event) => {
      const { tableActive, editorView, selectRow } = this.props // If selection is outside the table then first reset the selection inside table

      if (!tableActive && event.target && event.target instanceof Node) {
        const { doc, selection, tr } = editorView.state
        const pos = editorView.posAtDOM(event.target, 1)
        const $pos = doc.resolve(pos)
        const newPos =
          selection.head > pos // Selection is after table
            ? // nodeSize - 3 will move the position inside last table cell
              Selection.near(doc.resolve(pos + ($pos.parent.nodeSize - 3)), -1) // Selection is before table
            : Selection.near($pos)
        editorView.dispatch(tr.setSelection(newPos))
      }

      selectRow(index, event.shiftKey)
    })

    _defineProperty(this, 'clearHoverSelection', () => {
      const { tableActive, editorView } = this.props

      if (tableActive) {
        const { state, dispatch } = editorView
        clearHoverSelection()(state, dispatch)
      }
    })

    _defineProperty(this, 'getClassNames', index => {
      const { hoveredRows, editorView, isInDanger, isResizing } = this.props
      const isActive =
        isRowSelected(index)(editorView.state.selection) ||
        ((hoveredRows || []).indexOf(index) !== -1 && !isResizing)
      return [
        ClassName.NUMBERED_COLUMN_BUTTON,
        isActive ? ClassName.HOVERED_CELL_ACTIVE : '',
        isActive && isInDanger ? ClassName.HOVERED_CELL_IN_DANGER : ''
      ].join(' ')
    })
  }

  render() {
    const { tableRef, hasHeaderRow } = this.props
    const rowHeights = getRowHeights(tableRef)
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        className: ClassName.NUMBERED_COLUMN,
        style: {
          marginTop:
            hasHeaderRow && this.props.stickyTop !== undefined
              ? rowHeights[0]
              : undefined
        }
      },
      rowHeights.map((rowHeight, index) =>
        /*#__PURE__*/ React.createElement(
          'div',
          {
            key: `wrapper-${index}`,
            className: this.getClassNames(index),
            'data-index': index,
            style: {
              height: rowHeight,
              top:
                this.props.stickyTop !== undefined &&
                hasHeaderRow &&
                index === 0
                  ? `${this.props.stickyTop}px`
                  : undefined
            },
            onClick: event => this.selectRow(index, event),
            onMouseOver: () => this.hoverRows(index),
            onMouseOut: this.clearHoverSelection
          },
          hasHeaderRow ? (index > 0 ? index : null) : index + 1
        )
      )
    )
  }
}
