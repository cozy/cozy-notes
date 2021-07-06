import _defineProperty from '@babel/runtime/helpers/defineProperty'
import { findOverflowScrollParent } from '@atlaskit/editor-common'
import { pluginKey as widthPluginKey } from '../../../../../plugins/width'
import { mapChildren } from '../../../../../utils/slice'
import { TableCssClassName as ClassName } from '../../../types'
import { tableControlsSpacing } from '../../../ui/consts'
import { pluginKey as tablePluginKey } from '../../plugin-factory'
import {
  syncStickyRowToTable,
  updateStickyMargins as updateTableMargin
} from '../../table-resizing/utils/dom'
import { updateStickyState } from '../commands'
import { getTop, getTree } from './dom'
export const supportedHeaderRow = node => {
  const allHeaders = mapChildren(
    node,
    child => child.type.name === 'tableHeader'
  ).every(Boolean)
  const someMerged = mapChildren(node, child => child.attrs.rowspan || 0).some(
    rowspan => rowspan > 1
  )
  return allHeaders && !someMerged
}
export class TableRowNodeView {
  constructor(node, view, getPos, eventDispatcher) {
    _defineProperty(this, 'colControlsOffset', 0)

    _defineProperty(this, 'focused', false)

    _defineProperty(this, 'scrollElementTop', 0)

    _defineProperty(this, 'isSticky', false)

    _defineProperty(this, 'listening', false)

    _defineProperty(this, 'onScroll', () => {
      const tree = getTree(this.dom)

      if (!tree) {
        return
      }

      this.latestDomTop = getTop(tree.wrapper) // kick off rAF loop again if it hasn't already happened

      if (!this.nextFrame) {
        this.loop()
      }
    })

    _defineProperty(this, 'loop', () => {
      this.nextFrame = window.requestAnimationFrame(() => {
        if (
          this.previousDomTop === this.latestDomTop &&
          this.previousPadding === this.padding
        ) {
          this.nextFrame = undefined
          return
        } // can't store these since React might re-render at any time

        const tree = getTree(this.dom)

        if (!tree) {
          this.nextFrame = undefined
          return
        }

        this.paint(tree) // run again on next frame

        this.previousPadding = this.padding
        this.previousDomTop = this.latestDomTop
        this.loop()
      })
    })

    _defineProperty(this, 'paint', tree => {
      const { table, wrapper } = tree

      if (this.shouldHeaderStick(tree)) {
        this.makeHeaderRowSticky(tree)
      } else {
        this.makeRowHeaderNotSticky(table)
      } // ensure scroll positions are locked

      this.dom.scrollLeft = wrapper.scrollLeft
    })

    _defineProperty(this, 'onTablePluginState', state => {
      const tableRef = state.tableRef
      const tree = getTree(this.dom)

      if (!tree) {
        return
      }

      const isCurrentTableSelected = tableRef === tree.table
      this.focused = isCurrentTableSelected
      const { wrapper } = tree
      const tableContainer = wrapper.parentElement
      const tableContentWrapper = tableContainer.parentElement
      const layoutContainer =
        tableContentWrapper && tableContentWrapper.parentElement

      if (isCurrentTableSelected) {
        this.colControlsOffset = tableControlsSpacing

        if (
          layoutContainer &&
          layoutContainer.getAttribute('data-layout-content')
        ) {
          // move table a little out of the way
          // to provide spacing for table controls
          tableContentWrapper.style.paddingLeft = '11px'
        }
      } else {
        this.colControlsOffset = 0

        if (
          layoutContainer &&
          layoutContainer.getAttribute('data-layout-content')
        ) {
          tableContentWrapper.style.removeProperty('padding-left')
        }
      } // run after table style changes have been committed

      setTimeout(() => {
        this.paint(tree)
        syncStickyRowToTable(tree.table)
      }, 0)
    })

    _defineProperty(this, 'onWidthPluginState', () => {
      // table width might have changed, sync that back to sticky row
      const tree = getTree(this.dom)

      if (!tree) {
        return
      }

      syncStickyRowToTable(tree.table)
    })

    _defineProperty(this, 'shouldHeaderStick', tree => {
      const { wrapper } = tree
      const scrollTop = this.scrollElementTop
      const refTop = this.getWrapperRefTop(wrapper)
      const wrapperRect = wrapper.getBoundingClientRect() // we don't have parent information in via the node,
      // so we need to look this up on scroll

      const firstHeaderRow = !this.dom.previousElementSibling
      const subsequentRows = !!this.dom.nextElementSibling
      const bottomVisible =
        scrollTop - wrapperRect.bottom < this.dom.clientHeight
      return (
        refTop <= scrollTop && bottomVisible && firstHeaderRow && subsequentRows
      )
    })

    _defineProperty(this, 'makeHeaderRowSticky', tree => {
      const { table } = tree
      const domTop =
        this.getCurrentTableTop(tree) > 0
          ? this.scrollElementTop
          : this.scrollElementTop + this.getCurrentTableTop(tree)

      if (!this.isSticky) {
        syncStickyRowToTable(table)
        this.dom.classList.add('sticky')
        table.classList.add(ClassName.TABLE_STICKY)
        this.isSticky = true
      }

      this.dom.style.top = `${domTop}px`
      updateTableMargin(table)
      this.emitOn(domTop, this.colControlsOffset)
    })

    _defineProperty(this, 'getWrapperoffset', (inverse = false) => {
      const focusValue = inverse ? !this.focused : this.focused
      return focusValue ? 0 : tableControlsSpacing
    })

    _defineProperty(
      this,
      'getWrapperRefTop',
      wrapper => Math.round(getTop(wrapper)) + this.getWrapperoffset()
    )

    _defineProperty(
      this,
      'getScrolledTableTop',
      wrapper => this.getWrapperRefTop(wrapper) - this.scrollElementTop
    )

    _defineProperty(
      this,
      'getCurrentTableTop',
      tree => this.getScrolledTableTop(tree.wrapper) + tree.table.clientHeight
    )

    _defineProperty(this, 'makeRowHeaderNotSticky', table => {
      if (!this.isSticky) {
        return
      }

      this.dom.style.removeProperty('width')
      this.dom.classList.remove('sticky')
      table.classList.remove(ClassName.TABLE_STICKY)
      this.isSticky = false
      this.dom.style.top = ''
      table.style.removeProperty('margin-top')
      this.emitOff()
    })

    _defineProperty(this, 'padding', 0)

    _defineProperty(this, 'top', 0)

    _defineProperty(this, 'emitOn', (top, padding) => {
      if (top === this.top && padding === this.padding) {
        return
      }

      this.top = top
      this.padding = padding
      updateStickyState({
        pos: this.getPos(),
        top,
        sticky: true,
        padding
      })(this.view.state, this.view.dispatch, this.view)
    })

    _defineProperty(this, 'emitOff', () => {
      if (this.top === 0 && this.padding === 0) {
        return
      }

      this.top = 0
      this.padding = 0
      updateStickyState({
        pos: this.getPos(),
        sticky: false,
        top: this.top,
        padding: this.padding
      })(this.view.state, this.view.dispatch, this.view)
    })

    this.view = view
    this.node = node
    this.getPos = getPos
    this.eventDispatcher = eventDispatcher
    this.dom = document.createElement('tr')
    this.contentDOM = this.dom
    this.isHeaderRow = supportedHeaderRow(node)

    if (this.isHeaderRow) {
      this.dom.setAttribute('data-header-row', 'true')
      this.subscribe()
    }
  }
  /* external events */

  subscribe() {
    this.scrollElement = findOverflowScrollParent(this.view.dom) || window

    if (this.scrollElement) {
      this.scrollElement.addEventListener('scroll', this.onScroll)
      this.scrollElementTop = getTop(this.scrollElement)
    }

    this.eventDispatcher.on(widthPluginKey.key, this.onWidthPluginState)
    this.eventDispatcher.on(tablePluginKey.key, this.onTablePluginState)
    this.listening = true
  }

  unsubscribe() {
    if (!this.listening) {
      return
    }

    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.onScroll)
    }

    this.eventDispatcher.off(widthPluginKey.key, this.onWidthPluginState)
    this.eventDispatcher.off(tablePluginKey.key, this.onTablePluginState)
    this.listening = false
  }
  /* paint/update loop */

  /* nodeview lifecycle */
  update(node, ...args) {
    // do nothing if nodes were identical
    if (node === this.node) {
      return true
    } // see if we're changing into a header row or
    // changing away from one

    const newNodeisHeaderRow = supportedHeaderRow(node)

    if (this.isHeaderRow !== newNodeisHeaderRow) {
      return false // re-create nodeview
    } // node is different but no need to re-create nodeview

    this.node = node // don't do anything if we're just a regular tr

    if (!this.isHeaderRow) {
      return true
    } // something changed, sync widths

    const tbody = this.dom.parentElement
    const table = tbody && tbody.parentElement
    syncStickyRowToTable(table)
    return true
  }

  destroy() {
    this.unsubscribe()
    const tree = getTree(this.dom)

    if (tree) {
      this.makeRowHeaderNotSticky(tree.table)
    }

    this.emitOff()
  }

  ignoreMutation(mutationRecord) {
    /* tableRows are not directly editable by the user
     * so it should be safe to ignore mutations that we cause
     * by updating styles and classnames on this DOM element
     *
     * Update: should allow mutations for row selection to avoid known issue with table selection highlight in firefox
     * Related bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=1289673
     * */
    return !(
      mutationRecord.type === 'selection' &&
      mutationRecord.target.tagName === 'TR'
    )
  }
  /* receive external events */
}
