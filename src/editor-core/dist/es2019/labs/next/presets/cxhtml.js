// #region Imports
import React from 'react'
import {
  tablesPlugin,
  panelPlugin,
  listsPlugin,
  textColorPlugin,
  breakoutPlugin,
  jiraIssuePlugin,
  extensionPlugin,
  rulePlugin,
  datePlugin,
  layoutPlugin,
  indentationPlugin,
  cardPlugin,
  statusPlugin,
  mediaPlugin,
  mentionsPlugin,
  tasksAndDecisionsPlugin,
  insertBlockPlugin,
  basePlugin,
  placeholderPlugin
} from '../../../plugins'
import { PresetProvider } from '../Editor'
import { useDefaultPreset } from './default' // #endregion

export function useCXHTMLPreset({
  mentionProvider,
  mediaProvider,
  placeholder,
  featureFlags
}) {
  const [preset] = useDefaultPreset({
    featureFlags,
    paste: {}
  })
  preset.add([
    basePlugin,
    {
      allowInlineCursorTarget: true,
      allowScrollGutter: {
        getScrollElement: _view =>
          document.querySelector('.fabric-editor-popup-scroll-parent') || null
      }
    }
  ])
  preset.add([
    tablesPlugin,
    {
      tableOptions: {
        advanced: true
      }
    }
  ])
  preset.add([
    panelPlugin,
    {
      UNSAFE_allowCustomPanel: true
    }
  ])
  preset.add(listsPlugin)
  preset.add(textColorPlugin)
  preset.add(breakoutPlugin)
  preset.add(jiraIssuePlugin)
  preset.add(extensionPlugin)
  preset.add(rulePlugin)
  preset.add(datePlugin)
  preset.add(layoutPlugin)
  preset.add(indentationPlugin)
  preset.add([
    cardPlugin,
    {
      allowBlockCards: true,
      platform: 'web'
    }
  ])
  preset.add([
    statusPlugin,
    {
      menuDisabled: false
    }
  ])
  preset.add(tasksAndDecisionsPlugin)
  preset.add(insertBlockPlugin)
  preset.add([
    placeholderPlugin,
    {
      placeholder
    }
  ])

  if (mentionProvider) {
    preset.add(mentionsPlugin)
  }

  if (mediaProvider) {
    preset.add([
      mediaPlugin,
      {
        provider: mediaProvider,
        allowMediaSingle: true,
        allowMediaGroup: true,
        allowAnnotation: true,
        allowResizing: true,
        allowLinking: true,
        allowResizingInTables: true,
        allowAltTextOnImages: true
      }
    ])
  }

  return [preset]
}
export function EditorPresetCXHTML(props) {
  const { children, excludes } = props
  const [preset] = useCXHTMLPreset(props)
  const plugins = preset.getEditorPlugins(excludes)
  return /*#__PURE__*/ React.createElement(
    PresetProvider,
    {
      value: plugins
    },
    children
  )
}
