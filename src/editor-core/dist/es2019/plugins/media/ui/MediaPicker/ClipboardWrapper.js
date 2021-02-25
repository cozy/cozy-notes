import React from 'react';
import PickerFacadeProvider from './PickerFacadeProvider';
import { Clipboard } from '@atlaskit/media-picker';
export const ClipboardWrapper = ({
  mediaState,
  featureFlags
}) => /*#__PURE__*/React.createElement(PickerFacadeProvider, {
  mediaState: mediaState,
  analyticsName: "clipboard"
}, ({
  mediaClientConfig,
  config,
  pickerFacadeInstance
}) => /*#__PURE__*/React.createElement(Clipboard, {
  mediaClientConfig: mediaClientConfig,
  config: config,
  onError: pickerFacadeInstance.handleUploadError,
  onPreviewUpdate: pickerFacadeInstance.handleUploadPreviewUpdate,
  onEnd: pickerFacadeInstance.handleReady,
  featureFlags: featureFlags
}));