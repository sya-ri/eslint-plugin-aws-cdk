import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescript from "typescript-eslint";

export default typescript.config({
  files: ["**/*.js", "**/*.ts"],
  extends: [
    {
      files: ["**/*.{js,mjs,cjs,ts}"],
    },
    {
      languageOptions: {
        globals: globals.node,
      },
    },
    js.configs.recommended,
    ...typescript.configs.recommended,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
  ],
});
