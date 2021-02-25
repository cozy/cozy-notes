import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { EditorPlugin, EditorProps } from '../types';
import { DefaultPresetPluginOptions } from '../labs/next/presets/default';
import { EditorPresetProps } from '../labs/next/presets/types';
export declare function getDefaultPresetOptionsFromEditorProps(props: EditorProps): EditorPresetProps & DefaultPresetPluginOptions;
/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(props: EditorProps, prevProps?: EditorProps, createAnalyticsEvent?: CreateUIAnalyticsEvent): EditorPlugin[];
