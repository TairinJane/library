const path = require('path');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');

const _build = './src/main/resources/static';

module.exports = {
  entry: './ui/index.tsx',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, _build),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
          },
        },
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules', 'ui'],
  },
  devServer: {
    contentBase: path.join(__dirname, _build),
    port: 3000,
    hotOnly: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new miniCss({
      filename: 'style.css',
    }),
  ],
  devtool: 'source-map',
};
