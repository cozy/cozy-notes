import { Transaction, Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { findParentNodeOfType } from 'prosemirror-utils';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
} from '../../analytics';
import { isWrappingPossible } from '../utils/selection';
import { isListNode, JoinDirection, joinSiblingLists } from '../utils/node';
import { Dispatch } from '../../../event-dispatcher';
import { pluginFactory } from '../../../utils/plugin-state-factory';
import { ListsPluginState } from '../types';
import { findRootParentListNode } from '../utils/find';

const predictableListsPluginKey = new PluginKey<ListsPluginState>(
  'listsPredictablePlugin',
);
export const pluginKey = predictableListsPluginKey;

const initialState: ListsPluginState = {
  bulletListActive: false,
  bulletListDisabled: false,
  orderedListActive: false,
  orderedListDisabled: false,
  decorationSet: DecorationSet.empty,
};

export const getDecorations = (doc: Node): DecorationSet => {
  const decorations: Decoration[] = [];

  // this stack keeps track of each (nested) list to calculate the indentation level
  const processedListsStack: { node: Node; startPos: number }[] = [];

  doc.nodesBetween(0, doc.content.size, (node, currentNodeStartPos) => {
    if (processedListsStack.length > 0) {
      let isOutsideLastList = true;
      while (isOutsideLastList && processedListsStack.length > 0) {
        const lastList = processedListsStack[processedListsStack.length - 1];
        const lastListEndPos = lastList.startPos + lastList.node.nodeSize;
        isOutsideLastList = currentNodeStartPos >= lastListEndPos;
        // once we finish iterating over each innermost list, pop the stack to
        // decrease the indent level attribute accordingly
        if (isOutsideLastList) {
          processedListsStack.pop();
        }
      }
    }

    if (isListNode(node)) {
      processedListsStack.push({ node, startPos: currentNodeStartPos });

      const from = currentNodeStartPos;
      const to = currentNodeStartPos + node.nodeSize;
      const depth = processedListsStack.length;

      decorations.push(
        Decoration.node(from, to, {
          'data-indent-level': `${depth}`,
        }),
      );
    }
  });

  return DecorationSet.empty.add(doc, decorations);
};

const handleDocChanged = (
  tr: Transaction,
  pluginState: ListsPluginState,
): ListsPluginState => {
  const nextPluginState = handleSelectionChanged(tr, pluginState);
  const decorationSet = getDecorations(tr.doc);
  return {
    ...nextPluginState,
    decorationSet,
  };
};

const handleSelectionChanged = (
  tr: Transaction,
  pluginState: ListsPluginState,
): ListsPluginState => {
  const { bulletList, orderedList } = tr.doc.type.schema.nodes;
  const listParent = findParentNodeOfType([bulletList, orderedList])(
    tr.selection,
  );

  const bulletListActive = !!listParent && listParent.node.type === bulletList;
  const orderedListActive =
    !!listParent && listParent.node.type === orderedList;
  const bulletListDisabled = !(
    bulletListActive ||
    orderedListActive ||
    isWrappingPossible(bulletList, tr.selection)
  );
  const orderedListDisabled = !(
    bulletListActive ||
    orderedListActive ||
    isWrappingPossible(orderedList, tr.selection)
  );

  if (
    bulletListActive !== pluginState.bulletListActive ||
    orderedListActive !== pluginState.orderedListActive ||
    bulletListDisabled !== pluginState.bulletListDisabled ||
    orderedListDisabled !== pluginState.orderedListDisabled
  ) {
    const nextPluginState = {
      ...pluginState,
      bulletListActive,
      orderedListActive,
      bulletListDisabled,
      orderedListDisabled,
    };
    return nextPluginState;
  }

  return pluginState;
};

const reducer = () => (state: ListsPluginState): ListsPluginState => {
  return state;
};

const { getPluginState, createPluginState } = pluginFactory(
  predictableListsPluginKey,
  reducer(),
  {
    onDocChanged: handleDocChanged,
    onSelectionChanged: handleSelectionChanged,
  },
);

const createInitialState = (state: EditorState) => {
  return {
    ...initialState,
    decorationSet: getDecorations(state.doc),
  };
};

export const createPlugin = (eventDispatch: Dispatch): Plugin =>
  new Plugin({
    state: createPluginState(eventDispatch, createInitialState),
    key: predictableListsPluginKey,
    appendTransaction(transactions, _oldState, newState) {
      const lastTransaction = transactions[transactions.length - 1];
      if (!lastTransaction.docChanged || !lastTransaction.selectionSet) {
        return;
      }
      const tr = newState.tr;
      const rootList = findRootParentListNode(tr.selection.$from);
      if (!rootList) {
        return;
      }
      const listsJoined = joinSiblingLists({
        tr,
        direction: JoinDirection.RIGHT,
      });
      if (tr.docChanged) {
        const {
          orderedList: orderedListsJoined,
          bulletList: bulletListsJoined,
        } = listsJoined;

        addAnalytics(newState, tr, {
          action: ACTION.FIXED,
          actionSubject: ACTION_SUBJECT.LIST,
          eventType: EVENT_TYPE.TRACK,
          attributes: {
            orderedListsJoined,
            bulletListsJoined,
          },
        });

        return tr;
      }
    },
    props: {
      decorations(state) {
        const { decorationSet } = getPluginState(state);
        return decorationSet;
      },
    },
  });
