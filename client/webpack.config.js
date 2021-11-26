const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            hash: true
        }),
        new Dotenv({
            defaults: true
        }),
        new RemovePlugin({
            before: {
                include: ['./dist']
            }
        })
    ],
    devServer: {
        hot: true
    },
    devtool: 'source-map'
};
