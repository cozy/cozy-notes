import { AnnotationTypes } from '@atlaskit/adf-schema';
import { createCommand } from '../pm-plugins/plugin-factory';
import { INPUT_METHOD } from '../../analytics';
import { isSelectionValid, getPluginState } from '../utils';
import { ACTIONS } from '../pm-plugins/types';
import transform from './transform';
import { AnnotationSelectionType } from '../types';
export const updateInlineCommentResolvedState = (partialNewState, resolveMethod) => {
  const command = {
    type: ACTIONS.UPDATE_INLINE_COMMENT_STATE,
    data: partialNewState
  };
  const allResolved = Object.values(partialNewState).every(state => state);

  if (resolveMethod && allResolved) {
    return createCommand(command, transform.addResolveAnalytics(resolveMethod));
  }

  return createCommand(command);
};
export const closeComponent = () => createCommand({
  type: ACTIONS.CLOSE_COMPONENT
});
export const clearDirtyMark = () => createCommand({
  type: ACTIONS.INLINE_COMMENT_CLEAR_DIRTY_MARK
});
export const removeInlineCommentNearSelection = id => (state, dispatch) => {
  const {
    tr,
    selection: {
      $from
    }
  } = state;
  const {
    annotation: annotationMarkType
  } = state.schema.marks;
  const hasAnnotation = $from.marks().some(mark => mark.type === annotationMarkType);

  if (!hasAnnotation) {
    return false;
  } // just remove entire mark from around the node


  tr.removeMark($from.start(), $from.end(), annotationMarkType.create({
    id,
    type: AnnotationTypes.INLINE_COMMENT
  }));

  if (dispatch) {
    dispatch(tr);
  }

  return true;
};

const getDraftCommandAction = drafting => {
  return editorState => {
    // validate selection only when entering draft mode
    if (drafting && isSelectionValid(editorState) !== AnnotationSelectionType.VALID) {
      return false;
    }

    return {
      type: ACTIONS.SET_INLINE_COMMENT_DRAFT_STATE,
      data: {
        drafting,
        editorState
      }
    };
  };
};

export const setInlineCommentDraftState = (drafting, inputMethod = INPUT_METHOD.TOOLBAR) => {
  const commandAction = getDraftCommandAction(drafting);
  return createCommand(commandAction, transform.addOpenCloseAnalytics(drafting, inputMethod));
};
export const addInlineComment = id => {
  const commandAction = editorState => ({
    type: ACTIONS.ADD_INLINE_COMMENT,
    data: {
      drafting: false,
      inlineComments: {
        [id]: false
      },
      // Auto make the newly inserted comment selected.
      // We move the selection to the head of the comment selection.
      selectedAnnotations: [{
        id,
        type: AnnotationTypes.INLINE_COMMENT
      }],
      editorState
    }
  });

  return createCommand(commandAction, transform.addInlineComment(id));
};
export const updateMouseState = mouseData => createCommand({
  type: ACTIONS.INLINE_COMMENT_UPDATE_MOUSE_STATE,
  data: {
    mouseData
  }
});
export const createAnnotation = (id, annotationType = AnnotationTypes.INLINE_COMMENT) => (state, dispatch) => {
  // don't try to add if there are is no temp highlight bookmarked
  const {
    bookmark
  } = getPluginState(state) || {};

  if (!bookmark || !dispatch) {
    return false;
  }

  if (annotationType === AnnotationTypes.INLINE_COMMENT) {
    return addInlineComment(id)(state, dispatch);
  }

  return false;
};
export const setInlineCommentsVisibility = isVisible => {
  return createCommand({
    type: ACTIONS.INLINE_COMMENT_SET_VISIBLE,
    data: {
      isVisible
    }
  });
};