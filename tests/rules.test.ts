import plugin from "../src/index.ts";
import * as path from "node:path";
import * as fs from "node:fs";

const ruleNames = Object.keys(plugin.rules);
const numberOfRules = 1;

describe("rules", () => {
  it("should have a corresponding doc for each rule", () => {
    ruleNames.forEach((rule) => {
      const docPath = path.resolve(__dirname, "../docs/rules", `${rule}.md`);

      if (!fs.existsSync(docPath)) {
        throw new Error(
          `Could not find documentation file for rule "${rule}" in path "${docPath}"`,
        );
      }
    });
  });

  it("should have a corresponding test for each rule", () => {
    ruleNames.forEach((rule) => {
      const testPath = path.resolve(__dirname, "./rules/", `${rule}.test.ts`);

      if (!fs.existsSync(testPath)) {
        throw new Error(
          `Could not find test file for rule "${rule}" in path "${testPath}"`,
        );
      }
    });
  });

  it("should have the correct amount of rules", () => {
    const { length } = ruleNames;

    if (length !== numberOfRules) {
      throw new Error(
        `There should be exactly ${numberOfRules} rules, but there are ${length}. If you've added a new rule, please update this number.`,
      );
    }
  });

  it("should export configs that refer to actual rules", () => {
    const expectAwsCdkPlugin = expect.objectContaining({
      meta: {
        name: "eslint-plugin-aws-cdk",
        version: expect.any(String),
      },
    });

    const recommendedConfigs = plugin.configs;

    expect(recommendedConfigs).toMatchSnapshot({
      "flat/recommended": { plugins: { "aws-cdk": expectAwsCdkPlugin } },
      "flat/all": { plugins: { "aws-cdk": expectAwsCdkPlugin } },
    });
    expect(Object.keys(recommendedConfigs)).toEqual([
      "all",
      "recommended",
      "flat/all",
      "flat/recommended",
    ]);
    expect(Object.keys(recommendedConfigs.all.rules)).toHaveLength(
      ruleNames.length,
    );
    const allConfigRules = Object.values(recommendedConfigs).flatMap((config) =>
      Object.keys(config.rules ?? {}),
    );

    allConfigRules.forEach((rule) => {
      const ruleNamePrefix = "aws-cdk/";
      const ruleName = rule.slice(ruleNamePrefix.length);

      expect(rule.startsWith(ruleNamePrefix)).toBe(true);
      expect(ruleNames).toContain(ruleName);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      expect(() => require(`../src/rules/${ruleName}`)).not.toThrow();
    });
  });
});
