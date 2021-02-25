import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';
import { N30 } from '@atlaskit/theme/colors';
import { akEditorSwoopCubicBezier } from '@atlaskit/editor-shared-styles';
import { ContextPanelConsumer } from './context';
import WithPluginState from '../WithPluginState';
import { pluginKey as contextPanelPluginKey } from '../../plugins/context-panel';
import WithEditorActions from '../WithEditorActions';
const ANIM_SPEED_MS = 500;
export const DEFAULT_CONTEXT_PANEL_WIDTH = 360;
export const Panel = styled.div`
  will-change: width;
  width: ${p => p.visible ? p.panelWidth : 0}px;
  height: 100%;
  transition: width ${ANIM_SPEED_MS}ms ${akEditorSwoopCubicBezier};
  overflow: hidden;
  box-shadow: inset 2px 0 0 0 ${N30};
`;
export const Content = styled.div`
  box-sizing: border-box;
  padding: 16px 16px 0px;
  width: ${p => p.panelWidth}px;
  height: 100%;
  overflow-y: auto;
`;
export class SwappableContentArea extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      mounted: false,
      currentPluginContent: undefined
    });

    _defineProperty(this, "showPluginContent", () => {
      const {
        pluginContent
      } = this.props;
      const {
        currentPluginContent
      } = this.state;

      if (!currentPluginContent) {
        return;
      }

      return /*#__PURE__*/React.createElement(Transition, {
        timeout: this.state.mounted ? ANIM_SPEED_MS : 0,
        in: !!pluginContent,
        mountOnEnter: true,
        unmountOnExit: true,
        onExited: () => this.unsetPluginContent()
      }, currentPluginContent);
    });

    _defineProperty(this, "showProvidedContent", isVisible => {
      const {
        children
      } = this.props;

      if (!children) {
        return;
      }

      return /*#__PURE__*/React.createElement(Transition, {
        timeout: this.state.mounted ? ANIM_SPEED_MS : 0,
        in: isVisible,
        mountOnEnter: true,
        unmountOnExit: true
      }, children);
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pluginContent !== state.currentPluginContent) {
      return { ...state,
        currentPluginContent: props.pluginContent
      };
    }

    return null;
  }

  unsetPluginContent() {
    this.setState({
      currentPluginContent: undefined
    });
  }

  componentDidMount() {
    // use this to trigger an animation
    this.setState({
      mounted: true
    });
  }

  render() {
    const {
      currentPluginContent
    } = this.state;
    const width = currentPluginContent ? DEFAULT_CONTEXT_PANEL_WIDTH : this.props.width || DEFAULT_CONTEXT_PANEL_WIDTH;
    const userVisible = !!this.props.visible;
    const visible = userVisible || !!this.state.currentPluginContent;
    return /*#__PURE__*/React.createElement(ContextPanelConsumer, null, ({
      broadcastWidth
    }) => {
      broadcastWidth(visible ? width : 0);
      return /*#__PURE__*/React.createElement(Panel, {
        panelWidth: width,
        visible: visible
      }, /*#__PURE__*/React.createElement(Content, {
        panelWidth: width
      }, this.showPluginContent() || this.showProvidedContent(userVisible)));
    });
  }

}
export default class ContextPanel extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(WithEditorActions, {
      render: actions => {
        const eventDispatcher = actions._privateGetEventDispatcher();

        const editorView = actions._privateGetEditorView();

        if (!eventDispatcher) {
          return /*#__PURE__*/React.createElement(SwappableContentArea, _extends({
            editorView: editorView
          }, this.props));
        }

        return /*#__PURE__*/React.createElement(WithPluginState, {
          eventDispatcher: eventDispatcher,
          plugins: {
            contextPanel: contextPanelPluginKey
          },
          render: ({
            contextPanel
          }) => {
            const firstContent = contextPanel && contextPanel.contents.find(Boolean);
            return /*#__PURE__*/React.createElement(SwappableContentArea, _extends({}, this.props, {
              editorView: editorView,
              pluginContent: firstContent
            }));
          }
        });
      }
    });
  }

}

_defineProperty(ContextPanel, "defaultProps", {
  width: DEFAULT_CONTEXT_PANEL_WIDTH
});