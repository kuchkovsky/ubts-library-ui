const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (_, options) => ({
  entry: {
    app: './src/js/index.js',
  },
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunksSortMode: 'manual',
      chunks: ['vendor', 'app'],
    }),
    new Dotenv({
      path: `./.env.${options.mode === 'production' ? 'prod' : 'dev'}`,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
});
