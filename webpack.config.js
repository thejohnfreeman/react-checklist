var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var src = path.join(__dirname, 'src')

module.exports = {
  entry: [
    path.join(src, 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', include: src}
    ],
    loaders: [
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loaders: ['style', 'css']},
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        include: src,
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html'),
    }),
    new webpack.NoErrorsPlugin(),
  ],
}
