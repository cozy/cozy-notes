import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
export class EmojiContextProvider extends React.Component {
  getChildContext() {
    return {
      emoji: {
        emojiProvider: this.props.emojiProvider
      }
    };
  }

  render() {
    return this.props.children;
  }

}

_defineProperty(EmojiContextProvider, "childContextTypes", {
  emoji: PropTypes.object
});