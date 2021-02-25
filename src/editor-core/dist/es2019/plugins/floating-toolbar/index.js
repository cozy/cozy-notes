import React from 'react';
import rafSchedule from 'raf-schd';
import { Plugin, PluginKey, AllSelection } from 'prosemirror-state';
import { findDomRefAtPos, findSelectedNodeOfType } from 'prosemirror-utils';
import { Popup } from '@atlaskit/editor-common';
import WithPluginState from '../../ui/WithPluginState';
import { ToolbarLoader } from './ui/ToolbarLoader';
import { pluginKey as editorDisabledPluginKey } from '../editor-disabled';
import { findNode } from './utils';
export const getRelevantConfig = (selection, configs) => {
  // node selections always take precedence, see if
  let configPair;
  configs.find(config => {
    const node = findSelectedNodeOfType(config.nodeType)(selection);

    if (node) {
      configPair = {
        node: node.node,
        pos: node.pos,
        config
      };
    }

    return !!node;
  });

  if (configPair) {
    return configPair;
  } // create mapping of node type name to configs


  const configByNodeType = {};
  configs.forEach(config => {
    if (Array.isArray(config.nodeType)) {
      config.nodeType.forEach(nodeType => {
        configByNodeType[nodeType.name] = config;
      });
    } else {
      configByNodeType[config.nodeType.name] = config;
    }
  }); // search up the tree from selection

  const {
    $from
  } = selection;

  for (let i = $from.depth; i > 0; i--) {
    const node = $from.node(i);
    const matchedConfig = configByNodeType[node.type.name];

    if (matchedConfig) {
      return {
        config: matchedConfig,
        node: node,
        pos: $from.pos
      };
    }
  } // if it is AllSelection (can be result of Cmd+A) - use first node


  if (selection instanceof AllSelection) {
    const docNode = $from.node(0);
    let matchedConfig = null;
    const firstChild = findNode(docNode, node => {
      matchedConfig = configByNodeType[node.type.name];
      return !!matchedConfig;
    });

    if (firstChild && matchedConfig) {
      return {
        config: matchedConfig,
        node: firstChild,
        pos: $from.pos
      };
    }
  }

  return;
};

const getDomRefFromSelection = view => findDomRefAtPos(view.state.selection.from, view.domAtPos.bind(view));

function filterUndefined(x) {
  return !!x;
}

const floatingToolbarPlugin = () => ({
  name: 'floatingToolbar',

  pmPlugins(floatingToolbarHandlers = []) {
    return [{
      // Should be after all toolbar plugins
      name: 'floatingToolbar',
      plugin: ({
        dispatch,
        reactContext,
        providerFactory
      }) => floatingToolbarPluginFactory({
        dispatch,
        floatingToolbarHandlers,
        reactContext,
        providerFactory
      })
    }];
  },

  contentComponent({
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    editorView,
    providerFactory,
    dispatchAnalyticsEvent
  }) {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        floatingToolbarState: pluginKey,
        editorDisabledPlugin: editorDisabledPluginKey
      },
      render: ({
        editorDisabledPlugin,
        floatingToolbarState
      }) => {
        if (!floatingToolbarState || !floatingToolbarState.config || typeof floatingToolbarState.config.visible !== 'undefined' && !floatingToolbarState.config.visible) {
          return null;
        }

        const {
          title,
          getDomRef = getDomRefFromSelection,
          items,
          align = 'center',
          className = '',
          height,
          width,
          offset = [0, 12],
          forcePlacement,
          onPositionCalculated
        } = floatingToolbarState.config;
        const targetRef = getDomRef(editorView);

        if (!targetRef || editorDisabledPlugin && editorDisabledPlugin.editorDisabled) {
          return null;
        }

        let customPositionCalculation;
        const toolbarItems = Array.isArray(items) ? items : items(floatingToolbarState.node);

        if (onPositionCalculated) {
          customPositionCalculation = nextPos => {
            return onPositionCalculated(editorView, nextPos);
          };
        }

        return /*#__PURE__*/React.createElement(Popup, {
          ariaLabel: title,
          offset: offset,
          target: targetRef,
          alignY: "bottom",
          forcePlacement: forcePlacement,
          fitHeight: height,
          fitWidth: width,
          alignX: align,
          stick: true,
          mountTo: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          scrollableElement: popupsScrollableElement,
          onPositionCalculated: customPositionCalculation
        }, /*#__PURE__*/React.createElement(ToolbarLoader, {
          target: targetRef,
          items: toolbarItems,
          node: floatingToolbarState.node,
          dispatchCommand: fn => fn && fn(editorView.state, editorView.dispatch),
          editorView: editorView,
          className: className,
          focusEditor: () => editorView.focus(),
          providerFactory: providerFactory,
          popupsMountPoint: popupsMountPoint,
          popupsBoundariesElement: popupsBoundariesElement,
          popupsScrollableElement: popupsScrollableElement,
          dispatchAnalyticsEvent: dispatchAnalyticsEvent
        }));
      }
    });
  }

});

export default floatingToolbarPlugin;
/**
 *
 * ProseMirror Plugin
 *
 */
// We throttle update of this plugin with RAF.
// So from other plugins you will always get the previous state.
// To prevent the confusion we are not exporting the plugin key.

const pluginKey = new PluginKey('floatingToolbarPluginKey');
/**
 * Clean up floating toolbar configs from undesired properties.
 */

function sanitizeFloatingToolbarConfig(config) {
  // Cleanup from non existing node types
  if (Array.isArray(config.nodeType)) {
    return { ...config,
      nodeType: config.nodeType.filter(filterUndefined)
    };
  }

  return config;
}

function floatingToolbarPluginFactory(options) {
  const {
    floatingToolbarHandlers,
    dispatch,
    reactContext,
    providerFactory
  } = options;

  const apply = (_tr, _pluginState, _oldState, newState) => {
    const {
      intl
    } = reactContext();
    const activeConfigs = floatingToolbarHandlers.map(handler => handler(newState, intl, providerFactory)).filter(filterUndefined).map(config => sanitizeFloatingToolbarConfig(config));
    const relevantConfig = activeConfigs && getRelevantConfig(newState.selection, activeConfigs);
    dispatch(pluginKey, relevantConfig);
    return relevantConfig;
  };

  const rafApply = rafSchedule(apply);
  return new Plugin({
    key: pluginKey,
    state: {
      init: () => {
        ToolbarLoader.preload();
      },
      apply: rafApply
    },
    view: () => ({
      destroy: () => {
        rafApply.cancel();
      }
    })
  });
}