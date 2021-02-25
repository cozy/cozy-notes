import { createCommand } from '.';
import { isSelectionMediaSingleNode, getMediaNodeFromSelection } from '../../utils/media-common';
import { ACTION_SUBJECT, EVENT_TYPE, withAnalytics, ACTION_SUBJECT_ID, ACTION } from '../../../analytics';

const createCommandWithAnalytics = (actionType, action, transform) => {
  return withAnalytics({
    action: actionType,
    actionSubject: ACTION_SUBJECT.MEDIA,
    actionSubjectId: ACTION_SUBJECT_ID.ALT_TEXT,
    eventType: EVENT_TYPE.TRACK
  })(createCommand(action, transform));
};

export const closeMediaAltTextMenu = createCommand(state => {
  if (isSelectionMediaSingleNode(state)) {
    return {
      type: 'closeMediaAltTextMenu'
    };
  }

  return false;
});
export const openMediaAltTextMenu = createCommandWithAnalytics(ACTION.OPENED, state => {
  if (isSelectionMediaSingleNode(state)) {
    return {
      type: 'openMediaAltTextMenu'
    };
  }

  return false;
}, tr => tr.setMeta('scrollIntoView', false));
export const updateAltText = newAltText => createCommand(state => isSelectionMediaSingleNode(state) ? {
  type: 'updateAltText'
} : false, (tr, state) => {
  const mediaNode = getMediaNodeFromSelection(state);
  const pos = tr.selection.from + 1;

  if (mediaNode) {
    tr.setMeta('scrollIntoView', false);
    tr.setNodeMarkup(pos, undefined, { ...mediaNode.attrs,
      alt: newAltText
    });
  }

  return tr;
});