import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import BoldIcon from '@atlaskit/icon/glyph/editor/bold'
import ItalicIcon from '@atlaskit/icon/glyph/editor/italic'
import { toggleBold, toggleItalic, ToolTipContent } from '../../../../keymaps'
import { ButtonGroup } from '../../../../ui/styles'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { INPUT_METHOD } from '../../../analytics'
import {
  toggleEmWithAnalytics,
  toggleStrongWithAnalytics
} from '../../commands/text-formatting'
import { toolbarMessages } from './toolbar-messages'

class ToolbarTextFormatting extends PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'handleBoldClick', () => {
      const { strongDisabled } = this.props.textFormattingState

      if (!strongDisabled) {
        const { state, dispatch } = this.props.editorView
        return toggleStrongWithAnalytics({
          inputMethod: INPUT_METHOD.TOOLBAR
        })(state, dispatch)
      }

      return false
    })

    _defineProperty(this, 'handleItalicClick', () => {
      const { emDisabled } = this.props.textFormattingState

      if (!emDisabled) {
        const { state, dispatch } = this.props.editorView
        return toggleEmWithAnalytics({
          inputMethod: INPUT_METHOD.TOOLBAR
        })(state, dispatch)
      }

      return false
    })
  }

  render() {
    const {
      disabled,
      isReducedSpacing,
      textFormattingState,
      intl: { formatMessage }
    } = this.props
    const {
      strongHidden,
      strongActive,
      strongDisabled,
      emHidden,
      emActive,
      emDisabled
    } = textFormattingState
    const labelBold = formatMessage(toolbarMessages.bold)
    const labelItalic = formatMessage(toolbarMessages.italic)
    return /*#__PURE__*/ React.createElement(
      ButtonGroup,
      {
        width: isReducedSpacing ? 'small' : 'large'
      },
      strongHidden
        ? null
        : /*#__PURE__*/ React.createElement(ToolbarButton, {
            spacing: isReducedSpacing ? 'none' : 'default',
            onClick: this.handleBoldClick,
            selected: strongActive,
            disabled: disabled || strongDisabled,
            title: /*#__PURE__*/ React.createElement(ToolTipContent, {
              description: labelBold,
              keymap: toggleBold
            }),
            iconBefore: /*#__PURE__*/ React.createElement(BoldIcon, {
              label: labelBold
            })
          }),
      emHidden
        ? null
        : /*#__PURE__*/ React.createElement(ToolbarButton, {
            spacing: isReducedSpacing ? 'none' : 'default',
            onClick: this.handleItalicClick,
            selected: emActive,
            disabled: disabled || emDisabled,
            title: /*#__PURE__*/ React.createElement(ToolTipContent, {
              description: labelItalic,
              keymap: toggleItalic
            }),
            iconBefore: /*#__PURE__*/ React.createElement(ItalicIcon, {
              label: labelItalic
            })
          })
    )
  }
}

export default injectIntl(ToolbarTextFormatting)
