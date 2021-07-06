export const pluginConfig = (config = {}) => {
  return config.advanced
    ? {
        allowBackgroundColor: true,
        allowColumnResizing: true,
        allowHeaderColumn: true,
        allowHeaderRow: true,
        allowMergeCells: true,
        allowNumberColumn: true,
        stickToolbarToBottom: true,
        permittedLayouts: 'all',
        allowControls: true,
        ...config
      }
    : config
}
