class ReadMePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tap("ReadMePlugin", () => {
      compiler.assets["README.md"] = "readme content";
    });
  }
}

module.exports = ReadMePlugin;
