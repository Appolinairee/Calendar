const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './demo/App.js',
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