import React from 'react';
import { getAvatarColor } from '../utils';
import { Badge } from './styles';
export const ColoredAvatarItem = props => {
  const color = getAvatarColor(props.sessionId).color.solid;
  const avatar = props.name.substr(0, 1).toUpperCase();
  return /*#__PURE__*/React.createElement(Badge, {
    color: color,
    "data-testid": "editor-collab-badge"
  }, avatar);
};