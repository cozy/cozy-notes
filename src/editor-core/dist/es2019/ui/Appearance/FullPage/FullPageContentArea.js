import { WidthConsumer } from '@atlaskit/editor-common';
import React from 'react';
import { ClickAreaBlock } from '../../Addon';
import ContextPanel from '../../ContextPanel';
import PluginSlot from '../../PluginSlot';
import WidthEmitter from '../../WidthEmitter';
import { ContentArea, EditorContentArea, SidebarArea, ScrollContainer, EditorContentGutter } from './StyledComponents';
export const FullPageContentArea = /*#__PURE__*/React.memo(props => {
  return /*#__PURE__*/React.createElement(ContentArea, null, /*#__PURE__*/React.createElement(ScrollContainer, {
    innerRef: props.scrollContainerRef,
    allowAnnotation: props.allowAnnotation,
    className: "fabric-editor-popup-scroll-parent"
  }, /*#__PURE__*/React.createElement(ClickAreaBlock, {
    editorView: props.editorView
  }, /*#__PURE__*/React.createElement(WidthConsumer, null, ({
    width
  }) => /*#__PURE__*/React.createElement(EditorContentArea, {
    fullWidthMode: props.appearance === 'full-width',
    innerRef: props.contentAreaRef,
    containerWidth: width
  }, /*#__PURE__*/React.createElement(EditorContentGutter, {
    className: ['ak-editor-content-area', props.appearance === 'full-width' ? 'fabric-editor--full-width-mode' : ''].join(' ')
  }, props.customContentComponents, /*#__PURE__*/React.createElement(PluginSlot, {
    editorView: props.editorView,
    editorActions: props.editorActions,
    eventDispatcher: props.eventDispatcher,
    providerFactory: props.providerFactory,
    appearance: props.appearance,
    items: props.contentComponents,
    contentArea: props.contentArea,
    popupsMountPoint: props.popupsMountPoint,
    popupsBoundariesElement: props.popupsBoundariesElement,
    popupsScrollableElement: props.popupsScrollableElement,
    disabled: !!props.disabled,
    containerElement: props.scrollContainer,
    dispatchAnalyticsEvent: props.dispatchAnalyticsEvent
  }), props.editorDOMElement))))), /*#__PURE__*/React.createElement(SidebarArea, null, props.contextPanel || /*#__PURE__*/React.createElement(ContextPanel, {
    visible: false
  })), /*#__PURE__*/React.createElement(WidthEmitter, {
    editorView: props.editorView
  }));
});