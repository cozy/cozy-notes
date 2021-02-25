import { TextSelection } from 'prosemirror-state';
import { withAnalytics, ACTION, ACTION_SUBJECT, EVENT_TYPE, INPUT_METHOD } from '../analytics';
import { activate, find, findNext, findPrevious, replace, replaceAll, cancelSearch } from './commands';
export const activateWithAnalytics = ({
  triggerMethod
}) => withAnalytics(state => ({
  eventType: EVENT_TYPE.UI,
  action: ACTION.ACTIVATED,
  actionSubject: ACTION_SUBJECT.FIND_REPLACE_DIALOG,
  attributes: {
    inputMethod: state.selection instanceof TextSelection && !state.selection.empty ? INPUT_METHOD.PREFILL : INPUT_METHOD.KEYBOARD,
    triggerMethod
  }
}))(activate());
export const findWithAnalytics = ({
  editorView,
  containerElement,
  keyword
}) => withAnalytics({
  eventType: EVENT_TYPE.TRACK,
  action: ACTION.FIND_PERFORMED,
  actionSubject: ACTION_SUBJECT.TEXT
})(find(editorView, containerElement, keyword));
export const findNextWithAnalytics = ({
  triggerMethod
}) => withAnalytics({
  eventType: EVENT_TYPE.TRACK,
  action: ACTION.FIND_NEXT_PERFORMED,
  actionSubject: ACTION_SUBJECT.TEXT,
  attributes: {
    triggerMethod
  }
})(findNext());
export const findPrevWithAnalytics = ({
  triggerMethod
}) => withAnalytics({
  eventType: EVENT_TYPE.TRACK,
  action: ACTION.FIND_PREV_PERFORMED,
  actionSubject: ACTION_SUBJECT.TEXT,
  attributes: {
    triggerMethod
  }
})(findPrevious());
export const replaceWithAnalytics = ({
  triggerMethod,
  replaceText
}) => withAnalytics({
  eventType: EVENT_TYPE.TRACK,
  action: ACTION.REPLACED_ONE,
  actionSubject: ACTION_SUBJECT.TEXT,
  attributes: {
    triggerMethod
  }
})(replace(replaceText));
export const replaceAllWithAnalytics = ({
  replaceText
}) => withAnalytics({
  eventType: EVENT_TYPE.TRACK,
  action: ACTION.REPLACED_ALL,
  actionSubject: ACTION_SUBJECT.TEXT
})(replaceAll(replaceText));
export const cancelSearchWithAnalytics = ({
  triggerMethod
}) => withAnalytics({
  eventType: EVENT_TYPE.UI,
  action: ACTION.DEACTIVATED,
  actionSubject: ACTION_SUBJECT.FIND_REPLACE_DIALOG,
  attributes: {
    triggerMethod
  }
})(cancelSearch());