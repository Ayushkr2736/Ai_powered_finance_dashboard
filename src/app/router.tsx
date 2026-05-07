import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { StatCardSkeleton } from '@/components/ui';

// ─── LAZY PAGES ────────────────────────────────────────
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'));
const InsightsPage = lazy(() => import('@/pages/InsightsPage'));
const BudgetsPage = lazy(() => import('@/pages/BudgetsPage'));
const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));

// ─── LOADING FALLBACK ──────────────────────────────────
const PageLoader = () => (
  <div className="space-y-8 animate-pulse p-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
    <div className="h-[400px] w-full bg-surface-low rounded-3xl border border-edge-subtle" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'accounts', element: <PortfolioPage /> },
          { path: 'transactions', element: <TransactionsPage /> },
          { path: 'budgets', element: <BudgetsPage /> },
          { path: 'insights', element: <InsightsPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
]);
