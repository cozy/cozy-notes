import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { multiply } from '@atlaskit/theme/math';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import Tooltip from '@atlaskit/tooltip';
import * as colors from '@atlaskit/theme/colors';
import { messages } from '../messages';
const RemovableFieldWrapper = styled.div`
  position: relative;
  margin-bottom: ${multiply(gridSize, 2)}px;
`;
const RemoveButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;

  color: ${colors.N80};

  &:hover {
    color: ${colors.R300};
  }
`;

const RemovableField = ({
  name,
  canRemoveField,
  onClickRemove,
  children,
  intl
}) => {
  const onClickCallback = React.useCallback(() => onClickRemove && onClickRemove(name), [name, onClickRemove]);
  return /*#__PURE__*/React.createElement(RemovableFieldWrapper, null, children, canRemoveField && /*#__PURE__*/React.createElement(RemoveButtonWrapper, {
    testId: `remove-field-${name}`,
    onClick: onClickCallback
  }, /*#__PURE__*/React.createElement(Tooltip, {
    content: intl.formatMessage(messages.removeField),
    position: "left"
  }, /*#__PURE__*/React.createElement(CrossCircleIcon, {
    size: "small",
    label: intl.formatMessage(messages.removeField)
  }))));
};

export default injectIntl(RemovableField);