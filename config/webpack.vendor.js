/**
 * Configuration to generate vendor Dll
 */
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let helpers = require('./helpers');
let rxPaths = require('rxjs/_esm5/path-mapping');

var vendorConfig = {

  entry: {
    vendor: ['./src/vendor.bom.ts'],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules : [
      path.resolve('./src'),
      './node_modules'
    ],
    alias: rxPaths() 
  },    

  output: {
    filename: 'vendor.bundle.js',
    path: helpers.root('lib'),
    library: 'vendor_lib',
  },

  module : {
    rules : [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader?sourceMap'
        })
      },      
    ]
  },

  plugins: [
      new webpack.DllPlugin({
        name: 'vendor_lib',
        path: 'lib/vendor-manifest.json',
      }),

      //new webpack.optimize.ModuleConcatenationPlugin(),

    // new webpack.ProvidePlugin({
    //   Reflect: 'core-js/es7/reflect',
    // }),
      
      //Needed to remove warnings with webpack2 and angular2. Not needed with webpack 1
      //https://github.com/angular/angular/issues/11580
      //https://github.com/AngularClass/angular2-webpack-starter/issues/993
      //https://github.com/angular/angular/issues/14898      
      new webpack.ContextReplacementPlugin(
         /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve(__dirname, 'doesnotexist/')
      ),

     new ExtractTextPlugin({filename: '[name].bundle.css'}),      

  ]

};

module.exports = vendorConfig;