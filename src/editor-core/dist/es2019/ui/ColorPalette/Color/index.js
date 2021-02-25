import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { PureComponent } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { N0 } from '@atlaskit/theme/colors';
import { Button, ButtonWrapper } from './styles';
import Tooltip from '@atlaskit/tooltip'; // IMO these should live inside @atlaskit/theme

const messages = defineMessages({
  selected: {
    id: 'fabric.editor.selected',
    defaultMessage: 'Selected',
    description: 'If the item is selected or not.'
  }
});

class Color extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onMouseDown", e => {
      e.preventDefault();
    });

    _defineProperty(this, "onClick", e => {
      const {
        onClick,
        value
      } = this.props;
      e.preventDefault();
      onClick(value);
    });
  }

  render() {
    const {
      tabIndex,
      value,
      label,
      isSelected,
      borderColor,
      checkMarkColor = N0,
      intl: {
        formatMessage
      }
    } = this.props;
    return /*#__PURE__*/React.createElement(Tooltip, {
      content: label
    }, /*#__PURE__*/React.createElement(ButtonWrapper, null, /*#__PURE__*/React.createElement(Button, {
      onClick: this.onClick,
      onMouseDown: this.onMouseDown,
      tabIndex: tabIndex,
      className: `${isSelected ? 'selected' : ''}`,
      style: {
        backgroundColor: value || 'transparent',
        border: `1px solid ${borderColor}`
      }
    }, isSelected && /*#__PURE__*/React.createElement(EditorDoneIcon, {
      primaryColor: checkMarkColor,
      label: formatMessage(messages.selected)
    }))));
  }

}

export default injectIntl(Color);