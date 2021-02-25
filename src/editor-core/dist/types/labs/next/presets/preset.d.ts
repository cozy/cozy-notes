export declare class Preset<T extends {
    name: string;
}> {
    private plugins;
    constructor();
    add<PluginFactory>(plugin: PluginConfig<PluginFactory, T>): this;
    has(plugin: () => T): boolean;
    getEditorPlugins(excludes?: Set<string>): T[];
    private processEditorPlugins;
    private removeExcludedPlugins;
}
export declare type PluginsPreset = Array<PluginConfig<any, any>>;
/**
 * Type for Editor Preset's plugin configuration.
 *
 * Possible configurations:
 * – () => EditorPlugin
 * – (options: any) => EditorPlugin
 * – (options?: any) => EditorPlugin
 *
 * Usage:
 * – preset.add(plugin)
 * – preset.add([plugin])
 * – preset.add([plugin, options])
 *
 *
 * Type:
 * – Plugin with required arguments, matches `() => EditorPlugin` too,
 *   because no arguments has type `unknown`.
 *
 * IF (Args: any) => Editor Plugin:
 *    IF Args === unknown
 *       preset.add(plugin) || preset.add([plugin])
 *    ELSE
 *       IF Args are Optional
 *          preset.add(plugin) | preset.add([plugin]) | preset.add([plugin, options])
 *       ELSE [Args are required]
 *          preset.add([plugin, options])
 * ELSE
 *   never
 */
export declare type PluginConfig<PluginFactory, T> = PluginFactory extends (args: infer Args) => T ? Exclude<unknown, Args> extends never ? PluginFactory | [PluginFactory] : Exclude<Args, Exclude<Args, undefined>> extends never ? [PluginFactory, Args] : PluginFactory | [PluginFactory] | [PluginFactory, Args] : never;
