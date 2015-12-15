var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var src = path.join(__dirname, 'src')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(src, 'app.js'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {root: src},
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', include: src}
    ],
    loaders: [
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
      inject: true,
      template: path.join(src, 'template.html'),
    }),
    new webpack.NoErrorsPlugin(),
  ]
}
