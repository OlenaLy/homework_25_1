const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path:  path.resolve(__dirname, "client"),
        filename: "bundle[fullhash].js",
        clean: true
    },
    mode: 'development',
    plugins: [
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new CssPlugin({
            filename: 'style[fullhash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "edge": "17",
                                        "firefox": "60",
                                        "chrome": "68",
                                        "safari": "11.1",
                                        "ie": "9"
                                    }
                                }
                            ],
                            '@babel/preset-react',
                        ]
                    }
                },
            },
            {
                test: /\.css$/,
                use: [
                    CssPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:  /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    devServer: {
        port: 5000,
        static: {
            directory: path.join(__dirname, 'client')
        },
        open: true
    }
};