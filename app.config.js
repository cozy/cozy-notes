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
        'node_modules/@cozy/editor-core/src/plugins/media'
      )]: path.resolve(__dirname, './src/plugins/media'),
      [path.resolve(
        __dirname,
        'node_modules/@cozy/editor-core/src/plugins/image-upload'
      )]: path.resolve(__dirname, './src/plugins/image-upload'),
      [path.resolve(
        __dirname,
        'node_modules/@cozy/editor-core/src/ui/Dropdown'
      )]: path.resolve(__dirname, './src/ui/Dropdown'),
      [path.resolve(
        __dirname,
        'node_modules/@cozy/editor-core/src/ui/DropdownMenu'
      )]: path.resolve(__dirname, './src/ui/DropdownMenu'),
      ['@atlaskit/editor-core']: path.resolve(
        __dirname,
        'node_modules/@cozy/editor-core/src'
      ),
      '@atlaskit/media-viewer': path.resolve('./src/plugins/altaskit-unused'),
      '@atlaskit/user-picker': path.resolve('./src/plugins/altaskit-unused')
    }
  }
}

configurationFiles.push(extraConfig)

module.exports = configurationFiles
