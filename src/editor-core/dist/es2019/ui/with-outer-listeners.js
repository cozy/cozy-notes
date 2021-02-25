import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
export default function withOuterListeners(Component) {
  var _temp;

  return _temp = class WithOutsideClick extends PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "handleClick", evt => {
        const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

        if (!domNode || evt.target instanceof Node && !domNode.contains(evt.target)) {
          if (this.props.handleClickOutside) {
            this.props.handleClickOutside(evt);
          }
        }
      });

      _defineProperty(this, "handleKeydown", evt => {
        if (evt.code === 'Escape' && this.props.handleEscapeKeydown) {
          this.props.handleEscapeKeydown(evt);
        } else if (evt.code === 'Enter' && this.props.handleEnterKeydown) {
          this.props.handleEnterKeydown(evt);
        }
      });
    }

    componentDidMount() {
      if (this.props.handleClickOutside) {
        document.addEventListener('click', this.handleClick, false);
      }

      if (this.props.handleEscapeKeydown) {
        document.addEventListener('keydown', this.handleKeydown, false);
      }
    }

    componentWillUnmount() {
      if (this.props.handleClickOutside) {
        document.removeEventListener('click', this.handleClick, false);
      }

      if (this.props.handleEscapeKeydown) {
        document.removeEventListener('keydown', this.handleKeydown, false);
      }
    }

    render() {
      return /*#__PURE__*/React.createElement(Component, this.props);
    }

  }, _temp;
}