(() => {
  // 1. 由webpack构建 __webpack_modules__ 映射关系
  var __webpack_modules__ = {
    "./src/index.js": (module, exports, require) => {
      const title = require("./src/title.js");
      console.log(title);
      console.log(title.age);
    },

    "./src/title.js": (module, exports, require) => {
      __webpack_require__.r(exports);
      __webpack_require__.d(exports, {
        age: () => age,
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });

      const title = "title_name";
      const __WEBPACK_DEFAULT_EXPORT__ = title;
      const age = "title_age";
    },
  };

  // 2. 构建缓存
  var __webpack_module_cache__ = {};

  // 3. 定义require方法
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // 如果没有module缓存，构建module，并且缓存
    var module = {
      exports: {},
    };
    cachedModule = __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    __webpack_module_cache__[moduleId] = cachedModule;
    return module.exports;
  }

  // 5. 定义__webpack_require__.r 函数
  __webpack_require__.r = (exports) => {
    // 5.1 toStringTag
    if (typeof Symbol !== undefined && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };

  // 6. 定义 __webpack_require__.d 函数
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (
        __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key)
      ) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        });
      }
    }
  };

  __webpack_require__.o = (obj, prop) =>
    Object.prototype.hasOwnProperty.call(obj, prop);

  // 4. require行入口文件
  __webpack_require__("./src/index.js");
})();
