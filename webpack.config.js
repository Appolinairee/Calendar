const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/Calendar.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],

            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            m: 'mithril',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
};
