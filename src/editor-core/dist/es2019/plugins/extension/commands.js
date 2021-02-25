import { removeSelectedNode, removeParentNodeOfType } from 'prosemirror-utils';
import { applyChange } from '../context-panel/transforms';
import { createCommand } from './plugin-factory';
import { getSelectedExtension } from './utils'; // AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points

export function updateState(state) {
  return createCommand({
    type: 'UPDATE_STATE',
    data: state
  });
}
export function setEditingContextToContextPanel(processParametersBefore, processParametersAfter) {
  return createCommand({
    type: 'UPDATE_STATE',
    data: {
      showContextPanel: true,
      processParametersBefore,
      processParametersAfter
    }
  }, applyChange);
}
export const clearEditingContext = createCommand({
  type: 'UPDATE_STATE',
  data: {
    showContextPanel: false,
    processParametersBefore: undefined,
    processParametersAfter: undefined
  }
}, applyChange);
export const forceAutoSave = value => createCommand({
  type: 'UPDATE_STATE',
  data: {
    autoSaveResolve: value
  }
}, applyChange);
export const showContextPanel = createCommand({
  type: 'UPDATE_STATE',
  data: {
    showContextPanel: true
  }
}, applyChange);
export const updateExtensionLayout = layout => createCommand({
  type: 'UPDATE_STATE',
  data: {
    layout
  }
}, (tr, state) => {
  const selectedExtension = getSelectedExtension(state, true);

  if (selectedExtension) {
    return tr.setNodeMarkup(selectedExtension.pos, undefined, { ...selectedExtension.node.attrs,
      layout
    });
  }

  return tr;
});
export const removeExtension = () => createCommand({
  type: 'UPDATE_STATE',
  data: {
    element: undefined
  }
}, (tr, state) => {
  if (getSelectedExtension(state)) {
    return removeSelectedNode(tr);
  } else {
    return removeParentNodeOfType(state.schema.nodes.bodiedExtension)(tr);
  }
});