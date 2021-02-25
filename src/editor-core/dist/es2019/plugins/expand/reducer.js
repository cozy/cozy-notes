export default ((pluginState, action) => {
  switch (action.type) {
    case 'SET_EXPAND_REF':
      return { ...pluginState,
        expandRef: action.data.ref
      };

    default:
      return pluginState;
  }
});