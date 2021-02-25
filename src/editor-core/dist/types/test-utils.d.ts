import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { LightEditorPlugin, LightPMPlugin, LightPMPluginFactoryParams, OnEditorViewStateUpdated } from './create-editor/get-plugins';
import { Preset } from './labs/next/presets/preset';
import { Schema } from 'prosemirror-model';
import { MarkConfig, NodeConfig } from './types/pm-config';
export { Preset } from './labs/next/presets/preset';
export type { LightEditorPlugin } from './create-editor/get-plugins';
export type { DispatchAnalyticsEvent } from './plugins/analytics/types';
export interface LightEditorConfig {
    nodes: NodeConfig[];
    marks: MarkConfig[];
    plugins: Array<LightPMPlugin>;
    onEditorViewStateUpdatedCallbacks: Array<OnEditorViewStateUpdated>;
}
declare type PluginData = {
    plugins: Plugin[];
    schema: Schema;
    onEditorViewStateUpdatedCallbacks: Array<OnEditorViewStateUpdated>;
};
export declare const createPMSchemaAndPlugins: (preset?: Preset<LightEditorPlugin>) => (pluginFactoryParams: Omit<LightPMPluginFactoryParams, 'schema'>) => PluginData;
export { PortalProviderAPI } from './ui/PortalProvider';
export { EventDispatcher } from './event-dispatcher';
export type { Dispatch } from './event-dispatcher';
export { GapCursorSelection, Side as GapCursorSide, } from './plugins/selection/gap-cursor/selection';
export declare function setTextSelection(view: EditorView, anchor: number, head?: number): void;
