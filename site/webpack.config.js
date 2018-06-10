const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../site-dist'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  serve: {
    content: path.resolve(__dirname, '../site-dist'),
    hot: false
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new StaticSiteGeneratorPlugin({
      crawl: true,
      locals: {
        title: 'Hello'
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
      }
    ]
  }
};
