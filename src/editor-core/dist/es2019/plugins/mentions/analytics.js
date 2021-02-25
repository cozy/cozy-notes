import { OPERATIONAL_EVENT_TYPE, UI_EVENT_TYPE, SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isSpecialMention } from '@atlaskit/mention/resource';
import { name as packageName, version as packageVersion } from '../../version.json';
import { isTeamType } from './utils';
const componentName = 'mention';
export const buildAnalyticsPayload = (actionSubject, action, eventType, sessionId, otherAttributes = {}) => ({
  action,
  actionSubject,
  eventType,
  attributes: {
    packageName,
    packageVersion,
    componentName,
    sessionId,
    ...otherAttributes
  }
});
const emptyQueryResponse = {
  queryLength: 0,
  spaceInQuery: false
};

const extractAttributesFromQuery = query => {
  if (query) {
    return {
      queryLength: query.length,
      spaceInQuery: query.indexOf(' ') !== -1
    };
  }

  return emptyQueryResponse;
};

export const buildTypeAheadCancelPayload = (duration, upKeyCount, downKeyCount, sessionId, query) => {
  const {
    queryLength,
    spaceInQuery
  } = extractAttributesFromQuery(query);
  return buildAnalyticsPayload('mentionTypeahead', 'cancelled', UI_EVENT_TYPE, sessionId, {
    duration,
    downKeyCount,
    upKeyCount,
    queryLength,
    spaceInQuery
  });
};

const getPosition = (mentionList, selectedMention) => {
  if (mentionList) {
    const index = mentionList.findIndex(mention => mention.id === selectedMention.id);
    return index === -1 ? undefined : index;
  }

  return;
};

const isClicked = insertType => insertType === 'selected';

export const buildTypeAheadInviteItemViewedPayload = (sessionId, contextIdentifierProvider, userRole) => {
  const {
    containerId,
    objectId,
    childObjectId
  } = contextIdentifierProvider || {};
  return buildAnalyticsPayload('inviteItem', 'viewed', SCREEN_EVENT_TYPE, sessionId, {
    containerId,
    objectId,
    childObjectId,
    userRole
  });
};
export const buildTypeAheadInviteExposurePayload = (shouldEnableInvite, sessionId, contextIdentifierProvider, userRole) => {
  const {
    containerId,
    objectId,
    childObjectId
  } = contextIdentifierProvider || {};
  return buildAnalyticsPayload('feature', 'exposed', OPERATIONAL_EVENT_TYPE, sessionId, {
    flagKey: 'confluence.frontend.invite.from.mention',
    value: shouldEnableInvite,
    containerId,
    objectId,
    childObjectId,
    userRole
  });
};
export const buildTypeAheadInviteItemClickedPayload = (duration, upKeyCount, downKeyCount, sessionId, insertType, query, contextIdentifierProvider, userRole) => {
  const {
    queryLength,
    spaceInQuery
  } = extractAttributesFromQuery(query);
  const {
    containerId,
    objectId,
    childObjectId
  } = contextIdentifierProvider || {};
  return buildAnalyticsPayload('inviteItem', isClicked(insertType) ? 'clicked' : 'pressed', UI_EVENT_TYPE, sessionId, {
    duration,
    queryLength,
    spaceInQuery,
    upKeyCount,
    downKeyCount,
    containerId,
    objectId,
    childObjectId,
    userRole
  });
};
export const buildTypeAheadInsertedPayload = (duration, upKeyCount, downKeyCount, sessionId, insertType, mention, mentionList, query, contextIdentifierProvider) => {
  const {
    queryLength,
    spaceInQuery
  } = extractAttributesFromQuery(query);
  let analyticsPayload = buildAnalyticsPayload('mentionTypeahead', isClicked(insertType) ? 'clicked' : 'pressed', UI_EVENT_TYPE, sessionId, {
    duration,
    position: getPosition(mentionList, mention),
    keyboardKey: isClicked(insertType) ? undefined : insertType,
    queryLength,
    spaceInQuery,
    isSpecial: isSpecialMention(mention),
    accessLevel: mention.accessLevel || '',
    userType: mention.userType,
    userId: mention.id,
    upKeyCount,
    downKeyCount,
    memberCount: isTeamType(mention.userType) && mention.context ? mention.context.memberCount : null,
    includesYou: isTeamType(mention.userType) && mention.context ? mention.context.includesYou : null
  });

  if (contextIdentifierProvider) {
    analyticsPayload.containerId = contextIdentifierProvider.containerId || undefined;
    analyticsPayload.objectId = contextIdentifierProvider.objectId || undefined;
    analyticsPayload.childObjectId = contextIdentifierProvider.childObjectId || undefined;
  }

  return analyticsPayload;
};
export const buildTypeAheadRenderedPayload = (duration, userIds, query, teams) => {
  const {
    queryLength,
    spaceInQuery
  } = extractAttributesFromQuery(query);
  const actionSubject = userIds ? 'mentionTypeahead' : 'teamMentionTypeahead';
  return {
    action: 'rendered',
    actionSubject,
    eventType: OPERATIONAL_EVENT_TYPE,
    attributes: {
      packageName,
      packageVersion,
      componentName,
      duration,
      userIds,
      teams,
      queryLength,
      spaceInQuery
    }
  };
};