import React from 'react'
import { Plugin } from 'prosemirror-state'
import {
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID
} from '../analytics'
import { analyticsEventKey } from '../analytics/consts'
import { pluginKey } from './plugin-key'
import { searchQuickInsertItems } from './search'
import ModalElementBrowser from './ui/ModalElementBrowser'
export { pluginKey }

const quickInsertPlugin = options => ({
  name: 'quickInsert',

  pmPlugins(quickInsert) {
    return [
      {
        name: 'quickInsert',
        // It's important that this plugin is above TypeAheadPlugin
        plugin: ({ providerFactory, reactContext, dispatch }) =>
          quickInsertPluginFactory(
            quickInsert,
            providerFactory,
            reactContext().intl,
            dispatch
          )
      }
    ]
  },

  pluginsOptions: {
    typeAhead: {
      trigger: '/',
      headless: options ? options.headless : undefined,
      getItems: (
        query,
        state,
        intl,
        { prevActive, queryChanged },
        _tr,
        dispatch
      ) => {
        if (!prevActive && queryChanged) {
          dispatch(analyticsEventKey, {
            payload: {
              action: ACTION.INVOKED,
              actionSubject: ACTION_SUBJECT.TYPEAHEAD,
              actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_QUICK_INSERT,
              attributes: {
                inputMethod: INPUT_METHOD.KEYBOARD
              },
              eventType: EVENT_TYPE.UI
            }
          })
        }

        const quickInsertState = pluginKey.getState(state)
        return searchQuickInsertItems(quickInsertState, options)(query)
      },
      selectItem: (state, item, insert) => {
        return item.action(insert, state)
      }
    }
  },

  contentComponent({ editorView }) {
    if (options && options.enableElementBrowser) {
      return /*#__PURE__*/ React.createElement(ModalElementBrowser, {
        editorView: editorView
      })
    }

    return null
  }
})

export default quickInsertPlugin
const itemsCache = {}
export const processItems = (items, intl) => {
  if (!itemsCache[intl.locale]) {
    itemsCache[intl.locale] = items.reduce((acc, item) => {
      if (typeof item === 'function') {
        return acc.concat(item(intl))
      }

      return acc.concat(item)
    }, [])
  }

  return itemsCache[intl.locale]
}

const setProviderState = providerState => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setMeta(pluginKey, providerState))
  }

  return true
}

function quickInsertPluginFactory(
  quickInsertItems,
  providerFactory,
  intl,
  dispatch
) {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return {
          isElementBrowserModalOpen: false,
          // lazy so it doesn't run on editor initialization
          lazyDefaultItems: () => processItems(quickInsertItems || [], intl)
        }
      },

      apply(tr, pluginState) {
        const meta = tr.getMeta(pluginKey)

        if (meta) {
          const changed = Object.keys(meta).some(key => {
            return pluginState[key] !== meta[key]
          })

          if (changed) {
            const newState = { ...pluginState, ...meta }
            dispatch(pluginKey, newState)
            return newState
          }
        }

        return pluginState
      }
    },

    view(editorView) {
      const providerHandler = async (_name, providerPromise) => {
        if (providerPromise) {
          try {
            const provider = await providerPromise
            const providedItems = await provider.getItems()
            setProviderState({
              provider,
              providedItems
            })(editorView.state, editorView.dispatch)
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error getting items from quick insert provider', e)
          }
        }
      }

      providerFactory.subscribe('quickInsertProvider', providerHandler)
      return {
        destroy() {
          providerFactory.unsubscribe('quickInsertProvider', providerHandler)
        }
      }
    }
  })
}
