import React from 'react';
import { typeAheadQuery } from '@atlaskit/adf-schema';
import WithPluginState from '../../ui/WithPluginState';
import { inputRulePlugin } from './pm-plugins/input-rules';
import { keymapPlugin } from './pm-plugins/keymap';
import { createInitialPluginState, createPlugin, pluginKey as typeAheadPluginKey } from './pm-plugins/main';
import { TypeAhead } from './ui/TypeAhead';

const typeAheadPlugin = () => ({
  name: 'typeAhead',

  marks() {
    return [{
      name: 'typeAheadQuery',
      mark: typeAheadQuery
    }];
  },

  pmPlugins(typeAhead = []) {
    return [{
      name: 'typeAhead',
      plugin: ({
        dispatch,
        reactContext
      }) => createPlugin(dispatch, reactContext, typeAhead)
    }, {
      name: 'typeAheadInputRule',
      plugin: ({
        schema
      }) => inputRulePlugin(schema, typeAhead)
    }, {
      name: 'typeAheadKeymap',
      plugin: () => keymapPlugin()
    }];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement
  }) {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        typeAhead: typeAheadPluginKey
      },
      render: ({
        typeAhead = createInitialPluginState()
      }) => {
        if (typeAhead.typeAheadHandler && typeAhead.typeAheadHandler.headless) {
          return null;
        }

        const {
          queryMarkPos
        } = typeAhead;
        let domRef = null;

        if (queryMarkPos !== null) {
          // temporary fix to avoid page crash until it is fixed properly
          try {
            domRef = editorView.domAtPos(queryMarkPos);
          } catch (ex) {
            return null;
          }
        }

        const anchorElement = domRef ? domRef.node.childNodes[domRef.offset] : undefined;
        return /*#__PURE__*/React.createElement(TypeAhead, {
          editorView: editorView,
          popupsMountPoint: popupsMountPoint,
          popupsBoundariesElement: popupsBoundariesElement,
          popupsScrollableElement: popupsScrollableElement,
          anchorElement: anchorElement,
          active: typeAhead.active,
          isLoading: !!typeAhead.itemsLoader,
          items: typeAhead.items,
          currentIndex: typeAhead.currentIndex,
          highlight: typeAhead.highlight
        });
      }
    });
  }

});

export { typeAheadPluginKey };
export default typeAheadPlugin;