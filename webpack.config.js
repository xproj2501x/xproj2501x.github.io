let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');


const PATHS = {
  JS: path.resolve(__dirname, 'src/client/js'),
  TEST_JS: path.resolve(__dirname, 'test'),
  CSS: path.resolve(__dirname, 'src/client/css'),
  DIST: path.resolve(__dirname, 'dist')
};

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    PATHS.JS + '/index.js'
  ],
  output: {
    path: PATHS.DIST,
    filename: 'site.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-transform-runtime'
            ],
            presets: [
              '@babel/env',
              '@babel/react'
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('site.css')
  ]
};
