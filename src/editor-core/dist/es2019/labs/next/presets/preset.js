export class Preset {
  constructor() {
    this.plugins = [];
  }

  add(plugin) {
    this.plugins.push(plugin);
    return this;
  }

  has(plugin) {
    return this.plugins.some(pluginPreset => {
      if (Array.isArray(pluginPreset)) {
        return pluginPreset[0] === plugin;
      }

      return pluginPreset === plugin;
    });
  }

  getEditorPlugins(excludes) {
    const editorPlugins = this.processEditorPlugins();
    return this.removeExcludedPlugins(editorPlugins, excludes);
  }

  processEditorPlugins() {
    const cache = new Map();
    this.plugins.forEach(pluginEntry => {
      if (Array.isArray(pluginEntry)) {
        const [fn, options] = pluginEntry;
        cache.set(fn, options);
      } else {
        /**
         * Prevent usage of same plugin twice without override.
         * [
         *  plugin1,
         *  [plugin1, { option1: value }],
         *  plugin1, // This will throw
         * ]
         */
        if (cache.has(pluginEntry) && cache.get(pluginEntry) === undefined) {
          throw new Error(`${pluginEntry} is already included!`);
        }

        cache.set(pluginEntry, undefined);
      }
    });
    let plugins = [];
    cache.forEach((options, fn) => {
      plugins.push(fn(options));
    });
    return plugins;
  }

  removeExcludedPlugins(plugins, excludes) {
    if (excludes) {
      return plugins.filter(plugin => !plugin || !excludes.has(plugin.name));
    }

    return plugins;
  }

}