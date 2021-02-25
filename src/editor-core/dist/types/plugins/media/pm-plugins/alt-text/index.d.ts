import { Plugin, PluginKey } from 'prosemirror-state';
import { PMPluginFactoryParams } from '../../../../types';
export declare const pluginKey: PluginKey<any, any>;
declare const createCommand: <A = import("./actions").MediaAltTextAction>(action: A | ((state: Readonly<import("prosemirror-state").EditorState<any>>) => false | A), transform?: ((tr: import("prosemirror-state").Transaction<any>, state: import("prosemirror-state").EditorState<any>) => import("prosemirror-state").Transaction<any>) | undefined) => import("../../../../types").Command, getPluginState: (state: import("prosemirror-state").EditorState<any>) => import("./types").MediaAltTextState;
export declare const createPlugin: ({ dispatch, providerFactory, }: PMPluginFactoryParams) => Plugin<any, any>;
export { createCommand, getPluginState };
