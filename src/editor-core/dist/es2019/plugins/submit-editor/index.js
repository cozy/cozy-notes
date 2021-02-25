import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../keymaps';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, EVENT_TYPE, INPUT_METHOD } from '../../plugins/analytics';
import { stateKey as mediaPluginKey } from '../../plugins/media/pm-plugins/plugin-key';
import { analyticsEventKey } from '../analytics/consts';
export function createPlugin(eventDispatch, onSave) {
  if (!onSave) {
    return;
  }

  return keymap({
    [`${keymaps.submit.common}`]: (state, _dispatch, editorView) => {
      const mediaState = mediaPluginKey.getState(state);

      if (mediaState && mediaState.waitForMediaUpload && !mediaState.allUploadsFinished) {
        return true;
      }

      eventDispatch(analyticsEventKey, analyticsPayload(state));
      onSave(editorView);
      return true;
    }
  });
}

const analyticsPayload = state => ({
  payload: {
    action: ACTION.STOPPED,
    actionSubject: ACTION_SUBJECT.EDITOR,
    actionSubjectId: ACTION_SUBJECT_ID.SAVE,
    attributes: {
      inputMethod: INPUT_METHOD.SHORTCUT,
      documentSize: state.doc.nodeSize // TODO add individual node counts - tables, headings, lists, mediaSingles, mediaGroups, mediaCards, panels, extensions, decisions, action, codeBlocks

    },
    eventType: EVENT_TYPE.UI
  }
});

const submitEditorPlugin = onSave => ({
  name: 'submitEditor',

  pmPlugins() {
    return [{
      name: 'submitEditor',
      plugin: ({
        dispatch
      }) => createPlugin(dispatch, onSave)
    }];
  }

});

export default submitEditorPlugin;