import type { NavItem, TimeRange } from '@/types';

// ═══════════════════════════════════════════════════════
// PROTON FINANCE – APPLICATION CONSTANTS
// ═══════════════════════════════════════════════════════

export const APP_CONFIG = {
  name: 'Proton Finance',
  tagline: 'Wealth Curator',
  version: '1.0.0',
  description: 'Institutional-grade portfolio intelligence & wealth management',
  currency: 'USD' as const,
  locale: 'en-US',
} as const;

export const ROUTES = {
  DASHBOARD: '/',
  ACCOUNTS: '/accounts',
  TRANSACTIONS: '/transactions',
  BUDGETS: '/budgets',
  INSIGHTS: '/insights',
  SETTINGS: '/settings',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { id: 'accounts', label: 'Accounts', path: ROUTES.ACCOUNTS, icon: 'Wallet' },
  { id: 'transactions', label: 'Transactions', path: ROUTES.TRANSACTIONS, icon: 'ArrowLeftRight' },
  { id: 'budgets', label: 'Budgets', path: ROUTES.BUDGETS, icon: 'PieChart' },
  { id: 'insights', label: 'Insights', path: ROUTES.INSIGHTS, icon: 'Sparkles' },
] as const;

export const TIME_RANGES: readonly { label: string; value: TimeRange }[] = [
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
  { label: '5Y', value: '5Y' },
  { label: 'All', value: 'ALL' },
] as const;

export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#60a5fa',
  tertiary: '#93c5fd',
  gold: '#c5943a',
  goldLight: '#d4a574',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  palette: [
    '#3b82f6',
    '#60a5fa',
    '#c5943a',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#d4a574',
  ],
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  easeOut: [0.22, 1, 0.36, 1] as const,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  springGentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
} as const;

export const SIDEBAR_WIDTH = {
  collapsed: 72,
  expanded: 260,
} as const;

export const QUERY_KEYS = {
  portfolio: ['portfolio'] as const,
  holdings: ['holdings'] as const,
  transactions: ['transactions'] as const,
  watchlist: ['watchlist'] as const,
  marketIndices: ['market-indices'] as const,
  performance: ['performance'] as const,
  analytics: ['analytics'] as const,
  notifications: ['notifications'] as const,
} as const;
