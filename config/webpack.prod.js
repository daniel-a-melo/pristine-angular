/**
 * Configurations for prod build
 */
let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let AotPlugin = require('@ngtools/webpack').AotPlugin;
let appConfig = require('./webpack.app.js');
let helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

var prodConfig = webpackMerge(appConfig, {
  devtool: 'source-map',

  entry: {
    'app' : './src/main-aot.ts',
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
        test: /\.ts$/,
        use: {
          loader: '@ngtools/webpack'
        }
      },      
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      }
    ]
  },  

  plugins: [

    // See comment on CommonsChunkPlugin in webpack.dev.js
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'zone']
    }),

    // AOT Plugin 
    new AotPlugin({
      tsConfigPath: helpers.root('tsconfig-aot.json'),
      entryModule: helpers.root('src/app/app.module#AppModule'),
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
    
    //Copy DLLs to output directory
    new CopyWebpackPlugin([{
      from : './lib/*.js', to : '' 
    }])

  ]
});

module.exports = prodConfig;


