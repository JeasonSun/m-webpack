class RunPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap("RunPlugin", () => {
      console.log("RunPlugin");
    });
  }
}

module.exports = RunPlugin;
