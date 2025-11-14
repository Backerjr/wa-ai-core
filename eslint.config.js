import globals from "globals/index.js";
import pluginJs from "@eslint/js/src/index.js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next/dist/index.js";
import pluginPrettier from "eslint-plugin-prettier";
import { FlatCompat } from "eslint-compat-utils";

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  {
    ignores: ["eslint.config.js", ".storybook/", ".next/"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends(react.configs.recommended),
  {
    files: ["**/*.{ts,tsx}", "!**/.next/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ["./tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        _N_E: "readonly",
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
        MSApp: "readonly",
        ActiveXObject: "readonly",
        Bun: "readonly",
        Deno: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...compat.extends(nextPlugin.configs.recommended).rules,
      ...compat.extends(nextPlugin.configs["core-web-vitals"]).rules,
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-case-declarations": "off",
      "react/prop-types": "off",
      "no-undef": "off",
      "no-constant-binary-expression": "off",
      "no-empty": "off",
      "no-fallthrough": "off",
      "no-func-assign": "off",
      "no-prototype-builtins": "off",
      "no-redeclare": "off",
      "no-sparse-arrays": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-unsafe-optional-chaining": "off",
      "no-unused-private-class-members": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-var-requires": "off",
      "getter-return": "off",
      "no-control-regex": "off",
      "valid-typeof": "off",
      "no-misleading-character-class": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}", "!**/.next/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        _N_E: "readonly",
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
        MSApp: "readonly",
        ActiveXObject: "readonly",
        Bun: "readonly",
        Deno: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: [".storybook/**/*.{js,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
  {
    files: ["firebase-config.js", "firebase-config.template.js"],
    languageOptions: {
      globals: {
        firebase: "readonly",
      },
    },
  },
  pluginPrettier.configs.recommended,
];