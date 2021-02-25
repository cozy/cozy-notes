import { addAnalytics, INDENT_TYPE, ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD, EVENT_TYPE } from '../../analytics';
const indentTypes = {
  paragraph: INDENT_TYPE.PARAGRAPH,
  heading: INDENT_TYPE.HEADING
};
/**
 * Get the current indentation level given prev and new attributes
 * @param prevAttrs - Previous attributes from indentation
 * @param newAttrs - New attributes from indentation
 */

export function getNewIndentLevel(prevAttrs, newAttrs) {
  if (newAttrs === undefined) {
    return getPrevIndentLevel(prevAttrs);
  } else if (newAttrs === false) {
    return 0;
  }

  return newAttrs.level;
}
/**
 * Get the previous indentation level  prev attributes
 * @param prevAttrs - Previous attributes from indentation
 */

export function getPrevIndentLevel(prevAttrs) {
  if (prevAttrs === undefined) {
    return 0;
  }

  return prevAttrs.level;
}
/**
 * Create a new dispatch function who add analytics events given a list of attributes changes
 *
 * @export
 * @param {*} getAttrsChanges
 * @param {*} state
 * @param dispatch
 * @returns
 */

export function createAnalyticsDispatch(getAttrsChanges, state, dispatch) {
  return tr => {
    let currentTr = tr;
    const changes = getAttrsChanges(); // Get all attributes changes
    // Add analytics event for each change stored.

    changes.forEach(({
      node,
      prevAttrs,
      newAttrs,
      options: {
        direction
      }
    }) => {
      const indentType = indentTypes[node.type.name];

      if (!indentType) {
        return; // If no valid indent type continue
      }

      currentTr = addAnalytics(state, currentTr, {
        action: ACTION.FORMATTED,
        actionSubject: ACTION_SUBJECT.TEXT,
        actionSubjectId: ACTION_SUBJECT_ID.FORMAT_INDENT,
        eventType: EVENT_TYPE.TRACK,
        attributes: {
          inputMethod: INPUT_METHOD.KEYBOARD,
          previousIndentationLevel: getPrevIndentLevel(prevAttrs),
          newIndentLevel: getNewIndentLevel(prevAttrs, newAttrs),
          direction,
          indentType
        }
      });
    }); // Dispatch analytics if exist

    if (dispatch) {
      dispatch(tr);
    }
  };
}