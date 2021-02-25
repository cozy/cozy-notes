import { Plugin } from 'prosemirror-state';
import { Dispatch } from '../../../../event-dispatcher';
import { ColumnResizingPluginState } from '../../types';
export declare function createPlugin(dispatch: Dispatch<ColumnResizingPluginState>, { lastColumnResizable, dynamicTextSizing, }: ColumnResizingPluginState): Plugin<any, import("prosemirror-model").Schema<any, any>>;
