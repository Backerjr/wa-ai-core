import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, eslintConfigPrettier, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
}];

export default eslintConfig;
