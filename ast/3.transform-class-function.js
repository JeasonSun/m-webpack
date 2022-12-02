const core = require("@babel/core");
const types = require("babel-types");

const sourceCode = `
class Person{
	constructor(name){
    	this.name = name;
    }
  	
  	getName(){
    	return this.name;
    }
}
`;

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

const targetCode = core.transform(sourceCode, {
  plugins: [TransformClassFunction],
});

console.log(targetCode.code);
