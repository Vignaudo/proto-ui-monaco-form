const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        static: './dist',
        hot: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://mano-ui-api:8200',
                pathRewrite: { '^/api': '/api' },
                changeOrigin: true,
            },
            {
                context: ['/auth'],
                target: 'http://mano-auth',
                pathRewrite: { '^/auth': '/auth' },
                changeOrigin: true,
            },
        ],
    },
};