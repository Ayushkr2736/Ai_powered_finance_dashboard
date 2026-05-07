# Proton Finance – Wealth Curator

Proton Finance is an institutional-grade portfolio intelligence and wealth management dashboard built with React, Vite, Tailwind CSS, and Framer Motion. The application delivers premium aesthetics, robust data visualization, and simulated AI-driven portfolio insights.

## Table of Contents
- [Architecture Decisions](#architecture-decisions)
- [Custom Hooks Explanation](#custom-hooks-explanation)
- [Performance Optimizations](#performance-optimizations)
- [SEO Techniques Used](#seo-techniques-used)
- [Trade-offs](#trade-offs)
- [Getting Started](#getting-started)

---

## Architecture Decisions

The application is structured to mimic a scalable, enterprise-grade frontend architecture:

- **Component-Driven Design**: UI components are built atomically (e.g., `Button`, `Badge`, `Card`) and exported via "barrel" files (`index.ts`) for clean, centralized imports.
- **State Management Separation**: 
  - **Global UI State**: Managed via **Zustand** (`src/store/useAppStore.ts`). It handles ephemeral states like theme preferences, sidebar toggles, and search queries, persisting them to `localStorage` where appropriate.
  - **Server/Data State**: Handled using **TanStack React Query** (`src/hooks/useFinance.ts`). It acts as a robust asynchronous state manager handling caching, refetching, and loading states for our simulated backend.
- **Styling Strategy**: **Tailwind CSS** (v4 via `@tailwindcss/vite`) is used exclusively for styling. It utilizes custom design tokens (`bg-surface-mid`, `text-gold-500`) to guarantee brand consistency and rapid theming (Dark/Light mode).
- **Animation Orchestration**: **Framer Motion** is deeply integrated. By isolating animation constants in `src/constants/animations.ts`, we maintain a unified "feel" (using institutional-grade easing curves) across layout transitions, card hovers, and page loads.

---

## Custom Hooks Explanation

We created a suite of custom React hooks to encapsulate complex logic and keep components clean:

### Core Hooks (`src/hooks/useCore.ts`)
- `useLocalStorage<T>`: A generic, type-safe hook for syncing state with the browser's `localStorage` API, supporting functional updates.
- `useDebounce<T>`: Delays the processing of rapidly changing values (like search inputs) by a specified timeout, reducing unnecessary re-renders or API calls.
- `useAnalytics()`: A wrapper around our Google Analytics utility, exposing `trackEvent` and `trackPageView` with strictly typed event names.
- `useFetch<T>`: A lightweight async wrapper that provides built-in retry logic, loading states, and error handling for generic promises.

### Domain Hooks (`src/hooks/useFinance.ts`)
- `usePortfolio()`, `useTransactions()`, `useHoldings()`, etc.: Wrappers around React Query's `useQuery`. They seamlessly connect our mock service layer to the UI components, handling loading states and caching automatically.
- `useAIInsights()`: A specialized hook that depends on both `useHoldings()` and `useBudgets()`. It conditionally generates dynamic AI insights based on the user's current portfolio data and merges them with static insights.

---

## Performance Optimizations

1. **Route-Level Code Splitting**: All major pages (Dashboard, Insights, Portfolio, etc.) are imported dynamically using `React.lazy()` and `Suspense`. This ensures the initial JavaScript bundle remains small and pages are only downloaded when requested.
2. **Data Caching & Deduplication**: By utilizing **React Query**, redundant API calls are eliminated. Data is cached and served instantly across different components (e.g., both the Top Navbar and a dashboard widget can request "Notifications" without triggering two network requests).
3. **GPU-Accelerated Animations**: Framer Motion transitions are strictly bound to `transform` and `opacity` CSS properties, allowing the browser to offload animations to the GPU, guaranteeing a 60FPS experience even on mobile devices.
4. **Vite & Esbuild**: The build pipeline leverages Vite, which skips the heavy Babel parsing in favor of native ES modules during development, resulting in near-instant Hot Module Replacement (HMR).

---

## SEO Techniques Used

Even though authenticated dashboards don't strictly require indexing, we treat it as a robust web app:

- **Dynamic Metadata Injection**: A reusable `<SEO />` component (`src/components/common/SEO.tsx`) wraps `react-helmet-async`. It dynamically injects the `<title>`, `<meta name="description">`, and canonical links on a per-page basis.
- **OpenGraph & Twitter Cards**: Standardized OG and Twitter metadata tags are embedded to ensure that if any public-facing report or page is shared on social media or messaging apps, it unfurls beautifully with correct titles and preview images.
- **Semantic HTML5**: The layout structure heavily utilizes semantic tags (`<header>`, `<nav>`, `<aside>`, `<main>`), improving accessibility and ensuring screen readers can correctly parse the document structure.

---

## Trade-offs

During development, several intentional engineering trade-offs were made:

1. **Mock Data Layer vs. Real Backend**: 
   - *Decision*: We implemented a mocked async service layer (`mockService.ts`) instead of a live REST/GraphQL backend.
   - *Trade-off*: While this allowed for extremely rapid prototyping of complex UIs and data visualization without being blocked by backend development, swapping this out for real API endpoints later will require mapping real-world data structures to our internal TypeScript interfaces.
2. **SPA (Vite) vs. SSR (Next.js)**: 
   - *Decision*: We chose a standard Single Page Application (SPA) architecture over Server-Side Rendering (SSR).
   - *Trade-off*: Next.js would provide a faster First Contentful Paint (FCP) and out-of-the-box SEO. However, since this is a highly interactive, private fintech dashboard where data changes dynamically, a standard SPA provided a simpler routing model and easier static deployment (Vercel) without the overhead of maintaining a Node.js server.
3. **Build-time Type Safety vs. Deployment Velocity**:
   - *Decision*: For deployment configurations, we opted to skip strict TypeScript compilation (`tsc -b`) in the final Vercel build step, relying purely on `vite build`.
   - *Trade-off*: We sacrifice absolute type safety during the build pipeline (ignoring minor unused variable warnings) in favor of faster, friction-free continuous deployments.

---

## Getting Started

To run the application locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
