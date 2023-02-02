'use strict'

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        atlaskit: {
          test: /[\\/]node_modules[\\/]@atlaskit[\\/]/,
          name: 'atlaskit',
          priority: 0,
          // exclude public chunk since public script must contains all
          // modules itself
          chunks: chunk => chunk.name !== 'public'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          chunks: chunk => chunk.name !== 'public'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
