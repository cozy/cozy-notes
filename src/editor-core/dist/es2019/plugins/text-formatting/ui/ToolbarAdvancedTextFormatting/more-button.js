import React from 'react';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import { TriggerWrapper } from '../../../../ui/styles';
import ToolbarButton from '../../../../ui/ToolbarButton';
export const MoreButton = props => {
  const {
    title
  } = props;
  const more = React.useMemo(() => /*#__PURE__*/React.createElement(TriggerWrapper, null, /*#__PURE__*/React.createElement(MoreIcon, {
    label: title
  })), [title]);
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    disabled: props.disabled,
    iconBefore: more,
    onClick: props.onClick,
    selected: props.selected,
    spacing: props.spacing,
    title: title
  });
};