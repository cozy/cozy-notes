import { addAnalytics, ACTION, EVENT_TYPE, ACTION_SUBJECT } from '../analytics';
export const addSynchronyErrorAnalytics = (state, tr) => {
  return error => addAnalytics(state, tr, {
    action: ACTION.SYNCHRONY_ERROR,
    actionSubject: ACTION_SUBJECT.EDITOR,
    eventType: EVENT_TYPE.OPERATIONAL,
    attributes: {
      error
    }
  });
};
export const addSynchronyEntityAnalytics = (state, tr) => {
  return type => addAnalytics(state, tr, {
    action: type === 'error' ? ACTION.SYNCHRONY_ENTITY_ERROR : ACTION.SYNCHRONY_DISCONNECTED,
    actionSubject: ACTION_SUBJECT.EDITOR,
    eventType: EVENT_TYPE.OPERATIONAL,
    attributes: {
      // https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
      onLine: navigator.onLine,
      visibilityState: document.visibilityState
    }
  });
};