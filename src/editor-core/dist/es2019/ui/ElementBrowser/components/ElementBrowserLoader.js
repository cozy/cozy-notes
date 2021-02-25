import React from 'react';
import Loadable from 'react-loadable';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';
const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const ElementBrowserLoader = Loadable({
  loader: () => import(
  /* webpackChunkName:"@atlaskit-internal-editor-element-browser" */
  '../ElementBrowser'),
  loading: () => /*#__PURE__*/React.createElement(SpinnerContainer, null, /*#__PURE__*/React.createElement(Spinner, {
    size: "medium"
  }))
});
export default ElementBrowserLoader;