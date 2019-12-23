module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '\\.(css|styl)$': 'identity-obj-proxy',
    '^cozy-client$': 'cozy-client/dist/index.js',
    'cozy-ui/react': 'cozy-ui/transpiled/react'
  },
  transformIgnorePatterns: ['node_modules/(?!cozy-ui)'],
  transform: {
    '^.+\\.webapp$': '<rootDir>/test/jestLib/json-transformer.js',
    '^.+\\.(js|jsx)?$': '<rootDir>/test/jestLib/babel-transformer.js'
  },
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    cozy: {}
  }
}
