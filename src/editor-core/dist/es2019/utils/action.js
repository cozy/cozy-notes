import { Selection } from 'prosemirror-state';
import { pluginKey as extensionPluginKey } from '../plugins/extension/plugin-key';
import { forceAutoSave } from '../plugins/extension/commands';
import { stateKey as mediaPluginKey } from '../plugins/media/pm-plugins/plugin-key';
export async function __temporaryFixForConfigPanel(editorView) {
  const extensionPluginState = editorView.state && extensionPluginKey.getState(editorView.state);

  if (extensionPluginState && extensionPluginState.showContextPanel) {
    await new Promise(resolve => {
      forceAutoSave(resolve)(editorView.state, editorView.dispatch);
    });
  }
}
export async function getEditorValueWithMedia(editorView) {
  const mediaPluginState = editorView.state && mediaPluginKey.getState(editorView.state);

  if (mediaPluginState && mediaPluginState.waitForMediaUpload) {
    await mediaPluginState.waitForPendingTasks();
  }

  return editorView.state.doc;
}
/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */

export function cascadeCommands(cmds) {
  return (state, dispatch) => {
    let {
      tr: baseTr
    } = state;
    let shouldDispatch = false;

    const onDispatchAction = tr => {
      const selectionJSON = tr.selection.toJSON();
      baseTr.setSelection(Selection.fromJSON(baseTr.doc, selectionJSON));
      tr.steps.forEach(st => {
        baseTr.step(st);
      });
      shouldDispatch = true;
    };

    cmds.forEach(cmd => cmd(state, onDispatchAction));

    if (dispatch && shouldDispatch) {
      dispatch(baseTr);
      return true;
    }

    return false;
  };
}