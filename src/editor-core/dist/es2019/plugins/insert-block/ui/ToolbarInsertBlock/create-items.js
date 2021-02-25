import React from 'react';
import memoize from 'lodash/memoize';
import memoizeOne from 'memoize-one';
import { messages } from './messages';
import { messages as blockTypeMessages } from '../../../block-type/messages';
import { ToolTipContent } from '../../../../keymaps';
import { sortItems } from './sort-items';
import { action, link, media, mention, emoji, table, layout, codeblock, panel, blockquote, decision, horizontalrule, expand, date, placeholder, status, more, imageUpload } from './item';
import { shallowEquals } from './shallow-equals';
const buttonToItem = memoize(button => ({ ...button,
  title: /*#__PURE__*/React.createElement(ToolTipContent, {
    description: button.content,
    shortcutOverride: button.shortcut
  })
}));
const buttonToDropdownItem = memoizeOne(title => memoize(button => ({ ...button,
  title: /*#__PURE__*/React.createElement(ToolTipContent, {
    description: title,
    shortcutOverride: "/"
  })
})));

const createInsertBlockItems = config => {
  const {
    isTypeAheadAllowed,
    tableSupported,
    mediaUploadsEnabled,
    mediaSupported,
    imageUploadSupported,
    imageUploadEnabled,
    mentionsSupported,
    availableWrapperBlockTypes,
    actionSupported,
    decisionSupported,
    showElementBrowserLink,
    linkSupported,
    linkDisabled,
    emojiDisabled,
    emojiProvider,
    nativeStatusSupported,
    insertMenuItems,
    dateEnabled,
    placeholderTextEnabled,
    horizontalRuleEnabled,
    layoutSectionEnabled,
    expandEnabled,
    numberOfButtons,
    schema,
    formatMessage,
    isNewMenuEnabled
  } = config;
  const items = [];

  if (actionSupported) {
    items.push(action({
      content: formatMessage(messages.action),
      tooltipDescription: formatMessage(messages.actionDescription),
      disabled: false
    }));
  }

  if (linkSupported) {
    items.push(link({
      content: formatMessage(messages.link),
      tooltipDescription: formatMessage(messages.linkDescription),
      disabled: !!linkDisabled
    }));
  }

  if (mediaSupported && mediaUploadsEnabled) {
    items.push(media({
      content: formatMessage(messages.filesAndImages),
      tooltipDescription: formatMessage(messages.filesAndImagesDescription),
      disabled: false
    }));
  }

  if (imageUploadSupported) {
    items.push(imageUpload({
      content: formatMessage(messages.image),
      disabled: !imageUploadEnabled
    }));
  }

  if (mentionsSupported) {
    items.push(mention({
      content: formatMessage(messages.mention),
      tooltipDescription: formatMessage(messages.mentionDescription),
      disabled: !isTypeAheadAllowed
    }));
  }

  if (emojiProvider) {
    items.push(emoji({
      content: formatMessage(messages.emoji),
      tooltipDescription: formatMessage(messages.emojiDescription),
      disabled: emojiDisabled || !isTypeAheadAllowed
    }));
  }

  if (tableSupported) {
    items.push(table({
      content: formatMessage(messages.table),
      tooltipDescription: formatMessage(messages.tableDescription),
      disabled: false
    }));
  }

  if (layoutSectionEnabled) {
    const labelColumns = formatMessage(messages.columns);
    items.push(layout({
      content: labelColumns,
      tooltipDescription: formatMessage(messages.columnsDescription),
      disabled: false
    }));
  }

  const blockTypes = availableWrapperBlockTypes || [];
  const codeblockData = blockTypes.find(type => type.name === 'codeblock');
  const panelData = blockTypes.find(type => type.name === 'panel');
  const blockquoteData = blockTypes.find(type => type.name === 'blockquote');

  if (codeblockData) {
    items.push(codeblock({
      content: formatMessage(codeblockData.title),
      tooltipDescription: formatMessage(blockTypeMessages.codeblockDescription),
      disabled: false,
      shortcut: '```'
    }));
  }

  if (panelData) {
    items.push(panel({
      content: formatMessage(panelData.title),
      tooltipDescription: formatMessage(blockTypeMessages.infoPanelDescription),
      disabled: false
    }));
  }

  if (blockquoteData) {
    items.push(blockquote({
      content: formatMessage(blockquoteData.title),
      tooltipDescription: formatMessage(blockTypeMessages.blockquoteDescription),
      disabled: false,
      shortcut: '>'
    }));
  }

  if (decisionSupported) {
    items.push(decision({
      content: formatMessage(messages.decision),
      tooltipDescription: formatMessage(messages.decisionDescription),
      disabled: false
    }));
  }

  if (horizontalRuleEnabled && schema.nodes.rule) {
    items.push(horizontalrule({
      content: formatMessage(messages.horizontalRule),
      tooltipDescription: formatMessage(messages.horizontalRuleDescription),
      disabled: false
    }));
  }

  if (expandEnabled && schema.nodes.expand) {
    items.push(expand({
      content: formatMessage(messages.expand),
      tooltipDescription: formatMessage(messages.expandDescription),
      disabled: false
    }));
  }

  if (dateEnabled) {
    const labelDate = formatMessage(messages.date);
    items.push(date({
      content: labelDate,
      tooltipDescription: formatMessage(messages.dateDescription),
      disabled: false
    }));
  }

  if (placeholderTextEnabled) {
    items.push(placeholder({
      content: formatMessage(messages.placeholderText),
      disabled: false
    }));
  }

  if (nativeStatusSupported) {
    const labelStatus = formatMessage(messages.status);
    items.push(status({
      content: labelStatus,
      tooltipDescription: formatMessage(messages.statusDescription),
      disabled: false
    }));
  }

  if (insertMenuItems) {
    items.push(...insertMenuItems);
  }

  if (showElementBrowserLink) {
    items.push(more({
      content: formatMessage(messages.viewMore),
      disabled: false
    }));
  }

  const buttonItems = items.slice(0, numberOfButtons).map(buttonToItem);
  const remainingItems = items.slice(numberOfButtons);
  const dropdownItems = (!isNewMenuEnabled ? sortItems(remainingItems) : remainingItems).map(buttonToDropdownItem(formatMessage(messages.insertMenu)));
  return [buttonItems, dropdownItems];
};

export const createItems = memoizeOne(createInsertBlockItems, shallowEquals);