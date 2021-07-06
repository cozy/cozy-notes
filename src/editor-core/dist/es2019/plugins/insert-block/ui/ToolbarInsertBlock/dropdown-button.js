import React from 'react'
import AddIcon from '@atlaskit/icon/glyph/editor/add'
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down'
import { ToolTipContent } from '../../../../keymaps'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { ExpandIconWrapper } from '../../../../ui/styles'
import { TriggerWrapper } from './styles'
const DropDownButtonIcon = /*#__PURE__*/ React.memo(props =>
  /*#__PURE__*/ React.createElement(
    TriggerWrapper,
    null,
    /*#__PURE__*/ React.createElement(AddIcon, {
      label: props.label
    }),
    /*#__PURE__*/ React.createElement(
      ExpandIconWrapper,
      null,
      /*#__PURE__*/ React.createElement(ExpandIcon, {
        label: props.label
      })
    )
  )
)
export const DropDownButton = /*#__PURE__*/ React.memo(props =>
  /*#__PURE__*/ React.createElement(ToolbarButton, {
    ref: props.handleRef,
    selected: props.selected,
    disabled: props.disabled,
    onClick: props.onClick,
    spacing: props.spacing,
    iconBefore: /*#__PURE__*/ React.createElement(DropDownButtonIcon, {
      label: props.label
    }),
    title: /*#__PURE__*/ React.createElement(ToolTipContent, {
      description: props.label,
      shortcutOverride: '/'
    })
  })
)
