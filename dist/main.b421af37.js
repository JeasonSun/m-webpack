(() => {
  var __webpack_modules__ = {
    "./src/index.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'const sum = __webpack_require__(/*! ./utils */ "./src/utils.js");\n\nconst result = sum(1, 3);\nconsole.log(result);\n\n\n//# sourceURL=webpack://mini-webpack/./src/index.js?'
      );
    },
    "./src/utils.js": (module) => {
      eval(
        "function sum(a, b) {\n  return a + b;\n}\nmodule.exports = sum;\n\n\n//# sourceURL=webpack://mini-webpack/./src/utils.js?"
      );
    },
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
