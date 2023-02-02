'use strict'

const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('cozy-scripts/utils/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const {
  makeFilename,
  isDebugMode,
  environment
} = require('cozy-scripts/config/webpack.vars')
const manifest = fs.readJsonSync(paths.appManifest())

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

module.exports = {
  entry: {
    app: [
      // polyfills, avoid to import it in the application
      require.resolve('@babel/polyfill'),
      // since the file extension depends on the framework here
      // we get it from a function call
      paths.appBrowserIndex()
    ]
  },
  output: {
    path: paths.appBuild(),
    filename: `${makeFilename()}.js`,
    chunkFilename:
      environment === 'production'
        ? 'vendors/[name].[contenthash].js'
        : 'vendors/[name].js',
    pathinfo: isDebugMode
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appBrowserHtmlTemplate(),
      title: appName,
      inject: false,
      chunks: ['vendors', 'app', 'atlaskit'],
      minify: {
        collapseWhitespace: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('browser')
    })
  ]
}
