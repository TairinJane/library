const path = require('path');
const webpack = require("webpack");

const _build = './src/main/resources/static';

module.exports = {
    entry: './ui/index.tsx',
    mode: "development",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, _build),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules', 'ui'],
    },
    devServer: {
        contentBase: path.join(__dirname, _build),
        port: 3000,
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};