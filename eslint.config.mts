/// <reference types="node" />

import js from "@eslint/js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginSonarjs from "eslint-plugin-sonarjs";
import pluginSecurity from "eslint-plugin-security";
import globals from "globals";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      "simple-import-sort": pluginSimpleImportSort,
      unicorn: pluginUnicorn,
      sonarjs: pluginSonarjs,
      security: pluginSecurity,
    },
    rules: {
      // ──────────────────────────────────
      // 1. TypeScript strictness
      // ──────────────────────────────────
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit" },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",

      // ──────────────────────────────────
      // 2. Class member order (as written)
      // ──────────────────────────────────
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "static-field",
              "public-field",
              "protected-field",
              "private-field",
              "constructor",
              "public-get",
              "protected-get",
              "private-get",
              "public-set",
              "protected-set",
              "private-set",
              "public-method",
              "protected-method",
              "private-method",
            ],
            order: "as-written",
          },
        },
      ],

      // ──────────────────────────────────
      // 3. General style rules
      // ──────────────────────────────────
      "no-console": "warn",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/sort-type-constituents": "error",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

      // ──────────────────────────────────
      // 4. Unicorn – modern JS/TS best practices
      // ──────────────────────────────────
      "unicorn/prefer-node-protocol": "error",
      "unicorn/throw-new-error": "error",
      "unicorn/prefer-array-flat": "warn",
      "unicorn/no-array-for-each": "warn",

      // ──────────────────────────────────
      // 5. SonarJS – bug detection & code smells
      // ──────────────────────────────────
      "sonarjs/cognitive-complexity": ["warn", 15],

      // ──────────────────────────────────
      // 6. Security – detect potential vulnerabilities
      // ──────────────────────────────────
      "security/detect-object-injection": "warn",

      // ──────────────────────────────────
      // 7. Naming convention
      // ──────────────────────────────────
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "class", format: ["PascalCase"] },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        { selector: "typeAlias", format: ["PascalCase"] },
        { selector: "variable", format: ["camelCase", "UPPER_CASE"], leadingUnderscore: "allow" },
        { selector: "function", format: ["camelCase"] },
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },
        { selector: "enumMember", format: ["PascalCase"] },
        { selector: "memberLike", modifiers: ["private"], format: ["camelCase"], leadingUnderscore: "require" },
        { selector: "memberLike", modifiers: ["protected"], format: ["camelCase"], leadingUnderscore: "require" },
        { selector: "memberLike", format: ["camelCase"], leadingUnderscore: "forbid" },
      ],

      // ──────────────────────────────────
      // 8. Restricted imports
      // ──────────────────────────────────
      "no-restricted-imports": ["error", {
          patterns: ["**/environment.development*"]
      }],
    },
  },

  prettierConfig,
];
