import { Plugin, TextSelection } from 'prosemirror-state';
import { clipboardPluginKey } from '../plugin-key';
import { getNodeSelectionAnalyticsPayload, getAllSelectionAnalyticsPayload, getRangeSelectionAnalyticsPayload, getCellSelectionAnalyticsPayload } from '../../selection/utils';
import { EVENT_TYPE, ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from '../../analytics/types/enums';
export const createPlugin = ({
  dispatchAnalyticsEvent
}) => new Plugin({
  key: clipboardPluginKey,
  props: {
    handleDOMEvents: {
      cut: view => sendClipboardAnalytics(view, dispatchAnalyticsEvent, ACTION.CUT),
      copy: view => sendClipboardAnalytics(view, dispatchAnalyticsEvent, ACTION.COPIED)
    }
  }
});
export const sendClipboardAnalytics = (view, dispatchAnalyticsEvent, action) => {
  const clipboardAnalyticsPayload = getAnalyticsPayload(view.state, action);

  if (clipboardAnalyticsPayload) {
    dispatchAnalyticsEvent(clipboardAnalyticsPayload);
  } // return false so we don't block any other plugins' cut or copy handlers
  // from running just because we are sending an analytics event


  return false;
};

const getAnalyticsPayload = (state, action) => {
  const {
    selection,
    doc
  } = state;
  const selectionAnalyticsPayload = getNodeSelectionAnalyticsPayload(selection) || getRangeSelectionAnalyticsPayload(selection, doc) || getAllSelectionAnalyticsPayload(selection) || getCellSelectionAnalyticsPayload(state);

  if (selectionAnalyticsPayload) {
    const {
      actionSubjectId: selectionActionSubjectId
    } = selectionAnalyticsPayload;
    let content = [];

    switch (selectionActionSubjectId) {
      case ACTION_SUBJECT_ID.NODE:
        content.push(selectionAnalyticsPayload.attributes.node);
        break;

      case ACTION_SUBJECT_ID.RANGE:
        content.push(...selectionAnalyticsPayload.attributes.nodes);
        break;

      case ACTION_SUBJECT_ID.ALL:
        content.push('all');
        break;

      case ACTION_SUBJECT_ID.CELL:
        {
          const {
            selectedCells
          } = selectionAnalyticsPayload.attributes;
          content.push(...Array(selectedCells).fill('tableCell'));
          break;
        }
    }

    return {
      eventType: EVENT_TYPE.TRACK,
      action,
      actionSubject: ACTION_SUBJECT.DOCUMENT,
      attributes: {
        content
      }
    };
  }

  if (selection instanceof TextSelection && selection.$cursor) {
    return {
      eventType: EVENT_TYPE.TRACK,
      action,
      actionSubject: ACTION_SUBJECT.DOCUMENT,
      attributes: {
        content: ['caret']
      }
    };
  }
};