import { receiveTransaction } from 'prosemirror-collab';
import { Step } from 'prosemirror-transform';
import {
  AllSelection,
  NodeSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import {
  CollabEventInitData,
  CollabEventRemoteData,
  CollabEventConnectionData,
  CollabEventPresenceData,
  CollabEventTelepointerData,
  CollabSendableSelection,
  PrivateCollabEditOptions,
} from './types';

import { replaceDocument } from './utils';

export const handleInit = (
  initData: CollabEventInitData,
  view: EditorView,
  options?: PrivateCollabEditOptions,
) => {
  const { doc, json, version, reserveCursor } = initData;
  if (doc) {
    const { state } = view;
    const tr = replaceDocument(doc, state, version, options, reserveCursor);
    tr.setMeta('isRemote', true);
    view.dispatch(tr);
  } else if (json) {
    applyRemoteSteps(json, undefined, view);
  }
};

export const handleConnection = (
  connectionData: CollabEventConnectionData,
  view: EditorView,
) => {
  const {
    state: { tr },
  } = view;
  view.dispatch(tr.setMeta('sessionId', connectionData));
};

export const handlePresence = (
  presenceData: CollabEventPresenceData,
  view: EditorView,
) => {
  const {
    state: { tr },
  } = view;
  view.dispatch(tr.setMeta('presence', presenceData));
};

export const applyRemoteData = (
  remoteData: CollabEventRemoteData,
  view: EditorView,
  options: PrivateCollabEditOptions,
) => {
  const { json, userIds = [] } = remoteData;
  if (json) {
    applyRemoteSteps(json, userIds, view, options);
  }
};

export const applyRemoteSteps = (
  json: any[],
  userIds: string[] | undefined,
  view: EditorView,
  options?: PrivateCollabEditOptions,
) => {
  if (!json || !json.length) {
    return;
  }

  const {
    state,
    state: { schema },
  } = view;

  const steps = json.map((step) => Step.fromJSON(schema, step));

  let tr: Transaction;

  if (options && options.useNativePlugin && userIds) {
    tr = receiveTransaction(state, steps, userIds);
  } else {
    tr = state.tr;
    steps.forEach((step) => tr.step(step));
  }

  if (tr) {
    tr.setMeta('addToHistory', false);
    tr.setMeta('isRemote', true);

    const { from, to } = state.selection;
    const [firstStep] = json;

    /**
     * If the cursor is a the same position as the first step in
     * the remote data, we need to manually set it back again
     * in order to prevent the cursor from moving.
     */
    if (from === firstStep.from && to === firstStep.to) {
      tr.setSelection(state.selection.map(tr.doc, tr.mapping));
    }

    view.dispatch(tr);
  }
};

export const handleTelePointer = (
  telepointerData: CollabEventTelepointerData,
  view: EditorView,
) => {
  const {
    state: { tr },
  } = view;
  view.dispatch(tr.setMeta('telepointer', telepointerData));
};

function isAllSelection(selection: Selection) {
  return selection instanceof AllSelection;
}

function isNodeSelection(selection: Selection) {
  return selection instanceof NodeSelection;
}

export const getSendableSelection = (
  selection: Selection,
): CollabSendableSelection => {
  /**
   * <kbd>CMD + A</kbd> triggers a AllSelection
   * <kbd>escape</kbd> triggers a NodeSelection
   */
  return {
    type: 'textSelection',
    anchor: selection.anchor,
    head:
      isAllSelection(selection) || isNodeSelection(selection)
        ? selection.head - 1
        : selection.head,
  };
};
