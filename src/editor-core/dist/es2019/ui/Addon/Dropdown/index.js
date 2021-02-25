import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { Dropdown } from './styles';
export default class DropdownWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleClick", actions => {
      const {
        actionOnClick,
        renderOnClick
      } = actions;
      const {
        editorActions
      } = this.props;

      if (actionOnClick) {
        actionOnClick(editorActions);
        this.props.togglePopup();
      } else if (renderOnClick) {
        this.props.onClick(editorActions, renderOnClick);
      }
    });
  }

  render() {
    // adding onClick handler to each DropdownItem component
    const children = React.Children.map(this.props.children, child => /*#__PURE__*/React.cloneElement(child, {
      onClick: this.handleClick
    }));
    return /*#__PURE__*/React.createElement(Dropdown, null, children);
  }

}