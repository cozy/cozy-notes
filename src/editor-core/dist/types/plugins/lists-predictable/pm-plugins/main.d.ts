import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { Dispatch } from '../../../event-dispatcher';
export declare const pluginKey: PluginKey<any, any>;
export declare const getDecorations: (doc: Node) => DecorationSet;
export declare const createPlugin: (eventDispatch: Dispatch) => Plugin;
