import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import styled from 'styled-components';
import PluginSlot from '../PluginSlot';
import WithPluginState from '../WithPluginState';
import ContentStyles from '../ContentStyles';
import { pluginKey as maxContentSizePluginKey } from '../../plugins/max-content-size';
import { scrollbarStyles } from '../styles';
import WithFlash from '../WithFlash';
const ChromelessEditor = styled.div`
  line-height: 20px;
  height: auto;
  min-height: 30px;
  ${props => props.maxHeight ? 'max-height: ' + props.maxHeight + 'px;' : ''} overflow-x: hidden;
  overflow-y: auto;
  ${scrollbarStyles} max-width: inherit;
  box-sizing: border-box;
  word-wrap: break-word;

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;
ChromelessEditor.displayName = 'ChromelessEditor';
const ContentArea = styled(ContentStyles)``;
ContentArea.displayName = 'ContentArea';
export default class Editor extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "appearance", 'chromeless');

    _defineProperty(this, "containerElement", null);

    _defineProperty(this, "renderChrome", ({
      maxContentSize
    }) => {
      const {
        editorDOMElement,
        editorView,
        editorActions,
        eventDispatcher,
        providerFactory,
        contentComponents,
        customContentComponents,
        maxHeight,
        popupsMountPoint,
        popupsBoundariesElement,
        popupsScrollableElement,
        disabled,
        dispatchAnalyticsEvent
      } = this.props;
      const maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
      return /*#__PURE__*/React.createElement(WithFlash, {
        animate: maxContentSizeReached
      }, /*#__PURE__*/React.createElement(ChromelessEditor, {
        maxHeight: maxHeight,
        innerRef: ref => this.containerElement = ref
      }, /*#__PURE__*/React.createElement(ContentArea, null, customContentComponents, /*#__PURE__*/React.createElement(PluginSlot, {
        editorView: editorView,
        editorActions: editorActions,
        eventDispatcher: eventDispatcher,
        providerFactory: providerFactory,
        appearance: this.appearance,
        items: contentComponents,
        popupsMountPoint: popupsMountPoint,
        popupsBoundariesElement: popupsBoundariesElement,
        popupsScrollableElement: popupsScrollableElement,
        containerElement: this.containerElement,
        disabled: !!disabled,
        dispatchAnalyticsEvent: dispatchAnalyticsEvent
      }), editorDOMElement)));
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        maxContentSize: maxContentSizePluginKey
      },
      render: this.renderChrome
    });
  }

}

_defineProperty(Editor, "displayName", 'ChromelessEditorAppearance');