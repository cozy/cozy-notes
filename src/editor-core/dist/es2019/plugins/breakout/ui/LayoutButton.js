import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import * as colors from '@atlaskit/theme/colors'
import { injectIntl } from 'react-intl'
import { findParentDomRefOfType, findDomRefAtPos } from 'prosemirror-utils'
import { Popup } from '@atlaskit/editor-common'
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse'
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand'
import ToolbarButton from '../../../ui/ToolbarButton'
import styled from 'styled-components'
import { getBreakoutMode } from '../utils/get-breakout-mode'
import { setBreakoutMode } from '../commands/set-breakout-mode'
import { removeBreakout } from '../commands/remove-breakout'
import commonMessages from '../../../messages'
import { BreakoutCssClassName } from '../constants'
import { isBreakoutMarkAllowed } from '../utils/is-breakout-mark-allowed'
import { getPluginState } from '../plugin-key'
import { NodeSelection } from 'prosemirror-state'
import { isSupportedNodeForBreakout } from '../utils/is-supported-node'
const { B300, N300, N20A } = colors
const Wrapper = styled.div`
  && button {
    background: ${N20A};
    color: ${N300};
    :hover {
      background: ${B300};
      color: white !important;
    }
  }
`
const BREAKOUT_MODE = {
  FULL_WIDTH: 'full-width',
  CENTER: 'center',
  WIDE: 'wide'
}

const getNextBreakoutMode = currentMode => {
  if (currentMode === BREAKOUT_MODE.FULL_WIDTH) {
    return BREAKOUT_MODE.CENTER
  } else if (currentMode === BREAKOUT_MODE.WIDE) {
    return BREAKOUT_MODE.FULL_WIDTH
  }

  return BREAKOUT_MODE.WIDE
}

const getTitle = layout => {
  switch (layout) {
    case BREAKOUT_MODE.FULL_WIDTH:
      return commonMessages.layoutFixedWidth

    case BREAKOUT_MODE.WIDE:
      return commonMessages.layoutFullWidth

    default:
      return commonMessages.layoutWide
  }
}

function getBreakoutNodeElement(pluginState, selection, editorView) {
  if (
    selection instanceof NodeSelection &&
    isSupportedNodeForBreakout(selection.node)
  ) {
    return findDomRefAtPos(selection.from, editorView.domAtPos.bind(editorView))
  }

  return findParentDomRefOfType(
    pluginState.breakoutNode.type,
    editorView.domAtPos.bind(editorView)
  )(selection)
}

class LayoutButton extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleClick', breakoutMode => () => {
      const { state, dispatch } = this.props.editorView

      if (
        [BREAKOUT_MODE.WIDE, BREAKOUT_MODE.FULL_WIDTH].indexOf(breakoutMode) !==
        -1
      ) {
        setBreakoutMode(breakoutMode)(state, dispatch)
      } else {
        removeBreakout()(state, dispatch)
      }
    })
  }

  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      editorView,
      node
    } = this.props
    const { state } = editorView

    if (!node || !isBreakoutMarkAllowed(state)) {
      return null
    }

    const breakoutMode = getBreakoutMode(editorView.state)
    const titleMessage = getTitle(breakoutMode)
    const title = formatMessage(titleMessage)
    const nextBreakoutMode = getNextBreakoutMode(breakoutMode)
    let pluginState = getPluginState(state)
    let element = getBreakoutNodeElement(
      pluginState,
      state.selection,
      editorView
    )

    if (!element) {
      return null
    }

    const closestEl = element.querySelector(
      `.${BreakoutCssClassName.BREAKOUT_MARK_DOM}`
    )

    if (closestEl && closestEl.firstChild) {
      element = closestEl.firstChild
    }

    return /*#__PURE__*/ React.createElement(
      Popup,
      {
        ariaLabel: title,
        target: element,
        offset: [5, 0],
        alignY: 'start',
        alignX: 'end',
        mountTo: mountPoint,
        boundariesElement: boundariesElement,
        scrollableElement: scrollableElement,
        stick: true,
        forcePlacement: true
      },
      /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        /*#__PURE__*/ React.createElement(ToolbarButton, {
          title: title,
          testId: titleMessage.id,
          onClick: this.handleClick(nextBreakoutMode),
          iconBefore:
            breakoutMode === BREAKOUT_MODE.FULL_WIDTH
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
}

_defineProperty(LayoutButton, 'displayName', 'LayoutButton')

export default injectIntl(LayoutButton)
