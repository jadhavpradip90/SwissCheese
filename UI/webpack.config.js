var config = {
    entry: './main.js',
    output: {
        path:'/',
        filename: 'index.js',
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        port: 8081
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2017', 'react']
                }
            }
        ]
    }
}
module.exports = config;