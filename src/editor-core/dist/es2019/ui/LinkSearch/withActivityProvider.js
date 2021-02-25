import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { WithProviders } from '@atlaskit/editor-common';
export default function withActivityProvider(WrappedComponent) {
  var _temp;

  return _temp = class WithActivityProvider extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "renderNode", providers => {
        const {
          providerFactory,
          ...props
        } = this.props;
        const {
          activityProvider
        } = providers;
        return /*#__PURE__*/React.createElement(WrappedComponent, _extends({
          activityProvider: activityProvider
        }, props));
      });
    }

    render() {
      const {
        providerFactory
      } = this.props;
      return /*#__PURE__*/React.createElement(WithProviders, {
        providers: ['activityProvider'],
        providerFactory: providerFactory,
        renderNode: this.renderNode
      });
    }

  }, _temp;
}