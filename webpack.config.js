const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            m: 'mithril',
        }),
    ],
};