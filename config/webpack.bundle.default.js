'use strict'

const merge = require('webpack-merge')
const {
  environment,
  target,
  addAnalyzer
} = require('cozy-scripts/config/webpack.vars')

const configs = [
  require('cozy-scripts/config/webpack.config.base'),
  require('cozy-scripts/config/webpack.config.typescript'),
  require('./webpack.config.chunks'),
  require('cozy-scripts/config/webpack.config.react'),
  require('cozy-scripts/config/webpack.config.eslint'),
  require('cozy-scripts/config/webpack.config.cozy-ui'),
  require('cozy-scripts/config/webpack.config.cozy-ui.react'),
  require('cozy-scripts/config/webpack.config.intents'),
  require('cozy-scripts/config/webpack.config.public'),
  require('cozy-scripts/config/webpack.config.pictures'),
  require('cozy-scripts/config/webpack.config.vendors'),
  require('cozy-scripts/config/webpack.config.manifest'),
  require('cozy-scripts/config/webpack.config.progress'),
  require('cozy-scripts/config/webpack.config.duplicates'),
  require('cozy-scripts/config/webpack.config.cozy-bar-v7'),
  addAnalyzer ? require('cozy-scripts/config/webpack.config.analyzer') : null,
  require('cozy-scripts/config/webpack.config.services'),
  require(target === 'browser'
    ? './webpack.target.browser'
    : `cozy-scripts/config/webpack.target.${target}`)
]

if (environment === 'production') {
  configs.push(require('cozy-scripts/config/webpack.environment.prod'))
} else {
  configs.push(require('cozy-scripts/config/webpack.environment.dev'))
}

module.exports = merge.apply(null, configs)
