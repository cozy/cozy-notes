import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
export default class WithEditorActions extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onContextUpdate", () => {
      // Re-render actions when editorActions changes...
      this.forceUpdate();
    });
  }

  componentDidMount() {
    this.context.editorActions._privateSubscribe(this.onContextUpdate);
  }

  componentWillUnmount() {
    this.context.editorActions._privateUnsubscribe(this.onContextUpdate);
  }

  render() {
    return this.props.render(this.context.editorActions);
  }

}

_defineProperty(WithEditorActions, "contextTypes", {
  editorActions: PropTypes.object.isRequired
});