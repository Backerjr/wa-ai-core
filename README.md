# Next-Gen AI Education Platform

A production-grade Next.js 15 application delivering teacher, manager, and student experiences plus a universal AI Command Center. The UI follows the “AI Everywhere. Calm Design Anywhere.” ethos with glassmorphic cards, responsive layouts, strong accessibility defaults, and deterministic mock data.

## Features
- **Teacher Dashboard**: What’s Next card, AI insights, class cards, and quick actions.
- **Attendance**: Keyboard-friendly status chips, date picker, inline note drawer, and Save/Report CTAs.
- **Gradebook 2.0**: Editable weighted grid with instant final-grade calculations and AI insight badges.
- **Manager Dashboard**: KPI tiles, Recharts visualization, staff alerts strip, and report generation CTA.
- **Student Portal**: Progress summaries, AI coach nudges, achievements, and “Start Study Session.”
- **AI Command Center**: Global fab + Cmd/Ctrl+K palette supporting `/ask`, `/generate`, `/insight` mock flows with export/share controls.

## Tech Stack
- Next.js 15 (App Router) + React 18 + TypeScript strict mode
- Tailwind CSS + custom design tokens + shadcn/ui primitives
- Zustand for light state, react-hook-form/zod ready (no heavy usage yet)
- Recharts, Framer Motion, lucide-react icons
- Vitest + Testing Library + jsdom, Playwright for e2e
- ESLint (next/core-web-vitals) + Prettier, Husky + lint-staged (typecheck, lint, test on commit)

## Getting Started
```bash
pnpm install
pnpm dev
```
Visit http://localhost:3000 to explore the teacher dashboard (default route). Sidebar navigation links to the manager dashboard, attendance, gradebook, and student portal.

### Key Scripts
| Command | Description |
| --- | --- |
| `pnpm dev` | Start Next.js in development mode |
| `pnpm build` | Create production build |
| `pnpm start` | Run production server |
| `pnpm typecheck` | Run TypeScript in `--noEmit` mode |
| `pnpm lint` | ESLint (Next core web vitals) |
| `pnpm test` | Vitest unit tests |
| `pnpm e2e` | Playwright smoke test (requires running dev server) |
| `pnpm format` / `pnpm format:fix` | Prettier check/write |

## Testing
- **Unit**: `pnpm test` covers status chip accessibility, grade calculations, and dashboard rendering.
- **E2E**: `pnpm e2e` (with `pnpm dev` running) opens the teacher dashboard, runs `/ask` via the AI Command Center, and toggles an attendance status while asserting the toast.

## Folder Highlights
```
app/                     # Next.js routes (app router)
components/core          # Shell, data cards, AI Command Center, status chips
components/ui            # shadcn/ui-inspired primitives
components/views         # Page-level experience components
lib/data                 # Deterministic mock data
lib/state                # Zustand store (sidebar + command center)
tests/unit, tests/e2e    # Vitest + Playwright suites
```

## Accessibility & Responsiveness
- Skip-to-content link, focus-visible rings, appropriate aria roles, and keyboard support across chips, dialogs, and AI overlay.
- Responsive sidebar (collapse + mobile sheet), stacking cards, and touch-friendly hit areas down to 320px.
- Color palette + typography derive from the design brief (Inter UI, Playfair titles, optional Outfit).

## Continuous Integration
`.github/workflows/ci.yml` runs on Node 20 with pnpm: install → typecheck → lint → test → build. Husky enforces lint-staged + typecheck/lint/test locally before commits.
