import { Plugin, EditorState } from 'prosemirror-state';
import { PmHistoryPluginState } from './pm-history-types';
export declare const getPmHistoryPlugin: (state: EditorState) => Plugin | undefined;
export declare const getPmHistoryPluginState: (state: EditorState) => PmHistoryPluginState | undefined;
