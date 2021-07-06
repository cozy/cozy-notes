import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { MediaPicker } from '@atlaskit/media-picker'
import { ErrorReporter } from '@atlaskit/editor-common'
import PickerFacade from '../../picker-facade'
const dummyMediaPickerObject = {
  on: () => {},
  removeAllListeners: () => {},
  emit: () => {},
  destroy: () => {},
  setUploadParams: () => {}
}
export default class PickerFacadeProvider extends React.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {})

    _defineProperty(this, 'handleMediaProvider', async (_name, provider) => {
      const { mediaState, analyticsName } = this.props
      const mediaProvider = await provider

      if (!mediaProvider || !mediaProvider.uploadParams) {
        return
      }

      const resolvedMediaClientConfig =
        (await mediaProvider.uploadMediaClientConfig) ||
        (await mediaProvider.viewMediaClientConfig)

      if (!resolvedMediaClientConfig) {
        return
      }

      const pickerFacadeConfig = {
        mediaClientConfig: resolvedMediaClientConfig,
        errorReporter: mediaState.options.errorReporter || new ErrorReporter(),
        featureFlags:
          mediaState.mediaOptions && mediaState.mediaOptions.featureFlags
      }
      /**
       * As the first MediaPicker component to be migrated to React, we want to scope the amount of changes logic changed/moved on Editor side.
       * To achieve this we agreed on using `PickerFacade` 'customMediaPicker' type, since we only need this instance to reuse the logic when we subscribe
       * for all the different events in MediaPicker (onPreviewUpdate, onError, onProcessing, etc).
       * The `dummyMediaPickerObject` provided here serves as a workaround for the old picker api that `PickerFacade` will try to use.
       * But we don't want this to do anything since it's all part of the new React component (`Clipboard` component in this case).
       * Eventually PickerFacade will be removed and replaced with a new abstraction explained here https://product-fabric.atlassian.net/browse/MS-1937
       */

      const pickerFacadeInstance = await new PickerFacade(
        'customMediaPicker',
        pickerFacadeConfig,
        dummyMediaPickerObject,
        MediaPicker,
        analyticsName
      ).init()
      /**
       * Based on the `initPickers` method in `MediaPluginState` we need these 2 `onNewMedia` subscriptions.
       * First one in order to trigger the entire process of uploading a file for when `onPreviewUpdate` is called
       * Second one in order to track all analytics as before.
       */

      pickerFacadeInstance.onNewMedia(mediaState.insertFile)
      pickerFacadeInstance.setUploadParams(mediaProvider.uploadParams)
      const config = {
        uploadParams: mediaProvider.uploadParams
      }
      this.setState({
        pickerFacadeInstance,
        config,
        mediaClientConfig: resolvedMediaClientConfig
      })
    })
  }

  componentDidMount() {
    this.props.mediaState.options.providerFactory.subscribe(
      'mediaProvider',
      this.handleMediaProvider
    )
  }

  componentWillUnmount() {
    this.props.mediaState.options.providerFactory.unsubscribe(
      'mediaProvider',
      this.handleMediaProvider
    )
  }

  render() {
    const { mediaClientConfig, config, pickerFacadeInstance } = this.state

    if (!mediaClientConfig || !config || !pickerFacadeInstance) {
      return null
    }

    return this.props.children({
      mediaClientConfig,
      config,
      pickerFacadeInstance
    })
  }
}
