const { SyncHook } = require("tapable");
const { toUnixPath, tryExtensions } = require("./utils");
const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require("babel-types");

const baseDir = process.cwd();

class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook(),
    };
    this.entrypoints = {};
    this.modules = [];
    this.chunks = [];
    this.assets = {};
    this.files = [];
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
    console.log(JSON.stringify(this.modules, null, 2));
    console.log(JSON.stringify(this.chunks, null, 2));

    this.chunks.forEach((chunk) => {
      const outputFileName = this.options.output.filename.replace('[name]', chunk.name );
      this.assets[outputFileName] = getSource(chunk);
    });
    this.files = Object.keys(this.assets);
    for (let file in this.assets) {
      const targetPath = path.join(this.options.output.path, file);
      fs.writeFileSync(targetPath, this.assets[file]);
    }

    this.hooks.done.call();
  }

  buildModules = () => {
    for (let entry in this.entrypoints) {
      const modulePath = this.entrypoints[entry];
      const entryModule = this.buildModule(entry, modulePath);
      // this.modules.push(entryModule);
      const chunk = {
        name: entry,
        entryModule,
        modules: this.modules.filter((module) => module.entryName === entry),
      };
      this.chunks.push(chunk);
    }
  };
  buildModule(entryName, modulePath) {
    const moduleId = "./" + path.relative(baseDir, modulePath);
    const module = {
      id: moduleId,
      dependencies: [],
      entryName,
    };
    const rawSourceCode = fs.readFileSync(modulePath, "utf8");
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
    // console.log(targetCode, rawSourceCode);

    const astTree = parser.parse(targetCode);
    traverse(astTree, {
      CallExpression: ({ node }) => {
        if (node.callee.name === "require") {
          // 分析require('./title')中的dependence
          // 把路径改为全局路径
          let moduleName = node.arguments[0].value;
          const dirName = path.posix.dirname(modulePath);
          let depModulePath = path.posix.join(dirName, moduleName);
          const extensions = ["", ...(this.options.resolve.extensions || [])];
          depModulePath = tryExtensions(depModulePath, extensions);
          console.log(depModulePath);
          const depModuleId = "./" + path.relative(baseDir, depModulePath);
          node.arguments = [types.stringLiteral(depModuleId)];
          module.dependencies.push(depModulePath);
        }
      },
    });
    let { code } = generator(astTree);
    // console.log(code);
    module._source = code;

    module.dependencies.forEach((depPath) => {
      const depModule = this.buildModule(entryName, depPath);
      this.modules.push(depModule);
    });
    return module;
  }
}

//{ name: entry, entryModule, modules: this.modules };
function getSource(chunk) {
  return `
  (() => {
    var modules = {
      ${chunk.modules
        .map(
          (module) => `"${module.id}": (module, exports, require) => {
        ${module._source}
      }`
        )
        .join(",")}
    };
    var cache = {};
    function require(moduleId) {
      var cachedModule = cache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = (cache[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    (() => {
      ${chunk.entryModule._source}
    })();
  })();
  
  `;
}

module.exports = Compiler;
