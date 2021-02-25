import { PluginKey, EditorState } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { FeatureFlags } from './types';
export declare const pluginKey: PluginKey<any, any>;
declare const featureFlagsContextPlugin: (featureFlags?: FeatureFlags) => EditorPlugin;
export declare const getFeatureFlags: (state: EditorState) => FeatureFlags;
export default featureFlagsContextPlugin;
