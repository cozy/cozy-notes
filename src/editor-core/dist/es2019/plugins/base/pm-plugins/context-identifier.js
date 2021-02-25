import { PluginKey, Plugin } from 'prosemirror-state';
export const stateKey = new PluginKey('contextIdentiferPlugin');
export const getContextIdentifier = state => {
  if (state) {
    var _stateKey$getState;

    return (_stateKey$getState = stateKey.getState(state)) === null || _stateKey$getState === void 0 ? void 0 : _stateKey$getState.contextIdentifierProvider;
  }
};
export default ((dispatch, providerFactory) => new Plugin({
  key: stateKey,
  state: {
    init: () => ({}),
    apply: (tr, pluginState) => {
      if (tr.getMeta(stateKey)) {
        return tr.getMeta(stateKey);
      }

      return pluginState;
    }
  },
  view: view => {
    const providerPromiseHandler = (name, providerPromise) => {
      if (providerPromise && name === 'contextIdentifierProvider') {
        providerPromise.then(provider => {
          const tr = view.state.tr.setMeta(stateKey, {
            contextIdentifierProvider: { ...provider
            }
          });
          view.dispatch(tr);
        });
      }
    };

    if (providerFactory) {
      providerFactory.subscribe('contextIdentifierProvider', providerPromiseHandler);
    }

    return {
      destroy: () => {
        providerFactory && providerFactory.unsubscribe('contextIdentifierProvider', providerPromiseHandler);
      }
    };
  }
}));