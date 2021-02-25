import React from 'react';
import { Plugin, PluginKey } from 'prosemirror-state';
import { emoji } from '@atlaskit/adf-schema';
import { EmojiTypeAheadItem, SearchSort, recordSelectionSucceededSli, recordSelectionFailedSli } from '@atlaskit/emoji';
import { inputRulePlugin as asciiInputRulePlugin } from './pm-plugins/ascii-input-rules';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, addAnalytics, EVENT_TYPE, INPUT_METHOD } from '../analytics';
import { IconEmoji } from '../quick-insert/assets';
import emojiNodeView from './nodeviews/emoji';
import { EmojiContextProvider } from './ui/EmojiContextProvider';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
export const emojiToTypeaheadItem = (emoji, emojiProvider) => ({
  title: emoji.shortName || '',
  key: emoji.id || emoji.shortName,

  render({
    isSelected,
    onClick,
    onHover
  }) {
    return (
      /*#__PURE__*/
      // It's required to pass emojiProvider through the context for custom emojis to work
      React.createElement(EmojiContextProvider, {
        emojiProvider: emojiProvider
      }, /*#__PURE__*/React.createElement(EmojiTypeAheadItem, {
        emoji: emoji,
        selected: isSelected,
        onMouseMove: onHover,
        onSelection: onClick
      }))
    );
  },

  emoji
});
export function memoize(fn) {
  // Cache results here
  const seen = new Map();

  function memoized(emoji, emojiProvider) {
    // Check cache for hits
    const hit = seen.get(emoji.id || emoji.shortName);

    if (hit) {
      return hit;
    } // Generate new result and cache it


    const result = fn(emoji, emojiProvider);
    seen.set(emoji.id || emoji.shortName, result);
    return result;
  }

  return {
    call: memoized,
    clear: seen.clear.bind(seen)
  };
}
const memoizedToItem = memoize(emojiToTypeaheadItem);
export const defaultListLimit = 50;

const isFullShortName = query => query && query.length > 1 && query.charAt(0) === ':' && query.charAt(query.length - 1) === ':';

const emojiPlugin = options => ({
  name: 'emoji',

  nodes() {
    return [{
      name: 'emoji',
      node: emoji
    }];
  },

  pmPlugins() {
    return [{
      name: 'emoji',
      plugin: ({
        providerFactory,
        dispatch,
        portalProviderAPI,
        eventDispatcher
      }) => emojiPluginFactory(dispatch, providerFactory, portalProviderAPI, eventDispatcher, options)
    }, {
      name: 'emojiAsciiInputRule',
      plugin: ({
        schema,
        providerFactory
      }) => asciiInputRulePlugin(schema, providerFactory)
    }];
  },

  pluginsOptions: {
    quickInsert: ({
      formatMessage
    }) => [{
      id: 'emoji',
      title: formatMessage(messages.emoji),
      description: formatMessage(messages.emojiDescription),
      priority: 500,
      keyshortcut: ':',
      icon: () => /*#__PURE__*/React.createElement(IconEmoji, {
        label: formatMessage(messages.emoji)
      }),

      action(insert, state) {
        const mark = state.schema.mark('typeAheadQuery', {
          trigger: ':'
        });
        const emojiText = state.schema.text(':', [mark]);
        const tr = insert(emojiText);
        return addAnalytics(state, tr, {
          action: ACTION.INVOKED,
          actionSubject: ACTION_SUBJECT.TYPEAHEAD,
          actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
          attributes: {
            inputMethod: INPUT_METHOD.QUICK_INSERT
          },
          eventType: EVENT_TYPE.UI
        });
      }

    }],
    typeAhead: {
      trigger: ':',
      // Custom regex must have a capture group around trigger
      // so it's possible to use it without needing to scan through all triggers again
      customRegex: '\\(?(:)',
      headless: options ? options.headless : undefined,

      getItems(query, state, _intl, {
        prevActive,
        queryChanged
      }) {
        const pluginState = getEmojiPluginState(state);
        const {
          emojiProvider,
          emojis: pluginEmojis
        } = pluginState;
        const emojis = !prevActive && queryChanged ? [] : pluginEmojis || [];

        if (queryChanged && emojiProvider) {
          memoizedToItem.clear();
          emojiProvider.filter(query ? `:${query}` : '', {
            limit: defaultListLimit,
            skinTone: emojiProvider.getSelectedTone(),
            sort: !query.length ? SearchSort.UsageFrequency : SearchSort.Default
          });
        }

        return emojis.map(emoji => memoizedToItem.call(emoji, emojiProvider));
      },

      forceSelect(query, items) {
        const normalizedQuery = ':' + query;
        return !!isFullShortName(normalizedQuery) && !!items.find(item => item.title.toLowerCase() === normalizedQuery);
      },

      selectItem(state, item, insert, {
        mode
      }) {
        const {
          id = '',
          fallback,
          shortName
        } = item.emoji;
        const text = fallback || shortName;
        const emojiPluginState = emojiPluginKey.getState(state);

        if (emojiPluginState.emojiProvider && emojiPluginState.emojiProvider.recordSelection && item.emoji) {
          emojiPluginState.emojiProvider.recordSelection(item.emoji).then(recordSelectionSucceededSli(options)).catch(recordSelectionFailedSli(options));
        }

        return addAnalytics(state, insert(state.schema.nodes.emoji.createChecked({
          shortName,
          id,
          text
        })), {
          action: ACTION.INSERTED,
          actionSubject: ACTION_SUBJECT.DOCUMENT,
          actionSubjectId: ACTION_SUBJECT_ID.EMOJI,
          attributes: {
            inputMethod: INPUT_METHOD.TYPEAHEAD
          },
          eventType: EVENT_TYPE.TRACK
        });
      }

    }
  }
});

export default emojiPlugin;
/**
 * Actions
 */

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS'
};
export const setProvider = provider => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setMeta(emojiPluginKey, {
      action: ACTIONS.SET_PROVIDER,
      params: {
        provider
      }
    }));
  }

  return true;
};
export const setResults = results => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.setMeta(emojiPluginKey, {
      action: ACTIONS.SET_RESULTS,
      params: {
        results
      }
    }));
  }

  return true;
};
export const emojiPluginKey = new PluginKey('emojiPlugin');
export function getEmojiPluginState(state) {
  return emojiPluginKey.getState(state) || {};
}
export function emojiPluginFactory(dispatch, providerFactory, portalProviderAPI, eventDispatcher, options) {
  let emojiProvider;
  let emojiProviderChangeHandler;
  return new Plugin({
    key: emojiPluginKey,
    state: {
      init() {
        return {};
      },

      apply(tr, pluginState) {
        const {
          action,
          params
        } = tr.getMeta(emojiPluginKey) || {
          action: null,
          params: null
        };
        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = { ...pluginState,
              emojiProvider: params.provider
            };
            dispatch(emojiPluginKey, newPluginState);
            return newPluginState;

          case ACTIONS.SET_RESULTS:
            newPluginState = { ...pluginState,
              emojis: params.results.emojis
            };
            dispatch(emojiPluginKey, newPluginState);
            return newPluginState;
        }

        return newPluginState;
      }

    },
    props: {
      nodeViews: {
        emoji: emojiNodeView(portalProviderAPI, eventDispatcher, providerFactory, options)
      }
    },

    view(editorView) {
      const providerHandler = (name, providerPromise) => {
        switch (name) {
          case 'emojiProvider':
            if (!providerPromise) {
              return setProvider(undefined)(editorView.state, editorView.dispatch);
            }

            providerPromise.then(provider => {
              if (emojiProvider && emojiProviderChangeHandler) {
                emojiProvider.unsubscribe(emojiProviderChangeHandler);
              }

              emojiProvider = provider;
              setProvider(provider)(editorView.state, editorView.dispatch);
              emojiProviderChangeHandler = {
                result(emojis) {
                  // Emoji provider is synchronous and
                  // we need to make it async here to make PM happy
                  Promise.resolve().then(() => {
                    setResults(emojis)(editorView.state, editorView.dispatch);
                  });
                }

              };
              provider.subscribe(emojiProviderChangeHandler);
            }).catch(() => setProvider(undefined)(editorView.state, editorView.dispatch));
            break;
        }

        return;
      };

      providerFactory.subscribe('emojiProvider', providerHandler);
      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('emojiProvider', providerHandler);
          }

          if (emojiProvider && emojiProviderChangeHandler) {
            emojiProvider.unsubscribe(emojiProviderChangeHandler);
          }
        }

      };
    }

  });
}