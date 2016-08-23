var webpack = require('webpack');
var path = require('path');
var html = require('html-webpack-plugin');
var configs = require('./config');
var target = process.env['TARGET'] || 'development';
var config = configs[target];
var pkg = require('../package');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve('./lib')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["eslint-loader"]
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "sass-loader"
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file?hash=sha512&digest=hex&name=[hash].[ext]",
          "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      }
    ],
    noParse: /\.min\.js$/
  },
  devtool: 'source-map',
  eslint: {
    failOnWarning: false,
    failOnError: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      },
      __FIREBASE_URL__: JSON.stringify(config.firebase_url),
      __FIREBASE_AUTH__: JSON.stringify(config.firebase_auth),
      __FIREBASE_APIKEY__: JSON.stringify(config.firebase_apikey),
      __VERSION__: JSON.stringify(pkg.version),
      __TARGET__: JSON.stringify(target),
      __DEPENDENCIES__: JSON.stringify(
        Object.assign({}, pkg.devDependencies, pkg.dependencies)
      ),
      __TITLE__: JSON.stringify(pkg.name)
    }),
    new html({
      title: pkg.name,
      template: 'build/tmpl.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
