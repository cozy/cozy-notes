import { pluginKey } from './plugin-key';
export const showPlaceholderFloatingToolbar = (state, dispatch) => {
  const tr = state.tr;

  if (!state.selection.empty) {
    tr.deleteSelection();
  }

  tr.setMeta(pluginKey, {
    showInsertPanelAt: tr.selection.anchor
  });
  tr.scrollIntoView();
  dispatch(tr);
  return true;
};
export const insertPlaceholderTextAtSelection = value => (state, dispatch) => {
  dispatch(state.tr.replaceSelectionWith(state.schema.nodes.placeholder.createChecked({
    text: value
  })).setMeta(pluginKey, {
    showInsertPanelAt: null
  }).scrollIntoView());
  return true;
};
export const hidePlaceholderFloatingToolbar = (state, dispatch) => {
  dispatch(state.tr.setMeta(pluginKey, {
    showInsertPanelAt: null
  }));
  return true;
};