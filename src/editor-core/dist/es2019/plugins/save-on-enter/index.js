import { keymap } from 'prosemirror-keymap';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, EVENT_TYPE, INPUT_METHOD } from '../../plugins/analytics';
import { analyticsEventKey } from '../analytics/consts';
export function createPlugin(eventDispatch, onSave) {
  if (!onSave) {
    return;
  }

  return keymap({
    Enter(state, _dispatch, editorView) {
      if (canSaveOnEnter(editorView)) {
        eventDispatch(analyticsEventKey, analyticsPayload(state));
        onSave(editorView);
        return true;
      }

      return false;
    }

  });
}

function canSaveOnEnter(editorView) {
  const {
    $cursor
  } = editorView.state.selection;
  const {
    decisionItem,
    paragraph,
    taskItem
  } = editorView.state.schema.nodes;
  return !$cursor || $cursor.parent.type === paragraph && $cursor.depth === 1 || $cursor.parent.type === decisionItem && !isEmptyAtCursor($cursor) || $cursor.parent.type === taskItem && !isEmptyAtCursor($cursor);
}

function isEmptyAtCursor($cursor) {
  const {
    content
  } = $cursor.parent;
  return !(content && content.size);
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

const saveOnEnterPlugin = onSave => ({
  name: 'saveOnEnter',

  pmPlugins() {
    return [{
      name: 'saveOnEnter',
      plugin: ({
        dispatch
      }) => createPlugin(dispatch, onSave)
    }];
  }

});

export default saveOnEnterPlugin;