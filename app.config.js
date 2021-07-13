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
      'prosemirror-collab': path.resolve(
        __dirname,
        './node_modules/prosemirror-collab'
      ),
      'prosemirror-commands': path.resolve(
        __dirname,
        './node_modules/prosemirror-commands'
      ),
      'prosemirror-history': path.resolve(
        __dirname,
        './node_modules/prosemirror-history'
      ),
      'prosemirror-inputrules': path.resolve(
        __dirname,
        './node_modules/prosemirror-inputrules'
      ),
      'prosemirror-keymap': path.resolve(
        __dirname,
        './node_modules/prosemirror-keymap'
      ),
      'prosemirror-model': path.resolve(
        __dirname,
        './node_modules/prosemirror-model'
      ),
      'prosemirror-schema-list': path.resolve(
        __dirname,
        './node_modules/prosemirror-schema-list'
      ),
      'prosemirror-state': path.resolve(
        __dirname,
        './node_modules/prosemirror-state'
      ),
      'prosemirror-transform': path.resolve(
        __dirname,
        './node_modules/prosemirror-transform'
      ),
      'prosemirror-utils': path.resolve(
        __dirname,
        './node_modules/prosemirror-utils'
      ),
      'prosemirror-view': path.resolve(
        __dirname,
        './node_modules/prosemirror-view'
      ),
      '@atlaskit/editor-tables': path.resolve(
        './node_modules/@atlaskit/editor-tables'
      ),
      '@atlaskit/editor-core': path.resolve('./editor-core/src/index.ts')
    }
  }
}

configurationFiles.push(extraConfig)

module.exports = configurationFiles
