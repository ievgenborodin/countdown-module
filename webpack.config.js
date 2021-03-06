const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

var plugins = [
    new WebpackNotifierPlugin({
        title: 'Countdown',
        contentImage: path.join(__dirname, '/icon.png'),
        alwaysNotify: true,
        excludeWarnings: true
    })
];

if (isProduction) {
  plugins.push(new UglifyJSPlugin())
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: [
      './sample-app/src'
    ]
  },
  output: {
    path: path.resolve(__dirname, './sample-app'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins
};