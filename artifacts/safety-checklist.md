# Phase 0: Safety Checklist

This document outlines the safety procedures and guarantees for the "RozmoWA HYPER — Neural Classroom" project. All development must adhere to these guidelines.

## 1. Non-Destructive Guarantees

*   [ ] **Dry Run by Default:** All changes that write to disk or alter infrastructure will be planned and previewed in `DRY_RUN` mode before being applied.
*   [ ] **No Force Pushing:** `git push --force` is strictly prohibited.
*   [ ] **No Deletion of Branches/Tags:** Do not delete branches or tags from the remote repository.
*   [ ] **No Dropping DB Tables:** No database tables will be dropped.
*   [ ] **Feature Flag All Changes:** All major changes will be introduced behind feature flags.
*   [ ] **New Branch for All Work:** All work will be done on a new branch, `feature/hyper-neural-classroom`.
*   [ ] **Reversible Migrations:** For any configuration edits, a reversible plan and a rollback script will be generated.

## 2. Risk & Consequence Modeling

| Risk                                    | Mitigation Strategy                                                                                                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Conflicting CSS-in-JS Detected**      | Isolate the new design system's scope to avoid conflicts. Use CSS layers if necessary.                                                                                                                       |
| **Next.js vs. Vite Mismatch**           | Adapt Storybook and CI configurations accordingly. The project is confirmed to be using Next.js.                                                                                                               |
| **Package Updates Required**            | Propose a minimal set of updates and perform a lockfile sanity check. A dependency audit has been performed and recommendations have been made.                                                              |
| **Animations Jank on Low-End Devices**  | Automatically fall back to a "lite" animation mode via hardware heuristics (e.g., checking for `prefers-reduced-motion` and device memory).                                                                    |
| **Authentication Logic Unclear**        | Halt and request confirmation before making any changes to authentication logic. The initial investigation will focus on understanding the existing implementation without modifying it.                         |
| **Breaking Existing Functionality**     | All changes will be introduced behind feature flags, and a comprehensive testing strategy (unit, integration, E2E, visual regression) will be implemented to catch regressions.                                |

## 3. Pre-flight Checks

Before starting development, the following checks must be performed:

*   [ ] **Confirm Execution Mode:** The current mode is `DRY_RUN`. Do not switch to `APPLY` without explicit confirmation.
*   [ ] **Confirm Branch:** All work will be done on the `feature/hyper-neural-classroom` branch.
*   [ ] **Confirm Feature Flags:** All new features are behind feature flags, and the flags are `false` by default in production.
*   [ ] **Confirm Testing Plan:** A testing plan is in place for all new features.
*   [ ] **Confirm Rollback Plan:** A rollback plan is in place for all major changes.

This concludes the `phase0:discover` step. I have created the `discovery.md`, `dependency-recommendations.md`, `impact-map.md`, and `safety-checklist.md` artifacts. I am now ready to proceed to `phase1:design-system` upon user confirmation.
