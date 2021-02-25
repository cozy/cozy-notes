import { Plugin } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import { createSelectionClickHandler } from '../../selection/utils';
import ExpandNodeView from '../nodeviews';
import { setExpandRef } from '../commands';
import { findExpand } from '../utils';
import { expandClassNames } from '../ui/class-names';
import { getPluginState, createPluginState, pluginKey } from './plugin-factory';

function containsClass(element, className) {
  return !!element && element.classList.contains(className);
}

export const createPlugin = (dispatch, reactContext, useLongPressSelection = false) => {
  const state = createPluginState(dispatch, {});
  return new Plugin({
    state: state,
    key: pluginKey,
    props: {
      nodeViews: {
        expand: ExpandNodeView(reactContext),
        nestedExpand: ExpandNodeView(reactContext)
      },

      handleKeyDown(_view, event) {
        return containsClass(event.target, expandClassNames.titleContainer);
      },

      handleKeyPress(_view, event) {
        return containsClass(event.target, expandClassNames.titleContainer);
      },

      handleScrollToSelection() {
        return containsClass(document.activeElement, expandClassNames.titleInput);
      },

      handleClickOn: createSelectionClickHandler(['expand', 'nestedExpand'], target => target.classList.contains(expandClassNames.prefix), {
        useLongPressSelection
      })
    },

    // @see ED-8027 to follow up on this work-around
    filterTransaction(tr) {
      if (containsClass(document.activeElement, expandClassNames.titleInput) && tr.selectionSet && (!tr.steps.length || tr.isGeneric)) {
        return false;
      }

      return true;
    },

    view: editorView => {
      const domAtPos = editorView.domAtPos.bind(editorView);
      return {
        update: view => {
          const {
            state,
            dispatch
          } = view;
          const node = findExpand(state);

          if (node) {
            const expandRef = findDomRefAtPos(node.pos, domAtPos);

            if (getPluginState(state).expandRef !== expandRef) {
              setExpandRef(expandRef)(state, dispatch);
            }
          }
        }
      };
    }
  });
};