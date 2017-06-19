let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let path = require('path');
let commonConfig = require('./webpack.common.js');
let helpers = require('./helpers');


let testConfig = webpackMerge(commonConfig, {
  
  devtool: 'inline-source-map',

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
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        use: 'null-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        use: ['raw-loader', 'sass-loader']
      },            
    ]
  },

  plugins: [


    //Needed to remove warnings with webpack2 and angular2. Not needed with webpack 1
    //https://github.com/angular/angular/issues/11580
    //https://github.com/AngularClass/angular2-webpack-starter/issues/993
    //https://github.com/angular/angular/issues/14898


    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'doesnotexist/')
    ),
  ]
});

module.exports = testConfig;
