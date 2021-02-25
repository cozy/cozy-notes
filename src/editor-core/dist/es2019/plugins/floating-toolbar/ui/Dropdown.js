import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import styled from 'styled-components';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import UiDropdown from '../../../ui/Dropdown';
import Button from './Button';
import DropdownMenu, { itemSpacing, menuItemDimensions } from './DropdownMenu';
const DropdownExpandContainer = styled.span`
  margin: 0px -4px;
`;
const IconGroup = styled.div`
  display: flex;
`;

const CompositeIcon = ({
  icon
}) => /*#__PURE__*/React.createElement(IconGroup, null, icon, /*#__PURE__*/React.createElement(DropdownExpandContainer, null, /*#__PURE__*/React.createElement(ExpandIcon, {
  label: "Expand dropdown menu"
})));

export default class Dropdown extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isOpen: false
    });

    _defineProperty(this, "renderArrayOptions", options => /*#__PURE__*/React.createElement(DropdownMenu, {
      hide: this.hide,
      dispatchCommand: this.props.dispatchCommand,
      items: options
    }));

    _defineProperty(this, "toggleOpen", () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "hide", () => {
      this.setState({
        isOpen: false
      });
    });
  }

  render() {
    const {
      isOpen
    } = this.state;
    const {
      title,
      icon,
      options,
      dispatchCommand,
      mountPoint,
      boundariesElement,
      scrollableElement,
      hideExpandIcon,
      disabled,
      tooltip,
      buttonTestId
    } = this.props;
    let trigger;

    if (icon) {
      const TriggerIcon = hideExpandIcon ? icon : /*#__PURE__*/React.createElement(CompositeIcon, {
        icon: icon
      });
      trigger = /*#__PURE__*/React.createElement(Button, {
        testId: buttonTestId,
        title: title,
        icon: TriggerIcon,
        onClick: this.toggleOpen,
        selected: isOpen,
        disabled: disabled,
        tooltipContent: tooltip
      });
    } else {
      trigger = /*#__PURE__*/React.createElement(Button, {
        testId: buttonTestId,
        iconAfter: /*#__PURE__*/React.createElement(DropdownExpandContainer, null, /*#__PURE__*/React.createElement(ExpandIcon, {
          label: "Expand dropdown menu"
        })),
        onClick: this.toggleOpen,
        selected: isOpen,
        disabled: disabled,
        tooltipContent: tooltip
      }, title);
    }
    /**
     * We want to change direction of our dropdowns a bit early,
     * not exactly when it hits the boundary.
     */


    const fitTolerance = 10;
    const fitWidth = Array.isArray(options) ? menuItemDimensions.width : options.width;
    const fitHeight = Array.isArray(options) ? options.length * menuItemDimensions.height + itemSpacing * 2 : options.height;
    return /*#__PURE__*/React.createElement(UiDropdown, {
      mountTo: mountPoint,
      boundariesElement: boundariesElement,
      scrollableElement: scrollableElement,
      isOpen: isOpen,
      handleClickOutside: this.hide,
      handleEscapeKeydown: this.hide,
      fitWidth: fitWidth + fitTolerance,
      fitHeight: fitHeight + fitTolerance,
      trigger: trigger
    }, Array.isArray(options) ? this.renderArrayOptions(options) : options.render({
      hide: this.hide,
      dispatchCommand
    }));
  }

}