import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { ZERO_WIDTH_SPACE } from '@atlaskit/editor-common';
import { Status } from '@atlaskit/status/element';
import { ReactNodeView } from '../../../nodeviews';
import InlineNodeWrapper, { createMobileInlineDomRef } from '../../../ui/InlineNodeWrapper';
import { messages } from './messages';
export const StyledStatus = styled.span`
  opacity: ${props => props.placeholderStyle ? 0.5 : 1};
`;

class StatusContainerView extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClick", event => {
      if (event.nativeEvent.stopImmediatePropagation) {
        event.nativeEvent.stopImmediatePropagation();
      } // handling of popup is done in plugin.apply on selection change.

    });
  }

  render() {
    const {
      text,
      color,
      localId,
      style,
      intl: {
        formatMessage
      }
    } = this.props;
    const statusText = text ? text : formatMessage(messages.placeholder);
    return /*#__PURE__*/React.createElement(StyledStatus, {
      placeholderStyle: !text
    }, /*#__PURE__*/React.createElement(Status, {
      text: statusText,
      color: color,
      localId: localId,
      style: style,
      onClick: this.handleClick
    }));
  }

}

_defineProperty(StatusContainerView, "displayName", 'StatusContainerView');

export const IntlStatusContainerView = injectIntl(StatusContainerView);
export class StatusNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.options && this.reactComponentProps.options.useInlineWrapper) {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  setDomAttrs(node, element) {
    const {
      color,
      localId,
      style
    } = node.attrs;
    element.dataset.color = color;
    element.dataset.localId = localId;
    element.dataset.style = style;
  }

  render(props) {
    const {
      options
    } = props;
    const {
      text,
      color,
      localId,
      style
    } = this.node.attrs;
    return /*#__PURE__*/React.createElement(InlineNodeWrapper, {
      useInlineWrapper: options && options.useInlineWrapper
    }, /*#__PURE__*/React.createElement(IntlStatusContainerView, {
      view: this.view,
      text: text,
      color: color,
      style: style,
      localId: localId
    }), options && options.allowZeroWidthSpaceAfter && ZERO_WIDTH_SPACE);
  }

}
export default function statusNodeView(portalProviderAPI, eventDispatcher, options) {
  return (node, view, getPos) => new StatusNodeView(node, view, getPos, portalProviderAPI, eventDispatcher, {
    options
  }).init();
}