import { findParentNodeOfType, findSelectedNodeOfType, removeSelectedNode, removeParentNodeOfType, isNodeSelection } from 'prosemirror-utils';
import { NodeSelection } from 'prosemirror-state';
import { pluginKey } from './plugin-key';
import { ACTIONS } from './pm-plugins/actions';
import { copyToClipboard } from '../../utils/clipboard';
export const removeCodeBlock = (state, dispatch) => {
  const {
    schema: {
      nodes
    },
    tr
  } = state;

  if (dispatch) {
    let removeTr = tr;

    if (findSelectedNodeOfType(nodes.codeBlock)(tr.selection)) {
      removeTr = removeSelectedNode(tr);
    } else {
      removeTr = removeParentNodeOfType(nodes.codeBlock)(tr);
    }

    dispatch(removeTr);
  }

  return true;
};
export const changeLanguage = language => (state, dispatch) => {
  const {
    schema: {
      nodes: {
        codeBlock
      }
    },
    tr
  } = state;
  const attrs = {
    language
  };
  const codeBlockState = pluginKey.getState(state);

  if (codeBlockState === undefined) {
    return false;
  }

  const {
    pos
  } = codeBlockState;

  if (pos === null) {
    return false;
  }

  let changeLanguageTr = tr;
  const shouldRestoreNodeSelection = isNodeSelection(tr.selection);
  changeLanguageTr = tr.setNodeMarkup(pos, codeBlock, attrs);

  if (shouldRestoreNodeSelection) {
    changeLanguageTr = changeLanguageTr.setSelection(NodeSelection.create(changeLanguageTr.doc, pos));
  }

  changeLanguageTr.setMeta('scrollIntoView', false);

  if (dispatch) {
    dispatch(changeLanguageTr);
  }

  return true;
};
export const copyContentToClipboard = (state, dispatch) => {
  const {
    schema: {
      nodes
    },
    tr
  } = state;
  const codeBlock = findParentNodeOfType(nodes.codeBlock)(tr.selection);
  const textContent = codeBlock && codeBlock.node.textContent;

  if (textContent) {
    copyToClipboard(textContent);
    let copyToClipboardTr = tr;
    copyToClipboardTr.setMeta(pluginKey, {
      type: ACTIONS.SET_COPIED_TO_CLIPBOARD,
      data: true
    });

    if (dispatch) {
      dispatch(copyToClipboardTr);
    }
  }

  return true;
};
export const resetCopiedState = (state, dispatch) => {
  const {
    tr
  } = state;
  const codeBlockState = pluginKey.getState(state);
  let resetCopiedStateTr = tr;

  if (codeBlockState && codeBlockState.contentCopied) {
    resetCopiedStateTr.setMeta(pluginKey, {
      type: ACTIONS.SET_COPIED_TO_CLIPBOARD,
      data: false
    });

    if (dispatch) {
      dispatch(resetCopiedStateTr);
    }
  }

  return true;
};