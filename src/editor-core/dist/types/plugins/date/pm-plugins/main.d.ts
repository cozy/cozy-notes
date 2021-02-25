import { PMPluginFactory } from '../../../types';
import { DatePluginState } from './types';
declare const getPluginState: (state: import("prosemirror-state").EditorState<any>) => DatePluginState;
declare const createPlugin: PMPluginFactory;
export { getPluginState };
export default createPlugin;
