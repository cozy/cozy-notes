import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../../editor';
import EditorContext from '../../ui/EditorContext';
import WithEditorActions from '../../ui/WithEditorActions';
export default class EditorWithActions extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSave", actions => () => {
      this.props.onSave(actions);
    });

    _defineProperty(this, "handleCancel", actions => () => {
      this.props.onCancel(actions);
    });

    _defineProperty(this, "handleChange", actions => () => {
      this.props.onChange(actions);
    });
  }

  render() {
    if (this.context.editorActions) {
      const {
        editorActions: actions
      } = this.context;
      return /*#__PURE__*/React.createElement(Editor, _extends({}, this.props, {
        onSave: this.props.onSave ? this.handleSave(actions) : undefined,
        onChange: this.props.onChange ? this.handleChange(actions) : undefined,
        onCancel: this.props.onCancel ? this.handleCancel(actions) : undefined
      }));
    }

    return /*#__PURE__*/React.createElement(EditorContext, null, /*#__PURE__*/React.createElement(WithEditorActions, {
      render: actions => /*#__PURE__*/React.createElement(Editor, _extends({}, this.props, {
        onSave: this.props.onSave ? this.handleSave(actions) : undefined,
        onChange: this.props.onChange ? this.handleChange(actions) : undefined,
        onCancel: this.props.onCancel ? this.handleCancel(actions) : undefined
      }))
    }));
  }

}

_defineProperty(EditorWithActions, "contextTypes", {
  editorActions: PropTypes.object.isRequired
});