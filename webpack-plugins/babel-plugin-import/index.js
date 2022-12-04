const types = require("babel-types");
const babelPluginImport = (babel) => {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const { node } = path;
        const { opts } = state;
        const specifiers = node.specifiers;
        const source = node.source;

        if (
          opts.libraryName === source.value &&
          !types.isImportDefaultSpecifier(specifiers[0])
        ) {
          const newSpecifiers = specifiers.map((spec) => {
            const importSpecifiers = types.importDefaultSpecifier(spec.local);
            const libName = opts.libraryName;
            const libDir = opts.libraryDirectory || "lib";
            return types.importDeclaration(
              [importSpecifiers],
              types.stringLiteral(
                libName + "/" + libDir + "/" + spec.imported.name
              )
            );
          });

          path.replaceWithMultiple(newSpecifiers);
        }
      },
    },
  };
};
module.exports = babelPluginImport;
