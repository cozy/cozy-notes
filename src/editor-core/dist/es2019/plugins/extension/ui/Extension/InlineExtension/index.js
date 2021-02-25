import React from 'react';
import { Component } from 'react';
import { Overlay } from '../styles';
import ExtensionLozenge from '../Lozenge';
import { Wrapper } from './styles';
export default class InlineExtension extends Component {
  render() {
    const {
      node,
      children
    } = this.props;
    const hasChildren = !!children;
    const className = hasChildren ? 'with-overlay with-children' : 'with-overlay';
    return /*#__PURE__*/React.createElement(Wrapper, {
      className: `extension-container ${className}`
    }, /*#__PURE__*/React.createElement(Overlay, {
      className: "extension-overlay"
    }), children ? children : /*#__PURE__*/React.createElement(ExtensionLozenge, {
      node: node
    }));
  }

}