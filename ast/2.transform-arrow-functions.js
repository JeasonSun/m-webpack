const core = require("@babel/core");
const types = require("babel-types");
// const TransformArrowFunctions = require("babel-plugin-transform-es2015-arrow-functions");
const sourceCode = `
  const sum = (a, b) => { 
    console.log(this);
    return a + b; 
  }
`;
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

const targetCode = core.transform(sourceCode, {
  plugins: [TransformArrowFunctions],
});

console.log(targetCode.code);
