import { Plugin, NodeSelection } from 'prosemirror-state';
import { codeBlockNodeView } from '../nodeviews/code-block';
import { createSelectionClickHandler } from '../../selection/utils';
import { pluginKey } from '../plugin-key';
import { ACTIONS } from './actions';
import { findCodeBlock } from '../utils';
import { codeBlockClassNames } from '../ui/class-names';
export const getPluginState = state => pluginKey.getState(state);
export const setPluginState = stateProps => (state, dispatch) => {
  const pluginState = getPluginState(state);
  dispatch(state.tr.setMeta(pluginKey, { ...pluginState,
    ...stateProps
  }));
  return true;
};
export const createPlugin = (useLongPressSelection = false) => new Plugin({
  state: {
    init(_, state) {
      const node = findCodeBlock(state, state.selection);
      return {
        pos: node ? node.pos : null,
        contentCopied: false,
        isNodeSelected: false
      };
    },

    apply(tr, pluginState, _oldState, newState) {
      if (tr.docChanged || tr.selectionSet) {
        const {
          selection
        } = newState;
        const node = findCodeBlock(newState, selection);
        const newPluginState = { ...pluginState,
          pos: node ? node.pos : null,
          isNodeSelected: tr.selection instanceof NodeSelection
        };
        return newPluginState;
      }

      const meta = tr.getMeta(pluginKey);

      if (meta && meta.type === ACTIONS.SET_COPIED_TO_CLIPBOARD) {
        return { ...pluginState,
          contentCopied: meta.data
        };
      }

      return pluginState;
    }

  },
  key: pluginKey,
  props: {
    nodeViews: {
      codeBlock: codeBlockNodeView()
    },
    handleClickOn: createSelectionClickHandler(['codeBlock'], target => !!(target.closest(`.${codeBlockClassNames.gutter}`) || target.classList.contains(codeBlockClassNames.content)), {
      useLongPressSelection
    })
  }
});