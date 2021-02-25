import { pluginKey } from './plugin-key';
export const openHelpCommand = (tr, dispatch) => {
  tr = tr.setMeta(pluginKey, true);

  if (dispatch) {
    dispatch(tr);
    return true;
  }

  return false;
};
export const closeHelpCommand = (tr, dispatch) => {
  tr = tr.setMeta(pluginKey, false);
  dispatch(tr);
};
export const stopPropagationCommand = e => e.stopPropagation();