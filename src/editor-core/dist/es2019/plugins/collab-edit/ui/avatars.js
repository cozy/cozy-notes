import React from 'react'
import AvatarGroup from '@atlaskit/avatar-group'
import { AvatarContainer } from './styles'
import toAvatar from './to-avatar'
export const Avatars = /*#__PURE__*/ React.memo(props => {
  const { sessionId } = props
  const participants = props.participants.toArray()
  const avatars = participants
    .sort(p => (p.sessionId === sessionId ? -1 : 1))
    .map(toAvatar)

  if (!avatars.length) {
    return null
  }

  return /*#__PURE__*/ React.createElement(
    AvatarContainer,
    null,
    /*#__PURE__*/ React.createElement(AvatarGroup, {
      appearance: 'stack',
      size: 'medium',
      data: avatars
    }),
    props.children
  )
})
