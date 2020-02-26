const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: __dirname + '/../main.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/test/dist/',
        pathinfo: true,
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.worker\.m?js$/,
                use: [
                    { loader: 'worker-loader' },
                ]
            },
            {
                test: /libffmpeg\.wasm$/,
                type: "javascript/auto",
                loader: 'file-loader',
                options: {
                    publicPath: './', // 相对 libffmpeg.mjs 的路径
                }
            },
            {
                test: /libffmpeg\.m?js$/,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'string-replace-loader',
                        options: {
                            // flags: 'i',
                            // search: /(['"])libffmpeg\.wasm\1/.source,
                            // replace: 'require($1./libffmpeg.wasm$1).default',
                            search: '"libffmpeg.wasm"',
                            replace: 'require("./libffmpeg.wasm").default',
                        }
                    }, {
                        loader: 'string-replace-loader',
                        options: {
                            search: 'import.meta.url',
                            replace: '""',
                        }
                    }
                ]
            }
        ]
    },
    node: {
        fs: 'empty',
        path: 'empty',
        crypto: 'empty',
    }
}