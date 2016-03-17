var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var parseFlag = function (flagString) {
  var flagFound = false;
  for( i in process.argv ){
    if( process.argv[i] === '--' + flagString ){
      flagFound = true;
    } 
  }
  return flagFound;
}


// use direnv
var DEVELOPMENT = process.env.NODE_ENV === 'development';

var MINIFY = !DEVELOPMENT;

// Setup plugins
var extractCSS = new ExtractTextPlugin('css/bundle.css');
var plugins = [
  extractCSS
];
if( MINIFY ){
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}  
    })
  );
}

module.exports = {
  entry: {
    'js/bundle': './src/index.js'
  },
  output: {
    path: "./dist",
    filename: MINIFY ? '[name].min.js' : '[name].js'
  },
  devtool: DEVELOPMENT ? 'inline-source-map' : null,  
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.css$/,
        loader : extractCSS.extract('style-loader', 'css-loader', {
          publicPath: '../'
        })
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract("style-loader", "css-loader!sass-loader", {
          publicPath: '../'
        })
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: 'font/[name].[ext]'
        }
      }
    ]
  },
  plugins: plugins
};
