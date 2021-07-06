import React from 'react'
import { Dropzone } from '@atlaskit/media-picker'
import PickerFacadeProvider from './PickerFacadeProvider'
export const DropzoneWrapper = ({ mediaState, isActive, featureFlags }) =>
  /*#__PURE__*/ React.createElement(
    PickerFacadeProvider,
    {
      mediaState: mediaState,
      analyticsName: 'dropzone'
    },
    ({ mediaClientConfig, config, pickerFacadeInstance }) => {
      const {
        options: { customDropzoneContainer },
        handleDrag
      } = mediaState
      const dropzoneConfig = { ...config, container: customDropzoneContainer }
      return isActive
        ? /*#__PURE__*/ React.createElement(Dropzone, {
            mediaClientConfig: mediaClientConfig,
            config: dropzoneConfig,
            onError: pickerFacadeInstance.handleUploadError,
            onPreviewUpdate: pickerFacadeInstance.handleUploadPreviewUpdate,
            onEnd: pickerFacadeInstance.handleReady,
            onDragEnter: () => handleDrag('enter'),
            onDragLeave: () => handleDrag('leave'),
            featureFlags: featureFlags
          })
        : null
    }
  )
