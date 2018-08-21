
var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
  entry: [
    'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
    './src/entry',
  ],

  module: {
   loaders: [
     { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
     { test: /\.json$/, loader: 'json' },
     { test: /\.css$/, loader: 'style-loader!css-loader' },
     { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
     { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
     { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
     { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
     { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
   ]
  },

  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:9000/dist/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['','.js','.json', '.css', '.html']
  },

  plugins: [
   new webpack.HotModuleReplacementPlugin(),
  ]
}


config.target = webpackTargetElectronRenderer(config);
module.exports = config
