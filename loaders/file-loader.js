const { interpolateName } = require("loader-utils");

function loader(content) {
  
  const options = this.query;
  const url = interpolateName(this, options.name, { content });
  let outputPath = url;

  this.emitFile(outputPath, content);
  
  if (options.esModule || typeof options.esModule === "undefine") {
    return `export default "${outputPath}"`;
  } else {
    return `module.exports = "${outputPath}"`;
  }
}

module.exports = loader;
