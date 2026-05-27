/// <reference types="node" />

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import parserTs from "@typescript-eslint/parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],

    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      // ──────────────────────────────────
      // 1. Import order
      // ──────────────────────────────────
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:"],
            ["^[a-zA-Z]"],
            ["^@angular"],
            ["^@?\\w"],
            ["^\\./"],
            ["^\\../"],
          ],
        },
      ],
      "simple-import-sort/exports": "error"
    }
}]