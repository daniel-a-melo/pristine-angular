/**
 * Configuration for development environment
 */
let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let appConfig = require('./webpack.app.js');
let helpers = require('./helpers');

let devConfig = webpackMerge(appConfig, {

  devtool: 'cheap-module-eval-source-map',

  entry: {
    //Automated tests
    'tests' : './config/tests-runner-browser.js',
  },  

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    pathinfo : true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader : 'awesome-typescript-loader'
          },
          { 
            loader : 'angular2-template-loader'
          }
          
        ]
      }, 
    ]
  },    

  plugins: [

    /**
     * CommonsChunkPlugin can be tricky.
     * 
     * Roughly speaking, it's being executing in 4 stages
     * 
     * Stage 1 - All common modules between all entry points are placed in
     *           chunk 'tests'
     *  
     * Stage 2 - All common modules between all entry points and after stage 1
     *           are placed in chunk 'bootstrap'
     * 
     * Stage 3 - All common modules between all entry points and after stage 2
     *           are placed in chunk 'app'
     * 
     * Stage 4 - All common modules between all entry points and after stage 3
     *           are placed in chunk 'zone'. At this point, webpack entry code
     *           will placed in chunk 'zone', therefore this must be the first
     *           chunk to be loaded (after Dlls)
     * 
     * This setup is complicated and hard to maintain. I'd better come up with
     * a simpler solution.
     * 
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['tests', 'app', 'zone']
    }),

    /*
    CoreJS is part of the DLL 'vendor'.
    DLLs don't load globals (bug?), therefore we must expose the neeeded global
    */
    new webpack.ProvidePlugin({
      Reflect: 'core-js/es7/reflect',
    }), 

    new ExtractTextPlugin({filename: '[name].css'}),

    new HtmlWebpackPlugin({
      filename: 'tests.html',
      template: 'src/tests.html',      
      //The bootstrap code must not run when executings tests
      //excludeChunks: ['bootstrap'], 
      /*
      The builtin chunk sorting algorithms fails to recognize 'test' bundle as
      depedent of 'app' bundle
      */
      chunksSortMode : function(a, b) { 
         var order = ['zone', 'app', 'tests']; 
         return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
       }
    }),

  ],

  devServer: {
    /*
    Any unkown URL will be routed to index.html. (Required for HTML 5 push state routing)

    including URL that contains dot (to accomodate route params with dot)
    Keep in mind that wrong links to images or css files will be served with
    index.html content
    */
    historyApiFallback: {
      disableDotRule : true
    },
    stats: 'minimal',
    
  }
});

module.exports = devConfig;