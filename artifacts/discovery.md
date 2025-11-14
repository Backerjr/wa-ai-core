# Phase 0: Discovery Report

This document outlines the initial discovery phase for the "RozmoWA HYPER — Neural Classroom" project.

## 1. Technology Stack

The project is a modern web application built with the following technologies:

- **Framework:** [Next.js](https://nextjs.org/) (v15.5.6) - Using the App Router.
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5.6.3)
- **UI Library:** [React](https://react.dev/) (v18.3.1)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4.13)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (v5.0.8)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Testing:**
  - Unit/Integration: [Vitest](https://vitest.dev/)
  - E2E: [Playwright](https://playwright.dev/)
  - Component: [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- **Linting & Formatting:**
  - [ESLint](https://eslint.org/) (v8.0.0)
  - [Prettier](https://prettier.io/) (v3.3.3)
- **Deployment:** Vercel (inferred from `vercel.json`)

## 2. Project Structure

The project follows a standard Next.js App Router structure:

- `app/`: Contains the application's routes and pages.
  - `app/(dashboard)/`: A route group for the main dashboard, containing different roles (manager, teacher, student).
  - `app/api/`: Not present, but a standard location for API routes.
- `components/`: A well-organized component library.
  - `ui/`: Generic, reusable UI components (e.g., `Button`, `Card`). This is an excellent foundation for the new design system.
  - `core/`: More complex, application-specific components.
  - `views/`: Components that represent entire pages or views.
- `lib/`: Contains utility functions, data, and state management.
- `tests/`: Contains unit and end-to-end tests.

## 3. Gaps & Areas for Investigation

- **Authentication & Authorization:**
  - There is no explicit authentication library (e.g., NextAuth.js, Clerk) found in `package.json`.
  - It's unclear how user roles (Student, Teacher, Manager) are managed and how routes are protected. This is a critical area to investigate before implementing role-based layouts. I will need to search the codebase for any custom authentication logic.
- **Design System:**
  - The existing `components/ui` directory is a good start, but there is no formal design token system (colors, spacing, typography) in place. The new design system will need to be built from the ground up, as per the project plan.
- **ESLint Versioning:**
  - The `package.json` specifies `eslint: "^8.0.0"`, but the CI environment seems to be using ESLint 9, which has caused issues. This will need to be resolved to ensure a stable development environment. The plan to migrate to ESLint 9 is the correct approach.
- **Data Fetching:**
  - It's not immediately clear how data is fetched from the backend. There are no explicit data fetching libraries like `react-query` or `swr` in `package.json`. The project might be using the built-in `fetch` API in Server Components.

## 4. Next Steps

- Investigate the authentication and authorization mechanism.
- Perform a dependency audit to identify vulnerabilities and outdated packages.
- Create the `impact-map.md` and `safety-checklist.md` documents.
