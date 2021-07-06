import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import styled from 'styled-components'
import { defineMessages, injectIntl } from 'react-intl'
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search'
import {
  akEditorFloatingPanelZIndex,
  akEditorMobileMaxWidth
} from '@atlaskit/editor-shared-styles'
import ToolbarButton from '../../../ui/ToolbarButton'
import Dropdown from '../../../ui/Dropdown'
import FindReplace from './FindReplace'
import { TRIGGER_METHOD } from '../../analytics/types'
import { ToolTipContent, findKeymapByDescription } from '../../../keymaps'
const ToolbarButtonWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  padding: 0 8px;
  @media (max-width: ${akEditorMobileMaxWidth}px) {
    justify-content: center;
    padding: 0;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const messages = defineMessages({
  findReplaceToolbarButton: {
    id: 'fabric.editor.findReplaceToolbarButton',
    defaultMessage: 'Find and replace',
    description:
      '"Find" highlights all instances of a word or phrase on the document, and "Replace" changes one or all of those instances to something else'
  }
})

class FindReplaceToolbarButton extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleKeydown', event => {
      if (event.metaKey && event.key === 'f') {
        event.preventDefault()
      }
    })

    _defineProperty(this, 'toggleOpen', () => {
      if (this.props.isActive) {
        this.props.onCancel({
          triggerMethod: TRIGGER_METHOD.TOOLBAR
        })
      } else {
        this.props.onActivate()
      }
    })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }
  /**
   * Prevent browser find opening if you hit cmd+f with cursor
   * inside find/replace component
   */

  render() {
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      findText,
      replaceText,
      isActive,
      index,
      numMatches,
      intl: { formatMessage }
    } = this.props
    const title = formatMessage(messages.findReplaceToolbarButton)
    const stackBelowOtherEditorFloatingPanels = akEditorFloatingPanelZIndex - 1
    return /*#__PURE__*/ React.createElement(
      ToolbarButtonWrapper,
      null,
      /*#__PURE__*/ React.createElement(
        Dropdown,
        {
          mountTo: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          scrollableElement: popupsScrollableElement,
          isOpen: isActive,
          handleEscapeKeydown: () => {
            if (isActive) {
              this.props.onCancel({
                triggerMethod: TRIGGER_METHOD.KEYBOARD
              })
            }
          },
          fitWidth: 352,
          zIndex: stackBelowOtherEditorFloatingPanels,
          trigger: /*#__PURE__*/ React.createElement(ToolbarButton, {
            spacing: isReducedSpacing ? 'none' : 'default',
            selected: isActive,
            title: /*#__PURE__*/ React.createElement(ToolTipContent, {
              description: title,
              keymap: findKeymapByDescription('Find')
            }),
            iconBefore: /*#__PURE__*/ React.createElement(EditorSearchIcon, {
              label: title
            }),
            onClick: this.toggleOpen
          })
        },
        /*#__PURE__*/ React.createElement(
          Wrapper,
          null,
          /*#__PURE__*/ React.createElement(
            FindReplace,
            _extends(
              {
                findText: findText,
                replaceText: replaceText,
                count: {
                  index,
                  total: numMatches
                }
              },
              this.props
            )
          )
        )
      )
    )
  }
}

export default injectIntl(FindReplaceToolbarButton)
