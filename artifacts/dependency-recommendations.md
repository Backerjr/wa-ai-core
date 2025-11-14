# Phase 0: Dependency Audit & Recommendations

## 1. Vulnerability Scan

A `pnpm audit` was performed and revealed the following vulnerability:

- **Severity:** Moderate
- **Package:** `esbuild`
- **Vulnerable Versions:** `<=0.24.2`
- **Patched Versions:** `>=0.25.0`
- **Dependency Path:** `.` > `@vitejs/plugin-react` > `vite` > `esbuild`
- **More Info:** [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)

**Recommendation:**
Update the `@vitejs/plugin-react` package to a version that uses a patched version of `esbuild`. This will likely require updating `vite` as well. This should be done as part of the initial project setup.

## 2. Outdated Packages

Several key packages are outdated. Upgrading them can provide access to new features, performance improvements, and bug fixes.

**High Priority Upgrades:**

- **`eslint`**: Currently `^8.0.0`. The CI environment is already using ESLint 9, which is causing conflicts.
  - **Recommendation:** Upgrade to ESLint 9 (`^9.3.0`) and migrate the configuration to `eslint.config.js`. This will resolve the CI issues and align the project with modern ESLint standards.
- **`react` & `react-dom`**: Currently `18.3.1`. React 19 has been released.
  - **Recommendation:** Upgrade to React 19. This is a major upgrade and will require careful testing. It should be done in a separate, dedicated effort after the initial design system setup.

**Recommended Upgrades:**

- **`next`**: Currently `15.5.6`. Next.js is a fast-moving framework.
  - **Recommendation:** Upgrade to the latest stable version of Next.js 15.
- **`typescript`**: Currently `5.6.3`.
  - **Recommendation:** Upgrade to the latest stable version of TypeScript 5.
- **`tailwindcss`**: Currently `3.4.13`.
  - **Recommendation:** Upgrade to the latest stable version of Tailwind CSS 3.
- **`vitest`**: Currently `2.1.4`.
  - **Recommendation:** Upgrade to the latest stable version of Vitest.
- **`@playwright/test`**: Currently `1.49.1`.
  - **Recommendation:** Upgrade to the latest stable version of Playwright.

## 3. Engine Constraints

The `package.json` specifies `node: ">=20.0.0"`. This is a good baseline and should be sufficient for the latest versions of the recommended packages.

## 4. Action Plan

1.  **Immediate:** Upgrade ESLint to v9 and migrate the configuration. This is necessary to unblock development and ensure a consistent linting environment.
2.  **Short Term:** Upgrade the other recommended packages (`next`, `typescript`, `tailwindcss`, `vitest`, `playwright`) to their latest stable versions.
3.  **Mid Term:** Plan and execute the upgrade to React 19. This should be treated as a separate mini-project due to the potential for breaking changes.
