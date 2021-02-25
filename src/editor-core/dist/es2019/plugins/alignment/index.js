import React from 'react';
import { alignment } from '@atlaskit/adf-schema';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey, createPlugin } from './pm-plugins/main';
import { changeAlignment } from './commands';
import ToolbarAlignment from './ui/ToolbarAlignment';
export const defaultConfig = {
  align: 'start'
};

const alignmentPlugin = () => ({
  name: 'alignment',

  marks() {
    return [{
      name: 'alignment',
      mark: alignment
    }];
  },

  pmPlugins() {
    return [{
      name: 'alignmentPlugin',
      plugin: ({
        dispatch
      }) => createPlugin(dispatch, defaultConfig)
    }];
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    disabled,
    isToolbarReducedSpacing
  }) {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        align: pluginKey
      },
      render: ({
        align
      }) => {
        return /*#__PURE__*/React.createElement(ToolbarAlignment, {
          pluginState: align,
          isReducedSpacing: isToolbarReducedSpacing,
          changeAlignment: align => changeAlignment(align)(editorView.state, editorView.dispatch),
          disabled: disabled || !align.isEnabled,
          popupsMountPoint: popupsMountPoint,
          popupsBoundariesElement: popupsBoundariesElement,
          popupsScrollableElement: popupsScrollableElement
        });
      }
    });
  }

});

export default alignmentPlugin;