import React from 'react';
import AvatarsWithPluginState from '../../../plugins/collab-edit/ui';
import Toolbar from '../../Toolbar';
import { MainToolbar, MainToolbarIconBefore, MainToolbarCustomComponentsSlot } from './MainToolbar';
import { ContextPanelConsumer } from '../../ContextPanel/context';
export const FullPageToolbar = /*#__PURE__*/React.memo(props => {
  return /*#__PURE__*/React.createElement(ContextPanelConsumer, null, ({
    width: contextPanelWidth
  }) => /*#__PURE__*/React.createElement(MainToolbar, {
    "data-testid": "ak-editor-main-toolbar",
    showKeyline: props.showKeyline || contextPanelWidth > 0
  }, props.beforeIcon && /*#__PURE__*/React.createElement(MainToolbarIconBefore, null, props.beforeIcon), /*#__PURE__*/React.createElement(Toolbar, {
    editorView: props.editorView,
    editorActions: props.editorActions,
    eventDispatcher: props.eventDispatcher,
    providerFactory: props.providerFactory,
    appearance: props.appearance,
    items: props.primaryToolbarComponents,
    popupsMountPoint: props.popupsMountPoint,
    popupsBoundariesElement: props.popupsBoundariesElement,
    popupsScrollableElement: props.popupsScrollableElement,
    disabled: props.disabled,
    dispatchAnalyticsEvent: props.dispatchAnalyticsEvent,
    containerElement: props.containerElement
  }), /*#__PURE__*/React.createElement(MainToolbarCustomComponentsSlot, null, /*#__PURE__*/React.createElement(AvatarsWithPluginState, {
    editorView: props.editorView,
    eventDispatcher: props.eventDispatcher,
    inviteToEditComponent: props.collabEdit && props.collabEdit.inviteToEditComponent,
    inviteToEditHandler: props.collabEdit && props.collabEdit.inviteToEditHandler,
    isInviteToEditButtonSelected: props.collabEdit && props.collabEdit.isInviteToEditButtonSelected
  }), props.customPrimaryToolbarComponents)));
});