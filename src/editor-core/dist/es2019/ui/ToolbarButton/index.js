import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Button from './styles';
import styled from 'styled-components';
const ButtonWrapper = styled.div`
  display: flex;
  height: 100%;
`;
export default class ToolbarButton extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleClick", event => {
      const {
        disabled,
        onClick,
        onItemClick,
        item
      } = this.props;

      if (!disabled && onClick) {
        onClick(event);
      }

      if (!disabled && item && onItemClick) {
        onItemClick(item);
      }
    });
  }

  render() {
    const button = /*#__PURE__*/React.createElement(Button, {
      appearance: "subtle",
      "aria-haspopup": true,
      testId: this.props.testId,
      className: this.props.className,
      href: this.props.href,
      "aria-label": this.props['aria-label'],
      iconAfter: this.props.iconAfter,
      iconBefore: this.props.iconBefore,
      isDisabled: this.props.disabled,
      isSelected: this.props.selected,
      onClick: this.handleClick,
      spacing: this.props.spacing || 'default',
      target: this.props.target,
      shouldFitContainer: true
    }, this.props.children);
    const tooltipContent = !this.props.hideTooltip ? this.props.title : null;
    return this.props.title ? /*#__PURE__*/React.createElement(Tooltip, {
      content: tooltipContent,
      hideTooltipOnClick: true,
      position: this.props.titlePosition
    }, /*#__PURE__*/React.createElement(ButtonWrapper, null, button)) : button;
  }

}

_defineProperty(ToolbarButton, "defaultProps", {
  className: '',
  titlePosition: 'top'
});