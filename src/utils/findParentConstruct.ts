import { TSESTree } from "@typescript-eslint/utils";

export const findParentConstruct = (
  node: TSESTree.Node,
): string | undefined => {
  const parent = node.parent;
  if (!parent) return;
  if (parent.type === "FunctionExpression") {
    for (const param of parent.params) {
      if (param.type !== "Identifier") continue;
      const typeNode = param.typeAnnotation?.typeAnnotation;
      if (
        !typeNode ||
        typeNode.type !== "TSTypeReference" ||
        typeNode.typeName.type !== "Identifier" ||
        typeNode.typeName.name !== "Construct"
      )
        continue;
      return param.name;
    }
  }
  return findParentConstruct(parent);
};
