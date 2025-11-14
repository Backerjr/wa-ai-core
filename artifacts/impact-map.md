# Phase 0: Impact Map

This document provides a high-level overview of the areas within the WA-AI-CORE application that will be impacted by the "RozmoWA HYPER — Neural Classroom" project.

## 1. Core Areas of Impact

The following areas will be significantly changed or replaced:

| Area                   | Description of Impact                                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI Components**      | All existing UI components in `components/ui` will be replaced or updated to conform to the new design system. New components will be created in a dedicated design system package (`src/design-system`). |
| **Styling**            | A new design token system (colors, spacing, typography) will be implemented. This will affect all styled components and pages. `tailwind.config.ts` will be updated to use the new tokens.                |
| **Page Layouts**       | The main dashboard layouts in `app/(dashboard)/layout.tsx` will be redesigned to accommodate the new "Mission Control" and "Neural Classroom" concepts.                                                   |
| **Role-Based Views**   | The pages for each user role (Student, Teacher, Manager) will be redesigned and rebuilt. This includes the dashboards, lesson builders, quiz builders, and progress views.                                |
| **Animations**         | A new animation layer (`Framer Motion`) will be introduced. This will affect all interactive elements. A "Hyper" mode with more advanced effects will be added as an optional feature.                    |
| **Data Visualization** | Existing charts (if any) will be replaced with new chart primitives from the design system, based on Recharts.                                                                                            |

## 2. Secondary Areas of Impact

The following areas will be affected, but to a lesser extent:

| Area                 | Description of Impact                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Routing**          | New routes will be added for the new role-based views. Existing routes may be reorganized. The `route-map.md` will document these changes.                                                      |
| **State Management** | The existing Zustand store (`lib/state/store.ts`) may need to be updated to accommodate new UI state, such as the state of the collapsible sidebar or the selected animation mode.              |
| **Testing**          | All existing tests will need to be reviewed and updated to reflect the new UI and functionality. New tests (unit, integration, E2E, visual regression) will be added to cover the new features. |
| **CI/CD**            | The CI/CD pipeline in `.github/workflows/ci.yml` will be updated to include new testing stages, such as visual regression testing.                                                              |

## 3. Low-Impact Areas

The following areas are not expected to be significantly affected:

| Area                 | Description of Impact                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication**   | The core authentication logic is not expected to change. However, the UI for login/signup pages will be updated to match the new design system. |
| **Data Fetching**    | The underlying data fetching logic is not expected to change. However, the way data is presented to the user will be completely redesigned.     |
| **Backend Services** | This project is focused on the frontend. No changes to backend services are planned.                                                            |

## 4. Feature Flag Strategy

All major changes will be introduced behind feature flags to ensure a safe and gradual rollout. The following feature flags will be used:

- `ds_v1`: Enables the new design system.
- `hyper_fx`: Enables the "Hyper" animation mode.
- `role_layouts_v2`: Enables the new role-based layouts.
- `ai_surfaces_stub`: Enables the stubbed AI assistant surfaces.
- `pattern_upgrades_v1`: Enables the new "Vocabulary App" patterns.
