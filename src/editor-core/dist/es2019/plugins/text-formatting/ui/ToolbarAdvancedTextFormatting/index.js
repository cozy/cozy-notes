import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { akEditorMenuZIndex } from '@atlaskit/editor-shared-styles'
import MoreIcon from '@atlaskit/icon/glyph/editor/more'
import {
  clearFormatting as clearFormattingKeymap,
  toggleCode,
  toggleStrikethrough,
  toggleUnderline,
  tooltip,
  toggleBold,
  toggleItalic
} from '../../../../keymaps'
import DropdownMenu from '../../../../ui/DropdownMenu'
import {
  Separator,
  Shortcut,
  TriggerWrapper,
  Wrapper
} from '../../../../ui/styles'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { INPUT_METHOD } from '../../../analytics'
import { clearFormattingWithAnalytics } from '../../commands/clear-formatting'
import * as commands from '../../commands/text-formatting'
import { toolbarMessages } from './toolbar-messages'
import { toolbarMessages as textFormattingMessages } from '../ToolbarTextFormatting/toolbar-messages'
import { pluginKey as widthPluginKey } from '../../../width/index'
import { akEditorMobileMaxWidth } from '@atlaskit/editor-shared-styles'

class ToolbarAdvancedTextFormatting extends PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      isOpen: false
    })

    _defineProperty(this, 'onOpenChange', attrs => {
      this.setState({
        isOpen: attrs.isOpen
      })
    })

    _defineProperty(this, 'handleTriggerClick', () => {
      this.onOpenChange({
        isOpen: !this.state.isOpen
      })
    })

    _defineProperty(this, 'createItems', () => {
      const {
        textFormattingState,
        clearFormattingState,
        editorView,
        intl: { formatMessage }
      } = this.props
      const { code, underline, subsup, strike } = editorView.state.schema.marks
      let items = []

      if (textFormattingState) {
        const {
          underlineHidden,
          codeHidden,
          strikeHidden,
          subscriptHidden,
          superscriptHidden
        } = textFormattingState
        const widthState = widthPluginKey.getState(editorView.state) // add bold and italic for small viewports only

        if (widthState.width < akEditorMobileMaxWidth) {
          this.addRecordToItems(
            items,
            formatMessage(textFormattingMessages.bold),
            'strong',
            tooltip(toggleBold)
          )
          this.addRecordToItems(
            items,
            formatMessage(textFormattingMessages.italic),
            'em',
            tooltip(toggleItalic)
          )
        }

        if (!underlineHidden && underline) {
          this.addRecordToItems(
            items,
            formatMessage(toolbarMessages.underline),
            'underline',
            tooltip(toggleUnderline)
          )
        }

        if (!strikeHidden && strike) {
          this.addRecordToItems(
            items,
            formatMessage(toolbarMessages.strike),
            'strike',
            tooltip(toggleStrikethrough)
          )
        }

        if (!codeHidden && code) {
          this.addRecordToItems(
            items,
            formatMessage(toolbarMessages.code),
            'code',
            tooltip(toggleCode)
          )
        }

        if (!subscriptHidden && subsup) {
          this.addRecordToItems(
            items,
            formatMessage(toolbarMessages.subscript),
            'subscript'
          )
        }

        if (!superscriptHidden && subsup) {
          this.addRecordToItems(
            items,
            formatMessage(toolbarMessages.superscript),
            'superscript'
          )
        }
      }

      if (clearFormattingState) {
        this.addRecordToItems(
          items,
          formatMessage(toolbarMessages.clearFormatting),
          'clearFormatting',
          tooltip(clearFormattingKeymap),
          !clearFormattingState.formattingIsPresent
        )
      }

      return [
        {
          items
        }
      ]
    })

    _defineProperty(
      this,
      'addRecordToItems',
      (items, content, value, tooltip, isDisabled) => {
        let active = false
        let disabled = false

        if (this.props.textFormattingState) {
          active = this.props.textFormattingState[`${value}Active`] || false
          disabled =
            isDisabled ||
            this.props.textFormattingState[`${value}Disabled`] ||
            false
        }

        items.push({
          key: value,
          content,
          elemAfter: tooltip
            ? /*#__PURE__*/ React.createElement(Shortcut, null, tooltip)
            : undefined,
          value: {
            name: value
          },
          isActive: active,
          isDisabled: disabled
        })
      }
    )

    _defineProperty(this, 'onItemActivated', ({ item }) => {
      const { state, dispatch } = this.props.editorView

      switch (item.value.name) {
        case 'underline':
          commands.toggleUnderlineWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'code':
          commands.toggleCodeWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'strike':
          commands.toggleStrikeWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'subscript':
          commands.toggleSubscriptWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'superscript':
          commands.toggleSuperscriptWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'strong':
          commands.toggleStrongWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'em':
          commands.toggleEmWithAnalytics({
            inputMethod: INPUT_METHOD.TOOLBAR
          })(state, dispatch)
          break

        case 'clearFormatting':
          clearFormattingWithAnalytics(INPUT_METHOD.TOOLBAR)(state, dispatch)
          break
      }

      this.setState({
        isOpen: false
      })
    })
  }

  render() {
    const { isOpen } = this.state
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      textFormattingState = {},
      clearFormattingState = {},
      intl: { formatMessage }
    } = this.props
    const {
      codeActive,
      underlineActive,
      strikeActive,
      subscriptActive,
      superscriptActive,
      codeDisabled,
      underlineDisabled,
      strikeDisabled,
      subscriptDisabled,
      superscriptDisabled
    } = textFormattingState
    const { formattingIsPresent } = clearFormattingState
    const items = this.createItems()
    const labelMoreFormatting = formatMessage(toolbarMessages.moreFormatting)

    const toolbarButtonFactory = disabled =>
      /*#__PURE__*/ React.createElement(ToolbarButton, {
        spacing: isReducedSpacing ? 'none' : 'default',
        selected:
          isOpen ||
          underlineActive ||
          codeActive ||
          strikeActive ||
          subscriptActive ||
          superscriptActive,
        disabled: disabled,
        onClick: this.handleTriggerClick,
        title: labelMoreFormatting,
        iconBefore: /*#__PURE__*/ React.createElement(
          TriggerWrapper,
          null,
          /*#__PURE__*/ React.createElement(MoreIcon, {
            label: labelMoreFormatting
          })
        )
      })

    if (
      !this.props.isDisabled &&
      !(
        strikeDisabled &&
        !formattingIsPresent &&
        codeDisabled &&
        subscriptDisabled &&
        superscriptDisabled &&
        underlineDisabled
      ) &&
      items[0].items.length > 0
    ) {
      return /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        /*#__PURE__*/ React.createElement(
          DropdownMenu,
          {
            items: items,
            onItemActivated: this.onItemActivated,
            onOpenChange: this.onOpenChange,
            mountTo: popupsMountPoint,
            boundariesElement: popupsBoundariesElement,
            scrollableElement: popupsScrollableElement,
            isOpen: isOpen,
            zIndex: akEditorMenuZIndex,
            fitHeight: 188,
            fitWidth: 136
          },
          toolbarButtonFactory(false)
        ),
        /*#__PURE__*/ React.createElement(Separator, null)
      )
    } else {
      return /*#__PURE__*/ React.createElement(
        Wrapper,
        null,
        /*#__PURE__*/ React.createElement(
          'div',
          null,
          toolbarButtonFactory(true)
        ),
        /*#__PURE__*/ React.createElement(Separator, null)
      )
    }
  }
}

export default injectIntl(ToolbarAdvancedTextFormatting)
