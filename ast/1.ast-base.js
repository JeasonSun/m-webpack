const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");

const sourceCode = `function astDemo(){ console.log('ast demo');}`;

const ast = esprima.parse(sourceCode);
// console.log(ast);

let index = 0;
const padding = () => " ".repeat(index);

estraverse.traverse(ast, {
  enter(code) {
    console.log(padding(), "进入", code.type);
    if (code.type === "FunctionDeclaration") {
      code.id.name = "trans" + code.id.name;
    }
    index += 4;
  },
  leave(code) {
    console.log(padding(), "离开", code.type);
    index -= 4;
  },
});

const target = escodegen.generate(ast);
console.log(target);
