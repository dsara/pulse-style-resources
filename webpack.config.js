var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./config/helpers.js');
var path = require("path");
// var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'dev';

module.exports = {
    entry: {
        "uu.sp.alertsdrawer": "./alerts-drawer/index.tsx",
        "uu.cp.alertsdrawer.vendor": "./alerts-drawer/vendor.tsx"
    },

    externals: {
        jquery: 'jQuery'
    },

    // Enable souremaps for debugging webpack's output
    // devtool: "source-map",

    output: {
        path: helpers.root('./alerts-drawer/dist'),
        filename: '[name].js',
        jsonpFunction: "webpackCustomAlertsDrawer",
        chunkFilename: '[id].[hash].chunk.js'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"],
        modules: [
             path.resolve("./alerts-drawer"),
             path.resolve("./node_modules")
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.scss$/,
                include: [helpers.root('alerts-drawer')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMaps: true } },
                        { loader: 'sass-loader', options: { sourceMaps: true } }
                    ]
                })
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
            //{ test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" }
        ],

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: "source-map-loader" }
        // ]
    },

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['app', 'polyfills']
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['uu.sp.alertsdrawer', 'uu.cp.alertsdrawer.vendor']
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: ({ resource }) => /node_modules/.test(resource)
        // }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].[hash].map',
            exclude: /vendor\.(css|js)$/
        }),
        //new HtmlWebpackPlugin({
        //    template: 'src/index.html'
        //}),

        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: {
        //         keep_fnames: true
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
        new ExtractTextPlugin('../../alerts-drawer/dist/[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                "ENV": JSON.stringify(ENV)
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jq$': 'jquery',
            'jQuery': 'jquery',
            "window.jQuery": 'jquery',
            "moment": "moment"
        })
        // new WebpackCleanupPlugin()
    ]
    // externals: {
    //     "jquery": "jQuery"
    // }
};