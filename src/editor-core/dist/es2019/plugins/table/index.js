import React from 'react';
import { tableEditing } from '@atlaskit/editor-tables/pm-plugins';
import { createTable } from '@atlaskit/editor-tables/utils';
import { table, tableCell, tableHeader, tableRow } from '@atlaskit/adf-schema';
import { toggleTable, tooltip } from '../../keymaps';
import WithPluginState from '../../ui/WithPluginState';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, addAnalytics, EVENT_TYPE, INPUT_METHOD } from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconTable } from '../quick-insert/assets';
import { pluginConfig } from './create-plugin-config';
import { createPlugin as createDecorationsPlugin } from './pm-plugins/decorations/plugin';
import { keymapPlugin } from './pm-plugins/keymap';
import { tableSelectionKeymapPlugin } from './pm-plugins/table-selection-keymap';
import { createPlugin } from './pm-plugins/main';
import { getPluginState, pluginKey } from './pm-plugins/plugin-factory';
import { createPlugin as createStickyHeadersPlugin, findStickyHeaderForTable, pluginKey as stickyHeadersPluginKey } from './pm-plugins/sticky-headers';
import { createPlugin as createFlexiResizingPlugin, pluginKey as tableResizingPluginKey } from './pm-plugins/table-resizing';
import { getToolbarConfig } from './toolbar';
import FloatingContextualButton from './ui/FloatingContextualButton';
import FloatingContextualMenu from './ui/FloatingContextualMenu';
import FloatingDeleteButton from './ui/FloatingDeleteButton';
import FloatingInsertButton from './ui/FloatingInsertButton';
import LayoutButton from './ui/LayoutButton';
import { isLayoutSupported } from './utils';

const tablesPlugin = options => ({
  name: 'table',

  nodes() {
    return [{
      name: 'table',
      node: table
    }, {
      name: 'tableHeader',
      node: tableHeader
    }, {
      name: 'tableRow',
      node: tableRow
    }, {
      name: 'tableCell',
      node: tableCell
    }];
  },

  pmPlugins() {
    return [{
      name: 'table',
      plugin: ({
        dispatch,
        portalProviderAPI,
        eventDispatcher
      }) => {
        const {
          dynamicSizingEnabled,
          fullWidthEnabled,
          wasFullWidthEnabled,
          breakoutEnabled,
          tableOptions
        } = options || {};
        return createPlugin(dispatch, portalProviderAPI, eventDispatcher, pluginConfig(tableOptions), breakoutEnabled && dynamicSizingEnabled, breakoutEnabled, fullWidthEnabled, wasFullWidthEnabled);
      }
    }, {
      name: 'tablePMColResizing',
      plugin: ({
        dispatch
      }) => {
        const {
          dynamicSizingEnabled,
          fullWidthEnabled,
          tableOptions
        } = options || {};
        const {
          allowColumnResizing
        } = pluginConfig(tableOptions);
        return allowColumnResizing ? createFlexiResizingPlugin(dispatch, {
          dynamicTextSizing: dynamicSizingEnabled && !fullWidthEnabled,
          lastColumnResizable: !fullWidthEnabled
        }) : undefined;
      }
    }, {
      name: 'tableEditing',
      plugin: () => createDecorationsPlugin()
    }, // Needs to be lower priority than editor-tables.tableEditing
    // plugin as it is currently swallowing backspace events inside tables
    {
      name: 'tableKeymap',
      plugin: () => keymapPlugin()
    }, {
      name: 'tableSelectionKeymap',
      plugin: () => tableSelectionKeymapPlugin()
    }, {
      name: 'tableEditing',
      plugin: () => tableEditing()
    }, {
      name: 'tableStickyHeaders',
      plugin: ({
        dispatch,
        eventDispatcher
      }) => options && options.tableOptions.stickyHeaders ? createStickyHeadersPlugin(dispatch, eventDispatcher) : undefined
    }];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement
  }) {
    return /*#__PURE__*/React.createElement(WithPluginState, {
      plugins: {
        pluginState: pluginKey,
        tableResizingPluginState: tableResizingPluginKey,
        stickyHeadersState: stickyHeadersPluginKey
      },
      render: ({
        stickyHeadersState
      }) => {
        const {
          state
        } = editorView;
        const pluginState = getPluginState(state);
        const resizingPluginState = tableResizingPluginKey.getState(state);
        const isDragging = resizingPluginState && resizingPluginState.dragging;
        const {
          tableNode,
          tablePos,
          targetCellPosition,
          isContextualMenuOpen,
          layout,
          tableRef,
          pluginConfig,
          insertColumnButtonIndex,
          insertRowButtonIndex,
          isHeaderColumnEnabled,
          isHeaderRowEnabled,
          tableWrapperTarget
        } = pluginState || {};
        const allowControls = pluginConfig && pluginConfig.allowControls;
        const stickyHeader = stickyHeadersState ? findStickyHeaderForTable(stickyHeadersState, tablePos) : undefined;
        return /*#__PURE__*/React.createElement(React.Fragment, null, targetCellPosition && tableRef && !isDragging && options && options.allowContextualMenu && /*#__PURE__*/React.createElement(FloatingContextualButton, {
          isNumberColumnEnabled: tableNode && tableNode.attrs.isNumberColumnEnabled,
          editorView: editorView,
          tableNode: tableNode,
          mountPoint: popupsMountPoint,
          targetCellPosition: targetCellPosition,
          scrollableElement: popupsScrollableElement,
          isContextualMenuOpen: isContextualMenuOpen,
          layout: layout,
          stickyHeader: stickyHeader
        }), allowControls && /*#__PURE__*/React.createElement(FloatingInsertButton, {
          tableNode: tableNode,
          tableRef: tableRef,
          insertColumnButtonIndex: insertColumnButtonIndex,
          insertRowButtonIndex: insertRowButtonIndex,
          isHeaderColumnEnabled: isHeaderColumnEnabled,
          isHeaderRowEnabled: isHeaderRowEnabled,
          editorView: editorView,
          mountPoint: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          scrollableElement: popupsScrollableElement,
          hasStickyHeaders: stickyHeader && stickyHeader.sticky
        }), /*#__PURE__*/React.createElement(FloatingContextualMenu, {
          editorView: editorView,
          mountPoint: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          targetCellPosition: targetCellPosition,
          isOpen: Boolean(isContextualMenuOpen),
          pluginConfig: pluginConfig
        }), allowControls && /*#__PURE__*/React.createElement(FloatingDeleteButton, {
          editorView: editorView,
          selection: editorView.state.selection,
          tableRef: tableRef,
          mountPoint: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          scrollableElement: popupsScrollableElement,
          stickyHeaders: stickyHeader,
          isNumberColumnEnabled: tableNode && tableNode.attrs.isNumberColumnEnabled
        }), isLayoutSupported(state) && options && options.breakoutEnabled && /*#__PURE__*/React.createElement(LayoutButton, {
          editorView: editorView,
          mountPoint: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          scrollableElement: popupsScrollableElement,
          targetRef: tableWrapperTarget,
          layout: layout,
          isResizing: !!resizingPluginState && !!resizingPluginState.dragging
        }));
      }
    });
  },

  pluginsOptions: {
    quickInsert: ({
      formatMessage
    }) => [{
      id: 'table',
      title: formatMessage(messages.table),
      description: formatMessage(messages.tableDescription),
      keywords: ['cell'],
      priority: 600,
      keyshortcut: tooltip(toggleTable),
      icon: () => /*#__PURE__*/React.createElement(IconTable, {
        label: formatMessage(messages.table)
      }),

      action(insert, state) {
        const tr = insert(createTable(state.schema));
        return addAnalytics(state, tr, {
          action: ACTION.INSERTED,
          actionSubject: ACTION_SUBJECT.DOCUMENT,
          actionSubjectId: ACTION_SUBJECT_ID.TABLE,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT
          },
          eventType: EVENT_TYPE.TRACK
        });
      }

    }],
    floatingToolbar: getToolbarConfig
  }
});

export default tablesPlugin;