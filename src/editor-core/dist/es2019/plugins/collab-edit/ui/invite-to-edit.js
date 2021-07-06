import React from 'react'
import InviteTeamIcon from '@atlaskit/icon/glyph/editor/add'
import ToolbarButton from '../../../ui/ToolbarButton'
import { InviteTeamWrapper } from './styles'

const ID = props =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, props.children)

export const InviteToEditButton = props => {
  const { Component, onClick, selected, title } = props
  const iconBefore = React.useMemo(
    () =>
      /*#__PURE__*/ React.createElement(InviteTeamIcon, {
        label: title
      }),
    [title]
  )

  if (!Component && !onClick) {
    return null
  }

  const Wrapper = Component ? Component : ID
  return /*#__PURE__*/ React.createElement(
    InviteTeamWrapper,
    null,
    /*#__PURE__*/ React.createElement(
      Wrapper,
      null,
      /*#__PURE__*/ React.createElement(ToolbarButton, {
        className: 'invite-to-edit',
        onClick: onClick,
        selected: selected,
        title: title,
        titlePosition: 'bottom',
        iconBefore: iconBefore
      })
    )
  )
}
