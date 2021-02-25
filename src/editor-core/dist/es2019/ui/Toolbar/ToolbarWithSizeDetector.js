import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { WidthObserver } from '@atlaskit/width-detector';
import { useElementWidth } from './hooks';
import { widthToToolbarSize } from './toolbar-size';
import { Toolbar } from './Toolbar';
import styled from 'styled-components';
import { akEditorMobileMaxWidth } from '@atlaskit/editor-shared-styles';
const StyledToolBar = styled.div`
  width: 100%;
  min-width: 254px;
  position: relative;
  @media (max-width: ${akEditorMobileMaxWidth}px) {
    grid-column: 1 / 2;
    grid-row: 2;
    width: calc(100% - 30px);
    margin: 0 15px;
  }
`;
export const ToolbarWithSizeDetector = props => {
  const ref = /*#__PURE__*/React.createRef();
  const [width, setWidth] = React.useState(undefined);
  const elementWidth = useElementWidth(ref, {
    skip: typeof width !== 'undefined'
  });
  const toolbarSize = typeof width === 'undefined' && typeof elementWidth === 'undefined' ? undefined : widthToToolbarSize(width || elementWidth, props.appearance);
  return /*#__PURE__*/React.createElement(StyledToolBar, null, /*#__PURE__*/React.createElement(WidthObserver, {
    setWidth: setWidth
  }), props.editorView && toolbarSize ? /*#__PURE__*/React.createElement(Toolbar, _extends({}, props, {
    toolbarSize: toolbarSize
  })) : /*#__PURE__*/React.createElement("div", {
    ref: ref
  }));
};