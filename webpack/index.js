const Compiler = require("./Compiler");
function webpack(options) {
  // 1. 构建配置对象，合并shell配置和options
  const shellConfig = process.argv.slice(2).reduce((shellConfig, item) => {
    const [key, value] = item.split("=");
    shellConfig[key.slice(2)] = value;
    return shellConfig;
  }, {});
  const finalConfig = Object.assign({}, options, shellConfig);
  // console.log(finalConfig)
  // 2. 构建compiler
  const compiler = new Compiler(finalConfig);

  // 3. 挂载配置的plugins
  const plugins = finalConfig.plugins;
  if (plugins && Array.isArray(plugins)) {
    for (let plugin of plugins) {
      plugin.apply(compiler);
    }
  }

  // 4. 等待compiler.run
  return compiler;
}

module.exports = webpack;
