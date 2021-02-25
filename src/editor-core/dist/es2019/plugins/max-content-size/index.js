import { Plugin, PluginKey } from 'prosemirror-state';
export const pluginKey = new PluginKey('maxContentSizePlugin');
export function createPlugin(dispatch, maxContentSize) {
  if (!maxContentSize) {
    return;
  }

  let maxContentSizeReached = false;
  return new Plugin({
    filterTransaction(tr) {
      const result = tr.doc && tr.doc.nodeSize > maxContentSize;

      if (result || result !== maxContentSizeReached) {
        dispatch(pluginKey, {
          maxContentSizeReached: result
        });
      }

      maxContentSizeReached = result;
      return !result;
    }

  });
}

const maxContentSizePlugin = maxContentSize => ({
  name: 'maxContentSize',

  pmPlugins() {
    return [{
      name: 'maxContentSize',
      plugin: ({
        dispatch
      }) => createPlugin(dispatch, maxContentSize)
    }];
  }

});

export default maxContentSizePlugin;