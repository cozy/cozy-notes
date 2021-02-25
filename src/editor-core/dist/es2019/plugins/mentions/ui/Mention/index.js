import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { PureComponent } from 'react';
import { ResourcedMention } from '@atlaskit/mention/element';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
export default class Mention extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderWithProvider", providers => {
      const {
        accessLevel,
        eventHandlers,
        id,
        text
      } = this.props;
      const {
        mentionProvider
      } = providers;
      const actionHandlers = {};
      ['onClick', 'onMouseEnter', 'onMouseLeave'].forEach(handler => {
        actionHandlers[handler] = eventHandlers && eventHandlers[handler] || (() => {});
      });
      return /*#__PURE__*/React.createElement(ResourcedMention, _extends({
        id: id,
        text: text,
        accessLevel: accessLevel,
        mentionProvider: mentionProvider
      }, actionHandlers));
    });

    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(WithProviders, {
      providers: ['mentionProvider', 'profilecardProvider'],
      providerFactory: this.providerFactory,
      renderNode: this.renderWithProvider
    });
  }

}

_defineProperty(Mention, "displayName", 'Mention');