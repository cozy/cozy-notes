import React from 'react'
import { findDomRefAtPos } from 'prosemirror-utils'
import {
  findCellRectClosestToPos,
  getSelectionRect,
  isSelectionType
} from '@atlaskit/editor-tables/utils'
import styled from 'styled-components'
import { Popup } from '@atlaskit/editor-common'
import { akEditorFloatingOverlapPanelZIndex } from '@atlaskit/editor-shared-styles'
import { getPluginState, pluginKey } from '../../pm-plugins/plugin-factory'
import {
  contextualMenuDropdownWidth,
  contextualMenuTriggerSize
} from '../consts'
import { tablePopupStyles } from './styles.css'
import ContextualMenu from './ContextualMenu'
const MenuWrapper = styled.div`
  ${tablePopupStyles}
` // offset of the contextual menu dropdown

const calculateOffset = (targetCellRef, state) => {
  const { tableRef } = pluginKey.getState(state)
  let top = -contextualMenuTriggerSize

  if (tableRef && targetCellRef) {
    const targetOffset = targetCellRef.getBoundingClientRect()
    const tableOffset = tableRef.getBoundingClientRect()
    let topDiff = targetOffset.top - tableOffset.top

    if (topDiff < 200) {
      top -= topDiff + 2
    }
  }

  return [contextualMenuTriggerSize / 2, top]
}

const FloatingContextualMenu = ({
  mountPoint,
  boundariesElement,
  scrollableElement,
  editorView,
  isOpen,
  pluginConfig
}) => {
  // TargetCellPosition could be outdated: https://product-fabric.atlassian.net/browse/ED-8129
  const { targetCellPosition } = getPluginState(editorView.state)

  if (
    !isOpen ||
    !targetCellPosition ||
    editorView.state.doc.nodeSize <= targetCellPosition
  ) {
    return null
  }

  const { selection } = editorView.state
  const selectionRect = isSelectionType(selection, 'cell')
    ? getSelectionRect(selection)
    : findCellRectClosestToPos(selection.$from)

  if (!selectionRect) {
    return null
  }

  const domAtPos = editorView.domAtPos.bind(editorView)
  const targetCellRef = findDomRefAtPos(targetCellPosition, domAtPos)

  if (!targetCellRef) {
    return null
  }

  return /*#__PURE__*/ React.createElement(
    Popup,
    {
      alignX: 'right',
      alignY: 'top',
      target: targetCellRef,
      mountTo: mountPoint,
      boundariesElement: boundariesElement,
      scrollableElement: scrollableElement,
      fitHeight: 188,
      fitWidth: contextualMenuDropdownWidth, // z-index value below is to ensure that this menu is above other floating menu
      // in table, but below floating dialogs like typeaheads, pickers, etc.
      zIndex: akEditorFloatingOverlapPanelZIndex,
      forcePlacement: true,
      offset: [-7, 0]
    },
    /*#__PURE__*/ React.createElement(
      MenuWrapper,
      null,
      /*#__PURE__*/ React.createElement(ContextualMenu, {
        editorView: editorView,
        offset: calculateOffset(targetCellRef, editorView.state),
        isOpen: isOpen,
        targetCellPosition: targetCellPosition,
        allowColumnSorting: pluginConfig && pluginConfig.allowColumnSorting,
        allowMergeCells: pluginConfig.allowMergeCells,
        allowBackgroundColor: pluginConfig.allowBackgroundColor,
        selectionRect: selectionRect,
        boundariesElement: boundariesElement
      })
    )
  )
}

FloatingContextualMenu.displayName = 'FloatingContextualMenu'
export default FloatingContextualMenu
