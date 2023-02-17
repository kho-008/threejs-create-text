const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, 'index.js'),
    output:
    {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    plugins:
    [
    ],
    module:
    {
        rules:
        [
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/inline',
            },
        ]
    }
}