import { insertTypeAheadQuery } from '../../type-ahead/commands/insert-query';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE, ACTION_SUBJECT_ID, withAnalytics } from '../../analytics';
export function insertMentionQuery(inputMethod) {
  return withAnalytics({
    action: ACTION.INVOKED,
    actionSubject: ACTION_SUBJECT.TYPEAHEAD,
    actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
    attributes: {
      inputMethod
    },
    eventType: EVENT_TYPE.UI
  })(insertTypeAheadQuery('@'));
}