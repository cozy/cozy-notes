import _extends from '@babel/runtime/helpers/extends'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { PortalRenderer, PortalProvider } from '../../ui/PortalProvider'
import { EditorInternal } from './internal/components/EditorInternal'
import {
  usePresetContext,
  PresetProvider
} from './internal/context/preset-context'
import {
  EditorSharedConfigConsumer,
  useEditorSharedConfig
} from './internal/context/shared-config'
import { EditorContent } from './internal/components/EditorContent'

/**
 * Main Editor component. Use in combination with `EditorContent` and a `Preset`.
 * Internally it constructs `ProseMirror View` and mounts it to `EditorContent`.
 *
 * `EditorContent` can be wrapped to implement any layout/design requirements.
 *
 * ```js
 * <Preset>
 *   <Editor>
 *     <EditorContent/>
 *   </Editor>
 * </Preset>
 * ```
 */
function Editor(props) {
  const plugins = usePresetContext()
  return /*#__PURE__*/ React.createElement(
    IntlProvider,
    {
      locale: 'en'
    },
    /*#__PURE__*/ React.createElement(PortalProvider, {
      onAnalyticsEvent: props.onAnalyticsEvent,
      render: portalProviderAPI =>
        /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement(
            EditorInternal,
            _extends({}, props, {
              plugins: plugins.length ? plugins : props.plugins,
              portalProviderAPI: portalProviderAPI,
              onAnalyticsEvent: props.onAnalyticsEvent
            })
          ),
          /*#__PURE__*/ React.createElement(PortalRenderer, {
            portalProviderAPI: portalProviderAPI
          })
        )
    })
  )
}
/**
 *
 * Public API Exports.
 *
 */

export {
  // Components
  PresetProvider,
  Editor,
  EditorContent,
  EditorSharedConfigConsumer,
  useEditorSharedConfig
}
