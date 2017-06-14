/**
 * Configurations that applies to dev and prod builds
 * It doesn't apply to test build (yarn/npm test)
 */
let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let helpers = require('./helpers');
let commonConfig = require('./webpack.common.js');

let appConfig = webpackMerge(commonConfig, {

  entry: {
    //Application code/assets strictly
    'app': './src/main.ts',
    //Zone.JS. Unfortunatelly can't be packaged as a DLL as global Zone isn't exposed (bug?)
    'zone' : './src/zone.ts',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: {
          loader : 'file-loader',
          options : {
            name: 'assets/[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader?sourceMap'
              //publicPath: "/dist" // Overrides output.publicPath
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  }, 

  plugins: [

    /**
     * The 'tests' chunk shall not be included in 'index.html'
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      //chunks : ['zone', 'app', 'bootstrap'],
      chunks : ['zone', 'app'],
      chunksSortMode : 'dependency'
    }),


  ]  



});

module.exports = appConfig;