import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react'; // React context to communicate the active context panel width up and down the tree.
//
// We need the width prop from the ContextPanel component.
//
// However, the actual <ContextPanel /> component might be deeply nested inside the contextPanel.
// For example, in the template context panel storybook, we wrap it in 2 higher order components.
//
// Changing the max-width on the main editor container happens above where the <ContextPanel /> gets rendered.
//
// To subtract the context panel width from the available real estate, we use the Provider and Consumer.

const {
  Provider,
  Consumer
} = /*#__PURE__*/React.createContext({
  width: 0,
  broadcastWidth: () => {}
});
export class ContextPanelWidthProvider extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      width: 0
    });

    _defineProperty(this, "broadcastSidebarWidth", width => {
      if (width !== this.state.width) {
        this.setState({
          width
        });
      }
    });
  }

  render() {
    const {
      width
    } = this.state;
    return /*#__PURE__*/React.createElement(Provider, {
      value: {
        width,
        broadcastWidth: this.broadcastSidebarWidth
      }
    }, this.props.children);
  }

}
export { Provider as ContextPanelProvider, Consumer as ContextPanelConsumer };