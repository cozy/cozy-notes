import React from 'react';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import ToolbarButton from '../ToolbarButton';
import WithHelpTrigger from '../WithHelpTrigger';
export default (({
  title = 'Open help dialog',
  titlePosition = 'left'
}) => /*#__PURE__*/React.createElement(WithHelpTrigger, {
  render: showHelp => /*#__PURE__*/React.createElement(ToolbarButton, {
    onClick: showHelp,
    title: title,
    titlePosition: titlePosition,
    iconBefore: /*#__PURE__*/React.createElement(QuestionIcon, {
      label: title
    })
  })
}));