import tseslint, { parser as tseslintParser } from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config({
  files: ["**/*.{js,mjs,cjs,ts}"],
  ignores: [
    "runtimes/encore/.encore/**",
    "runtimes/encore/encore.gen/**",
    "eslint.config.js",
  ],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    parser: tseslintParser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      warnOnUnsupportedTypeScriptVersion: false,
    },
    globals: {
      Bun: true,
      Deno: true,
    },
  },
});
