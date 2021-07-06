import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down'
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style'
import ToolbarButton from '../../../../ui/ToolbarButton'
import {
  ButtonContent,
  Wrapper,
  ExpandIconWrapper
} from '../../../../ui/styles'
import { NORMAL_TEXT } from '../../types'
export const messages = defineMessages({
  textStyles: {
    id: 'fabric.editor.textStyles',
    defaultMessage: 'Text styles',
    description: 'Menu provides access to various heading styles or normal text'
  }
})
export const BlockTypeButton = props => {
  const labelTextStyles = props.formatMessage(messages.textStyles)
  return /*#__PURE__*/ React.createElement(
    ToolbarButton,
    {
      spacing: props.isReducedSpacing ? 'none' : 'default',
      selected: props.selected,
      className: 'block-type-btn',
      disabled: props.disabled,
      onClick: props.onClick,
      title: labelTextStyles,
      'aria-label': 'Font style',
      iconAfter: /*#__PURE__*/ React.createElement(
        Wrapper,
        {
          isSmall: props.isSmall
        },
        props.isSmall &&
          /*#__PURE__*/ React.createElement(TextStyleIcon, {
            label: labelTextStyles
          }),
        /*#__PURE__*/ React.createElement(
          ExpandIconWrapper,
          null,
          /*#__PURE__*/ React.createElement(ExpandIcon, {
            label: labelTextStyles
          })
        )
      )
    },
    !props.isSmall &&
      /*#__PURE__*/ React.createElement(
        ButtonContent,
        {
          spacing: props.isReducedSpacing ? 'none' : 'default'
        },
        /*#__PURE__*/ React.createElement(
          FormattedMessage,
          props.title || NORMAL_TEXT.title
        ),
        /*#__PURE__*/ React.createElement(
          'div',
          {
            style: {
              overflow: 'hidden',
              height: 0
            }
          },
          props.children
        )
      )
  )
}
