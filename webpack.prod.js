const HtmlWebPack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const Copy = require('copy-webpack-plugin')
const CssMinimizer = require('css-CssMinimizer-webpack-plugin')
const terser = require('terser-webpack-plugin')
module.exports = {
    mode: 'development',
    output: {
        clean: true,
        filename:'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test:/\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\/,css$/,
                exclude: /style.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /style.css$/,
                use:[ MiniCssExtract.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        present:['@babel/present-env'],
                    },
                },
            },
        ],
    },
    optimization:{
        minimize: true,
        minimizer:[new CssMinimizer(), new terser()],
    },
    plugins: [
        new HtmlWebPack({
            title:'Mi Webpack App',
            template: './src/index.html'
        }),
    new MiniCssExtract({
        filename: '[name].[fullhash].css',
        ignoreOrder: false,
        }),
        new Copy({
            patterns:[{from: 'src/assest', to: 'assest'}],
        }),
    ],
devServer: {watchFiles:['src/*.html'],
hot: true,
},

}