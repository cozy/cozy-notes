// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { insertSelectedItem } from '../../utils/insert';
import { pluginKey } from './plugin-key';
export const openElementBrowserModal = () => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setMeta(pluginKey, {
      isElementBrowserModalOpen: true
    }));
  }

  return true;
};
export const closeElementBrowserModal = () => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setMeta(pluginKey, {
      isElementBrowserModalOpen: false
    }));
  }

  return true;
}; // this method was adapted from the typeahed plugin so we respect the API for quick insert items

export const insertItem = item => (state, dispatch) => {
  const insert = (maybeNode, opts = {}) => {
    return insertSelectedItem(maybeNode, opts)(state, state.tr, state.selection.head);
  };

  const tr = item.action(insert, state);

  if (tr && dispatch) {
    dispatch(tr);
  }

  return true;
};