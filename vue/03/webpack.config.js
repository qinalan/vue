const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


const isDev = process.env.NODE_ENV === "development";
const config = {
    mode: "development",
    entry: path.join(__dirname, "client/index.js"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|jpeg|gif|svg|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 1024,
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader","css-loader","sass-loader"]
            }
        ]
    }
}

if (isDev) {
    config.devServer = {
        port: "8080",
        host: "localhost",
        overlay: {
            errors: true
        },
        open: true,
        hotOnly: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;