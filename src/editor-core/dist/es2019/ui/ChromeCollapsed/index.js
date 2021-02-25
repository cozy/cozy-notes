import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { PureComponent } from 'react';
import { Input } from './styles';
export default class ChromeCollapsed extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "focusHandler", evt => {
      /**
       * We need this magic for FireFox.
       * The reason we need it is, when, in FireFox, we have focus inside input,
       * and then we remove that input and move focus to another place programmatically,
       * for whatever reason UP/DOWN arrows don't work until you blur and focus editor manually.
       */
      if (this.input) {
        this.input.blur();
      }

      if (this.props.onFocus) {
        this.props.onFocus(evt);
      }
    });

    _defineProperty(this, "handleInputRef", ref => {
      this.input = ref;
    });
  }

  render() {
    const placeholder = this.props.text || 'Type something…';
    return /*#__PURE__*/React.createElement(Input, {
      innerRef: this.handleInputRef,
      onFocus: this.focusHandler,
      placeholder: placeholder
    });
  }

}