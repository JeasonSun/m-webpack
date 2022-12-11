const webpack = require("webpack");
const { RawSource } = webpack.sources;
class AssetsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("AssetsPlugin", (compilation, callback) => {
      debugger
      const assetsList = [];
      for (let file in compilation.assets) {
        const fileInfo = compilation.assets[file];
        assetsList.push(`${file}  ${fileInfo.source().length} bytes`);
      }
      compilation.assets["assets.md"] = new RawSource(assetsList.join('\n'));
      callback();
    });
  }
}

module.exports = AssetsPlugin;
