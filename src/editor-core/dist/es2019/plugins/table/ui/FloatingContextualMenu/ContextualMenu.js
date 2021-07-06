import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { Component } from 'react'
import { splitCell } from '@atlaskit/editor-tables/utils'
import { defineMessages, injectIntl } from 'react-intl'
import {
  addColumnAfter,
  addRowAfter,
  backspace,
  tooltip
} from '../../../../keymaps'
import ColorPalette from '../../../../ui/ColorPalette'
import cellBackgroundColorPalette from '../../../../ui/ColorPalette/Palettes/cellBackgroundColorPalette'
import DropdownMenu from '../../../../ui/DropdownMenu'
import { Shortcut, CellColourPreview } from '../../../../ui/styles'
import { closestElement } from '../../../../utils/dom'
import { INPUT_METHOD } from '../../../analytics'
import {
  clearHoverSelection,
  hoverColumns,
  hoverMergedCells,
  hoverRows,
  toggleContextualMenu
} from '../../commands'
import {
  deleteColumnsWithAnalytics,
  deleteRowsWithAnalytics,
  emptyMultipleCellsWithAnalytics,
  insertColumnWithAnalytics,
  insertRowWithAnalytics,
  mergeCellsWithAnalytics,
  setColorWithAnalytics,
  sortColumnWithAnalytics,
  splitCellWithAnalytics
} from '../../commands-with-analytics'
import { getPluginState } from '../../pm-plugins/plugin-factory'
import { canMergeCells } from '../../transforms'
import { TableCssClassName as ClassName, SortOrder } from '../../types'
import {
  getMergedCellsPositions,
  getSelectedColumnIndexes,
  getSelectedRowIndexes
} from '../../utils'
import tableMessages from '../messages'
import { contextualMenuDropdownWidth } from '../consts'
export const messages = defineMessages({
  cellBackground: {
    id: 'fabric.editor.cellBackground',
    defaultMessage: 'Cell background',
    description: 'Change the background color of a table cell.'
  },
  mergeCells: {
    id: 'fabric.editor.mergeCells',
    defaultMessage: 'Merge cells',
    description: 'Merge tables cells together.'
  },
  splitCell: {
    id: 'fabric.editor.splitCell',
    defaultMessage: 'Split cell',
    description: 'Split a merged table cell.'
  },
  clearCells: {
    id: 'fabric.editor.clearCells',
    defaultMessage: 'Clear {0, plural, one {cell} other {cells}}',
    description:
      'Clears the contents of the selected cells (this does not delete the cells themselves).'
  },
  sortColumnASC: {
    id: 'fabric.editor.sortColumnASC',
    defaultMessage: 'Sort column A → Z',
    description: 'Sort column in ascending order'
  },
  sortColumnDESC: {
    id: 'fabric.editor.sortColumnDESC',
    defaultMessage: 'Sort column Z → A',
    description: 'Sort column in descending order'
  },
  canNotSortTable: {
    id: 'fabric.editor.canNotSortTable',
    defaultMessage: `⚠️ You can't sort a table with merged cells`,
    description: `Split your cells to enable this feature`
  }
})

class ContextualMenu extends Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      isSubmenuOpen: false
    })

    _defineProperty(this, 'handleSubMenuRef', ref => {
      const parent = closestElement(
        this.props.editorView.dom,
        '.fabric-editor-popup-scroll-parent'
      )

      if (!(parent && ref)) {
        return
      }

      const boundariesRect = parent.getBoundingClientRect()
      const rect = ref.getBoundingClientRect()

      if (rect.left + rect.width > boundariesRect.width) {
        ref.style.left = `-${rect.width}px`
      }
    })

    _defineProperty(this, 'createItems', () => {
      const {
        allowMergeCells,
        allowColumnSorting,
        allowBackgroundColor,
        editorView: { state },
        isOpen,
        selectionRect,
        intl: { formatMessage },
        editorView
      } = this.props
      const items = []
      const { isSubmenuOpen } = this.state // TargetCellPosition could be outdated: https://product-fabric.atlassian.net/browse/ED-8129

      const { targetCellPosition } = getPluginState(editorView.state)

      if (allowBackgroundColor) {
        var _node$attrs

        const node =
          isOpen && targetCellPosition
            ? state.doc.nodeAt(targetCellPosition)
            : null
        const background =
          (node === null || node === void 0
            ? void 0
            : (_node$attrs = node.attrs) === null || _node$attrs === void 0
            ? void 0
            : _node$attrs.background) || '#ffffff'
        items.push({
          content: formatMessage(messages.cellBackground),
          value: {
            name: 'background'
          },
          elemAfter: /*#__PURE__*/ React.createElement(
            'div',
            null,
            /*#__PURE__*/ React.createElement(CellColourPreview, {
              selectedColor: background,
              className: ClassName.CONTEXTUAL_MENU_ICON
            }),
            isSubmenuOpen &&
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: ClassName.CONTEXTUAL_SUBMENU,
                  ref: this.handleSubMenuRef
                },
                /*#__PURE__*/ React.createElement(ColorPalette, {
                  cols: 7,
                  palette: cellBackgroundColorPalette,
                  onClick: this.setColor,
                  selectedColor: background
                })
              )
          )
        })
      }

      items.push({
        content: formatMessage(tableMessages.insertColumn),
        value: {
          name: 'insert_column'
        },
        elemAfter: /*#__PURE__*/ React.createElement(
          Shortcut,
          null,
          tooltip(addColumnAfter)
        )
      })
      items.push({
        content: formatMessage(tableMessages.insertRow),
        value: {
          name: 'insert_row'
        },
        elemAfter: /*#__PURE__*/ React.createElement(
          Shortcut,
          null,
          tooltip(addRowAfter)
        )
      })
      const { top, bottom, right, left } = selectionRect
      const noOfColumns = right - left
      const noOfRows = bottom - top
      items.push({
        content: formatMessage(tableMessages.removeColumns, {
          0: noOfColumns
        }),
        value: {
          name: 'delete_column'
        }
      })
      items.push({
        content: formatMessage(tableMessages.removeRows, {
          0: noOfRows
        }),
        value: {
          name: 'delete_row'
        }
      })

      if (allowMergeCells) {
        items.push({
          content: formatMessage(messages.mergeCells),
          value: {
            name: 'merge'
          },
          isDisabled: !canMergeCells(state.tr)
        })
        items.push({
          content: formatMessage(messages.splitCell),
          value: {
            name: 'split'
          },
          isDisabled: !splitCell(state)
        })
      }

      if (allowColumnSorting) {
        const hasMergedCellsInTable =
          getMergedCellsPositions(state.tr).length > 0
        const warning = hasMergedCellsInTable
          ? {
              tooltipDescription: formatMessage(messages.canNotSortTable),
              isDisabled: true
            }
          : {}
        items.push({
          content: formatMessage(messages.sortColumnASC),
          value: {
            name: 'sort_column_asc'
          },
          ...warning
        })
        items.push({
          content: formatMessage(messages.sortColumnDESC),
          value: {
            name: 'sort_column_desc'
          },
          ...warning
        })
      }

      items.push({
        content: formatMessage(messages.clearCells, {
          0: Math.max(noOfColumns, noOfRows)
        }),
        value: {
          name: 'clear'
        },
        elemAfter: /*#__PURE__*/ React.createElement(
          Shortcut,
          null,
          tooltip(backspace)
        )
      })
      return items.length
        ? [
            {
              items
            }
          ]
        : null
    })

    _defineProperty(this, 'onMenuItemActivated', ({ item }) => {
      const { editorView, selectionRect } = this.props // TargetCellPosition could be outdated: https://product-fabric.atlassian.net/browse/ED-8129

      const { targetCellPosition } = getPluginState(editorView.state)
      const { state, dispatch } = editorView

      switch (item.value.name) {
        case 'sort_column_desc':
          sortColumnWithAnalytics(
            INPUT_METHOD.CONTEXT_MENU,
            selectionRect.left,
            SortOrder.DESC
          )(state, dispatch)
          this.toggleOpen()
          break

        case 'sort_column_asc':
          sortColumnWithAnalytics(
            INPUT_METHOD.CONTEXT_MENU,
            selectionRect.left,
            SortOrder.ASC
          )(state, dispatch)
          this.toggleOpen()
          break

        case 'merge':
          mergeCellsWithAnalytics()(state, dispatch)
          this.toggleOpen()
          break

        case 'split':
          splitCellWithAnalytics()(state, dispatch)
          this.toggleOpen()
          break

        case 'clear':
          emptyMultipleCellsWithAnalytics(
            INPUT_METHOD.CONTEXT_MENU,
            targetCellPosition
          )(state, dispatch)
          this.toggleOpen()
          break

        case 'insert_column':
          insertColumnWithAnalytics(
            INPUT_METHOD.CONTEXT_MENU,
            selectionRect.right
          )(state, dispatch)
          this.toggleOpen()
          break

        case 'insert_row':
          insertRowWithAnalytics(INPUT_METHOD.CONTEXT_MENU, {
            index: selectionRect.bottom,
            moveCursorToInsertedRow: true
          })(state, dispatch)
          this.toggleOpen()
          break

        case 'delete_column':
          deleteColumnsWithAnalytics(INPUT_METHOD.CONTEXT_MENU, selectionRect)(
            state,
            dispatch
          )
          this.toggleOpen()
          break

        case 'delete_row':
          const {
            pluginConfig: { isHeaderRowRequired }
          } = getPluginState(state)
          deleteRowsWithAnalytics(
            INPUT_METHOD.CONTEXT_MENU,
            selectionRect,
            !!isHeaderRowRequired
          )(state, dispatch)
          this.toggleOpen()
          break
      }
    })

    _defineProperty(this, 'toggleOpen', () => {
      const {
        isOpen,
        editorView: { state, dispatch }
      } = this.props
      toggleContextualMenu()(state, dispatch)

      if (!isOpen) {
        this.setState({
          isSubmenuOpen: false
        })
      }
    })

    _defineProperty(this, 'handleOpenChange', () => {
      const {
        editorView: { state, dispatch }
      } = this.props
      toggleContextualMenu()(state, dispatch)
      this.setState({
        isSubmenuOpen: false
      })
    })

    _defineProperty(this, 'handleItemMouseEnter', ({ item }) => {
      const {
        editorView: { state, dispatch },
        selectionRect
      } = this.props

      if (item.value.name === 'background') {
        if (!this.state.isSubmenuOpen) {
          this.setState({
            isSubmenuOpen: true
          })
        }
      }

      if (item.value.name === 'delete_column') {
        hoverColumns(getSelectedColumnIndexes(selectionRect), true)(
          state,
          dispatch
        )
      }

      if (item.value.name === 'delete_row') {
        hoverRows(getSelectedRowIndexes(selectionRect), true)(state, dispatch)
      }

      if (
        ['sort_column_asc', 'sort_column_desc'].indexOf(item.value.name) > -1 &&
        getMergedCellsPositions(state.tr).length !== 0
      ) {
        hoverMergedCells()(state, dispatch)
      }
    })

    _defineProperty(this, 'handleItemMouseLeave', ({ item }) => {
      const { state, dispatch } = this.props.editorView

      if (item.value.name === 'background') {
        this.closeSubmenu()
      }

      if (
        [
          'sort_column_asc',
          'sort_column_desc',
          'delete_column',
          'delete_row'
        ].indexOf(item.value.name) > -1
      ) {
        clearHoverSelection()(state, dispatch)
      }
    })

    _defineProperty(this, 'closeSubmenu', () => {
      if (this.state.isSubmenuOpen) {
        this.setState({
          isSubmenuOpen: false
        })
      }
    })

    _defineProperty(this, 'setColor', color => {
      const { editorView } = this.props // TargetCellPosition could be outdated: https://product-fabric.atlassian.net/browse/ED-8129

      const { targetCellPosition } = getPluginState(editorView.state)
      const { state, dispatch } = editorView
      setColorWithAnalytics(color, targetCellPosition)(state, dispatch)
      this.toggleOpen()
    })
  }

  render() {
    const { isOpen, mountPoint, offset, boundariesElement } = this.props
    const items = this.createItems()

    if (!items) {
      return null
    }

    return /*#__PURE__*/ React.createElement(
      'div',
      {
        onMouseLeave: this.closeSubmenu
      },
      /*#__PURE__*/ React.createElement(DropdownMenu, {
        mountTo: mountPoint,
        items: items,
        isOpen: isOpen,
        onOpenChange: this.handleOpenChange,
        onItemActivated: this.onMenuItemActivated,
        onMouseEnter: this.handleItemMouseEnter,
        onMouseLeave: this.handleItemMouseLeave,
        fitHeight: 188,
        fitWidth: contextualMenuDropdownWidth,
        boundariesElement: boundariesElement,
        offset: offset
      })
    )
  }
}

_defineProperty(ContextualMenu, 'defaultProps', {
  boundariesElement: document.body
})

export default injectIntl(ContextualMenu)
