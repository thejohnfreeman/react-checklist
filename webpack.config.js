var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var src = path.join(__dirname, 'src')

module.exports = {
  entry: [
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
      {test: /\.html$/, loader: "raw-loader"},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.(ttf|eot|svg|woff2?|png)$/, loader: 'url?limit=8192'},
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        include: src,
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'template.html'),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
  ],
  devServer: {host: '0.0.0.0'},
}
