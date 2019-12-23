const configurationFiles = []

configurationFiles.push(
  require('cozy-scripts/config/webpack.bundle.default.js')
)
configurationFiles.push(
  require('cozy-scripts/config/webpack.config.css-modules')
)
module.exports = configurationFiles
