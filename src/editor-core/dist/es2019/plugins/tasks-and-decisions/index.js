import React from 'react';
import styled from 'styled-components';
import { decisionItem, decisionList, taskItem, taskList } from '@atlaskit/adf-schema';
import { INPUT_METHOD } from '../analytics';
import { messages as insertBlockMessages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconAction, IconDecision } from '../quick-insert/assets';
import { getListTypes, insertTaskDecisionWithAnalytics } from './commands';
import inputRulePlugin from './pm-plugins/input-rules';
import keymap from './pm-plugins/keymaps';
import { createPlugin } from './pm-plugins/main';
import ToolbarDecision from './ui/ToolbarDecision';
import ToolbarTask from './ui/ToolbarTask';
const TaskDecisionToolbarGroup = styled.div`
  display: flex;
`;

const quickInsertItem = (insert, state, listType) => {
  const {
    list,
    item
  } = getListTypes(listType, state.schema);

  const addItem = ({
    listLocalId,
    itemLocalId
  }) => insert(list.createChecked({
    localId: listLocalId
  }, item.createChecked({
    localId: itemLocalId
  })));

  return insertTaskDecisionWithAnalytics(state, listType, INPUT_METHOD.QUICK_INSERT, addItem);
};

const tasksAndDecisionsPlugin = ({
  allowNestedTasks,
  consumeTabs,
  useLongPressSelection
} = {}) => ({
  name: 'taskDecision',

  nodes() {
    return [{
      name: 'decisionList',
      node: decisionList
    }, {
      name: 'decisionItem',
      node: decisionItem
    }, {
      name: 'taskList',
      node: taskList
    }, {
      name: 'taskItem',
      node: taskItem
    }];
  },

  pmPlugins() {
    return [{
      name: 'tasksAndDecisions',
      plugin: ({
        portalProviderAPI,
        providerFactory,
        eventDispatcher,
        dispatch
      }) => {
        return createPlugin(portalProviderAPI, eventDispatcher, providerFactory, dispatch, useLongPressSelection);
      }
    }, {
      name: 'tasksAndDecisionsInputRule',
      plugin: ({
        schema
      }) => inputRulePlugin(schema)
    }, {
      name: 'tasksAndDecisionsKeyMap',
      plugin: ({
        schema
      }) => keymap(schema, allowNestedTasks, consumeTabs)
    } // Needs to be after "save-on-enter"
    ];
  },

  secondaryToolbarComponent({
    editorView,
    disabled
  }) {
    return /*#__PURE__*/React.createElement(TaskDecisionToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarDecision, {
      editorView: editorView,
      isDisabled: disabled,
      isReducedSpacing: true
    }), /*#__PURE__*/React.createElement(ToolbarTask, {
      editorView: editorView,
      isDisabled: disabled,
      isReducedSpacing: true
    }));
  },

  pluginsOptions: {
    quickInsert: ({
      formatMessage
    }) => [{
      id: 'action',
      title: formatMessage(insertBlockMessages.action),
      description: formatMessage(insertBlockMessages.actionDescription),
      priority: 100,
      keywords: ['checkbox', 'task', 'todo'],
      keyshortcut: '[]',
      icon: () => /*#__PURE__*/React.createElement(IconAction, {
        label: formatMessage(insertBlockMessages.action)
      }),

      action(insert, state) {
        return quickInsertItem(insert, state, 'taskList');
      }

    }, {
      id: 'decision',
      title: formatMessage(insertBlockMessages.decision),
      description: formatMessage(insertBlockMessages.decisionDescription),
      priority: 900,
      keyshortcut: '<>',
      icon: () => /*#__PURE__*/React.createElement(IconDecision, {
        label: formatMessage(insertBlockMessages.decision)
      }),

      action(insert, state) {
        return quickInsertItem(insert, state, 'decisionList');
      }

    }]
  }
});

export default tasksAndDecisionsPlugin;