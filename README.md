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

## esm load esm

## esm load commonjs

- `__webpack_require__.n`

```javascript
function __webpack_require__() {}
__webpack_require__.n = (exports) => {
  var getter = exports.__esModule ? () => exports.default : exports;
  return getter;
};
```

## lazy load

# AST

## AST 的基本流程

- esprima
- estraverse
- escodegen

## Babel

### babel-plugin-transform-es2015-arrow-functions

```javascript
// 每一个babel-plugin 都是一个对象
const TransformArrowFunctions = {
  // visitor是一个访问器，当访问都某一个节点，会尝试看一下是否有注册的访问方法。
  visitor: {
    ArrowFunctionExpression: (nodePath) => {
      const node = nodePath.node;
      const thisEnvFn = hoistFunctionEnvironment(nodePath);
      // 看一下当前代码中是否有用到this
      const thisPaths = getScopeInformation(nodePath);

      let thisBinding = "_this";
      if (thisPaths.length > 0) {
        // 如果在箭头函数中有使用到this，那么应该在找到上层this，并且定义一个_this变量，供箭头函数中使用
        thisEnvFn.scope.push({
          id: types.identifier(thisBinding),
          init: types.thisExpression(),
        });

        thisPaths.forEach((thisChild) => {
          thisRef = types.identifier(thisBinding);
          thisChild.replaceWith(thisRef);
        });
      }

      node.type = "FunctionExpression";
    },
  },
};

function hoistFunctionEnvironment(fnPath) {
  // 找到this的作用域范围
  const thisEnvFn = fnPath.findParent((p) => {
    if (p.isArrowFunctionExpression()) {
      return false;
    }
    return p.isFunction() || p.isProgram();
  });

  return thisEnvFn;
}

function getScopeInformation(fnPath) {
  const thisPaths = [];
  fnPath.traverse({
    ThisExpression: (thisPath) => {
      thisPaths.push(thisPath);
    },
  });
  return thisPaths;
}
```

### transform-class-function

```javascript
const TransformClassFunction = {
  visitor: {
    ClassDeclaration(nodePath) {
      const { node } = nodePath;
      const { id } = node; // id : Person
      const functions = node.body.body; // []
      const body = [];
      functions.forEach((fn) => {
        if (fn.kind === "constructor") {
          const method = types.functionDeclaration(
            id,
            fn.params,
            fn.body,
            fn.generator,
            fn.async
          );
          body.push(method);
        }
        if (fn.kind === "method") {
          const left = types.memberExpression(
            types.memberExpression(id, types.identifier("prototype")),
            fn.key
          );
          const right = types.functionExpression(
            null,
            fn.params,
            fn.body,
            fn.generator,
            fn.async
          );
          const method = types.assignmentExpression("=", left, right);
          body.push(method);
        }
      });

      nodePath.replaceWithMultiple(body);
    },
  },
};
```

# webpack的编译流程
## 编译流程概述
* 初始化参数： 从配置文件和shell语句中读取与合并参数，得到最终的配置对象。
* 用上一步得到的配置对象初始化Compiler对象。
* 加载所有配置的插件。
* 执行compiler对象的run方法，开始执行编译。
