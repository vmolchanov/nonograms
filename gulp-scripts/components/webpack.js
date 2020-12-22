const webpack = require('webpack-stream');

module.exports = () => webpack({
    entry: './src/js/index.js',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [['@babel/preset-env']],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-private-methods'
                    ]
                }
            }
        ]
    }
});