var RewirePlugin = require("rewire-webpack");

module.exports = function(config) {
    config.set({
        browsers: ['SlimerJS'],
        files: [{
            pattern: 'tests.webpack.js',
            watched: false
        }, ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests.webpack.js': ['webpack'],
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: {
            plugins: [
                new RewirePlugin()
            ],
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }, {
                    test: /\.json$/,
                    loader: 'json-loader'
                }],
            },
            watch: true,
        },
        webpackServer: {
            noInfo: true,
        },
    });
};
