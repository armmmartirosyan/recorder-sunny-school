const HtmlWebpackPlugin = require('html-webpack-plugin');

const RULES = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
    },
    {
        test: /\.(scss|sass)$/i,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ],
    },
    {
        test: /\.css$/i,
        use: [
            "style-loader",
            "css-loader"
        ],
    },
];

const PLUGINS = [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    })
]

module.exports = {
    entry: "./src/index.tsx",
    plugins: PLUGINS,
    module: {
        rules: RULES
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        open: true,
        hot: true,
        port: 3000
    }
}
