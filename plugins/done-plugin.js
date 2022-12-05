class DonePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap("DonePlugin", () => {
      console.log("DonePlugin");
    });
  }
}

module.exports = DonePlugin;
