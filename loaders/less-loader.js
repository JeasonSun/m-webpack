const less = require("less");
function loader(source) {
  const callback = this.async();
  less.render(source, { filename: this.resource }, (error, output) => {
    callback(error, output.css);
  });
}

module.exports = loader;
