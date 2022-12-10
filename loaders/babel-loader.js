const core = require("@babel/core");
function loader(source, inputSourceMap, data) {
  const options = {
    presets: ["@babel/preset-env"],
    inputSourceMap,
    sourceMaps: true,
    filename: this.resourcePath
  };
  const { code, ast, map } = core.transform(source, options);
  this.callback(null, code, map, ast);
}

module.exports = loader;
