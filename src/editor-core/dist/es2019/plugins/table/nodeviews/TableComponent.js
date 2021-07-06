import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import classnames from 'classnames'
import { isTableSelected } from '@atlaskit/editor-tables/utils'
import rafSchedule from 'raf-schd'
import {
  browser,
  calcTableWidth,
  tableMarginSides
} from '@atlaskit/editor-common'
import {
  akEditorMobileBreakoutPoint,
  akEditorTableToolbarSize as tableToolbarSize
} from '@atlaskit/editor-shared-styles'
import { parsePx } from '../../../utils/dom'
import { isValidPosition } from '../../../utils'
import { getParentNodeWidth } from '../../../utils/node-width'
import { autoSizeTable } from '../commands'
import { getPluginState } from '../pm-plugins/plugin-factory'
import {
  findStickyHeaderForTable,
  pluginKey as stickyHeadersPluginKey
} from '../pm-plugins/sticky-headers'
import { scaleTable } from '../pm-plugins/table-resizing'
import {
  getLayoutSize,
  insertColgroupFromNode as recreateResizeColsByNode
} from '../pm-plugins/table-resizing/utils'
import { updateControls } from '../pm-plugins/table-resizing/utils/dom'
import { TableCssClassName as ClassName } from '../types'
import TableFloatingControls from '../ui/TableFloatingControls'
import {
  containsHeaderRow,
  tablesHaveDifferentColumnWidths,
  tablesHaveDifferentNoOfColumns
} from '../utils'
import { updateOverflowShadows } from './update-overflow-shadows'
const isIE11 = browser.ie_version === 11

// in Chrome, if none of the parent elements
// have content, then it will auto-scroll the container
// which interferes with us applying padding to the
// sticky header to make up for us taking it out of
// the layout flow.
//
// this is only an issue when scrolling down the
// page without row controls active, and doesn't
// occur in other browsers afaik
const FloatingPlaceholder = () =>
  /*#__PURE__*/ React.createElement(
    'div',
    {
      style: {
        position: 'absolute',
        top: '30px'
      }
    },
    ' '
  )

class TableComponent extends React.Component {
  constructor(props) {
    super(props)

    _defineProperty(this, 'state', {
      scroll: 0,
      tableContainerWidth: 'inherit',
      parentWidth: undefined,
      isLoading: true
    })

    _defineProperty(this, 'onStickyState', state => {
      const pos = this.props.getPos()

      if (!isValidPosition(pos, this.props.view.state)) {
        return
      }

      const stickyHeader = findStickyHeaderForTable(state, pos)

      if (stickyHeader !== this.state.stickyHeader) {
        this.setState({
          stickyHeader
        })
      }
    })

    _defineProperty(this, 'getMarginLeft', tableContainerCssWidth => {
      const { containerWidth } = this.props
      const { lineLength } = containerWidth
      let marginLeft

      if (tableContainerCssWidth !== 'inherit' && lineLength) {
        const containerWidth = parsePx(tableContainerCssWidth)

        if (containerWidth) {
          marginLeft = (lineLength - containerWidth) / 2
        }
      }

      return marginLeft
    })

    _defineProperty(this, 'handleScroll', event => {
      if (!this.wrapper || event.target !== this.wrapper) {
        return
      }

      if (this.table) {
        // sync sticky header row to table scroll
        const headers = this.table.querySelectorAll('tr[data-header-row]')

        for (let i = 0; i < headers.length; i++) {
          const header = headers[i]
          header.scrollLeft = this.wrapper.scrollLeft
          header.style.marginRight = '2px'
        }
      }

      this.setState({
        scroll: this.wrapper.scrollLeft
      })
    })

    _defineProperty(this, 'handleTableResizing', () => {
      const { node, containerWidth, options } = this.props
      const prevNode = this.node
      const prevAttrs = prevNode.attrs // We only consider a layout change valid if it's done outside of an autoSize.

      const layoutChanged =
        prevAttrs.layout !== node.attrs.layout &&
        prevAttrs.__autoSize === node.attrs.__autoSize
      const parentWidth = this.getParentNodeWidth()
      const parentWidthChanged =
        parentWidth && parentWidth !== this.state.parentWidth
      const layoutSize = this.tableNodeLayoutSize(
        node,
        containerWidth.width,
        options
      )

      if (
        // Breakout mode/layout changed
        layoutChanged || // We need to react if our parent changes
        // Scales the cols widths relative to the new parent width.
        parentWidthChanged || // Enabling / disabling this feature reduces or adds size to the table.
        prevAttrs.isNumberColumnEnabled !== node.attrs.isNumberColumnEnabled || // Adding or removing columns from the table, should snap the remaining / new columns to the layout width.
        tablesHaveDifferentNoOfColumns(node, prevNode) || // This last check is also to cater for dynamic text sizing changing the 'default' layout width
        // Usually happens on window resize.
        layoutSize !== this.layoutSize
      ) {
        this.scaleTable({
          parentWidth,
          layoutChanged
        })
        this.updateParentWidth(parentWidth)
      }

      this.updateTableContainerWidth()
      this.node = node
      this.containerWidth = containerWidth
      this.layoutSize = layoutSize
    })

    _defineProperty(this, 'scaleTable', scaleOptions => {
      const { view, node, getPos, containerWidth, options } = this.props
      const { state, dispatch } = view
      const pos = getPos()

      if (!isValidPosition(pos, state)) {
        return
      }

      const domAtPos = view.domAtPos.bind(view)
      const { width } = containerWidth

      if (this.frameId && window) {
        window.cancelAnimationFrame(this.frameId)
      }

      scaleTable(
        this.table,
        {
          ...scaleOptions,
          node,
          prevNode: this.node || node,
          start: pos + 1,
          containerWidth: width,
          previousContainerWidth: this.containerWidth.width || width,
          ...options
        },
        domAtPos
      )(state, dispatch)
    })

    _defineProperty(this, 'handleAutoSize', () => {
      if (this.table) {
        const { view, node, getPos, options, containerWidth } = this.props
        const pos = getPos()

        if (!isValidPosition(pos, view.state)) {
          return
        }

        autoSizeTable(view, node, this.table, pos, {
          dynamicTextSizing: (options && options.dynamicTextSizing) || false,
          containerWidth: containerWidth.width
        })
      }
    })

    _defineProperty(this, 'handleWindowResize', () => {
      const { node, containerWidth } = this.props
      const layoutSize = this.tableNodeLayoutSize(node)

      if (containerWidth.width > layoutSize) {
        return
      }

      const parentWidth = this.getParentNodeWidth()
      this.frameId = this.scaleTableDebounced(parentWidth)
    })

    _defineProperty(this, 'updateTableContainerWidth', () => {
      const { node, containerWidth, options } = this.props

      if (options && options.isBreakoutEnabled === false) {
        return
      }

      const tableContainerWidth = calcTableWidth(
        node.attrs.layout,
        containerWidth.width
      )

      if (this.state.tableContainerWidth === tableContainerWidth) {
        return null
      }

      this.setState(prevState => {
        if (
          options &&
          options.isBreakoutEnabled === false &&
          prevState.tableContainerWidth !== 'inherit'
        ) {
          return {
            tableContainerWidth: 'inherit'
          }
        }

        return {
          tableContainerWidth
        }
      })
    })

    _defineProperty(this, 'getParentNodeWidth', () => {
      const {
        getPos,
        containerWidth,
        options,
        view: { state }
      } = this.props
      const pos = getPos()

      if (!isValidPosition(pos, state)) {
        return
      }

      return getParentNodeWidth(
        pos,
        state,
        containerWidth,
        options && options.isFullWidthModeEnabled
      )
    })

    _defineProperty(this, 'updateParentWidth', width => {
      this.setState({
        parentWidth: width
      })
    })

    _defineProperty(
      this,
      'tableNodeLayoutSize',
      (node, containerWidth, options) =>
        getLayoutSize(
          node.attrs.layout,
          containerWidth || this.props.containerWidth.width,
          options || this.props.options || {}
        )
    )

    _defineProperty(this, 'scaleTableDebounced', rafSchedule(this.scaleTable))

    _defineProperty(
      this,
      'handleTableResizingDebounced',
      rafSchedule(this.handleTableResizing)
    )

    _defineProperty(
      this,
      'handleScrollDebounced',
      rafSchedule(this.handleScroll)
    )

    _defineProperty(
      this,
      'handleAutoSizeDebounced',
      rafSchedule(this.handleAutoSize)
    )

    _defineProperty(
      this,
      'handleWindowResizeDebounced',
      rafSchedule(this.handleWindowResize)
    )

    const {
      options: _options,
      containerWidth: _containerWidth,
      node: _node
    } = props
    this.node = _node
    this.containerWidth = _containerWidth // store table size using previous full-width mode so can detect if it has changed

    const dynamicTextSizing = _options ? _options.dynamicTextSizing : false
    const isFullWidthModeEnabled = _options
      ? _options.wasFullWidthModeEnabled
      : false
    this.layoutSize = this.tableNodeLayoutSize(_node, _containerWidth.width, {
      dynamicTextSizing,
      isFullWidthModeEnabled
    }) // Disable inline table editing and resizing controls in Firefox
    // https://github.com/ProseMirror/prosemirror/issues/432

    if ('execCommand' in document) {
      ;['enableObjectResizing', 'enableInlineTableEditing'].forEach(cmd => {
        if (document.queryCommandSupported(cmd)) {
          document.execCommand(cmd, false, 'false')
        }
      })
    } // @see ED-7945

    requestAnimationFrame(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  componentDidMount() {
    const { allowColumnResizing, eventDispatcher } = this.props

    if (allowColumnResizing && this.wrapper && !isIE11) {
      this.wrapper.addEventListener('scroll', this.handleScrollDebounced)
    }

    if (allowColumnResizing) {
      /**
       * We no longer use `containerWidth` as a variable to determine an update for table resizing (avoids unnecessary updates).
       * Instead we use the resize event to only trigger updates when necessary.
       */
      window.addEventListener('resize', this.handleWindowResizeDebounced)
      this.updateTableContainerWidth()
      this.frameId = this.handleTableResizingDebounced(this.props)
    }

    const currentStickyState = stickyHeadersPluginKey.getState(
      this.props.view.state
    )

    if (currentStickyState) {
      this.onStickyState(currentStickyState)
    }

    eventDispatcher.on(stickyHeadersPluginKey.key, this.onStickyState)
  }

  componentWillUnmount() {
    if (this.wrapper && !isIE11) {
      this.wrapper.removeEventListener('scroll', this.handleScrollDebounced)
    }

    this.handleScrollDebounced.cancel()

    if (this.props.allowColumnResizing) {
      window.removeEventListener('resize', this.handleWindowResizeDebounced)
    }

    if (this.frameId && window) {
      window.cancelAnimationFrame(this.frameId)
    }

    this.props.eventDispatcher.off(
      stickyHeadersPluginKey.key,
      this.onStickyState
    )
  }

  componentDidUpdate(prevProps) {
    if (this.wrapper && this.wrapper.parentElement) {
      const rightShadows = this.wrapper.parentElement.querySelectorAll(
        `.${ClassName.TABLE_RIGHT_SHADOW}`
      )
      const leftShadows = this.wrapper.parentElement.querySelectorAll(
        `.${ClassName.TABLE_LEFT_SHADOW}`
      )
      updateOverflowShadows(this.wrapper, this.table, rightShadows, leftShadows)
    }

    if (this.props.node.attrs.__autoSize) {
      // Wait for next tick to handle auto sizing, gives the browser time to do layout calc etc.
      this.handleAutoSizeDebounced()
    } else if (this.props.allowColumnResizing && this.table) {
      // If col widths (e.g. via collab) or number of columns (e.g. delete a column) have changed,
      // re-draw colgroup.
      if (
        tablesHaveDifferentColumnWidths(this.props.node, prevProps.node) ||
        tablesHaveDifferentNoOfColumns(this.props.node, prevProps.node)
      ) {
        const { view } = this.props
        recreateResizeColsByNode(this.table, this.props.node)
        updateControls(view.state)
      }

      this.frameId = this.handleTableResizingDebounced(prevProps)
    }
  }

  render() {
    const {
      view,
      node,
      pluginState,
      tableResizingPluginState,
      width
    } = this.props
    const { isLoading, tableContainerWidth } = this.state
    const {
      pluginConfig: { allowControls = true }
    } = pluginState // doesn't work well with WithPluginState

    const { isInDanger, hoveredRows } = getPluginState(view.state)
    const tableRef = this.table || undefined
    const tableActive = this.table === pluginState.tableRef
    const isResizing =
      !!tableResizingPluginState && !!tableResizingPluginState.dragging
    const headerRow = tableRef
      ? tableRef.querySelector('tr[data-header-row]')
      : undefined
    const rowControls = [
      /*#__PURE__*/ React.createElement(
        'div',
        {
          key: 0,
          className: ClassName.ROW_CONTROLS_WRAPPER
        },
        /*#__PURE__*/ React.createElement(TableFloatingControls, {
          editorView: view,
          tableRef: tableRef,
          tableActive: tableActive,
          hoveredRows: hoveredRows,
          isInDanger: isInDanger,
          isResizing: isResizing,
          isNumberColumnEnabled: node.attrs.isNumberColumnEnabled,
          isHeaderRowEnabled: pluginState.isHeaderRowEnabled,
          ordering: pluginState.ordering,
          isHeaderColumnEnabled: pluginState.isHeaderColumnEnabled,
          hasHeaderRow: containsHeaderRow(view.state, node), // pass `selection` and `tableHeight` to control re-render
          selection: view.state.selection,
          tableHeight: tableRef ? tableRef.offsetHeight : undefined,
          headerRowHeight: headerRow ? headerRow.offsetHeight : undefined,
          stickyHeader: this.state.stickyHeader
        })
      )
    ]
    const shadowPadding =
      allowControls && !isLoading && tableActive
        ? -tableToolbarSize
        : tableMarginSides
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        style: {
          width: tableContainerWidth,
          marginLeft: this.getMarginLeft(tableContainerWidth)
        },
        className: classnames(ClassName.TABLE_CONTAINER, {
          [ClassName.WITH_CONTROLS]: allowControls && tableActive,
          [ClassName.TABLE_STICKY]: this.state.stickyHeader,
          [ClassName.HOVERED_DELETE_BUTTON]: isInDanger,
          [ClassName.TABLE_SELECTED]: isTableSelected(view.state.selection),
          'less-padding': width < akEditorMobileBreakoutPoint
        }),
        'data-number-column': node.attrs.isNumberColumnEnabled,
        'data-layout': node.attrs.layout
      },
      /*#__PURE__*/ React.createElement(FloatingPlaceholder, null),
      allowControls && !isLoading && rowControls,
      /*#__PURE__*/ React.createElement('div', {
        className: ClassName.TABLE_LEFT_SHADOW
      }),
      this.state.stickyHeader &&
        /*#__PURE__*/ React.createElement('div', {
          className: `${ClassName.TABLE_LEFT_SHADOW} ${ClassName.TABLE_STICKY_SHADOW}`,
          style: {
            top: `${this.state.stickyHeader.top +
              this.state.stickyHeader.padding +
              shadowPadding +
              2}px`
          }
        }),
      /*#__PURE__*/ React.createElement('div', {
        className: classnames(ClassName.TABLE_NODE_WRAPPER),
        ref: elem => {
          this.wrapper = elem
          this.props.contentDOM(elem ? elem : undefined)

          if (elem) {
            this.table = elem.querySelector('table')
          }
        }
      }),
      /*#__PURE__*/ React.createElement('div', {
        className: ClassName.TABLE_RIGHT_SHADOW
      }),
      this.state.stickyHeader &&
        /*#__PURE__*/ React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              right: '-2px'
            }
          },
          /*#__PURE__*/ React.createElement('div', {
            className: `${ClassName.TABLE_RIGHT_SHADOW} ${ClassName.TABLE_STICKY_SHADOW}`,
            style: {
              top: `${this.state.stickyHeader.top +
                this.state.stickyHeader.padding +
                shadowPadding +
                2}px`
            }
          })
        )
    )
  }
}

_defineProperty(TableComponent, 'displayName', 'TableComponent')

export default TableComponent
