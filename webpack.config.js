const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'development',
  devtool:"source-map",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js",
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin()],
};
