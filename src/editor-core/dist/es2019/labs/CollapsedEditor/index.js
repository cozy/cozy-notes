import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import ChromeCollapsed from '../../ui/ChromeCollapsed';
export default class CollapsedEditor extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      editorModules: CollapsedEditor.editorModules
    });
  }

  componentDidMount() {
    if (!this.state.editorModules) {
      this.loadEditorModules();
    }
  }

  loadEditorModules() {
    import(
    /* webpackChunkName:"@atlaskit-internal_editor-core-async" */
    '../../').then(modules => {
      CollapsedEditor.editorModules = modules;
      this.setState({
        editorModules: modules
      });
    });
  }

  render() {
    if (!this.props.isExpanded) {
      return /*#__PURE__*/React.createElement(ChromeCollapsed, {
        onFocus: this.props.onClickToExpand,
        text: this.props.placeholder
      });
    }

    if (!this.state.editorModules) {
      // TODO: Proper loading state
      return /*#__PURE__*/React.createElement(ChromeCollapsed, {
        text: "Loading..."
      });
    }

    const {
      Editor,
      ...rest
    } = this.state.editorModules;
    return this.props.renderEditor(Editor, rest);
  }

}