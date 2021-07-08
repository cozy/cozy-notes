const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { stream: require.resolve('stream-browserify') }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  }
}
