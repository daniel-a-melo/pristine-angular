let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let vendorBaseConfig = require('./webpack.vendor.js');

let vendorProdConfig = webpackMerge.strategy({
    entry : 'replace'
})(vendorBaseConfig({}), {

  entry: {
    vendor: ['./src/vendor-aot.bom.ts'],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      sourceMap: true,
      mangle: {
        keep_fnames: true
      }
    })        
  ]


});

module.exports = vendorProdConfig;