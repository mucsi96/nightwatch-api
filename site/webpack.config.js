const path = require('path');
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
        title: 'Nightwatch API',
        description: 'Cucumber.js plugin for Nightwatch.js.',
        url: 'http://mucsi96.github.io/nightwatch-cucumber/',
        img: 'http://mucsi96.github.io/nightwatch-cucumber/res/img/opengraph.png',
        githubId: 'mucsi96/nightwatch-api',
        github: 'https://github.com/mucsi96/nightwatch-api',
        npm: 'https://www.npmjs.com/package/nightwatch-api',
        twitterId: 'mucsi96',
        twitter: 'https://twitter.com/mucsi96'
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
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader'
          }
        ]
      }
    ]
  }
};
