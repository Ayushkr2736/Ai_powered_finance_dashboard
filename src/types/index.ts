// ═══════════════════════════════════════════════════════
// PROTON FINANCE – DOMAIN TYPES
// ═══════════════════════════════════════════════════════

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

// ─── PORTFOLIO ──────────────────────────────────────────

export interface PortfolioSummary {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
  investedValue: number;
  currency: Currency;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gain: number;
  gainPercent: number;
  allocation: number;
  sector: string;
  type: 'stock' | 'crypto' | 'etf' | 'bond';
}

export interface AllocationSlice {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// ─── TRANSACTIONS & BUDGETS ──────────────────────────────

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'dividend' | 'fee';
  symbol?: string;
  name: string;
  amount: number;
  quantity?: number;
  price?: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
  merchant?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: 'blue' | 'gold' | 'success' | 'danger';
  icon: string;
}

export interface BudgetAnalytics {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  utilization: number;
  categories: BudgetCategory[];
  dailySpend: { day: string; amount: number; avg: number }[];
}

// ─── INTELLIGENCE & MARKET ───────────────────────────────

export interface AIInsight {
  id: string;
  category: 'Opportunity' | 'Risk' | 'Strategy' | 'Tax';
  title: string;
  insight: string;
  confidence: number;
  impact?: string;
  actionable: boolean;
}

export interface MarketSentiment {
  score: number; // 0-100
  label: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  retailFlow: number;
  institutionalFlow: number;
  volatilityIndex: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

// ─── ALERTS ──────────────────────────────────────────────

export interface AppAlert {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// ─── UI STATE ────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: string;
}

export interface PerformanceDataPoint {
  date: string;
  portfolio: number;
  benchmark: number;
}

export interface SectorExposure {
  sector: string;
  allocation: number;
  gain: number;
  holdings: number;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'flat';
  icon: string;
  color: 'blue' | 'success' | 'gold' | 'cyan' | 'danger';
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number | null;
}

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';
export type ThemeMode = 'light' | 'dark';
