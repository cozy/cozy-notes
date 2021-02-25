import { ACTIONS, pluginKey } from '../pm-plugins/main';
export const setCurrentIndex = currentIndex => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setMeta(pluginKey, {
      action: ACTIONS.SET_CURRENT_INDEX,
      params: {
        currentIndex
      }
    }));
  }

  return true;
};