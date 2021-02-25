import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import { ToolTipContent, findKeymapByDescription } from '../../../keymaps';
import Button from '@atlaskit/button/standard-button';
export class FindReplaceTooltipButton extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buttonRef", /*#__PURE__*/React.createRef());

    _defineProperty(this, "handleClick", () => {
      this.props.onClick(this.buttonRef);
    });
  }

  render() {
    const {
      title,
      icon,
      keymapDescription,
      disabled,
      isPressed
    } = this.props;
    const pressedProps = { ...(typeof isPressed === 'boolean' && {
        'aria-pressed': isPressed
      })
    };
    return /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(ToolTipContent, {
        description: title,
        keymap: findKeymapByDescription(keymapDescription)
      }),
      hideTooltipOnClick: true,
      position: 'top'
    }, /*#__PURE__*/React.createElement(Button, _extends({
      label: title,
      appearance: "subtle",
      testId: title,
      ref: this.buttonRef,
      iconBefore: icon,
      isDisabled: disabled,
      onClick: this.handleClick,
      isSelected: isPressed,
      shouldFitContainer: true
    }, pressedProps)));
  }

}

_defineProperty(FindReplaceTooltipButton, "defaultProps", {
  keymapDescription: 'no-keymap'
});