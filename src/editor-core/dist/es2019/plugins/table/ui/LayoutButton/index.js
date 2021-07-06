import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import classnames from 'classnames'
import { injectIntl } from 'react-intl'
import { Popup } from '@atlaskit/editor-common'
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse'
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand'
import commonMessages from '../../../../messages'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { toggleTableLayoutWithAnalytics } from '../../commands-with-analytics'
import { TableCssClassName as ClassName } from '../../types'

const addPopupOffset = pos => ({
  ...pos,
  // add 22 pixels to align y position with
  //the columns controls
  top: pos.top ? pos.top + 22 : undefined
})

const getTitle = layout => {
  switch (layout) {
    case 'default':
      return commonMessages.layoutWide

    case 'wide':
      return commonMessages.layoutFullWidth

    default:
      return commonMessages.layoutFixedWidth
  }
}

class LayoutButton extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleClick', () => {
      const { state, dispatch } = this.props.editorView
      toggleTableLayoutWithAnalytics()(state, dispatch)
    })
  }

  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      targetRef,
      isResizing,
      layout = 'default'
    } = this.props

    if (!targetRef) {
      return null
    }

    const title = formatMessage(getTitle(layout))
    return /*#__PURE__*/ React.createElement(
      Popup,
      {
        ariaLabel: title,
        target: targetRef,
        alignY: 'start',
        alignX: 'end',
        onPositionCalculated: addPopupOffset,
        stick: true,
        mountTo: mountPoint,
        boundariesElement: boundariesElement,
        scrollableElement: scrollableElement,
        forcePlacement: true
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: classnames(ClassName.LAYOUT_BUTTON, {
            [ClassName.IS_RESIZING]: isResizing
          })
        },
        /*#__PURE__*/ React.createElement(ToolbarButton, {
          title: title,
          onClick: this.handleClick,
          iconBefore:
            layout === 'full-width'
              ? /*#__PURE__*/ React.createElement(CollapseIcon, {
                  label: title
                })
              : /*#__PURE__*/ React.createElement(ExpandIcon, {
                  label: title
                })
        })
      )
    )
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.targetRef !== nextProps.targetRef ||
      this.props.layout !== nextProps.layout ||
      this.props.isResizing !== nextProps.isResizing
    )
  }
}

_defineProperty(LayoutButton, 'displayName', 'LayoutButton')

export default injectIntl(LayoutButton)
