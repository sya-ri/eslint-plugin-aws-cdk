import {
  name as packageName,
  version as packageVersion,
} from "../package.json";
import noUseParentConstruct from "@/rules/no-use-parent-construct.ts";
import { TSESLint } from "@typescript-eslint/utils";

const ruleSets = {
  "no-use-parent-construct": {
    rule: noUseParentConstruct,
    all: "error",
    recommend: "error",
  },
} satisfies Record<
  string,
  {
    rule: TSESLint.RuleModule<string>;
    all: TSESLint.Linter.RuleLevel;
    recommend: TSESLint.Linter.RuleLevel;
  }
>;

const rules = Object.fromEntries(
  Object.entries(ruleSets).map(([key, { rule }]) => [key, rule]),
);

const allRules = Object.fromEntries<TSESLint.Linter.RuleLevel>(
  Object.entries(ruleSets).map(([key, { all }]) => [`aws-cdk/${key}`, all]),
);

const recommendedRules = Object.fromEntries<TSESLint.Linter.RuleLevel>(
  Object.entries(ruleSets).map(([key, { recommend }]) => [
    `aws-cdk/${key}`,
    recommend,
  ]),
);

const plugin = {
  meta: {
    name: packageName,
    version: packageVersion,
  },
  configs: {} as Record<
    "all" | "recommended" | "flat/all" | "flat/recommended",
    Pick<Required<TSESLint.ClassicConfig.Config>, "rules">
  >,
  rules,
};

const createRCConfig = (rules: Record<string, TSESLint.Linter.RuleLevel>) => ({
  plugins: ["aws-cdk"],
  rules,
});

const createFlatConfig = (
  rules: Record<string, TSESLint.Linter.RuleLevel>,
) => ({
  plugins: { "aws-cdk": plugin },
  rules,
});

plugin.configs = {
  all: createRCConfig(allRules),
  recommended: createRCConfig(recommendedRules),
  "flat/all": createFlatConfig(allRules),
  "flat/recommended": createFlatConfig(recommendedRules),
};

export default plugin;
