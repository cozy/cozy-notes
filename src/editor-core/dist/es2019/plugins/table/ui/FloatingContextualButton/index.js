import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { findDomRefAtPos } from 'prosemirror-utils'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Popup } from '@atlaskit/editor-common'
import {
  akEditorFloatingOverlapPanelZIndex,
  akEditorSmallZIndex
} from '@atlaskit/editor-shared-styles'
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { closestElement } from '../../../../utils/dom'
import { toggleContextualMenu } from '../../commands'
import { TableCssClassName as ClassName } from '../../types'
import messages from '../../ui/messages'
import { tableFloatingCellButtonStyles } from './styles.css'
const ButtonWrapper = styled.div`
  ${tableFloatingCellButtonStyles}
`

class FloatingContextualButton extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleClick', () => {
      const { state, dispatch } = this.props.editorView // Clicking outside the dropdown handles toggling the menu closed
      // (otherwise these two toggles combat each other).
      // In the event a user clicks the chevron button again
      // That will count as clicking outside the dropdown and
      // will be toggled appropriately

      if (!this.props.isContextualMenuOpen) {
        toggleContextualMenu()(state, dispatch)
      }
    })
  }

  render() {
    const {
      mountPoint,
      scrollableElement,
      editorView,
      targetCellPosition,
      isContextualMenuOpen,
      intl: { formatMessage }
    } = this.props //  : Props & InjectedIntlProps

    const domAtPos = editorView.domAtPos.bind(editorView)
    const targetCellRef = findDomRefAtPos(targetCellPosition, domAtPos)

    if (!targetCellRef || !(targetCellRef instanceof HTMLElement)) {
      return null
    }

    const tableWrapper = closestElement(
      targetCellRef,
      `.${ClassName.TABLE_NODE_WRAPPER}`
    )
    const labelCellOptions = formatMessage(messages.cellOptions)
    const button = /*#__PURE__*/ React.createElement(
      ButtonWrapper,
      null,
      /*#__PURE__*/ React.createElement(ToolbarButton, {
        className: ClassName.CONTEXTUAL_MENU_BUTTON,
        selected: isContextualMenuOpen,
        title: labelCellOptions,
        onClick: this.handleClick,
        iconBefore: /*#__PURE__*/ React.createElement(ExpandIcon, {
          label: labelCellOptions
        })
      })
    )
    const parentSticky =
      targetCellRef.parentElement &&
      targetCellRef.parentElement.className.indexOf('sticky') > -1

    if (this.props.stickyHeader && parentSticky) {
      const pos = targetCellRef.getBoundingClientRect()
      return /*#__PURE__*/ React.createElement(
        'div',
        {
          style: {
            position: 'fixed',
            top:
              this.props.stickyHeader.top +
              this.props.stickyHeader.padding +
              3 +
              3,
            zIndex: akEditorFloatingOverlapPanelZIndex,
            left: pos.left + targetCellRef.clientWidth - 20 - 3
          }
        },
        button
      )
    }

    return /*#__PURE__*/ React.createElement(
      Popup,
      {
        alignX: 'right',
        alignY: 'start',
        target: targetCellRef,
        mountTo: tableWrapper || mountPoint,
        boundariesElement: targetCellRef,
        scrollableElement: scrollableElement,
        offset: [3, -3],
        forcePlacement: true,
        allowOutOfBounds: true,
        zIndex: akEditorSmallZIndex
      },
      button
    )
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.tableNode !== nextProps.tableNode ||
      this.props.targetCellPosition !== nextProps.targetCellPosition ||
      this.props.layout !== nextProps.layout ||
      this.props.isContextualMenuOpen !== nextProps.isContextualMenuOpen ||
      this.props.isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
      this.props.stickyHeader !== nextProps.stickyHeader
    )
  }
}

_defineProperty(
  FloatingContextualButton,
  'displayName',
  'FloatingContextualButton'
)

export default injectIntl(FloatingContextualButton)
