const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.jsx'],
    output: {
        path: resolvePath('dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    plugins: [
        new HTMLWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin(),
        new DefinePlugin({
            REACT_APP_CLIENT_URL: "'http://localhost:3000'",
            REACT_APP_SERVER_URL: "'http://localhost:5000'",
        }),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            '@': resolvePath('./src'),
            '@vars': resolvePath('./src/common'),
        },
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: true } },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                    },
                },
            },
        ],
    },
};
