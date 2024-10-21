import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "@/rules/no-use-parent-construct.ts";
import * as fs from "node:fs";
import * as path from "node:path";

const ruleTester = new RuleTester();

ruleTester.run("no-use-parent-construct", rule, {
  valid: [
    "valid-construct",
    "valid-construct-direct",
    "valid-resource",
    "valid-resource-direct",
    "valid-stack",
    "valid-stack-direct",
    "valid-method",
  ].map((file) => ({
    code: fs.readFileSync(
      path.join(__dirname, `./no-use-parent-construct/${file}.ts`),
      "utf-8",
    ),
  })),
  invalid: (
    [
      ["invalid-construct", 8, 19],
      ["invalid-construct-direct", 8, 16],
      ["invalid-resource", 8, 19],
      ["invalid-resource-direct", 8, 16],
      ["invalid-stack", 9, 19],
      ["invalid-stack-direct", 9, 16],
      ["invalid-method", 13, 16],
    ] as const
  ).map(([file, line, column]) => ({
    code: fs.readFileSync(
      path.join(__dirname, `./no-use-parent-construct/${file}.ts`),
      "utf-8",
    ),
    output: fs.readFileSync(
      path.join(__dirname, `./no-use-parent-construct/${file}.output.ts`),
      "utf-8",
    ),
    errors: [
      {
        messageId: "noUseParentConstruct",
        line,
        column,
      },
    ],
  })),
});
