const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    'app': path.resolve(__dirname, "./src/js/index.js"),
    'campus-map': path.resolve(__dirname, "./src/js/interactive-campus-map.js"),
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve( __dirname, "build" ),
    publicPath: "/build"
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    })
  ],
};