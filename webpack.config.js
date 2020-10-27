// module.exports = {
//   output: {
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: "babel-loader",
//       },

//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|j?g|svg|gif)?$/,
//         use: "file-loader",
//       },
//     ],
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//     hot: true
//   },
// };

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: 'app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/'
    })
  ]
};
