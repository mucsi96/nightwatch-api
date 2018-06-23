const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const entryPath = path.resolve(__dirname, 'index.js');
const distPath = path.resolve(__dirname, '../site-dist');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: entryPath,
  output: {
    filename: 'index.js',
    path: distPath,
    libraryTarget: 'commonjs2'
  },
  serve: {
    content: distPath,
    hot: false
  },
  plugins: [
    new StaticSiteGeneratorPlugin({
      crawl: true,
      locals: {
        title: 'nightwatch-api'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.md$/,
        use: {
          loader: path.resolve(__dirname, 'markdown-loader.js')
        }
      }
    ]
  }
};
