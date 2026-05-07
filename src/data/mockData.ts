import type { 
  PortfolioSummary, 
  Holding, 
  Transaction, 
  BudgetAnalytics, 
  AIInsight, 
  MarketSentiment,
  MarketIndex,
  AppAlert,
  AllocationSlice
} from '@/types';

// --- REALISTIC GENERATORS & DATA ---

// 1. Portfolio
export const mockPortfolio: PortfolioSummary = {
  totalValue: 2847392.54,
  totalGain: 487219.83,
  totalGainPercent: 20.65,
  dayChange: 12847.32,
  dayChangePercent: 0.45,
  cashBalance: 124850.0,
  investedValue: 2722542.54,
  currency: 'USD',
};

export const mockHoldings: Holding[] = [
  { id: 'h1', symbol: 'AAPL', name: 'Apple Inc.', quantity: 450, avgCost: 142.5, currentPrice: 189.84, marketValue: 85428.0, gain: 21303.0, gainPercent: 33.22, allocation: 12.4, sector: 'Technology', type: 'stock' },
  { id: 'h2', symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 200, avgCost: 475.0, currentPrice: 878.36, marketValue: 175672.0, gain: 80672.0, gainPercent: 84.92, allocation: 18.2, sector: 'Technology', type: 'stock' },
  { id: 'h3', symbol: 'BTC', name: 'Bitcoin', quantity: 1.85, avgCost: 42000.0, currentPrice: 67842.0, marketValue: 125507.7, gain: 47807.7, gainPercent: 61.53, allocation: 9.4, sector: 'Cryptocurrency', type: 'crypto' },
];

export const mockAllocation: AllocationSlice[] = [
  { name: 'Technology', value: 485331.2, percentage: 38.4, color: '#3b82f6' },
  { name: 'Healthcare', value: 240120.5, percentage: 19.0, color: '#22c55e' },
  { name: 'Financials', value: 205206.75, percentage: 15.0, color: '#c5943a' },
  { name: 'Real Estate', value: 180500.0, percentage: 12.0, color: '#93c5fd' },
];

// 2. Budget & Spending
export const mockBudgetAnalytics: BudgetAnalytics = {
  totalBudget: 8500,
  totalSpent: 5420,
  remaining: 3080,
  utilization: 63.7,
  categories: [
    { id: 'b1', name: 'Housing', limit: 3200, spent: 3200, color: 'blue', icon: 'Home' },
    { id: 'b2', name: 'Shopping', limit: 1200, spent: 850, color: 'gold', icon: 'ShoppingCart' },
    { id: 'b3', name: 'Dining', limit: 800, spent: 920, color: 'danger', icon: 'Utensils' },
    { id: 'b4', name: 'Transport', limit: 600, spent: 450, color: 'success', icon: 'Car' },
  ],
  dailySpend: [
    { day: 'Mon', amount: 120, avg: 145 },
    { day: 'Tue', amount: 85, avg: 145 },
    { day: 'Wed', amount: 210, avg: 145 },
    { day: 'Thu', amount: 150, avg: 145 },
    { day: 'Fri', amount: 280, avg: 145 },
    { day: 'Sat', amount: 340, avg: 145 },
    { day: 'Sun', amount: 95, avg: 145 },
  ],
};

// 3. Transactions
export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'buy', symbol: 'NVDA', name: 'NVIDIA Corp.', amount: 17567.2, quantity: 20, price: 878.36, date: '2024-12-15', status: 'completed', category: 'Equities', merchant: 'Schwab' },
  { id: 't2', type: 'fee', name: 'Advisory Fee', amount: 247.5, date: '2024-12-14', status: 'completed', category: 'Fees', merchant: 'Wealth Curator' },
  { id: 't3', type: 'dividend', symbol: 'AAPL', name: 'Apple Dividend', amount: 450.0, date: '2024-12-12', status: 'completed', category: 'Income', merchant: 'Apple Inc.' },
  { id: 't4', type: 'withdrawal', name: 'Amazon Shopping', amount: 124.5, date: '2024-12-10', status: 'completed', category: 'Shopping', merchant: 'Amazon' },
];

// 4. AI Insights & Sentiment
export const mockAIInsights: AIInsight[] = [
  {
    id: 'i1',
    category: 'Strategy',
    title: 'Sector Rotation Strategy',
    insight: 'Overweight in Technology by 14%. Recommend rotating 5% into Healthcare to reduce peak volatility.',
    confidence: 94,
    impact: 'Medium Risk Reduction',
    actionable: true,
  },
  {
    id: 'i2',
    category: 'Opportunity',
    title: 'Tax Loss Harvesting',
    insight: 'Identified $4,200 in harvestable losses from underperforming bond ETFs.',
    confidence: 88,
    impact: '+$1,150 Tax Savings',
    actionable: true,
  },
];

export const mockMarketSentiment: MarketSentiment = {
  score: 68,
  label: 'Greed',
  retailFlow: 74,
  institutionalFlow: 62,
  volatilityIndex: 14.2,
};

// 5. Alerts
export const mockAlerts: AppAlert[] = [
  { id: 'a1', type: 'danger', title: 'Subscription Spike', message: 'Netflix subscription increased by 15%.', timestamp: '2h ago', read: false },
  { id: 'a2', type: 'warning', title: 'Budget Threshold', message: 'Dining budget is at 115% of limit.', timestamp: '5h ago', read: false },
  { id: 'a3', type: 'success', title: 'Dividend Received', message: 'AAPL dividend of $450 credited.', timestamp: '1d ago', read: true },
];
