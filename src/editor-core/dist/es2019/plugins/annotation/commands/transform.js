import { TextSelection } from 'prosemirror-state';
import { AnnotationTypes } from '@atlaskit/adf-schema';
import { ACTION_SUBJECT, ACTION_SUBJECT_ID, EVENT_TYPE, ACTION, INPUT_METHOD } from '../../analytics';
import { addAnalytics } from '../../analytics/utils';
import { getSelectionPositions, getPluginState, getDraftCommandAnalyticsPayload } from '../utils';
import { applyMarkOnRange } from '../../../utils/commands';

const addAnnotationMark = id => (transaction, state) => {
  const inlineCommentState = getPluginState(state);
  const {
    from,
    to,
    head
  } = getSelectionPositions(state, inlineCommentState);
  const annotationMark = state.schema.marks.annotation.create({
    id,
    type: AnnotationTypes.INLINE_COMMENT
  }); // Apply the mark only to text node in the range.

  let tr = applyMarkOnRange(from, to, false, annotationMark, transaction); // set selection back to the end of annotation once annotation mark is applied

  tr.setSelection(TextSelection.create(tr.doc, head));
  return tr;
};

const addInlineComment = id => (transaction, state) => {
  let tr = addAnnotationMark(id)(transaction, state); // add insert analytics step to transaction

  tr = addInsertAnalytics(tr, state); // add close analytics step to transaction

  tr = addOpenCloseAnalytics(false, INPUT_METHOD.TOOLBAR)(tr, state);
  return tr;
};

const addOpenCloseAnalytics = (drafting, method = INPUT_METHOD.TOOLBAR) => (transaction, state) => {
  const draftingPayload = getDraftCommandAnalyticsPayload(drafting, method)(state);
  return addAnalytics(state, transaction, draftingPayload);
};

const addInsertAnalytics = (transaction, state) => {
  return addAnalytics(state, transaction, {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.ANNOTATION,
    eventType: EVENT_TYPE.TRACK,
    actionSubjectId: ACTION_SUBJECT_ID.INLINE_COMMENT
  });
};

const addResolveAnalytics = method => (transaction, state) => {
  const resolvedPayload = {
    action: ACTION.RESOLVED,
    actionSubject: ACTION_SUBJECT.ANNOTATION,
    actionSubjectId: ACTION_SUBJECT_ID.INLINE_COMMENT,
    eventType: EVENT_TYPE.TRACK,
    attributes: {
      method
    }
  };
  return addAnalytics(state, transaction, resolvedPayload);
};

export default {
  addAnnotationMark,
  addInlineComment,
  addOpenCloseAnalytics,
  addInsertAnalytics,
  addResolveAnalytics
};