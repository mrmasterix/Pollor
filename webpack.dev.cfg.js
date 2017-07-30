const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    bundle: ['babel-polyfill', path.resolve(__dirname, './js/bundle.js')],
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './www'),
    publicPath: '/',
    // publicPath: './',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-2'],
              plugins: [
                'transform-runtime'
              ],
              sourceMaps: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),

    new ExtractTextPlugin({
      filename: 'css/main.css',
      disable: false,
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      title: 'Webpack test',
      template: './index.html',
      filename: 'index.html',
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
