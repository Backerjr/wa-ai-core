/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig((async () => {
  const pluginResult = await react();
  const plugins = Array.isArray(pluginResult) ? pluginResult : [pluginResult];

  return {
    plugins: plugins as any,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  };
})());
