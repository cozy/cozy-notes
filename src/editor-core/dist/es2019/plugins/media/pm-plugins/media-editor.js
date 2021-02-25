import { Plugin } from 'prosemirror-state';
import { setMediaClientConfig } from '../commands/media-editor';
import { createPluginState, pluginKey } from './media-editor-plugin-factory'; // handle mapping changes to providers -> plugin state

const pluginView = providerFactory => view => {
  const updateMediaProvider = async (name, provider) => {
    if (name !== 'mediaProvider') {
      return;
    }

    const resolvedProvider = await provider;

    if (!resolvedProvider) {
      return;
    }

    const resolvedMediaClientConfig = (await resolvedProvider.uploadMediaClientConfig) || (await resolvedProvider.viewMediaClientConfig);
    const {
      dispatch,
      state
    } = view;
    setMediaClientConfig(resolvedMediaClientConfig)(state, dispatch, view);
  };

  providerFactory.subscribe('mediaProvider', updateMediaProvider);
  return {
    destroy() {
      providerFactory.unsubscribe('mediaProvider', updateMediaProvider);
    }

  };
};

export const createPlugin = ({
  dispatch,
  providerFactory
}) => {
  return new Plugin({
    state: createPluginState(dispatch, {}),
    key: pluginKey,
    view: pluginView(providerFactory)
  });
};