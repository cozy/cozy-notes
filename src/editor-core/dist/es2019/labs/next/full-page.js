import _extends from "@babel/runtime/helpers/extends";
import rafSchedule from 'raf-schd';
import React from 'react';
import styled from 'styled-components';
import { N30 } from '@atlaskit/theme/colors';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { BaseTheme } from '@atlaskit/editor-common';
import { akEditorMenuZIndex, akEditorToolbarKeylineHeight } from '@atlaskit/editor-shared-styles';
import ContentStyles from '../../ui/ContentStyles';
import WidthEmitter from '../../ui/WidthEmitter';
import { ClickAreaBlock } from '../../ui/Addon';
import { scrollbarStyles } from '../../ui/styles';
import { tableFullPageEditorStyles } from '../../plugins/table/ui/common-styles.css';
import AvatarsWithPluginState from '../../plugins/collab-edit/ui';
import { Editor, EditorContent, useEditorSharedConfig } from './Editor';
import { Toolbar } from './Toolbar';
import { ContentComponents } from './ContentComponents';
import { useCreateAnalyticsHandler } from './internal/hooks/use-analytics';
import { ContextPanelWidthProvider } from '../../ui/ContextPanel/context';
const FullPageEditorWrapper = styled.div`
  min-width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
FullPageEditorWrapper.displayName = 'FullPageEditorWrapper';
const ScrollContainer = styled(ContentStyles)`
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  ${scrollbarStyles};
`;
ScrollContainer.displayName = 'ScrollContainer';
const GUTTER_PADDING = 32;
const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  box-sizing: border-box;
`;
ContentArea.displayName = 'ContentArea';
const EditorContentArea = styled.div`
  line-height: 24px;
  height: 100%;
  width: 100%;
  max-width: ${({
  theme
}) => theme.layoutMaxWidth + GUTTER_PADDING * 2}px;
  padding-top: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 55px;

  & .ProseMirror {
    flex-grow: 1;
    box-sizing: border-box;
  }

  && .ProseMirror {
    & > * {
      clear: both;
    }
    > p,
    > ul,
    > ol,
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      clear: none;
    }
  }
  ${tableFullPageEditorStyles};
`;
EditorContentArea.displayName = 'EditorContentArea';
const MainToolbar = styled.div`
  position: relative;
  align-items: center;
  box-shadow: ${props => props.showKeyline ? `0 ${akEditorToolbarKeylineHeight}px 0 0 ${N30}` : 'none'};
  transition: box-shadow 200ms;
  z-index: ${akEditorMenuZIndex};
  display: flex;
  height: 80px;
  flex-shrink: 0;
  background-color: white;

  & object {
    height: 0 !important;
  }
`;
MainToolbar.displayName = 'MainToolbar';
const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';
const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  padding: 24px 0;
`;
SecondaryToolbar.displayName = 'SecondaryToolbar';
const SidebarArea = styled.div`
  height: 100%;
  box-sizing: border-box;
`;
SidebarArea.displayName = 'SidebarArea';

function useKeyline() {
  const [showKeyline, setShowKeyline] = React.useState(false);
  const scrollContainerRef = React.useRef(null);
  React.useEffect(() => {
    let current = scrollContainerRef.current;
    const handleScroll = rafSchedule(() => {
      if (!current) {
        return;
      }

      const {
        scrollTop
      } = current;
      setShowKeyline(scrollTop > akEditorToolbarKeylineHeight);
    });

    if (!current) {
      return;
    }

    window.addEventListener('resize', handleScroll);
    current.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      if (current) {
        current.removeEventListener('scroll', handleScroll);
      }

      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  return [showKeyline, scrollContainerRef];
}

function FullPage(props) {
  const {
    primaryToolbarComponents,
    contentComponents,
    allowDynamicTextSizing,
    collabEdit,
    createAnalyticsEvent,
    contextPanel
  } = props;
  const handleAnalyticsEvent = useCreateAnalyticsHandler(createAnalyticsEvent);
  const [showKeyline, scrollContainerRef] = useKeyline();
  const config = useEditorSharedConfig();
  return /*#__PURE__*/React.createElement(ContextPanelWidthProvider, null, /*#__PURE__*/React.createElement(Editor, _extends({}, props, {
    onAnalyticsEvent: handleAnalyticsEvent
  }), /*#__PURE__*/React.createElement(BaseTheme, {
    dynamicTextSizing: allowDynamicTextSizing
  }, /*#__PURE__*/React.createElement(FullPageEditorWrapper, {
    className: "akEditor"
  }, /*#__PURE__*/React.createElement(MainToolbar, {
    "data-testid": "ak-editor-main-toolbar",
    showKeyline: showKeyline
  }, /*#__PURE__*/React.createElement(Toolbar, {
    containerElement: scrollContainerRef.current
  }), /*#__PURE__*/React.createElement(MainToolbarCustomComponentsSlot, null, !config ? null : /*#__PURE__*/React.createElement(AvatarsWithPluginState, {
    editorView: config.editorView,
    eventDispatcher: config.eventDispatcher,
    inviteToEditHandler: collabEdit && collabEdit.inviteToEditHandler,
    isInviteToEditButtonSelected: collabEdit && collabEdit.isInviteToEditButtonSelected
  }), primaryToolbarComponents)), /*#__PURE__*/React.createElement(ContentArea, null, /*#__PURE__*/React.createElement(ScrollContainer, {
    innerRef: scrollContainerRef,
    className: "fabric-editor-popup-scroll-parent"
  }, /*#__PURE__*/React.createElement(ClickAreaBlock, {
    editorView: (config || {}).editorView
  }, /*#__PURE__*/React.createElement(EditorContentArea, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `0 ${GUTTER_PADDING}px`
    },
    className: "ak-editor-content-area"
  }, contentComponents, /*#__PURE__*/React.createElement(EditorContent, null), /*#__PURE__*/React.createElement(ContentComponents, null))))), contextPanel && /*#__PURE__*/React.createElement(SidebarArea, null, contextPanel), /*#__PURE__*/React.createElement(WidthEmitter, {
    editorView: (config || {}).editorView
  }))))));
}

FullPage.displayName = 'FullPageEditor';
const FullPageWithAnalytics = withAnalyticsEvents()(FullPage);
export { FullPageWithAnalytics as FullPage };