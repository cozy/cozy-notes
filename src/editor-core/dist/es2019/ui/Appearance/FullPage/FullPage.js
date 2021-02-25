import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import rafSchedule from 'raf-schd';
import { akEditorToolbarKeylineHeight } from '@atlaskit/editor-shared-styles';
import { FullPageEditorWrapper } from './StyledComponents';
import { ContextPanelWidthProvider } from '../../ContextPanel/context';
import { FullPageContentArea } from './FullPageContentArea';
import { FullPageToolbar } from './FullPageToolbar';
export class FullPageEditor extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showKeyline: false
    });

    _defineProperty(this, "scrollContainer", null);

    _defineProperty(this, "contentAreaRef", contentArea => {
      this.contentArea = contentArea;
    });

    _defineProperty(this, "scrollContainerRef", ref => {
      const previousScrollContainer = this.scrollContainer; // remove existing handler

      if (previousScrollContainer) {
        previousScrollContainer.removeEventListener('scroll', this.updateToolbarKeyline);
      }

      this.scrollContainer = ref ? ref : null;

      if (this.scrollContainer) {
        this.scrollContainer.addEventListener('scroll', this.updateToolbarKeyline, false);
        this.updateToolbarKeyline();
      }
    });

    _defineProperty(this, "updateToolbarKeyline", rafSchedule(() => {
      if (!this.scrollContainer) {
        return false;
      }

      const {
        scrollTop
      } = this.scrollContainer;
      const showKeyline = scrollTop > akEditorToolbarKeylineHeight;

      if (showKeyline !== this.state.showKeyline) {
        this.setState({
          showKeyline
        });
      }

      return false;
    }));

    _defineProperty(this, "handleResize", () => {
      this.scheduledKeylineUpdate = this.updateToolbarKeyline();
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);

    if (this.scheduledKeylineUpdate) {
      cancelAnimationFrame(this.scheduledKeylineUpdate);
    }
  }

  render() {
    const {
      props
    } = this;
    const {
      showKeyline
    } = this.state;
    return /*#__PURE__*/React.createElement(ContextPanelWidthProvider, null, /*#__PURE__*/React.createElement(FullPageEditorWrapper, {
      className: "akEditor"
    }, /*#__PURE__*/React.createElement(FullPageToolbar, {
      appearance: props.appearance,
      collabEdit: props.collabEdit,
      customPrimaryToolbarComponents: props.customPrimaryToolbarComponents,
      disabled: !!props.disabled,
      dispatchAnalyticsEvent: props.dispatchAnalyticsEvent,
      editorActions: props.editorActions,
      editorDOMElement: props.editorDOMElement,
      editorView: props.editorView,
      eventDispatcher: props.eventDispatcher,
      popupsBoundariesElement: props.popupsBoundariesElement,
      popupsMountPoint: props.popupsMountPoint,
      popupsScrollableElement: props.popupsScrollableElement,
      primaryToolbarComponents: props.primaryToolbarComponents,
      providerFactory: props.providerFactory,
      showKeyline: showKeyline,
      containerElement: this.scrollContainer,
      beforeIcon: props.primaryToolbarIconBefore
    }), /*#__PURE__*/React.createElement(FullPageContentArea, {
      allowAnnotation: props.allowAnnotation,
      appearance: props.appearance,
      contentArea: this.contentArea,
      contentAreaRef: this.contentAreaRef,
      contentComponents: props.contentComponents,
      contextPanel: props.contextPanel,
      customContentComponents: props.customContentComponents,
      disabled: props.disabled,
      dispatchAnalyticsEvent: props.dispatchAnalyticsEvent,
      editorActions: props.editorActions,
      editorDOMElement: props.editorDOMElement,
      editorView: props.editorView,
      eventDispatcher: props.eventDispatcher,
      popupsBoundariesElement: props.popupsBoundariesElement,
      popupsMountPoint: props.popupsMountPoint,
      popupsScrollableElement: props.popupsScrollableElement,
      providerFactory: props.providerFactory,
      scrollContainer: this.scrollContainer,
      scrollContainerRef: this.scrollContainerRef
    })));
  }

}

_defineProperty(FullPageEditor, "displayName", 'FullPageEditor');