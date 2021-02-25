import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
const EditorSharedConfigContext = /*#__PURE__*/React.createContext(null);
export class EditorSharedConfigProvider extends React.Component {
  getChildContext() {
    return {
      editorSharedConfig: this.props.value
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(EditorSharedConfigContext.Provider, {
      value: this.props.value
    }, this.props.children);
  }

}

_defineProperty(EditorSharedConfigProvider, "childContextTypes", {
  editorSharedConfig: PropTypes.object
});

export class EditorSharedConfigConsumer extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(EditorSharedConfigContext.Consumer, null, value => this.props.children(this.context.editorSharedConfig || value));
  }

}

_defineProperty(EditorSharedConfigConsumer, "contextTypes", {
  editorSharedConfig: PropTypes.object
});

export const useEditorSharedConfig = () => React.useContext(EditorSharedConfigContext);