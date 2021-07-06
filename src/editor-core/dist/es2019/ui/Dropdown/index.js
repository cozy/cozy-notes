import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { PureComponent } from 'react'
import DropdownList from '@atlaskit/droplist'
import { Popup } from '@atlaskit/editor-common'
import withOuterListeners from '../with-outer-listeners'

/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * droplist outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    _defineProperty(this, 'handleRef', target => {
      this.setState({
        target: target || undefined
      })
    })

    _defineProperty(this, 'updatePopupPlacement', placement => {
      this.setState({
        popupPlacement: placement
      })
    })

    this.state = {
      popupPlacement: ['bottom', 'left']
    }
  }

  renderDropdown() {
    const { target, popupPlacement } = this.state
    const {
      children,
      mountTo,
      boundariesElement,
      scrollableElement,
      onOpenChange,
      fitHeight,
      fitWidth,
      zIndex
    } = this.props
    return /*#__PURE__*/ React.createElement(
      Popup,
      {
        target: target,
        mountTo: mountTo,
        boundariesElement: boundariesElement,
        scrollableElement: scrollableElement,
        onPlacementChanged: this.updatePopupPlacement,
        fitHeight: fitHeight,
        fitWidth: fitWidth,
        zIndex: zIndex
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          style: {
            height: 0,
            minWidth: fitWidth || 0
          }
        },
        /*#__PURE__*/ React.createElement(
          DropdownList,
          {
            disabled: true,
            isOpen: true,
            onOpenChange: onOpenChange,
            appearance: 'tall',
            position: popupPlacement.join(' '),
            shouldFlip: false,
            shouldFitContainer: true
          },
          children
        )
      )
    )
  }

  render() {
    const { trigger, isOpen } = this.props
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(
        'div',
        {
          ref: this.handleRef
        },
        trigger
      ),
      isOpen ? this.renderDropdown() : null
    )
  }
}
const DropdownWithOuterListeners = withOuterListeners(Dropdown)
export default DropdownWithOuterListeners
