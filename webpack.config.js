const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const _build = './src/main/resources/static/_assets';

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'ui'),
  entry: './index.tsx',
  mode: isDev ? 'development' : 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, _build),
    publicPath: '/_assets',
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js(x*)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.ts(x*)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
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
    hotOnly: isDev,
  },
  stats: 'errors-only',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({}),
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!*.ico'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'assets', to: path.join(__dirname, _build, 'assets') }],
    }),
    /*new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../../templates/index.html',
      favicon: 'assets/book.ico',
    }),*/
  ],
  devtool: isDev ? 'eval-cheap-source-map' : false,
};
