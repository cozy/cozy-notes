import _extends from '@babel/runtime/helpers/extends'
import React, { useCallback } from 'react'
import { withAnalyticsEvents } from '@atlaskit/analytics-next'
import { MobileAppearance } from '../../ui/AppearanceComponents/Mobile'
import { EditorSharedConfigConsumer, Editor, EditorContent } from './Editor'
import { useCreateAnalyticsHandler } from './internal/hooks/use-analytics'
import { ContextAdapter } from '../../nodeviews/context-adapter'
export function MobileEditor(props) {
  const { maxHeight, createAnalyticsEvent } = props
  const handleAnalyticsEvent = useCreateAnalyticsHandler(createAnalyticsEvent)
  const renderWithConfig = useCallback(
    config => {
      return /*#__PURE__*/ React.createElement(
        MobileAppearance,
        {
          editorView: config && config.editorView,
          maxHeight: maxHeight
        },
        /*#__PURE__*/ React.createElement(EditorContent, null)
      )
    },
    [maxHeight]
  )
  return /*#__PURE__*/ React.createElement(
    ContextAdapter,
    null,
    /*#__PURE__*/ React.createElement(
      Editor,
      _extends({}, props, {
        onAnalyticsEvent: handleAnalyticsEvent
      }),
      /*#__PURE__*/ React.createElement(
        EditorSharedConfigConsumer,
        null,
        renderWithConfig
      )
    )
  )
}
MobileEditor.displayName = 'MobileEditor'
export const Mobile = withAnalyticsEvents()(MobileEditor)
