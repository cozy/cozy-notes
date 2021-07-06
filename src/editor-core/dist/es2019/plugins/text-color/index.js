import React from 'react'
import { textColor } from '@atlaskit/adf-schema'
import WithPluginState from '../../ui/WithPluginState'
import {
  createPlugin,
  pluginKey as textColorPluginKey
} from './pm-plugins/main'
import ToolbarTextColor from './ui/ToolbarTextColor'

const pluginConfig = textColorConfig => {
  if (!textColorConfig || typeof textColorConfig === 'boolean') {
    return undefined
  }

  return textColorConfig
}

const textColorPlugin = textColorConfig => ({
  name: 'textColor',

  marks() {
    return [
      {
        name: 'textColor',
        mark: textColor
      }
    ]
  },

  pmPlugins() {
    return [
      {
        name: 'textColor',
        plugin: ({ dispatch }) =>
          createPlugin(dispatch, pluginConfig(textColorConfig))
      }
    ]
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    isToolbarReducedSpacing,
    dispatchAnalyticsEvent,
    disabled
  }) {
    const config = pluginConfig(textColorConfig)
    const showMoreColorsToggle =
      config && config.EXPERIMENTAL_allowMoreTextColors
    return /*#__PURE__*/ React.createElement(WithPluginState, {
      plugins: {
        textColor: textColorPluginKey
      },
      render: ({ textColor }) =>
        /*#__PURE__*/ React.createElement(ToolbarTextColor, {
          pluginState: textColor,
          isReducedSpacing: isToolbarReducedSpacing,
          editorView: editorView,
          popupsMountPoint: popupsMountPoint,
          popupsBoundariesElement: popupsBoundariesElement,
          popupsScrollableElement: popupsScrollableElement,
          showMoreColorsToggle: showMoreColorsToggle,
          dispatchAnalyticsEvent: dispatchAnalyticsEvent,
          disabled: disabled
        })
    })
  }
})

export { textColorPluginKey }
export default textColorPlugin
