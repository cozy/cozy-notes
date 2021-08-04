import React from 'react'
import {
  media,
  mediaGroup,
  mediaSingle,
  mediaSingleWithCaption
} from '@atlaskit/adf-schema'
import {
  EditorPlugin,
  PMPluginFactoryParams
} from '@atlaskit/editor-core/types'
import { stateKey as pluginKey, createPlugin } from './pm-plugins/main'
import { createPlugin as createMediaEditorPlugin } from './pm-plugins/media-editor'
import { pluginKey as mediaEditorPluginKey } from './pm-plugins/media-editor-plugin-factory'
import { createPlugin as createMediaAltTextPlugin } from './pm-plugins/alt-text'
import keymapMediaAltTextPlugin from './pm-plugins/alt-text/keymap'
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single'
import keymapLinkingPlugin from './pm-plugins/linking/keymap'
import keymapPlugin from './pm-plugins/keymap'
import linkingPlugin from './pm-plugins/linking'
import ToolbarMedia from './ui/ToolbarMedia'
import { ReactMediaGroupNode } from './nodeviews/mediaGroup'
import { ReactMediaSingleNode } from './nodeviews/mediaSingle'
import { MediaEditorState, MediaOptions } from './types'
import { floatingToolbar } from './toolbar'

import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID
} from '@atlaskit/editor-core/plugins/analytics'
import { IconImages } from '@atlaskit/editor-core/plugins/quick-insert/assets'
import WithPluginState from '@atlaskit/editor-core/ui/WithPluginState'
import MediaEditor from './ui/MediaEditor'
import { MediaPickerComponents } from './ui/MediaPicker'
import { messages } from '@atlaskit/editor-core/plugins/insert-block/ui/ToolbarInsertBlock/messages'
import { ReactMediaNode } from './nodeviews/mediaNodeView'
import { cozyMediaOptions } from 'config/cozy-media-options'

export * from './types'
export { insertMediaSingleNode } from './utils/media-single'

const mediaPlugin = (options?: MediaOptions): EditorPlugin => ({
  name: 'media',

  nodes() {
    const {
      allowMediaGroup = true,
      allowMediaSingle = false,
      UNSAFE_allowImageCaptions = cozyMediaOptions.UNSAFE_allowImageCaptions
    } = options || {}

    const mediaSingleNode = UNSAFE_allowImageCaptions
      ? mediaSingleWithCaption
      : mediaSingle

    return [
      { name: 'mediaGroup', node: mediaGroup },
      { name: 'mediaSingle', node: mediaSingleNode },
      { name: 'media', node: media }
    ].filter(node => {
      if (node.name === 'mediaGroup') {
        return allowMediaGroup
      }

      if (node.name === 'mediaSingle') {
        return allowMediaSingle
      }

      return true
    })
  },

  pmPlugins() {
    const pmPlugins = [
      {
        name: 'media',
        plugin: ({
          schema,
          dispatch,
          eventDispatcher,
          providerFactory,
          errorReporter,
          portalProviderAPI,
          reactContext,
          dispatchAnalyticsEvent
        }: PMPluginFactoryParams) =>
          createPlugin(
            schema,
            {
              providerFactory,
              nodeViews: {
                mediaGroup: ReactMediaGroupNode(
                  portalProviderAPI,
                  eventDispatcher,
                  providerFactory,
                  options
                ),
                mediaSingle: ReactMediaSingleNode(
                  portalProviderAPI,
                  eventDispatcher,
                  providerFactory,
                  dispatchAnalyticsEvent,
                  options
                ),
                media: ReactMediaNode(
                  portalProviderAPI,
                  eventDispatcher,
                  providerFactory,
                  options
                )
              },
              errorReporter,
              uploadErrorHandler: options && options.uploadErrorHandler,
              waitForMediaUpload: options && options.waitForMediaUpload,
              customDropzoneContainer:
                options && options.customDropzoneContainer,
              customMediaPicker: options && options.customMediaPicker,
              allowResizing: !!(options && options.allowResizing)
            },
            reactContext,
            dispatch,
            options
          )
      },
      { name: 'mediaKeymap', plugin: () => keymapPlugin() }
    ]

    if (options && options.allowMediaSingle) {
      pmPlugins.push({
        name: 'mediaSingleKeymap',
        plugin: ({ schema }) => keymapMediaSinglePlugin(schema)
      })
    }

    if (options && options.allowAnnotation) {
      pmPlugins.push({ name: 'mediaEditor', plugin: createMediaEditorPlugin })
    }

    if (options && options.allowAltTextOnImages) {
      pmPlugins.push({
        name: 'mediaAltText',
        plugin: createMediaAltTextPlugin
      })
      pmPlugins.push({
        name: 'mediaAltTextKeymap',
        plugin: ({ schema }) => keymapMediaAltTextPlugin(schema)
      })
    }

    if (options && options.allowLinking) {
      pmPlugins.push({
        name: 'mediaLinking',
        plugin: ({ dispatch }: PMPluginFactoryParams) => linkingPlugin(dispatch)
      })
      pmPlugins.push({
        name: 'mediaLinkingKeymap',
        plugin: ({ schema }) => keymapLinkingPlugin(schema)
      })
    }

    return pmPlugins
  },

  contentComponent({ editorView, eventDispatcher }) {
    // render MediaEditor separately because it doesn't depend on media plugin state
    // so we can utilise EventDispatcher-based rerendering
    const mediaEditor =
      options && options.allowAnnotation ? (
        <WithPluginState
          editorView={editorView}
          plugins={{ mediaEditorState: mediaEditorPluginKey }}
          eventDispatcher={eventDispatcher}
          render={({
            mediaEditorState
          }: {
            mediaEditorState: MediaEditorState
          }) => (
            <MediaEditor
              mediaEditorState={mediaEditorState}
              view={editorView}
            />
          )}
        />
      ) : null
    return (
      <>
        <WithPluginState
          editorView={editorView}
          plugins={{
            mediaState: pluginKey
          }}
          render={({ mediaState }) => (
            <MediaPickerComponents mediaState={mediaState} />
          )}
        />

        {mediaEditor}
      </>
    )
  },

  secondaryToolbarComponent({ editorView, eventDispatcher, disabled }) {
    return (
      <ToolbarMedia
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        pluginKey={pluginKey}
        isDisabled={disabled}
        isReducedSpacing={true}
      />
    )
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        id: 'media',
        title: formatMessage(messages.filesAndImages),
        description: formatMessage(messages.filesAndImagesDescription),
        priority: 400,
        keywords: ['attachment', 'gif', 'media', 'picture'],
        icon: () => (
          <IconImages label={formatMessage(messages.filesAndImages)} />
        ),
        action(insert, state) {
          const pluginState = pluginKey.getState(state)
          pluginState.showMediaPicker()
          const tr = insert('')
          return addAnalytics(state, tr, {
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI
          })
        }
      }
    ],

    floatingToolbar: (state, intl, providerFactory) =>
      floatingToolbar(state, intl, {
        providerFactory,
        allowResizing: cozyMediaOptions.allowResizing,
        allowResizingInTables: cozyMediaOptions.allowResizingInTables,
        allowAnnotation: cozyMediaOptions.allowAnnotation,
        allowLinking: cozyMediaOptions.allowLinking,
        allowAdvancedToolBarOptions:
          cozyMediaOptions.allowAdvancedToolBarOptions,
        allowAltTextOnImages: cozyMediaOptions.allowAltTextOnImages,
        altTextValidator: options && options.altTextValidator
      })
  }
})

export default mediaPlugin
