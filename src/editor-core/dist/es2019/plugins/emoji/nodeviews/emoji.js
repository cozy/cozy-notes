import React from 'react';
import { ZERO_WIDTH_SPACE } from '@atlaskit/editor-common';
import Emoji from '../ui/Emoji';
import { ReactNodeView } from '../../../nodeviews';
import InlineNodeWrapper, { createMobileInlineDomRef } from '../../../ui/InlineNodeWrapper';
export class EmojiNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.options && this.reactComponentProps.options.useInlineWrapper) {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  render(props) {
    const {
      providerFactory,
      options
    } = props;
    const {
      shortName,
      id,
      text
    } = this.node.attrs;
    return /*#__PURE__*/React.createElement(InlineNodeWrapper, {
      useInlineWrapper: options && options.useInlineWrapper
    }, /*#__PURE__*/React.createElement(Emoji, {
      providers: providerFactory,
      id: id,
      shortName: shortName,
      fallback: text
    }), options && options.allowZeroWidthSpaceAfter && ZERO_WIDTH_SPACE);
  }

}
export default function emojiNodeView(portalProviderAPI, eventDispatcher, providerFactory, options) {
  return (node, view, getPos) => new EmojiNodeView(node, view, getPos, portalProviderAPI, eventDispatcher, {
    providerFactory,
    options
  }).init();
}