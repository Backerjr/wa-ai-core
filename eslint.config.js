import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default tseslint.config(
  {
    // Global ignores for common Next.js build and output directories
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "eslint.config.js",
      ".storybook/",
      "firebase-config.js",
      "firebase-config.template.js",
      "my-firebase-app/**",
      "postcss.config.js",
      "tailwind.config.js",
      "next.config.mjs",
    ],
  },


  ...tseslint.configs.recommendedTypeChecked, // TypeScript recommended rules with type checking
  {
    // Configuration for JavaScript and TypeScript files
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: {
      parser: tseslint.parser, // Use the TypeScript ESLint parser
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"], // Specify your tsconfig.json for type-aware linting
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        // Add any other global variables your project uses
        _N_E: "readonly",
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
        MSApp: "readonly",
        ActiveXObject: "readonly",
        Bun: "readonly",
        Deno: "readonly",
        firebase: "readonly",
      },
    },
    plugins: {
      react: pluginReact,
      "@next/next": nextPlugin,
      // You might need to explicitly add 'typescript-eslint' plugin here if not covered by tseslint.configs
      // 'typescript-eslint': tseslint.plugin,
    },
    rules: {
      // React specific rules
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules, // For new JSX transform
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed with Next.js 13+ and new JSX transform

      // Next.js specific rules
      ...nextPlugin.configs.recommended.rules, // Recommended Next.js rules
      ...nextPlugin.configs["core-web-vitals"].rules, // Next.js Core Web Vitals rules

      // Custom rules or overrides
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off", // Adjust as needed
      // Add any other rules you want to enforce or override
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-types": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-case-declarations": "warn",
      "no-constant-binary-expression": "warn",
      "no-empty": "warn",
      "no-fallthrough": "warn",
      "no-func-assign": "warn",
      "no-prototype-builtins": "warn",
      "no-redeclare": "warn",
      "no-sparse-arrays": "warn",
      "@typescript-eslint/no-this-alias": "warn",
      "no-unsafe-optional-chaining": "warn",
      "no-unused-private-class-members": "warn",
      "no-useless-escape": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "getter-return": "warn",
      "no-control-regex": "warn",
      "valid-typeof": "warn",
      "no-misleading-character-class": "warn",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
      // If you are using @next/eslint-plugin-next in a monorepo, you might need to specify the Next.js root directory
      // "next": {
      //   "rootDir": "apps/my-next-app/",
      // },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // Add any specific rules for JavaScript files here
    },
  },

  // Optional: Add Prettier integration if you use it
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
);