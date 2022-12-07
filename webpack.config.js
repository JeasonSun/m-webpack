const { resolve } = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BabelPluginImport = require('./webpack-plugins/babel-plugin-import');
const RunPlugin = require("./plugins/run-plugin");
const DonePlugin = require("./plugins/done-plugin");
const ReadmePlugin = require('./plugins/readme-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  context: process.cwd(),
  entry: {
    "page1":"src/page1.js",
    "page2":"src/page2.js",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          resolve(__dirname, "loaders", "logger1-loader.js"),
          resolve(__dirname, "loaders", "logger2-loader.js"),
          resolve(__dirname, "loaders", "logger3-loader.js"),
          resolve(__dirname, "loaders", "logger4-loader.js"),
        ],
      },
    ],
  },
  plugins: [new RunPlugin(), new DonePlugin(), new ReadmePlugin()],
};
