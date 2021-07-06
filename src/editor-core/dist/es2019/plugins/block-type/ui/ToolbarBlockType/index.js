import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { injectIntl } from 'react-intl'
import { akEditorMenuZIndex } from '@atlaskit/editor-shared-styles'
import DropdownMenu from '../../../../ui/DropdownMenu'
import { Separator, Wrapper, MenuWrapper } from '../../../../ui/styles'
import { NORMAL_TEXT } from '../../types'
import { BlockTypeMenuItem, KeyboardShortcut } from './styled'
import { tooltip, findKeymapByDescription } from '../../../../keymaps'
import { BlockTypeButton } from './blocktype-button'

class ToolbarBlockType extends React.PureComponent {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      active: false
    })

    _defineProperty(this, 'onOpenChange', attrs => {
      this.setState({
        active: attrs.isOpen
      })
    })

    _defineProperty(this, 'handleTriggerClick', () => {
      this.onOpenChange({
        isOpen: !this.state.active
      })
    })

    _defineProperty(this, 'createItems', () => {
      const {
        intl: { formatMessage }
      } = this.props
      const { currentBlockType, availableBlockTypes } = this.props.pluginState
      const items = availableBlockTypes.map((blockType, index) => {
        const isActive = currentBlockType === blockType
        const Tag = blockType.tagName || 'p'
        return {
          content: /*#__PURE__*/ React.createElement(
            BlockTypeMenuItem,
            {
              tagName: Tag,
              selected: isActive
            },
            /*#__PURE__*/ React.createElement(
              Tag,
              null,
              formatMessage(blockType.title)
            )
          ),
          value: blockType,
          key: `${blockType.name}-${index}`,
          elemAfter: /*#__PURE__*/ React.createElement(
            KeyboardShortcut,
            {
              selected: isActive
            },
            tooltip(findKeymapByDescription(blockType.title.defaultMessage))
          ),
          isActive
        }
      })
      return [
        {
          items
        }
      ]
    })

    _defineProperty(this, 'handleSelectBlockType', ({ item }) => {
      const blockType = item.value
      this.props.setBlockType(blockType.name)
      this.setState({
        active: false
      })
    })
  }

  render() {
    const { active } = this.state
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isSmall,
      isReducedSpacing,
      pluginState: {
        currentBlockType,
        blockTypesDisabled,
        availableBlockTypes
      },
      intl: { formatMessage }
    } = this.props
    const isHeadingDisabled = !availableBlockTypes.some(
      blockType => blockType.nodeName === 'heading'
    )

    if (isHeadingDisabled) {
      return null
    }

    const blockTypeTitles = availableBlockTypes
      .filter(blockType => blockType.name === currentBlockType.name)
      .map(blockType => blockType.title)
    const longestDropdownMenuItem = [
      NORMAL_TEXT,
      ...availableBlockTypes
    ].reduce((longest, item) => {
      const itemTitle = formatMessage(item.title)
      return itemTitle.length >= longest.length ? itemTitle : longest
    }, '')

    if (!this.props.isDisabled && !blockTypesDisabled) {
      const items = this.createItems()
      return /*#__PURE__*/ React.createElement(
        MenuWrapper,
        null,
        /*#__PURE__*/ React.createElement(
          DropdownMenu,
          {
            items: items,
            onOpenChange: this.onOpenChange,
            onItemActivated: this.handleSelectBlockType,
            isOpen: active,
            mountTo: popupsMountPoint,
            boundariesElement: popupsBoundariesElement,
            scrollableElement: popupsScrollableElement,
            zIndex: akEditorMenuZIndex,
            fitHeight: 360,
            fitWidth: 106
          },
          /*#__PURE__*/ React.createElement(
            BlockTypeButton,
            {
              isSmall: isSmall,
              isReducedSpacing: isReducedSpacing,
              selected: active,
              disabled: false,
              title: blockTypeTitles[0],
              onClick: this.handleTriggerClick,
              formatMessage: formatMessage
            },
            longestDropdownMenuItem
          )
        ),
        /*#__PURE__*/ React.createElement(Separator, null)
      )
    }

    return /*#__PURE__*/ React.createElement(
      Wrapper,
      null,
      /*#__PURE__*/ React.createElement(
        BlockTypeButton,
        {
          isSmall: isSmall,
          isReducedSpacing: isReducedSpacing,
          selected: active,
          disabled: true,
          title: blockTypeTitles[0],
          onClick: this.handleTriggerClick,
          formatMessage: formatMessage
        },
        longestDropdownMenuItem
      ),
      /*#__PURE__*/ React.createElement(Separator, null)
    )
  }
}

export default injectIntl(ToolbarBlockType)
