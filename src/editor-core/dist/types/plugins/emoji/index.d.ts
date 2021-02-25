import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EmojiDescription, EmojiProvider } from '@atlaskit/emoji';
import { Command, EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { TypeAheadItem } from '../type-ahead/types';
import { EmojiPluginOptions, EmojiPluginState } from './types';
import { EventDispatcher } from '../../event-dispatcher';
export declare const emojiToTypeaheadItem: (emoji: EmojiDescription, emojiProvider?: EmojiProvider | undefined) => TypeAheadItem;
export declare function memoize<ResultFn extends (emoji: EmojiDescription, emojiProvider?: EmojiProvider) => TypeAheadItem>(fn: ResultFn): {
    call: ResultFn;
    clear(): void;
};
export declare const defaultListLimit = 50;
declare const emojiPlugin: (options?: EmojiPluginOptions | undefined) => EditorPlugin;
export default emojiPlugin;
/**
 * Actions
 */
export declare const ACTIONS: {
    SET_PROVIDER: string;
    SET_RESULTS: string;
};
export declare const setProvider: (provider?: EmojiProvider | undefined) => Command;
export declare const setResults: (results: {
    emojis: Array<EmojiDescription>;
}) => Command;
export declare const emojiPluginKey: PluginKey<any, any>;
export declare function getEmojiPluginState(state: EditorState): EmojiPluginState;
export declare function emojiPluginFactory(dispatch: Dispatch, providerFactory: ProviderFactory, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, options?: EmojiPluginOptions): Plugin<any, import("prosemirror-model").Schema<any, any>>;
