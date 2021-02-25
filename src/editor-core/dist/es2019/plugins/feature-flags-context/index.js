import { Plugin, PluginKey } from 'prosemirror-state';
export const pluginKey = new PluginKey('featureFlagsContextPlugin');

const featureFlagsContextPlugin = (featureFlags = {}) => ({
  name: 'featureFlagsContext',

  pmPlugins() {
    return [{
      name: 'featureFlagsContext',
      plugin: () => new Plugin({
        key: pluginKey,
        state: {
          init: () => ({ ...featureFlags
          }),
          apply: (_, pluginState) => pluginState
        }
      })
    }];
  }

});

export const getFeatureFlags = state => pluginKey.getState(state);
export default featureFlagsContextPlugin;