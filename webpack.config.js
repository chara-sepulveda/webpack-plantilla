const HtmlWebPack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const Copy = require('copy-webpack-plugin')
module.exports = {
    mode: 'development',
    output: {
        clean: true,
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
            }
        ],
    },
    optimization:{},
    plugins: [
        new HtmlWebPack({
            title:'Mi Webpack App',
            template: './src/index.html'
        }),
    new MiniCssExtract({
        filename: '[name].css',
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