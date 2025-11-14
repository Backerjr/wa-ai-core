/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  const pluginResult = await Promise.resolve(react());
  const plugins = Array.isArray(pluginResult) ? pluginResult : [pluginResult];

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
});
