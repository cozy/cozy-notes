import React from 'react';
import { ZERO_WIDTH_SPACE } from '@atlaskit/editor-common';
import Mention from '../ui/Mention';
import { ReactNodeView } from '../../../nodeviews';
import InlineNodeWrapper, { createMobileInlineDomRef } from '../../../ui/InlineNodeWrapper';
export class MentionNodeView extends ReactNodeView {
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
      id,
      text,
      accessLevel
    } = this.node.attrs;
    return /*#__PURE__*/React.createElement(InlineNodeWrapper, {
      useInlineWrapper: options && options.useInlineWrapper
    }, /*#__PURE__*/React.createElement(Mention, {
      id: id,
      text: text,
      accessLevel: accessLevel,
      providers: providerFactory
    }), options && options.allowZeroWidthSpaceAfter && ZERO_WIDTH_SPACE);
  }

}
export default function mentionNodeView(portalProviderAPI, eventDispatcher, providerFactory, options) {
  return (node, view, getPos) => new MentionNodeView(node, view, getPos, portalProviderAPI, eventDispatcher, {
    providerFactory,
    options
  }).init();
}