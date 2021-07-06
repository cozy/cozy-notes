import React from 'react'
import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import { WidthProvider } from '@atlaskit/editor-common'
import { useProviderFactory } from '@atlaskit/editor-common/provider-factory'
import EditorContext from '../../../../ui/EditorContext'
import EditorActions from '../../../../actions'
import { EditorSharedConfigProvider } from '../context/shared-config'
import { useEditor } from '../hooks/use-editor'
import { EditorContentProvider } from './EditorContent'
export function EditorInternal(
  {
    onAnalyticsEvent,
    disabled,
    transformer,
    defaultValue,
    plugins,
    portalProviderAPI,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    onChange,
    onDestroy,
    onMount,
    children
  },
  context
) {
  // Need to memoize editor actions otherwise in case when editor is not
  // wrapped with EditorContext every prop change triggers all hooks
  // that depend on editorActions
  const maybeEditorActions = (context || {}).editorActions
  const editorActions = React.useMemo(
    () => maybeEditorActions || new EditorActions(),
    [maybeEditorActions]
  ) // Get the provider factory from context

  const providerFactory = useProviderFactory()
  const [editorSharedConfig, mountEditor] = useEditor({
    context,
    editorActions,
    onAnalyticsEvent,
    disabled,
    transformer,
    defaultValue,
    plugins,
    portalProviderAPI,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    onChange,
    onDestroy,
    onMount,
    providerFactory
  })
  return /*#__PURE__*/ React.createElement(
    WidthProvider,
    null,
    /*#__PURE__*/ React.createElement(
      EditorContext,
      {
        editorActions: editorActions
      },
      /*#__PURE__*/ React.createElement(
        EditorSharedConfigProvider,
        {
          value: editorSharedConfig
        },
        /*#__PURE__*/ React.createElement(
          EditorContentProvider,
          {
            value: mountEditor
          },
          children
        )
      )
    )
  )
}
EditorInternal.contextTypes = {
  editorActions: PropTypes.object,
  intl: intlShape
}
