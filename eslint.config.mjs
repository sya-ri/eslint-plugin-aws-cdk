import globals from "globals";
import js from "@eslint/js";
import typescript from "typescript-eslint";

export default [
    {files: ["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: {globals: globals.node}},
    js.configs.recommended,
    ...typescript.configs.recommended,
];
