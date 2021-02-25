import React from 'react';
import styled from 'styled-components';
import { akEditorMobileMaxWidth } from '@atlaskit/editor-shared-styles';
const ToolbarComponentsWrapper = styled.div`
  display: flex;

  @media (max-width: ${akEditorMobileMaxWidth}px) {
    justify-content: space-between;
  }
`;
export class ToolbarInner extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.toolbarSize !== this.props.toolbarSize || nextProps.disabled !== this.props.disabled || nextProps.popupsMountPoint === this.props.popupsMountPoint || nextProps.popupsBoundariesElement === this.props.popupsBoundariesElement || nextProps.popupsScrollableElement === this.props.popupsScrollableElement || nextProps.isReducedSpacing !== this.props.isToolbarReducedSpacing;
  }

  render() {
    const {
      appearance,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      items,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      toolbarSize,
      disabled,
      isToolbarReducedSpacing,
      dispatchAnalyticsEvent,
      containerElement
    } = this.props;

    if (!items || !items.length) {
      return null;
    }

    return /*#__PURE__*/React.createElement(ToolbarComponentsWrapper, null, items.map((component, key) => {
      const props = {
        key
      };
      const element = component({
        editorView,
        editorActions: editorActions,
        eventDispatcher,
        providerFactory,
        appearance: appearance,
        popupsMountPoint,
        popupsBoundariesElement,
        popupsScrollableElement,
        disabled,
        toolbarSize,
        isToolbarReducedSpacing,
        containerElement,
        isLastItem: key === items.length - 1,
        dispatchAnalyticsEvent
      });
      return element && /*#__PURE__*/React.cloneElement(element, props);
    }));
  }

}