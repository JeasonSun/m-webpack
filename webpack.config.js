const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BabelPluginImport = require('./webpack-plugins/babel-plugin-import');
const RunPlugin = require("./plugins/run-plugin");
const DonePlugin = require("./plugins/done-plugin");
const ReadmePlugin = require("./plugins/readme-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  context: process.cwd(),
  entry: {
    // page1: "./src/page1.js",
    // page2: "./src/page2.js",
    main: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: join(__dirname, "dist"),
    },
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  resolveLoader: {
    modules: [resolve(__dirname, "loaders"), "node_modules"],
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     // resolve(__dirname, "loaders", "logger1-loader.js"),
      //     // resolve(__dirname, "loaders", "logger2-loader.js"),
      //     // resolve(__dirname, "loaders", "logger3-loader.js"),
      //     // resolve(__dirname, "loaders", "logger4-loader.js"),
      //     "babel-loader",
      //   ],
      //   include: [resolve(__dirname, "src")],
      // },
      // {
      //   test: /\.(jpg|jpeg|png|gif)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[hash:8].[ext]",
      //       },
      //     },
      //   ],
      //   include: [resolve(__dirname, "src")],
      // },
      {
        test: /\.less$/,
        use: ["style-loader", "less-loader"],
        include: [resolve(__dirname, "src")],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: "/",
    }),
    // new RunPlugin(), new DonePlugin(), new ReadmePlugin()
  ],
};
