import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Editor from '../../editor';
import EditorWithActions from '../../labs/EditorWithActions';
import ChromeCollapsed from '../ChromeCollapsed';
export default class CollapsedEditor extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleEditorRef", (editorRef, editorRefCallback) => {
      if (editorRefCallback && typeof editorRefCallback === 'function') {
        editorRefCallback(editorRef);
      }

      this.editorComponent = editorRef;
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.isExpanded && nextProps.isExpanded) {
      this.shouldTriggerExpandEvent = true;
    }
  }

  componentDidUpdate() {
    if (this.shouldTriggerExpandEvent && this.editorComponent) {
      this.shouldTriggerExpandEvent = false;

      if (this.props.onExpand) {
        this.props.onExpand();
      }
    }
  }

  render() {
    const child = React.Children.only(this.props.children);

    if (child.type !== Editor && child.type !== EditorWithActions) {
      throw new Error('Expected child to be of type `Editor`');
    }

    if (!this.props.isExpanded) {
      return /*#__PURE__*/React.createElement(ChromeCollapsed, {
        onFocus: this.props.onFocus,
        text: this.props.placeholder
      });
    }

    return /*#__PURE__*/React.cloneElement(child, {
      ref: editorComponent => this.handleEditorRef(editorComponent, child.ref)
    });
  }

}