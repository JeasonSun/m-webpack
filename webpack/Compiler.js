const { SyncHook } = require("tapable");
const { toUnixPath } = require("./utils");
const path = require("path");
const fs = require("fs");
class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook(),
    };
    this.entrypoints = {};
  }

  run() {
    this.hooks.run.call();
    // 5. 从入口文件执行编译，调用loaders
    const entry = this.options.entry;
    if (typeof entry === "object") {
      for (let e in entry) {
        if (entry.hasOwnProperty(e)) {
          this.entrypoints[e] = toUnixPath(
            path.join(this.options.context, entry[e])
          );
        }
      }
    } else {
      this.entrypoints.main = toUnixPath(
        path.join(this.options.context, entry)
      );
    }
    this.buildModules();
    this.hooks.done.call();
  }

  buildModules() {
    console.log(this.entrypoints);
    for (let entry in this.entrypoints) {
      const modulePath = this.entrypoints[entry];
      this.buildModule(modulePath);
    }
  }
  buildModule(modulePath) {
    const rawSourceCode = fs.readFileSync(modulePath, 'utf8');
    const rules = this.options.module.rules;
    let loaders = [];
    for (let rule of rules) {
      if (rule.test.test(modulePath)) {
        loaders = [...loaders, ...rule.use];
      }
    }

    // console.log(loaders);
    let targetCode = rawSourceCode;
    for (let loader of loaders) {
      targetCode = require(loader)(targetCode);
    }
    console.log(targetCode, rawSourceCode);
  }
}

module.exports = Compiler;
