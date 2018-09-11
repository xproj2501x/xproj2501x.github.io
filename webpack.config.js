let path = require('path');

const PATHS = {
  JS: path.resolve(__dirname, 'src/client/js'),
  TEST_JS: path.resolve(__dirname, 'test'),
  CSS: path.resolve(__dirname, 'src/client/css'),
  DIST: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: [
    'babel-polyfill',
    PATHS.JS + '/index.js',
  ],
  output: {
    path: PATHS.DIST,
    filename: 'site.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-runtime',
              'transform-decorators-legacy',
              'transform-class-properties'
            ],
            presets: [
              'env'
            ]
          }
        }]
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};