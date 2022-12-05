// const webpack = require("webpack");
const webpack = require("./webpack");
const options = require("./webpack.config");
debugger
const compiler = webpack(options);

// compiler.run((err, stat) => {
//   console.log(
//     JSON.stringify(
//       stat.toJson({
//         assets: true,
//         modules: true,
//         chunks: true,
//         entries: true,
//       }),
//       null,
//       2
//     )
//   );
// });

compiler.run();
