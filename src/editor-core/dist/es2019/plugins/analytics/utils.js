import { findParentNode } from 'prosemirror-utils';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { NodeSelection } from 'prosemirror-state';
import { GapCursorSelection, Side } from '../selection/gap-cursor/selection';
import { AnalyticsStep } from '@atlaskit/adf-schema/steps';
import { editorAnalyticsChannel } from './consts';
import { ACTION, ACTION_SUBJECT } from './types';
import { SELECTION_TYPE, SELECTION_POSITION } from './types/utils';
import { analyticsPluginKey } from './plugin-key';
import { fireAnalyticsEvent } from './fire-analytics-event';

function getCreateUIAnalyticsEvent(editorState) {
  const pluginState = analyticsPluginKey.getState(editorState);
  return pluginState ? pluginState.createAnalyticsEvent : undefined;
}

export function getStateContext(state, payload) {
  if (!payload.attributes) {
    return payload;
  }

  const {
    type,
    position
  } = getSelectionType(state);
  payload.attributes.selectionType = type;

  if (position) {
    payload.attributes.selectionPosition = position;
  }

  const insertLocation = findInsertLocation(state);

  if (payload.action === ACTION.INSERTED && payload.actionSubject === ACTION_SUBJECT.DOCUMENT && payload.attributes) {
    payload.attributes.insertLocation = insertLocation;
  } else {
    payload.attributes.nodeLocation = insertLocation;
  }

  return payload;
}
export function getSelectionType(state) {
  const {
    selection
  } = state;
  let type;
  let position;

  if (selection instanceof GapCursorSelection) {
    type = SELECTION_TYPE.GAP_CURSOR;
    position = selection.side === Side.LEFT ? SELECTION_POSITION.LEFT : SELECTION_POSITION.RIGHT;
  } else if (selection instanceof CellSelection) {
    type = SELECTION_TYPE.CELL;
  } else if (selection instanceof NodeSelection) {
    type = SELECTION_TYPE.NODE;
  } else if (selection.from !== selection.to) {
    type = SELECTION_TYPE.RANGED;
  } else {
    type = SELECTION_TYPE.CURSOR;
    const {
      from,
      $from
    } = selection;

    if (from === $from.start()) {
      position = SELECTION_POSITION.START;
    } else if (from === $from.end()) {
      position = SELECTION_POSITION.END;
    } else {
      position = SELECTION_POSITION.MIDDLE;
    }
  }

  return {
    type,
    position
  };
}
export function findInsertLocation(state) {
  const {
    selection
  } = state;

  if (selection instanceof NodeSelection) {
    return selection.node.type.name;
  }

  if (selection instanceof CellSelection) {
    return state.schema.nodes.table.name;
  } // Text selection


  const parentNodeInfo = findParentNode(node => node.type !== state.schema.nodes.paragraph)(state.selection);
  return parentNodeInfo ? parentNodeInfo.node.type.name : state.doc.type.name;
}
const actionsToIgnore = [ACTION.INVOKED, ACTION.OPENED];
export function addAnalytics(state, tr, payload, channel = editorAnalyticsChannel) {
  const createAnalyticsEvent = getCreateUIAnalyticsEvent(state);
  payload = getStateContext(state, payload);

  if (createAnalyticsEvent) {
    const {
      storedMarks
    } = tr;
    tr.step(new AnalyticsStep((payload, channel) => {
      fireAnalyticsEvent(createAnalyticsEvent)({
        payload,
        channel
      });
    }, [{
      payload,
      channel
    }], actionsToIgnore, tr.selection.$from.pos)); // When you add a new step all the storedMarks are removed it

    if (storedMarks) {
      tr.setStoredMarks(storedMarks);
    }
  }

  return tr;
}
export function withAnalytics(payload, channel) {
  return command => (state, dispatch, view) => command(state, tr => {
    if (dispatch) {
      if (payload instanceof Function) {
        const dynamicPayload = payload(state);

        if (dynamicPayload) {
          dispatch(addAnalytics(state, tr, dynamicPayload, channel));
        }
      } else {
        dispatch(addAnalytics(state, tr, payload, channel));
      }
    }
  }, view);
}
export function ruleWithAnalytics(getPayload) {
  return rule => {
    // Monkey patching handler to add analytics
    const handler = rule.handler;

    rule.handler = (state, match, start, end) => {
      let tr = handler(state, match, start, end);

      if (tr) {
        const payload = getPayload(state, match, start, end);
        tr = addAnalytics(state, tr, payload);
      }

      return tr;
    };

    return rule;
  };
}
export function getAnalyticsEventsFromTransaction(tr) {
  return tr.steps.filter(step => step instanceof AnalyticsStep).reduce((acc, step) => [...acc, ...step.analyticsEvents], []);
}