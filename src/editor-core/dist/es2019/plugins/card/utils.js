import { NodeSelection } from 'prosemirror-state';
import { Slice, Fragment } from 'prosemirror-model';
import { pluginKey } from './pm-plugins/plugin-key';
import { mapChildren } from '../../utils/slice';
import { isSupportedInParent } from '../..//utils/nodes';
export const appearanceForNodeType = spec => {
  if (spec.name === 'inlineCard') {
    return 'inline';
  } else if (spec.name === 'blockCard') {
    return 'block';
  } else if (spec.name === 'embedCard') {
    return 'embed';
  }

  return;
};
export const selectedCardAppearance = state => state.selection instanceof NodeSelection && appearanceForNodeType(state.selection.node.type);
export const titleUrlPairFromNode = node => {
  const {
    attrs
  } = node;
  return {
    url: attrs.url || attrs.data && attrs.data.url,
    title: attrs.data && attrs.data.title
  };
};
/**
 * Merges the title and url from attributes and CardInfo from the resolved view, preferring the CardInfo.
 * @param titleUrlPair title and url information from the node attributes
 * @param info information stored in state from the resolved UI component view
 */

export const mergeCardInfo = (titleUrlPair, info) => {
  return {
    title: info && info.title || titleUrlPair.title,
    url: info && info.url || titleUrlPair.url
  };
};
export const displayInfoForCard = (node, info) => mergeCardInfo(titleUrlPairFromNode(node), info);
export const findCardInfo = state => {
  const pluginState = pluginKey.getState(state);
  return pluginState.cards.find(cardInfo => cardInfo.pos === state.selection.from);
};
export const transformUnsupportedBlockCardToInline = (slice, state) => {
  const {
    blockCard,
    inlineCard
  } = state.schema.nodes;
  const children = [];
  mapChildren(slice.content, (node, i, frag) => {
    if (node.type === blockCard && !isSupportedInParent(state, frag)) {
      children.push(inlineCard.createChecked(node.attrs, node.content, node.marks));
    } else {
      children.push(node);
    }
  });
  return new Slice(Fragment.fromArray(children), slice.openStart, slice.openEnd);
};