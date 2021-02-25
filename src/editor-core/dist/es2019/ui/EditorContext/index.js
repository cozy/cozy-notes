import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import EditorActions from '../../actions';
export default class EditorContext extends React.Component {
  constructor(props) {
    super(props);
    this.editorActions = props.editorActions || new EditorActions();
  }

  getChildContext() {
    return {
      editorActions: this.editorActions
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

_defineProperty(EditorContext, "childContextTypes", {
  editorActions: PropTypes.object
});