import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      // Style & safety
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-undef": "error",
      "no-console": "off", // MCP servers need console.error

      // Code quality
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],

      // Node / async
      "no-floating-promises": "off"
    }
  }
];
