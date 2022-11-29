# webpack 原理

## 手写简单 bundle, 同步加载

```javascript
(() => {
  // 1. 由webpack构建 __webpack_modules__ 映射关系
  var __webpack_modules__ = {
    "./src/index.js": (module, exports, require) => {
      const sum = require("./src/utils.js");

      const result = sum(1, 3);
      console.log(result);
    },
    "./src/utils.js": (module, exports, require) => {
      function sum(a, b) {
        return a + b;
      }
      module.exports = sum;
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

  // 4. require行入口文件
  __webpack_require__("./src/index.js");
})();
```

## commonjs 文件引用 esm 文件

- webpack 会将 esm 文件编译成 cjs 文件
- `__webpack_require__.r` : 用来标识这个文件是 esModule 类型的
- `__webpack_require__.d` : 用来定义 exports 的属性
- `__webpack_require__.o` : hasOwnProperty 方法

调用`__webpack_require__.d`，传入的`definition` 是包含了 `default` 和其他`export`属性的`get`方法。
