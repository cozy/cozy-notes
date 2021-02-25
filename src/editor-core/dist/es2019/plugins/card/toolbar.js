import React from 'react';
import { NodeSelection } from 'prosemirror-state';
import { removeSelectedNode, findDomRefAtPos } from 'prosemirror-utils';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { ACTION, ACTION_SUBJECT, INPUT_METHOD, EVENT_TYPE, addAnalytics } from '../analytics';
import { linkToolbarMessages, linkMessages } from '../../messages';
import commonMessages from '../../messages';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import { changeSelectedCardToText } from './pm-plugins/doc';
import { pluginKey } from './pm-plugins/main';
import { richMediaClassName } from '@atlaskit/editor-common';
import { buildEditLinkToolbar, editLink, editLinkToolbarConfig } from './ui/EditLinkToolbar';
import { displayInfoForCard, findCardInfo, titleUrlPairFromNode, appearanceForNodeType } from './utils';
import { isSafeUrl } from '@atlaskit/adf-schema';
import { LinkToolbarAppearance } from './ui/LinkToolbarAppearance';
import { messages } from './messages';
import buildLayoutButtons from '../../ui/MediaAndEmbedsToolbar';
export const removeCard = (state, dispatch) => {
  if (!(state.selection instanceof NodeSelection)) {
    return false;
  }

  const type = state.selection.node.type.name;
  const payload = {
    action: ACTION.DELETED,
    actionSubject: ACTION_SUBJECT.SMART_LINK,
    actionSubjectId: type,
    attributes: {
      inputMethod: INPUT_METHOD.TOOLBAR,
      displayMode: type
    },
    eventType: EVENT_TYPE.TRACK
  };

  if (dispatch) {
    dispatch(addAnalytics(state, removeSelectedNode(state.tr), payload));
  }

  return true;
};
export const visitCardLink = (state, dispatch) => {
  if (!(state.selection instanceof NodeSelection)) {
    return false;
  }

  const {
    type
  } = state.selection.node;
  const {
    url
  } = titleUrlPairFromNode(state.selection.node);
  const payload = {
    action: ACTION.VISITED,
    actionSubject: ACTION_SUBJECT.SMART_LINK,
    actionSubjectId: type.name,
    attributes: {
      inputMethod: INPUT_METHOD.TOOLBAR
    },
    eventType: EVENT_TYPE.TRACK
  }; // All card links should open in the same tab per https://product-fabric.atlassian.net/browse/MS-1583.
  // We are in edit mode here, open the smart card URL in a new window.

  window.open(url);

  if (dispatch) {
    dispatch(addAnalytics(state, state.tr, payload));
  }

  return true;
};

const unlinkCard = (node, state) => {
  const displayInfo = displayInfoForCard(node, findCardInfo(state));
  const text = displayInfo.title || displayInfo.url;

  if (text) {
    return changeSelectedCardToText(text);
  }

  return () => false;
};

const buildAlignmentOptions = (state, intl) => {
  return buildLayoutButtons(state, intl, state.schema.nodes.embedCard, true, true);
};

const generateDeleteButton = (node, state, intl) => {
  const {
    inlineCard
  } = state.schema.nodes;

  if (node.type === inlineCard) {
    return {
      type: 'button',
      title: intl.formatMessage(linkToolbarMessages.unlink),
      icon: UnlinkIcon,
      onClick: unlinkCard(node, state)
    };
  }

  return {
    type: 'button',
    appearance: 'danger',
    icon: RemoveIcon,
    onMouseEnter: hoverDecoration(node.type, true),
    onMouseLeave: hoverDecoration(node.type, false),
    title: intl.formatMessage(commonMessages.remove),
    onClick: removeCard
  };
};

const generateToolbarItems = (state, intl, providerFactory, cardOptions, platform) => node => {
  const {
    url
  } = titleUrlPairFromNode(node);

  if (url && !isSafeUrl(url)) {
    return [];
  }

  const pluginState = pluginKey.getState(state);
  const currentAppearance = appearanceForNodeType(node.type);

  if (pluginState.showLinkingToolbar) {
    return [buildEditLinkToolbar({
      providerFactory,
      node
    })];
  } else {
    const toolbarItems = [{
      type: 'button',
      selected: false,
      title: intl.formatMessage(linkToolbarMessages.editLink),
      showTitle: true,
      onClick: editLink
    }, {
      type: 'separator'
    }, {
      type: 'button',
      icon: OpenIcon,
      className: 'hyperlink-open-link',
      title: intl.formatMessage(linkMessages.openLink),
      onClick: visitCardLink
    }, {
      type: 'separator'
    }, generateDeleteButton(node, state, intl)];

    if (currentAppearance === 'embed') {
      toolbarItems.unshift(...buildAlignmentOptions(state, intl), {
        type: 'separator'
      });
    }

    const {
      allowBlockCards,
      allowEmbeds
    } = cardOptions;

    if ((allowBlockCards || allowEmbeds) && currentAppearance) {
      toolbarItems.unshift({
        type: 'custom',
        render: editorView => /*#__PURE__*/React.createElement(LinkToolbarAppearance, {
          key: "link-appearance",
          url: url,
          intl: intl,
          currentAppearance: currentAppearance,
          editorView: editorView,
          editorState: state,
          allowEmbeds: allowEmbeds,
          platform: platform
        })
      }, {
        type: 'separator'
      });
    }

    return toolbarItems;
  }
};

export const floatingToolbar = (cardOptions, platform) => {
  return (state, intl, providerFactory) => {
    const {
      inlineCard,
      blockCard,
      embedCard
    } = state.schema.nodes;
    const nodeType = [inlineCard, blockCard, embedCard];
    const pluginState = pluginKey.getState(state);

    if (!(state.selection instanceof NodeSelection)) {
      return;
    }

    const selectedNode = state.selection.node;

    if (!selectedNode) {
      return;
    }

    const isEmbedCard = appearanceForNodeType(selectedNode.type) === 'embed';
    /* add an offset to embeds due to extra padding */

    const toolbarOffset = isEmbedCard ? {
      offset: [0, 24]
    } : {};
    return {
      title: intl.formatMessage(messages.card),
      nodeType,
      ...toolbarOffset,
      getDomRef: view => {
        const element = findDomRefAtPos(state.selection.from, view.domAtPos.bind(view));

        if (!element) {
          return undefined;
        }

        if (isEmbedCard) {
          return element.querySelector(`.${richMediaClassName}`);
        }

        return element;
      },
      items: generateToolbarItems(state, intl, providerFactory, cardOptions, platform),
      ...(pluginState.showLinkingToolbar ? editLinkToolbarConfig : {})
    };
  };
};