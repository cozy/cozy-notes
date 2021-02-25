import React from 'react';
import memoizeOne from 'memoize-one';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import TableIcon from '@atlaskit/icon/glyph/editor/table';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import DateIcon from '@atlaskit/icon/glyph/editor/date';
import StatusIcon from '@atlaskit/icon/glyph/status';
import ExpandNodeIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import PlaceholderTextIcon from '@atlaskit/icon/glyph/media-services/text';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import HorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import CodeIcon from '@atlaskit/icon/glyph/editor/code';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import { Shortcut } from '../../../../ui/styles';
import { tooltip, addLink, toggleTable } from '../../../../keymaps';
import { shallowEquals } from './shallow-equals';

const from = init => ({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  value: {
    name: init.name
  },
  elemBefore: /*#__PURE__*/React.createElement(init.Icon, {
    label: init.content
  }),
  elemAfter: init.shortcut ? /*#__PURE__*/React.createElement(Shortcut, null, init.shortcut) : undefined,
  shortcut: init.shortcut,
  isDisabled: init.disabled
});

const mem = fn => memoizeOne(fn, shallowEquals);

export const action = mem(init => {
  return from({
    content: init.content,
    tooltipDescription: init.tooltipDescription,
    disabled: init.disabled,
    name: 'action',
    shortcut: '[]',
    Icon: TaskIcon
  });
});
export const link = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'link',
  shortcut: tooltip(addLink),
  Icon: LinkIcon
}));
export const media = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'media',
  Icon: EditorImageIcon
}));
export const imageUpload = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'image upload',
  Icon: EditorImageIcon
}));
export const mention = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'mention',
  Icon: MentionIcon,
  shortcut: '@'
}));
export const emoji = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'emoji',
  Icon: EmojiIcon,
  shortcut: ':'
}));
export const table = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'table',
  Icon: TableIcon,
  shortcut: tooltip(toggleTable)
}));
export const layout = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'layout',
  Icon: LayoutTwoEqualIcon
}));
export const codeblock = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'codeblock',
  Icon: CodeIcon,
  shortcut: init.shortcut
}));
export const panel = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'panel',
  Icon: InfoIcon,
  shortcut: init.shortcut
}));
export const blockquote = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'blockquote',
  Icon: QuoteIcon,
  shortcut: init.shortcut
}));
export const decision = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'decision',
  Icon: DecisionIcon,
  shortcut: '<>'
}));
export const horizontalrule = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'horizontalrule',
  Icon: HorizontalRuleIcon,
  shortcut: '---'
}));
export const expand = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'expand',
  Icon: ExpandNodeIcon
}));
export const date = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'date',
  Icon: DateIcon,
  shortcut: '//'
}));
export const placeholder = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'placeholder text',
  Icon: PlaceholderTextIcon
}));
export const status = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'status',
  Icon: StatusIcon
}));
export const more = mem(init => from({
  content: init.content,
  tooltipDescription: init.tooltipDescription,
  disabled: init.disabled,
  name: 'macro',
  Icon: EditorMoreIcon
}));