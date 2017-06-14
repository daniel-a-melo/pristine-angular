/**
 * Configuration to generate vendor Dll
 */
let webpack = require('webpack');
let path = require('path');
let helpers = require('./helpers');

var vendorConfig = function(env) {

return {

  entry: {
    vendor: [env ? './src/vendor-aot.bom.ts' : './src/vendor.bom.ts'],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules : [
      path.resolve('./src'),
      './node_modules'
    ]       
  },    

  output: {
    filename: 'vendor.bundle.js',
    path: helpers.root('lib'),
    library: 'vendor_lib',
  },

  plugins: [
      new webpack.DllPlugin({
        name: 'vendor_lib',
        path: 'lib/vendor-manifest.json',
      }),

    new webpack.ProvidePlugin({
      Reflect: 'core-js/es7/reflect',
    }),

    // new webpack.ProvidePlugin({
    //   Zone: 'zone.js/dist/zone',
    // }),          

    // new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
    //   sourceMap: true,
    //   mangle: {
    //     keep_fnames: true
    //   }
    // }),      
      
      //Needed to remove warnings with webpack2 and angular2. Not needed with webpack 1
      //https://github.com/angular/angular/issues/11580
      //https://github.com/AngularClass/angular2-webpack-starter/issues/993
      //https://github.com/angular/angular/issues/14898      
      new webpack.ContextReplacementPlugin(
         /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve(__dirname, 'doesnotexist/')
      )      
  ]
};

}

module.exports = vendorConfig;