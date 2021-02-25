import { Node } from 'prosemirror-model';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE, getAnalyticsEventsFromTransaction } from '../../../../../plugins/analytics';
import { findChangedNodesFromTransaction, validateNodes, validNode } from '../../../../../utils/nodes';
import { compose, toJSON } from '../../../../../utils';
import { sanitizeNode } from '@atlaskit/adf-utils';
import { getDocStructure } from '../../../../../utils/document-logger';
import { analyticsEventKey } from '../../../../../plugins/analytics/consts'; // Helper to assure correct payload when dispatch analytics

function dispatchAnalytics(dispatch, payload) {
  dispatch(analyticsEventKey, payload);
}

export function createDispatchTransaction(editorSharedConfig) {
  return function dispatchTransaction(transaction) {
    const {
      editorView,
      onChange,
      transformer,
      dispatch
    } = editorSharedConfig;

    if (!editorView) {
      return;
    }

    const nodes = findChangedNodesFromTransaction(transaction);

    if (validateNodes(nodes)) {
      // go ahead and update the state now we know the transaction is good
      const editorState = editorView.state.apply(transaction);
      editorView.updateState(editorState);

      if (onChange && transaction.docChanged) {
        onChange(getEditorValue(editorView, transformer), {
          source: 'local'
        });
      }
    } else {
      // If invalid document, send analytics event with the structure of the nodes
      if (dispatch) {
        const invalidNodes = nodes.filter(node => !validNode(node)).map(node => getDocStructure(node));
        dispatchAnalytics(dispatch, {
          action: ACTION.DISPATCHED_INVALID_TRANSACTION,
          actionSubject: ACTION_SUBJECT.EDITOR,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes: {
            analyticsEventPayloads: getAnalyticsEventsFromTransaction(transaction),
            invalidNodes
          }
        });
      }
    }
  };
}
export function getEditorValue(editorView, transformer) {
  return compose(doc => transformer && transformer.encode ? transformer.encode(Node.fromJSON(editorView.state.schema, doc)) : doc, sanitizeNode, toJSON)(editorView.state.doc);
}