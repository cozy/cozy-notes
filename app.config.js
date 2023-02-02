const path = require('path')
const SRC_DIR = path.resolve(__dirname, './src')

const configurationFiles = []

configurationFiles.push(require('./config/webpack.bundle.default.js'))
configurationFiles.push(
  require('cozy-scripts/config/webpack.config.css-modules')
)
const extraConfig = {
  resolve: {
    modules: ['node_modules', SRC_DIR],
    alias: {
      'prosemirror-state': path.resolve(
        // The app will not work with the editor-core pm-state version
        // That's why we're using the global one here until editor-core is updated
        __dirname,
        './node_modules/prosemirror-state'
      ),
      [path.resolve(
        __dirname,
        'node_modules/cozy-editor-core/src/plugins/media'
      )]: path.resolve(__dirname, './src/plugins/media'),
      [path.resolve(
        __dirname,
        'node_modules/cozy-editor-core/src/plugins/image-upload'
      )]: path.resolve(__dirname, './src/plugins/image-upload'),
      [path.resolve(
        __dirname,
        'node_modules/cozy-editor-core/src/ui/Dropdown'
      )]: path.resolve(__dirname, './src/ui/Dropdown'),
      [path.resolve(
        __dirname,
        'node_modules/cozy-editor-core/src/ui/DropdownMenu'
      )]: path.resolve(__dirname, './src/ui/DropdownMenu'),
      ['@atlaskit/editor-core']: path.resolve(
        __dirname,
        'node_modules/cozy-editor-core/src'
      ),
      // The app will not work if we don't use a single version
      // Updating every atlaskit dependency at the same time should help
      '@atlaskit/editor-tables': path.resolve(
        './node_modules/@atlaskit/editor-tables'
      ),
      // Same as above
      '@atlaskit/adf-schema': path.resolve(
        './node_modules/@atlaskit/editor-common/node_modules/@atlaskit/adf-schema'
      )
    }
  }
}

configurationFiles.push(extraConfig)

module.exports = configurationFiles
