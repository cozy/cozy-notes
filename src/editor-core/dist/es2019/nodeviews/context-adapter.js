import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { Context as CardContext } from '@atlaskit/smart-card';
import { default as AnalyticsReactContext } from '@atlaskit/analytics-next-stable-react-context';

function useContextMemoized(reactContext) {
  const value = React.useContext(reactContext);
  const context = React.useMemo(() => ({
    Provider: reactContext.Provider,
    Consumer: reactContext.Consumer,
    value
  }), [value, reactContext]);
  return context;
} // injects contexts via old context API to children
// and gives access to the original Provider so that
// the child can re-emit it


export const ContextAdapter = ({
  children
}) => {
  const card = useContextMemoized(CardContext);
  const analytics = useContextMemoized(AnalyticsReactContext);
  return /*#__PURE__*/React.createElement(LegacyContextAdapter, {
    card: card,
    analytics: analytics
  }, children);
};

class LegacyContextAdapter extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "contextState", {});
  }

  getChildContext() {
    return {
      contextAdapter: {
        card: this.props.card,
        analytics: this.props.analytics
      }
    };
  }

  render() {
    return this.props.children;
  }

}

_defineProperty(LegacyContextAdapter, "childContextTypes", {
  contextAdapter: PropTypes.object
});