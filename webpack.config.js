const { resolve } = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BabelPluginImport = require('./webpack-plugins/babel-plugin-import');
const RunPlugin = require("./plugins/run-plugin");
const DonePlugin = require("./plugins/done-plugin");
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  // module: {
  //   rules: [
  //     {
  //       test: /.js$/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           plugins: [
  //             [
  //               BabelPluginImport,
  //               // 'import',
  //               {
  //                 libraryName: "lodash",
  //                 libraryDirectory: "fp",
  //               },
  //             ],
  //           ],
  //         },
  //       },
  //     },
  //   ],
  // },
  // plugins: [new HtmlWebpackPlugin()],
  plugins: [new RunPlugin(), new DonePlugin()],
};
