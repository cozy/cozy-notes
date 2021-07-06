import React from 'react'
import { findDomRefAtPos } from 'prosemirror-utils'
import Loadable from 'react-loadable'
import { date } from '@atlaskit/adf-schema'
import WithPluginState from '../../ui/WithPluginState'
import {
  insertDate,
  closeDatePicker,
  closeDatePickerWithAnalytics,
  createDate,
  deleteDate
} from './actions'
import createDatePlugin from './pm-plugins/main'
import keymap from './pm-plugins/keymap'
import { getFeatureFlags } from '../feature-flags-context'
import { pluginKey as editorDisabledPluginKey } from '../editor-disabled'
import { IconDate } from '../quick-insert/assets'
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD
} from '../analytics'
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages'
import { pluginKey as datePluginKey } from './pm-plugins/plugin-key'
const DatePicker = Loadable({
  loader: () =>
    import(
      /* webpackChunkName:"@atlaskit-internal-editor-datepicker" */
      './ui/DatePicker'
    ),
  loading: () => null
})

const datePlugin = () => ({
  name: 'date',

  nodes() {
    return [
      {
        name: 'date',
        node: date
      }
    ]
  },

  pmPlugins() {
    return [
      {
        name: 'date',
        plugin: options => {
          DatePicker.preload()
          return createDatePlugin(options)
        }
      },
      {
        name: 'dateKeymap',
        plugin: () => {
          DatePicker.preload()
          return keymap()
        }
      }
    ]
  },

  contentComponent({
    editorView,
    dispatchAnalyticsEvent,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement
  }) {
    const { state, dispatch } = editorView
    const domAtPos = editorView.domAtPos.bind(editorView)
    return /*#__PURE__*/ React.createElement(WithPluginState, {
      plugins: {
        datePlugin: datePluginKey,
        editorDisabledPlugin: editorDisabledPluginKey
      },
      render: ({ editorDisabledPlugin, datePlugin }) => {
        const { showDatePickerAt, isNew, focusDateInput } = datePlugin

        if (!showDatePickerAt || (editorDisabledPlugin || {}).editorDisabled) {
          return null
        }

        const element = findDomRefAtPos(showDatePickerAt, domAtPos)
        const allFlags = getFeatureFlags(state)
        const { keyboardAccessibleDatepicker } = allFlags
        return /*#__PURE__*/ React.createElement(DatePicker, {
          mountTo: popupsMountPoint,
          boundariesElement: popupsBoundariesElement,
          scrollableElement: popupsScrollableElement,
          key: showDatePickerAt,
          showTextField: keyboardAccessibleDatepicker,
          element: element,
          isNew: isNew,
          autoFocus: focusDateInput,
          onDelete: () => {
            deleteDate()(editorView.state, dispatch)
            editorView.focus()
            return
          },
          onSelect: (date, commitMethod) => {
            // Undefined means couldn't parse date, null means invalid (out of bounds) date
            if (date === undefined || date === null) {
              return
            }

            insertDate(
              date,
              undefined,
              commitMethod
            )(editorView.state, dispatch)
            editorView.focus()
          },
          onTextChanged: date => {
            insertDate(
              date,
              undefined,
              undefined,
              false
            )(editorView.state, dispatch)
          },
          closeDatePicker: () => {
            closeDatePicker()(editorView.state, dispatch)
            editorView.focus()
          },
          closeDatePickerWithAnalytics: ({ date }) => {
            closeDatePickerWithAnalytics({
              date
            })(editorView.state, dispatch)
            editorView.focus()
          },
          dispatchAnalyticsEvent: dispatchAnalyticsEvent
        })
      }
    })
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        id: 'date',
        title: formatMessage(messages.date),
        description: formatMessage(messages.dateDescription),
        priority: 800,
        keywords: ['calendar', 'day', 'time', 'today', '/'],
        keyshortcut: '//',
        icon: () =>
          /*#__PURE__*/ React.createElement(IconDate, {
            label: formatMessage(messages.date)
          }),

        action(insert, state) {
          const tr = createDate()(insert, state)
          addAnalytics(state, tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.DATE,
            eventType: EVENT_TYPE.TRACK,
            attributes: {
              inputMethod: INPUT_METHOD.QUICK_INSERT
            }
          })
          return tr
        }
      }
    ]
  }
})

export default datePlugin
