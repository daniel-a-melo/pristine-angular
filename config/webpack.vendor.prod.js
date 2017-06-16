let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let vendorBaseConfig = require('./webpack.vendor.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

let vendorProdConfig = webpackMerge(vendorBaseConfig, {

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      sourceMap: true,
      mangle: {
        keep_fnames: true
      }
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),    

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })

  ]


});

module.exports = vendorProdConfig;