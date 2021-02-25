import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { Component } from 'react';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import ExtensionComponent from './ExtensionComponent';
export default class Extension extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderWithProvider", ({
      extensionProvider
    }) => {
      const {
        node,
        editorView,
        handleContentDOMRef,
        extensionHandlers
      } = this.props;
      return /*#__PURE__*/React.createElement(ExtensionComponent, {
        editorView: editorView,
        node: node,
        extensionProvider: extensionProvider,
        handleContentDOMRef: handleContentDOMRef,
        extensionHandlers: extensionHandlers
      });
    });

    this.providerFactory = props.providerFactory || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providerFactory) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(WithProviders, {
      providers: ['extensionProvider'],
      providerFactory: this.providerFactory,
      renderNode: this.renderWithProvider
    });
  }

}

_defineProperty(Extension, "displayName", 'Extension');