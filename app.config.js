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
      '@atlaskit/editor-core': path.resolve(SRC_DIR, './editor-core/dist')
    }
  }
}

configurationFiles.push(extraConfig)

module.exports = configurationFiles
