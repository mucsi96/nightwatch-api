const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const distPath = path.resolve(__dirname, '../site-dist');
const commonConfig = {
  output: {
    path: distPath
  },
  serve: {
    content: distPath,
    hot: false
  },
  stats: 'minimal',
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

const serverConfig = {
  ...commonConfig,
  mode: 'development',
  entry: path.resolve(__dirname, 'site-server-renderer.js'),
  output: {
    ...commonConfig.output,
    libraryTarget: 'commonjs2',
    filename: 'site-server-renderer.js'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new StaticSiteGeneratorPlugin({
      entry: 'main',
      crawl: true,
      globals: {
        window: {}
      },
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
  ]
};

const clientConfig = {
  ...commonConfig,
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: path.resolve(__dirname, 'site-client.js'),
  output: {
    ...commonConfig.output,
    filename: 'site-client.js'
  }
};

module.exports = [clientConfig, serverConfig];
