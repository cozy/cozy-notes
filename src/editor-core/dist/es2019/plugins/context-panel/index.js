import { Plugin, PluginKey } from 'prosemirror-state';
export const pluginKey = new PluginKey('contextPanelPluginKey');
export function getPluginState(state) {
  return pluginKey.getState(state);
}

function contextPanelPluginFactory(contextPanels, dispatch) {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_config, state) {
        return {
          handlers: contextPanels,
          contents: contextPanels.map(panelContent => panelContent(state))
        };
      },

      apply(tr, pluginState, _oldState, newState) {
        let newPluginState = pluginState;
        const meta = tr.getMeta(pluginKey);

        if (tr.docChanged || tr.selectionSet || meta && meta.changed) {
          const newContents = pluginState.handlers.map(panelContent => panelContent(newState));

          if (newContents.length !== newPluginState.contents.length || newContents.some(node => newPluginState.contents.indexOf(node) < 0)) {
            newPluginState = { ...newPluginState,
              contents: newContents
            };
          }
        }

        if (newPluginState !== pluginState) {
          dispatch(pluginKey, newPluginState);
        }

        return newPluginState;
      }

    }
  });
}

const contextPanelPlugin = () => ({
  name: 'contextPanel',

  pmPlugins(contextPanels = []) {
    return [{
      name: 'contextPanel',
      plugin: ({
        dispatch
      }) => contextPanelPluginFactory(contextPanels.filter(Boolean), dispatch)
    }];
  }

});

export default contextPanelPlugin;