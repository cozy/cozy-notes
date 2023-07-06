'use strict'

const intentsConfig = require('cozy-scripts/config/webpack.config.intents')

// We add atlaskit chunk into the chunks list
intentsConfig.plugins?.[0]?.options?.chunks?.push('atlaskit')

module.exports = intentsConfig
