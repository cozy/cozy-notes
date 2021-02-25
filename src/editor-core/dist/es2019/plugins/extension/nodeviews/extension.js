import React from 'react';
import { ZERO_WIDTH_SPACE } from '@atlaskit/editor-common';
import { ReactNodeView } from '../../../nodeviews';
import Extension from '../ui/Extension';

class ExtensionNode extends ReactNodeView {
  ignoreMutation(mutation) {
    // Extensions can perform async operations that will change the DOM.
    // To avoid having their tree rebuilt, we need to ignore the mutation
    // for atom based extensions if its not a layout, we need to give
    // children a chance to recalc
    return this.node.type.isAtom || mutation.type !== 'selection' && mutation.attributeName !== 'data-layout';
  }

  getContentDOM() {
    if (this.node.isInline) {
      return;
    }

    const dom = document.createElement('div');
    dom.className = `${this.node.type.name}-content-dom-wrapper`;
    return {
      dom
    };
  }

  render(props, forwardRef) {
    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Extension, {
      editorView: this.view,
      node: this.node,
      providerFactory: props.providerFactory,
      handleContentDOMRef: forwardRef,
      extensionHandlers: props.extensionHandlers
    }), this.node.type.name === 'inlineExtension' && ZERO_WIDTH_SPACE);
  }

}

export default function ExtensionNodeView(portalProviderAPI, eventDispatcher, providerFactory, extensionHandlers) {
  return (node, view, getPos) => {
    return new ExtensionNode(node, view, getPos, portalProviderAPI, eventDispatcher, {
      providerFactory,
      extensionHandlers
    }).init();
  };
}