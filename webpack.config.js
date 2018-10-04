var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const dirSrc = path.join(__dirname, 'src');
const dirNode = 'node_modules';

var config = function (env, argv) {
    const IS_DEV = (argv.mode === 'development');
    return {
        devServer: {
            hot: true,
            inline: true,
            disableHostCheck: true
        },
        context: dirSrc,
        devtool: 'eval',
        output: {
            pathinfo: true,
            publicPath: '/',
            filename: '[name].js'
        },
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: false
        },
        entry: {
            index: path.join(dirSrc, 'index.pug'),
            bundle: path.join(dirSrc, 'index.js'),
            styles: path.join(dirSrc, 'styles.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].js'
        },
        module: {
            rules: [{
                    test: /\.pug$/,
                    use: ['pug-loader']
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    }, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                },
                {
                    test: /\.(gif|svg|png|pdf|pptx)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }, {
                    test: /\.(jpe?g)$/i,
                    loader: 'advanced-image-loader',
                    options: {
                        width: 1280,
                        srcset: [320, 640, 960, 1280, 1920],
                        quality: 80,
                        placeholder: 32
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'index.html',
                template: path.join(dirSrc, 'index.pug'),
            }),
            new HtmlWebpackInlineSVGPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
        ],
    }
};

module.exports = config;
