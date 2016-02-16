//http://survivejs.com/webpack_react/webpack_and_react/

module.exports = {
    entry: './main.js',
    output: {
        path: __dirname + "/js",
        filename: "bundle.js",
        publicPath: "/js/",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?cacheDirectory'
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};