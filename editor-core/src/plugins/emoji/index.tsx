import React from 'react';
import { EditorState, Plugin, PluginKey, StateField } from 'prosemirror-state';
import { emoji } from '@atlaskit/adf-schema';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import {
  EmojiDescription,
  EmojiProvider,
  EmojiTypeAheadItem,
  SearchSort,
  recordSelectionSucceededSli,
  recordSelectionFailedSli,
} from '@atlaskit/emoji';
import { Command, EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { inputRulePlugin as asciiInputRulePlugin } from './pm-plugins/ascii-input-rules';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { IconEmoji } from '../quick-insert/assets';
import emojiNodeView from './nodeviews/emoji';
import emojiNodeViewNext from './nodeviews/emoji-next';
import { TypeAheadItem } from '../type-ahead/types';
import { EmojiContextProvider } from './ui/EmojiContextProvider';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { EmojiPluginOptions, EmojiPluginState } from './types';
import { EventDispatcher } from '../../event-dispatcher';
import { getFeatureFlags } from '../feature-flags-context';

export const emojiToTypeaheadItem = (
  emoji: EmojiDescription,
  emojiProvider?: EmojiProvider,
): TypeAheadItem => ({
  title: emoji.shortName || '',
  key: emoji.id || emoji.shortName,
  render({ isSelected, onClick, onHover }) {
    return (
      // It's required to pass emojiProvider through the context for custom emojis to work
      <EmojiContextProvider emojiProvider={emojiProvider}>
        <EmojiTypeAheadItem
          emoji={emoji}
          selected={isSelected}
          onMouseMove={onHover}
          onSelection={onClick}
        />
      </EmojiContextProvider>
    );
  },
  emoji,
});

export function memoize<
  ResultFn extends (
    emoji: EmojiDescription,
    emojiProvider?: EmojiProvider,
  ) => TypeAheadItem
>(fn: ResultFn): { call: ResultFn; clear(): void } {
  // Cache results here
  const seen = new Map<string, TypeAheadItem>();

  function memoized(
    emoji: EmojiDescription,
    emojiProvider?: EmojiProvider,
  ): TypeAheadItem {
    // Check cache for hits
    const hit = seen.get(emoji.id || emoji.shortName);

    if (hit) {
      return hit;
    }

    // Generate new result and cache it
    const result = fn(emoji, emojiProvider);
    seen.set(emoji.id || emoji.shortName, result);
    return result;
  }

  return {
    call: memoized as ResultFn,
    clear: seen.clear.bind(seen),
  };
}
const memoizedToItem = memoize(emojiToTypeaheadItem);

export const defaultListLimit = 50;
const isFullShortName = (query?: string) =>
  query &&
  query.length > 1 &&
  query.charAt(0) === ':' &&
  query.charAt(query.length - 1) === ':';

const emojiPlugin = (options?: EmojiPluginOptions): EditorPlugin => ({
  name: 'emoji',

  nodes() {
    return [{ name: 'emoji', node: emoji }];
  },

  pmPlugins() {
    return [
      {
        name: 'emoji',
        plugin: ({
          providerFactory,
          dispatch,
          portalProviderAPI,
          eventDispatcher,
        }) =>
          emojiPluginFactory(
            dispatch,
            providerFactory,
            portalProviderAPI,
            eventDispatcher,
            options,
          ),
      },
      {
        name: 'emojiAsciiInputRule',
        plugin: ({ schema, providerFactory, featureFlags }) =>
          asciiInputRulePlugin(schema, providerFactory, featureFlags),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        id: 'emoji',
        title: formatMessage(messages.emoji),
        description: formatMessage(messages.emojiDescription),
        priority: 500,
        keyshortcut: ':',
        icon: () => <IconEmoji />,
        action(insert, state) {
          const mark = state.schema.mark('typeAheadQuery', {
            trigger: ':',
          });
          const emojiText = state.schema.text(':', [mark]);
          const tr = insert(emojiText);
          return addAnalytics(state, tr, {
            action: ACTION.INVOKED,
            actionSubject: ACTION_SUBJECT.TYPEAHEAD,
            actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],
    typeAhead: {
      trigger: ':',
      // Custom regex must have a capture group around trigger
      // so it's possible to use it without needing to scan through all triggers again
      customRegex: '\\(?(:)',
      headless: options ? options.headless : undefined,
      getItems(query, state, _intl, { prevActive, queryChanged }) {
        const pluginState = getEmojiPluginState(state);
        const { emojiProvider, emojis: pluginEmojis } = pluginState;
        const emojis = !prevActive && queryChanged ? [] : pluginEmojis || [];

        if (queryChanged && emojiProvider) {
          memoizedToItem.clear();
          emojiProvider.filter(query ? `:${query}` : '', {
            limit: defaultListLimit,
            skinTone: emojiProvider.getSelectedTone(),
            sort: !query.length
              ? SearchSort.UsageFrequency
              : SearchSort.Default,
          });
        }

        return emojis.map((emoji) => memoizedToItem.call(emoji, emojiProvider));
      },
      forceSelect(query: string, items: Array<TypeAheadItem>) {
        const normalizedQuery = ':' + query;
        const matchedItem = isFullShortName(normalizedQuery)
          ? items.find((item) => item.title.toLowerCase() === normalizedQuery)
          : undefined;
        return matchedItem;
      },
      selectItem(state, item, insert, { mode }) {
        const { id = '', fallback, shortName } = item.emoji;
        const text = fallback || shortName;
        const emojiPluginState = emojiPluginKey.getState(
          state,
        ) as EmojiPluginState;

        if (
          emojiPluginState.emojiProvider &&
          emojiPluginState.emojiProvider.recordSelection &&
          item.emoji
        ) {
          emojiPluginState.emojiProvider
            .recordSelection(item.emoji)
            .then(recordSelectionSucceededSli(options))
            .catch(recordSelectionFailedSli(options));
        }

        return addAnalytics(
          state,
          insert(
            state.schema.nodes.emoji.createChecked({
              shortName,
              id,
              text,
            }),
          ),
          {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.EMOJI,
            attributes: { inputMethod: INPUT_METHOD.TYPEAHEAD },
            eventType: EVENT_TYPE.TRACK,
          },
        );
      },
    },
  },
});

export default emojiPlugin;

/**
 * Actions
 */

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS',
};

export const setProvider = (provider?: EmojiProvider): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(emojiPluginKey, {
        action: ACTIONS.SET_PROVIDER,
        params: { provider },
      }),
    );
  }
  return true;
};

export const setResults = (results: {
  emojis: Array<EmojiDescription>;
}): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(emojiPluginKey, {
        action: ACTIONS.SET_RESULTS,
        params: { results },
      }),
    );
  }
  return true;
};

export const emojiPluginKey = new PluginKey<EmojiPluginState>('emojiPlugin');

export function getEmojiPluginState(state: EditorState) {
  return (emojiPluginKey.getState(state) || {}) as EmojiPluginState;
}

export function emojiPluginFactory(
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  options?: EmojiPluginOptions,
) {
  let emojiProvider: EmojiProvider;
  let emojiProviderChangeHandler: {
    result(res: { emojis: Array<EmojiDescription> }): void;
  };

  return new Plugin({
    key: emojiPluginKey,
    state: {
      init() {
        return {};
      },
      apply(tr, pluginState) {
        const { action, params } = tr.getMeta(emojiPluginKey) || {
          action: null,
          params: null,
        };

        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = {
              ...pluginState,
              emojiProvider: params.provider,
            };
            dispatch(emojiPluginKey, newPluginState);
            return newPluginState;

          case ACTIONS.SET_RESULTS:
            newPluginState = {
              ...pluginState,
              emojis: params.results.emojis,
            };
            dispatch(emojiPluginKey, newPluginState);
            return newPluginState;
        }

        return newPluginState;
      },
    } as StateField<EmojiPluginState>,
    props: {
      nodeViews: {
        emoji(node, view, getPos) {
          const featureFlags = getFeatureFlags(view.state);
          const createEmojiNodeView = featureFlags?.nextEmojiNodeView
            ? emojiNodeViewNext(providerFactory, options)
            : emojiNodeView(
                portalProviderAPI,
                eventDispatcher,
                providerFactory,
                options,
              );
          return createEmojiNodeView(node, view, getPos);
        },
      },
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<EmojiProvider>,
      ) => {
        switch (name) {
          case 'emojiProvider':
            if (!providerPromise) {
              return setProvider(undefined)(
                editorView.state,
                editorView.dispatch,
              );
            }

            providerPromise
              .then((provider) => {
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
                  },
                };
                provider.subscribe(emojiProviderChangeHandler);
              })
              .catch(() =>
                setProvider(undefined)(editorView.state, editorView.dispatch),
              );
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
        },
      };
    },
  });
}
