const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const distPath = path.resolve(__dirname, 'dist');
const commonConfig = {
  resolve: {
    alias: {
      typeDoc$: path.resolve(__dirname, '../nightwatch-api/src/index.ts'),
      packageJson$: path.resolve(__dirname, '../nightwatch-api/package.json')
    }
  },
  output: {
    path: distPath
  },
  devServer: {
    contentBase: distPath,
    inline: false
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        use: {
          loader: path.resolve(__dirname, 'src/loaders/markdown-loader.js')
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
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
      },
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, '../nightwatch-api/src'),
        use: [
          {
            loader: path.resolve(__dirname, 'src/loaders/typedoc-loader.js'),
            options: {
              mode: 'modules',
              tsConfig: path.resolve(__dirname, '../nightwatch-api/tsconfig.json')
            }
          }
        ]
      },
      {
        test: /.all-contributorsrc/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      }
    ]
  }
};

const serverConfig = {
  ...commonConfig,
  mode: 'development',
  entry: path.resolve(__dirname, 'src/site-server-renderer.js'),
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
      }
    })
  ]
};

const clientConfig = {
  ...commonConfig,
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/site-client.js'),
  output: {
    ...commonConfig.output,
    filename: 'site-client.js'
  }
};

module.exports = [clientConfig, serverConfig];
