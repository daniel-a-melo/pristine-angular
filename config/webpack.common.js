/**
 * Common configuration that apply to all builds: tests, dev and prod
 */

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');
let path = require('path');
let rxPaths = require('rxjs/_esm5/path-mapping');


let commonsConfig = {

  resolve: {
    extensions: ['.ts', '.js'],
    modules : [
      path.resolve('./src'),
      './node_modules'
    ],
    alias: rxPaths()    
  },  

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },

  plugins: [

    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('../lib/vendor-manifest.json')
    })

  ]
};


module.exports = commonsConfig;
