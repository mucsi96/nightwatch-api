import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import path from 'path';

export default {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../site-dist'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: ['/hello/', '/world/'],
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
