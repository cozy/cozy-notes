import React from 'react';
import PickerFacadeProvider from './PickerFacadeProvider';
import { Browser } from '@atlaskit/media-picker';
export const BrowserWrapper = ({
  mediaState,
  isOpen,
  onBrowseFn,
  featureFlags
}) => /*#__PURE__*/React.createElement(PickerFacadeProvider, {
  mediaState: mediaState,
  analyticsName: "browser"
}, ({
  mediaClientConfig,
  config,
  pickerFacadeInstance
}) => /*#__PURE__*/React.createElement(Browser, {
  onBrowseFn: onBrowseFn,
  isOpen: isOpen,
  config: config,
  mediaClientConfig: mediaClientConfig,
  onEnd: pickerFacadeInstance.handleReady,
  onError: pickerFacadeInstance.handleUploadError,
  onPreviewUpdate: pickerFacadeInstance.handleUploadPreviewUpdate,
  featureFlags: featureFlags
}));