import { PluginKey, Transaction, Plugin } from 'prosemirror-state';
import { Dispatch } from '../../../../event-dispatcher';
import { MediaLinkingActions } from './actions';
import { MediaLinkingState } from './types';
export declare const mediaLinkingPluginKey: PluginKey<any, any>;
export declare const createMediaLinkingCommand: <A = MediaLinkingActions>(action: A | ((state: Readonly<import("prosemirror-state").EditorState<any>>) => false | A), transform?: ((tr: Transaction<any>, state: import("prosemirror-state").EditorState<any>) => Transaction<any>) | undefined) => import("../../../..").Command, getMediaLinkingState: (state: import("prosemirror-state").EditorState<any>) => MediaLinkingState;
export type { MediaLinkingState } from './types';
declare const _default: (dispatch: Dispatch) => Plugin<any, import("prosemirror-model").Schema<any, any>>;
export default _default;
