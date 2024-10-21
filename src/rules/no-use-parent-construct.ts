import { ESLintUtils } from "@typescript-eslint/utils";
import { findParentConstruct } from "@/utils/findParentConstruct.ts";

const createRule = ESLintUtils.RuleCreator((name) => `${name}`);

type Options = [];
type MessageIds = "noUseParentConstruct";

export default createRule<Options, MessageIds>({
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noUseParentConstruct: "Don't use parent construct",
    },
    docs: {
      description: "Don't use parent construct",
    },
    fixable: "code",
    hasSuggestions: true,
  },
  name: "no-use-parent-construct",
  defaultOptions: [],
  create: (context) => ({
    NewExpression: (node) => {
      const parent = findParentConstruct(node);
      if (!parent) return;
      for (const argument of node.arguments) {
        if (argument.type !== "Identifier") continue;
        if (argument.name === parent) {
          context.report({
            node,
            messageId: "noUseParentConstruct",
            loc: argument.loc,
            fix: (fixer) => fixer.replaceText(argument, "this"),
          });
        }
      }
    },
  }),
});
