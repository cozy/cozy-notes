import { EditorState, PluginKey } from 'prosemirror-state';
import { MentionDescription, MentionProvider } from '@atlaskit/mention/resource';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';
import { Command, EditorPlugin } from '../../types';
import { TypeAheadItem } from '../type-ahead/types';
import { MentionPluginOptions, MentionPluginState } from './types';
export declare const mentionToTypeaheadItem: (mention: MentionDescription) => TypeAheadItem;
export declare function memoize<ResultFn extends (mention: MentionDescription) => TypeAheadItem>(fn: ResultFn): {
    call: ResultFn;
    clear(): void;
};
declare const mentionsPlugin: (options?: MentionPluginOptions | undefined) => EditorPlugin;
export default mentionsPlugin;
/**
 * Actions
 */
export declare const ACTIONS: {
    SET_PROVIDER: string;
    SET_RESULTS: string;
    SET_CONTEXT: string;
};
export declare const setProvider: (provider: MentionProvider | undefined) => Command;
export declare const setResults: (results: MentionDescription[]) => Command;
export declare const setContext: (context: ContextIdentifierProvider | undefined) => Command;
/**
 *
 * ProseMirror Plugin
 *
 */
export declare const mentionPluginKey: PluginKey<any, any>;
export declare function getMentionPluginState(state: EditorState): MentionPluginState;
