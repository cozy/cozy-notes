import { Plugin } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import { PanelSharedCssClassName } from '@atlaskit/editor-common';
import { getPanelNodeView } from '../nodeviews/panel';
import { pluginKey } from '../types';
import { findPanel } from '../utils';
import { createSelectionClickHandler } from '../../selection/utils';
export const getPluginState = state => {
  return pluginKey.getState(state);
};
export const setPluginState = stateProps => (state, dispatch) => {
  const pluginState = getPluginState(state);

  if (dispatch) {
    dispatch(state.tr.setMeta(pluginKey, { ...pluginState,
      ...stateProps
    }));
  }

  return true;
};
export const createPlugin = (dispatch, providerFactory, pluginOptions) => {
  const {
    useLongPressSelection = false
  } = pluginOptions;
  return new Plugin({
    state: {
      init() {
        return {
          element: null,
          activePanelType: undefined,
          toolbarVisible: false
        };
      },

      apply(tr, pluginState) {
        const maybeNextPluginState = tr.getMeta(pluginKey);

        if (maybeNextPluginState) {
          const nextPluginState = { ...pluginState,
            ...maybeNextPluginState
          };
          dispatch(pluginKey, nextPluginState);
          return nextPluginState;
        }

        return pluginState;
      }

    },
    key: pluginKey,
    view: editorView => {
      const domAtPos = editorView.domAtPos.bind(editorView);
      return {
        update: view => {
          const pluginState = getPluginState(view.state);
          const panelNode = findPanel(view.state, view.state.selection);
          const panelRef = panelNode ? findDomRefAtPos(panelNode.pos, domAtPos) : undefined;

          if (panelRef !== pluginState.element) {
            const newState = {
              element: panelRef,
              activePanelType: panelRef && (panelNode === null || panelNode === void 0 ? void 0 : panelNode.node.attrs['panelType']),
              activePanelColor: pluginOptions.UNSAFE_allowCustomPanel ? panelRef && (panelNode === null || panelNode === void 0 ? void 0 : panelNode.node.attrs['panelColor']) : undefined,
              activePanelIcon: pluginOptions.UNSAFE_allowCustomPanel ? panelRef && (panelNode === null || panelNode === void 0 ? void 0 : panelNode.node.attrs['panelIcon']) : undefined,
              toolbarVisible: !!panelRef
            };
            setPluginState(newState)(view.state, view.dispatch);
            return true;
          }
          /** Plugin dispatch needed to reposition the toolbar */


          dispatch(pluginKey, { ...pluginState
          });
          return;
        }
      };
    },
    props: {
      nodeViews: {
        panel: getPanelNodeView(pluginOptions, providerFactory)
      },
      handleClickOn: createSelectionClickHandler(['panel'], target => !!target.closest(`.${PanelSharedCssClassName.prefix}`), {
        useLongPressSelection
      }),
      handleDOMEvents: {
        blur(view) {
          const pluginState = getPluginState(view.state);

          if (pluginState.toolbarVisible) {
            setPluginState({
              element: undefined,
              activePanelType: undefined,
              activePanelColor: undefined,
              activePanelIcon: undefined,
              toolbarVisible: false
            })(view.state, view.dispatch);
            return true;
          }

          return false;
        }

      }
    }
  });
};