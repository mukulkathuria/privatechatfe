/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { default: merge } = require('webpack-merge');
const common = require('./webpack.common');

const port = process.env.REACT_APP_PORT || 3000;

const SRC_DIR = path.join(__dirname, 'src');
const PUB_DIR = path.join(__dirname, 'public');

module.exports = merge(common, {
  entry: `${SRC_DIR}/index.tsx`,
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      // alwaysWriteToDisk: true,
      template: `${PUB_DIR}/index.html`,
      favicon: `${PUB_DIR}/favicon.ico`
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new DotEnv({
      path: '.env.development'
    })
  ],
  optimization: {
    runtimeChunk: 'single'
  },
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    port,
    open: [`http://localhost:${port}/`],
    compress: true,
    historyApiFallback: true
  }
});
