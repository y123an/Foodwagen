<div align="center">
	<h1>🍔 Foodwagen</h1>
	<p><strong>A modern Next.js 16 (App Router) application for browsing, creating, editing, and managing restaurant meals with real-time UX feedback.</strong></p>
	<p>
		Built with TypeScript, Tailwind CSS v4, RTK Query, Zod validation, and an accessible component architecture.<br />
		Comprehensive test coverage using Jest + Testing Library.
	</p>
	<hr />
</div>

## Table of Contents
1. Overview
2. Core Features
3. Tech Stack & Tooling
4. Architecture & Data Flow
5. Project Structure
6. Getting Started (Windows / PowerShell)
7. Available Scripts
8. Testing Strategy & What Is Covered
9. API Layer (RTK Query)
10. Validation (Zod Schemas)
11. Toast & UI System
12. Environment Variables
13. Coding Standards & Linting
14. Troubleshooting Guide
15. FAQ

---

## 1. Overview
Foodwagen is a lightweight food management interface consuming a public MockAPI backend. Users can view meals, open an action menu, edit data, or delete meals with confirmation and toast feedback. The UI emphasizes performance, accessibility, predictable state management, and strong validation.

## 2. Core Features
- Meal listing with skeleton loading states.
- Action menu per meal: edit & delete options.
- Create / Edit modal with form validation (Zod + custom hooks).
- Delete confirmation modal with async state feedback.
- Toast notification system (success / error / warning / info).
- API interaction via RTK Query (caching, invalidation, tags).
- Responsive Tailwind CSS styling and remote image handling.
- Strong test coverage for rendering, interaction, async behaviors, and error states.

## 3. Tech Stack & Tooling
| Layer | Tool | Purpose |
|-------|------|---------|
| Framework | Next.js 16 (App Router) | Routing, SSR/SSG, image optimization |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 via PostCSS | Utility-first styles |
| State / Data | Redux Toolkit + RTK Query | API caching & CRUD endpoints |
| Validation | Zod | Runtime schema validation & parsing |
| Testing | Jest 30 + @testing-library/react + jest-dom | Unit & component tests |
| Mocking | Manual jest mocks (+ global fetch shim) | Isolated component logic |
| Notifications | Custom Toast context | Centralized feedback UX |
| Build / Lint | Next build & ESLint (core-web-vitals) | Quality & performance |

## 4. Architecture & Data Flow
1. Components request data using RTK Query hooks (e.g. `useGetFoodsQuery`).
2. Responses are parsed/validated using Zod (`foodSchema`) to guard against malformed API data.
3. User actions trigger mutations (create, update, delete) which invalidate relevant cached tags.
4. Toast context (`ToastProvider`) broadcasts feedback messages rendered in a portal-like container.
5. Modals manage local form state and call mutation props; async states update button labels ("Adding Meal...", "Deleting Meal...").

### Data Contracts
- `Food` type: Normalized representation of meal data supporting multiple API field naming conventions.
- `CreateFood` / `UpdateFood`: Input schemas aligned with `createFoodSchema` / `updateFoodSchema`.

## 5. Project Structure
```
app/                # Next.js App Router entrypoints (layout, page, global styles)
components/         # Presentational & composite React components
components/ui/      # Reusable UI primitives (buttons, modals, inputs, skeletons, toast)
lib/                # Core logic: redux, context, hooks, helpers, validation schemas
	redux/services/   # RTK Query API definitions (foodApi)
	validations/      # Zod schemas (food.schema.ts)
	context/          # Providers (ToastContext)
	types/            # Centralized TypeScript types
__tests__/          # Jest + Testing Library component tests
public/             # Static assets
```

## 6. Getting Started (Windows / PowerShell)
### Prerequisites
- Node.js 20+ recommended.
- Package manager: npm (bundled) or yarn/pnpm/bun installed globally if preferred.

### Install Dependencies
```powershell
npm install
```

### Run Development Server
```powershell
npm run dev
```
Visit: http://localhost:3000

## 7. Available Scripts
```powershell
npm run dev        # Start Next.js in development mode
npm run build      # Production build (outputs .next)
npm run start      # Start server from production build
npm run lint       # Run ESLint over the project
npm run test       # Run all Jest tests once
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 8. Testing Strategy & Coverage
The test suite focuses on three major components: `FoodCard`, `FoodDeleteModal`, and `FoodFormModal`.

### What Is Tested
- Rendering: Ensures all critical elements (names, prices, rating, status, images, logos) appear.
- Conditional UI: Open/Closed status, populated edit form values.
- User Interactions: Opening menus, modals, editing inputs, clicking buttons, outside clicks to close.
- Async States: Loading text ("Deleting Meal...", "Adding Meal...") while awaiting promises.
- Error Handling: Rejected promises (API errors, timeouts) preserve modal state.
- Accessibility Hooks: Test IDs standardized via `configure({ testIdAttribute: 'data-test-id' })`.

### How to Run Tests
```powershell
npm run test           # Single pass
npm run test:watch     # Watch mode during development
npm run test:coverage  # Generate coverage summary
```
Coverage sources are defined in `jest.config.js` (`collectCoverageFrom` targeting `components/`, `lib/`, and `app/`).

### Jest Configuration Highlights
- Uses `next/jest` for framework integration.
- `jest-environment-jsdom` for DOM APIs.
- Module alias `@/` -> `<rootDir>/` for clean imports.
- Mocks: `next/image`, `next/navigation`, and a global `fetch` shim.

## 9. API Layer (RTK Query)
- Base URL: `https://6852821e0594059b23cdd834.mockapi.io`.
- Endpoints: `getFoods`, `searchFoods`, `getFoodById`, `createFood`, `updateFood`, `deleteFood`.
- Tag Invalidation Strategy: `LIST`, individual `Food` IDs, `SEARCH` for queries.
- Automatic cache & refetch behaviors via RTK Query middleware.

## 10. Validation (Zod Schemas)
- `foodSchema`: Defensive parsing supporting multiple naming conventions returned by the API.
- `createFoodSchema` / `updateFoodSchema`: Input validation for form submissions.
- Guards runtime correctness and prevents silent UI failures.

## 11. Toast & UI System
- `ToastProvider` manages an array of toasts, each with type, message, duration.
- Methods: `showSuccess`, `showError`, `showWarning`, `showInfo`, `showToast`.
- `ToastContainer` renders and auto-dismisses items, supporting manual close.

## 12. Environment Variables
Currently the API base URL is hard-coded in `foodApi.ts`. To externalize:
1. Create `.env.local` and add `NEXT_PUBLIC_API_BASE_URL=...`
2. Replace constant with `process.env.NEXT_PUBLIC_API_BASE_URL`.
3. Restart dev server after changes.

## 13. Coding Standards & Linting
- ESLint config extends Next.js core web vitals + TypeScript rules (`eslint.config.mjs`).
- Run `npm run lint` before commits or in CI.
- Prefer functional components, hooks, and consistent prop naming (`camelCase`).
- Co-locate tests next to critical components or keep centralized in `__tests__`.

## 14. Troubleshooting Guide
| Issue | Possible Cause | Fix |
|-------|----------------|-----|
| Images not loading | Remote domain blocked | Adjust `images.remotePatterns` in `next.config.ts` |
| Fetch errors | Network / MockAPI outage | Retry; implement exponential backoff or local mock server (MSW) |
| Types fail build | Outdated `@types/*` | Reinstall deps; clear lockfile & `node_modules` |
| Zod parse warnings | API shape drift | Inspect console warnings; update `foodSchema` |
| Toast hook error | Missing provider | Wrap app in `<ToastProvider>` |

## 15. FAQ
**Why RTK Query instead of SWR or React Query?** Native Redux integration + tag invalidation simplifies cache management with minimal boilerplate.

**Why Zod?** Provides runtime validation and helpful error messaging when API contracts shift.

**Can I add more tests?** Yes—place `*.test.tsx` in `__tests__/` or co-locate as needed; follow existing test ID conventions.

**How do I change the test ID attribute?** Update `jest.setup.js` `configure({ testIdAttribute: 'data-test-id' })`.


### Commit Message Convention (Suggested)
`feat: add meal status badge`
`fix: prevent duplicate toasts`
`test: add interaction tests for FoodFormModal`

---

## Quick Start Recap
```powershell
git clone <repo-url>
cd foodwagen
npm install
npm run dev
```

## Test Recap
```powershell
npm run test
npm run test:coverage
```
---
