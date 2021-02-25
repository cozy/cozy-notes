export default function (pluginState, action) {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...pluginState,
        ...action.data
      };

    default:
      return pluginState;
  }
}