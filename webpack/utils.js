const path = require("path");
const fs = require("fs");
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, path.posix.sep);
}

function tryExtensions(modulePath, extensions) {
  // console.log(modulePath, extensions)
  for (let i = 0; i < extensions.length; i++) {
    if (fs.existsSync(modulePath + extensions[i])) {
      return modulePath + extensions[i];
    }
  }
  // throw new Error('Module not Found ')
}

module.exports = {
  toUnixPath,
  tryExtensions,
};
