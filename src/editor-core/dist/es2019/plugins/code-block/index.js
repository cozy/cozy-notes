import React from 'react';
import { codeBlock } from '@atlaskit/adf-schema';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';
import keymap from './pm-plugins/keymaps';
import ideUX from './pm-plugins/ide-ux';
import { addAnalytics, ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD, EVENT_TYPE } from '../analytics';
import { IconCode } from '../quick-insert/assets';
import { messages } from '../block-type/messages';

const codeBlockPlugin = (options = {}) => ({
  name: 'codeBlock',

  nodes() {
    return [{
      name: 'codeBlock',
      node: codeBlock
    }];
  },

  pmPlugins() {
    return [{
      name: 'codeBlock',
      plugin: () => createPlugin(options.useLongPressSelection)
    }, {
      name: 'codeBlockIDEKeyBindings',
      plugin: () => ideUX
    }, {
      name: 'codeBlockKeyMap',
      plugin: ({
        schema
      }) => keymap(schema)
    }];
  },

  pluginsOptions: {
    quickInsert: ({
      formatMessage
    }) => [{
      id: 'codeblock',
      title: formatMessage(messages.codeblock),
      description: formatMessage(messages.codeblockDescription),
      keywords: ['code block'],
      priority: 700,
      keyshortcut: '```',
      icon: () => /*#__PURE__*/React.createElement(IconCode, {
        label: formatMessage(messages.codeblock)
      }),

      action(insert, state) {
        const schema = state.schema;
        const tr = insert(schema.nodes.codeBlock.createChecked());
        return addAnalytics(state, tr, {
          action: ACTION.INSERTED,
          actionSubject: ACTION_SUBJECT.DOCUMENT,
          actionSubjectId: ACTION_SUBJECT_ID.CODE_BLOCK,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT
          },
          eventType: EVENT_TYPE.TRACK
        });
      }

    }],
    floatingToolbar: getToolbarConfig(options.allowCopyToClipboard)
  }
});

export default codeBlockPlugin;