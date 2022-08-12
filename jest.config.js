module.exports = {
  testEnvironmentOptions: {
    url: 'http://cozy.localhost:8080/'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'styl'],
  setupFilesAfterEnv: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '\\.(css|styl)$': 'identity-obj-proxy',
    '^cozy-client$': 'cozy-client/dist/index.js',
    '^cozy-ui/react(.*)$': 'cozy-ui/transpiled/react$1',
    '^@atlaskit/editor-core(.*)$':
      '<rootDir>/node_modules/cozy-editor-core/src$1'
  },
  testEnvironment: "<rootDir>/test/jestLib/custom-test-env.js",
  transformIgnorePatterns: ['node_modules/(?!cozy-(ui|sharing|harvest-lib))'],
  transform: {
    '^.+\\.webapp$': '<rootDir>/test/jestLib/json-transformer.js',
    '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest'
  },
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    cozy: {}
  }
}
