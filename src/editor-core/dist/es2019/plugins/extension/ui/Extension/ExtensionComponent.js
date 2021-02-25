import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { Component } from 'react';
import memoizeOne from 'memoize-one';
import { getExtensionRenderer, getNodeRenderer } from '@atlaskit/editor-common';
import Extension from './Extension';
import InlineExtension from './InlineExtension';
export default class ExtensionComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "mounted", false);

    _defineProperty(this, "getNodeRenderer", memoizeOne(getNodeRenderer));

    _defineProperty(this, "setStateFromPromise", (stateKey, promise) => {
      promise && promise.then(p => {
        if (!this.mounted) {
          return;
        }

        this.setState({
          [stateKey]: p
        });
      });
    });

    _defineProperty(this, "handleExtension", pmNode => {
      const {
        extensionHandlers,
        editorView
      } = this.props;
      const {
        extensionType,
        extensionKey,
        parameters,
        text
      } = pmNode.attrs;
      const isBodiedExtension = pmNode.type.name === 'bodiedExtension';

      if (isBodiedExtension) {
        return;
      }

      const node = {
        type: pmNode.type.name,
        extensionType,
        extensionKey,
        parameters,
        content: text
      };
      let result;

      if (extensionHandlers && extensionHandlers[extensionType]) {
        const render = getExtensionRenderer(extensionHandlers[extensionType]);
        result = render(node, editorView.state.doc);
      }

      if (!result) {
        const extensionHandlerFromProvider = this.state.extensionProvider && this.getNodeRenderer(this.state.extensionProvider, extensionType, extensionKey);

        if (extensionHandlerFromProvider) {
          const NodeRenderer = extensionHandlerFromProvider;
          return /*#__PURE__*/React.createElement(NodeRenderer, {
            node: node
          });
        }
      }

      return result;
    });
  }

  UNSAFE_componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    const {
      extensionProvider
    } = this.props;

    if (extensionProvider) {
      this.setStateFromPromise('extensionProvider', extensionProvider);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      extensionProvider
    } = nextProps;

    if (extensionProvider && this.props.extensionProvider !== extensionProvider) {
      this.setStateFromPromise('extensionProvider', extensionProvider);
    }
  } // memoized to avoid rerender on extension state changes


  render() {
    const {
      node,
      handleContentDOMRef,
      editorView
    } = this.props;
    const extensionHandlerResult = this.tryExtensionHandler();

    switch (node.type.name) {
      case 'extension':
      case 'bodiedExtension':
        return /*#__PURE__*/React.createElement(Extension, {
          node: node,
          extensionProvider: this.state.extensionProvider,
          handleContentDOMRef: handleContentDOMRef,
          view: editorView
        }, extensionHandlerResult);

      case 'inlineExtension':
        return /*#__PURE__*/React.createElement(InlineExtension, {
          node: node
        }, extensionHandlerResult);

      default:
        return null;
    }
  }

  tryExtensionHandler() {
    const {
      node
    } = this.props;

    try {
      const extensionContent = this.handleExtension(node);

      if (extensionContent && /*#__PURE__*/React.isValidElement(extensionContent)) {
        return extensionContent;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Provided extension handler has thrown an error\n', e);
      /** We don't want this error to block renderer */

      /** We keep rendering the default content */
    }

    return null;
  }

}