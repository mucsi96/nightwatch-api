const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const distPath = path.resolve(__dirname, '../site-dist');
const { contributors } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.all-contributorsrc'))
);
const commonConfig = {
  output: {
    path: distPath
  },
  serve: {
    content: distPath,
    hotClient: false
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        use: {
          loader: path.resolve(__dirname, 'markdown-loader.js')
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]'
            }
          }
        ]
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
      locals: {
        contributors
      },
      globals: {
        window: {}
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
