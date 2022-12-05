const path = require("path");
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, path.posix.sep);
}

module.exports = {
  toUnixPath,
};
