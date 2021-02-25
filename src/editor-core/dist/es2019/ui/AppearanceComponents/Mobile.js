import React, { useCallback } from 'react';
import styled from 'styled-components';
import { pluginKey as maxContentSizePluginKey } from '../../plugins/max-content-size';
import { mobileScrollPluginKey } from '../../plugins/mobile-scroll/plugin-factory';
import WithPluginState from '../WithPluginState';
import WithFlash from '../WithFlash';
import ContentStyles from '../ContentStyles';
import { ClickAreaMobile as ClickArea } from '../Addon';
const MobileEditor = styled.div`
  min-height: 30px;
  width: 100%;
  max-width: inherit;
  box-sizing: border-box;
  word-wrap: break-word;

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;
MobileEditor.displayName = 'MobileEditor';
const ContentArea = styled(ContentStyles)``;
ContentArea.displayName = 'ContentArea';
export function MobileAppearance({
  editorView,
  maxHeight,
  children
}) {
  const render = useCallback(({
    maxContentSize,
    mobileScroll
  }) => {
    const maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
    let minHeight = 100;

    if (mobileScroll) {
      const {
        keyboardHeight,
        windowHeight,
        mobilePaddingTop
      } = mobileScroll;
      /*
        We calculate the min-height based on the windowHeight - keyboardHeight - paddingTop.
        This is needed due to scrolling issues when there is no content to scroll (like, only having 1 paragraph),
        but if the clickable area is bigger than the windowHeight - keyboard (including toolbar) then the view
        is scrolled nevertheless, and it gives the sensation that the content was lost.
      */

      const keyboardHeightVh = keyboardHeight * 100 / windowHeight;
      const paddingVh = mobilePaddingTop * 100 / windowHeight;
      minHeight = 100 - keyboardHeightVh - paddingVh;
    }

    const GUTTER_PADDING = 8;
    return /*#__PURE__*/React.createElement(WithFlash, {
      animate: maxContentSizeReached
    }, /*#__PURE__*/React.createElement(MobileEditor, {
      isMaxContentSizeReached: maxContentSizeReached,
      maxHeight: maxHeight
    }, /*#__PURE__*/React.createElement(ClickArea, {
      editorView: editorView || undefined,
      minHeight: minHeight
    }, /*#__PURE__*/React.createElement(ContentArea, null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: `0 ${GUTTER_PADDING}px`
      },
      className: "ak-editor-content-area"
    }, children)))));
  }, [editorView, maxHeight, children]);
  return /*#__PURE__*/React.createElement(WithPluginState, {
    plugins: {
      maxContentSize: maxContentSizePluginKey,
      mobileScroll: mobileScrollPluginKey
    },
    render: render
  });
}