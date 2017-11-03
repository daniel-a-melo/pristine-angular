/**
 * Configurations for prod build
 */
let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
let AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
let appConfig = require('./webpack.app.js');
let helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

var prodConfig = webpackMerge(appConfig, {
  devtool: 'source-map',

  entry: {
    'app' : './src/main.ts',
  },  

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: {
          loader: '@ngtools/webpack'
        }
      },      
      {
        test: /\.ts$/,
        exclude : helpers.root('aot'),
        enforce: 'pre',
        loader: 'tslint-loader',
      }
    ]
  },  

  plugins: [

    // AOT Plugin 
    new AngularCompilerPlugin({
      mainPath: helpers.root('src/main.ts'),
      platform : 0,
      tsConfigPath: helpers.root('tsconfig-aot.json'),
      //entryModule: helpers.root('src/app/app.module#AppModule'),
      skipCodeGeneration : false
    }),        

    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      sourceMap: true,
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin({filename: '[name].[hash].css'}),
    
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    new AddAssetHtmlPlugin([
      { filepath: helpers.root('lib', 'vendor.bundle.css'), includeSourcemap : false, hash : true, typeOfAsset : 'css' },      
      { filepath: helpers.root('node_modules/zone.js/dist', 'zone.min.js'), includeSourcemap : false, hash : true},
      { filepath: helpers.root('lib', 'vendor.bundle.js'), includeSourcemap : false, hash : true}
    ]),       
  

  ]
});

module.exports = prodConfig;


