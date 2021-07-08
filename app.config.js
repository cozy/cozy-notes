const path = require('path')
const SRC_DIR = path.resolve(__dirname, './src')

const configurationFiles = []

configurationFiles.push(
  require('cozy-scripts/config/webpack.bundle.default.js')
)
configurationFiles.push(
  require('cozy-scripts/config/webpack.config.css-modules')
)
const extraConfig = {
  resolve: {
    modules: ['node_modules', SRC_DIR],
    alias: {
      'prosemirror-utils': path.resolve(
        __dirname,
        './node_modules/@atlaskit/editor-core/node_modules/prosemirror-utils/dist/index.js'
      ),
      '@atlaskit/editor-core': path.resolve(
        SRC_DIR,
        './editor-core/dist/es2019'
      )
    }
  }
}

configurationFiles.push(extraConfig)

module.exports = configurationFiles
