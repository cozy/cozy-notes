import { Plugin, PluginSpec } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { EditorProps } from '../../types/editor-props';
export declare class InstrumentedPlugin<PluginState, NodeSchema extends Schema<any, any>> extends Plugin<PluginState, NodeSchema> {
    constructor(spec: PluginSpec, options?: EditorProps['performanceTracking']);
    static fromPlugin<T, V extends Schema<any, any>>(plugin: Plugin<T, V>, options: EditorProps['performanceTracking']): InstrumentedPlugin<T, V>;
}
