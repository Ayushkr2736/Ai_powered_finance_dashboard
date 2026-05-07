import type {
  PortfolioSummary,
  Holding,
  Transaction,
  WatchlistItem,
  MarketIndex,
  PerformanceDataPoint,
  AllocationSlice,
  SectorExposure,
  StatCard,
  Notification,
} from '@/types';

// ─────────────────────────────────────────────────
// PROTON FINANCE – MOCK DATA
// Production-quality seed data for dashboard rendering
// ─────────────────────────────────────────────────

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

export const mockHoldings: readonly Holding[] = [
  {
    id: 'h1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 450,
    avgCost: 142.5,
    currentPrice: 189.84,
    marketValue: 85428.0,
    gain: 21303.0,
    gainPercent: 33.22,
    allocation: 12.4,
    sector: 'Technology',
    type: 'stock',
  },
  {
    id: 'h2',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    quantity: 320,
    avgCost: 285.0,
    currentPrice: 417.88,
    marketValue: 133721.6,
    gain: 42521.6,
    gainPercent: 46.63,
    allocation: 15.8,
    sector: 'Technology',
    type: 'stock',
  },
  {
    id: 'h3',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    quantity: 200,
    avgCost: 475.0,
    currentPrice: 878.36,
    marketValue: 175672.0,
    gain: 80672.0,
    gainPercent: 84.92,
    allocation: 18.2,
    sector: 'Technology',
    type: 'stock',
  },
  {
    id: 'h4',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 380,
    avgCost: 128.5,
    currentPrice: 186.49,
    marketValue: 70866.2,
    gain: 22036.2,
    gainPercent: 45.13,
    allocation: 8.6,
    sector: 'Consumer Discretionary',
    type: 'stock',
  },
  {
    id: 'h5',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 1.85,
    avgCost: 42000.0,
    currentPrice: 67842.0,
    marketValue: 125507.7,
    gain: 47807.7,
    gainPercent: 61.53,
    allocation: 9.4,
    sector: 'Cryptocurrency',
    type: 'crypto',
  },
  {
    id: 'h6',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    quantity: 180,
    avgCost: 380.0,
    currentPrice: 488.42,
    marketValue: 87915.6,
    gain: 19515.6,
    gainPercent: 28.53,
    allocation: 10.2,
    sector: 'Broad Market',
    type: 'etf',
  },
  {
    id: 'h7',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 520,
    avgCost: 105.0,
    currentPrice: 175.98,
    marketValue: 91509.6,
    gain: 36909.6,
    gainPercent: 67.6,
    allocation: 10.8,
    sector: 'Communication Services',
    type: 'stock',
  },
  {
    id: 'h8',
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 22.5,
    avgCost: 1800.0,
    currentPrice: 3542.18,
    marketValue: 79699.05,
    gain: 39199.05,
    gainPercent: 96.79,
    allocation: 5.6,
    sector: 'Cryptocurrency',
    type: 'crypto',
  },
] as const;

export const mockTransactions: readonly Transaction[] = [
  {
    id: 't1',
    type: 'buy',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    amount: 17567.2,
    quantity: 20,
    price: 878.36,
    date: '2024-12-15T10:30:00Z',
    status: 'completed',
    category: 'Equities',
  },
  {
    id: 't2',
    type: 'dividend',
    symbol: 'AAPL',
    name: 'Apple Inc. Dividend',
    amount: 1125.0,
    date: '2024-12-12T00:00:00Z',
    status: 'completed',
    category: 'Income',
  },
  {
    id: 't3',
    type: 'sell',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    amount: 24830.0,
    quantity: 100,
    price: 248.3,
    date: '2024-12-10T14:22:00Z',
    status: 'completed',
    category: 'Equities',
  },
  {
    id: 't4',
    type: 'deposit',
    name: 'Bank Transfer',
    amount: 50000.0,
    date: '2024-12-08T09:00:00Z',
    status: 'completed',
    category: 'Transfers',
  },
  {
    id: 't5',
    type: 'buy',
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 8855.45,
    quantity: 2.5,
    price: 3542.18,
    date: '2024-12-05T16:45:00Z',
    status: 'completed',
    category: 'Crypto',
  },
  {
    id: 't6',
    type: 'buy',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    amount: 14652.6,
    quantity: 30,
    price: 488.42,
    date: '2024-12-03T11:10:00Z',
    status: 'completed',
    category: 'ETFs',
  },
  {
    id: 't7',
    type: 'fee',
    name: 'Management Fee',
    amount: 247.5,
    date: '2024-12-01T00:00:00Z',
    status: 'completed',
    category: 'Fees',
  },
  {
    id: 't8',
    type: 'buy',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    amount: 20894.0,
    quantity: 50,
    price: 417.88,
    date: '2024-11-28T13:20:00Z',
    status: 'pending',
    category: 'Equities',
  },
] as const;

export const mockWatchlist: readonly WatchlistItem[] = [
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: 5.67, changePercent: 2.33, volume: 42_800_000, marketCap: 789_000_000_000, pe: 62.4 },
  { symbol: 'META', name: 'Meta Platforms', price: 585.72, change: -3.21, changePercent: -0.55, volume: 18_200_000, marketCap: 1_480_000_000_000, pe: 33.8 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 147.85, change: 4.12, changePercent: 2.87, volume: 38_500_000, marketCap: 239_000_000_000, pe: 45.2 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.45, change: 1.89, changePercent: 0.96, volume: 12_400_000, marketCap: 572_000_000_000, pe: 11.8 },
  { symbol: 'V', name: 'Visa Inc.', price: 287.13, change: -0.45, changePercent: -0.16, volume: 6_700_000, marketCap: 579_000_000_000, pe: 30.5 },
  { symbol: 'SOL', name: 'Solana', price: 118.42, change: 8.94, changePercent: 8.17, volume: 2_100_000_000, marketCap: 52_000_000_000, pe: null },
] as const;

export const mockMarketIndices: readonly MarketIndex[] = [
  { symbol: 'SPX', name: 'S&P 500', value: 5021.84, change: 25.61, changePercent: 0.51 },
  { symbol: 'DJI', name: 'Dow Jones', value: 38996.39, change: 134.21, changePercent: 0.35 },
  { symbol: 'IXIC', name: 'NASDAQ', value: 16091.92, change: 78.84, changePercent: 0.49 },
  { symbol: 'RUT', name: 'Russell 2000', value: 2012.75, change: -8.42, changePercent: -0.42 },
] as const;

function generatePerformanceData(): PerformanceDataPoint[] {
  const data: PerformanceDataPoint[] = [];
  let portfolio = 100;
  let benchmark = 100;
  const now = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    portfolio += (Math.random() - 0.46) * 1.2;
    benchmark += (Math.random() - 0.47) * 0.9;
    data.push({
      date: date.toISOString().split('T')[0] ?? date.toISOString(),
      portfolio: Math.round(portfolio * 100) / 100,
      benchmark: Math.round(benchmark * 100) / 100,
    });
  }
  return data;
}

export const mockPerformanceData: readonly PerformanceDataPoint[] = generatePerformanceData();

export const mockAllocation: readonly AllocationSlice[] = [
  { name: 'Technology', value: 485331.2, percentage: 38.4, color: '#3b82f6' },
  { name: 'Consumer Disc.', value: 70866.2, percentage: 8.6, color: '#60a5fa' },
  { name: 'Cryptocurrency', value: 205206.75, percentage: 15.0, color: '#c5943a' },
  { name: 'Broad Market ETF', value: 87915.6, percentage: 10.2, color: '#22c55e' },
  { name: 'Comm. Services', value: 91509.6, percentage: 10.8, color: '#93c5fd' },
  { name: 'Cash', value: 124850.0, percentage: 7.0, color: '#d4a574' },
  { name: 'Other', value: 81713.19, percentage: 10.0, color: '#64748b' },
] as const;

export const mockSectorExposure: readonly SectorExposure[] = [
  { sector: 'Technology', allocation: 38.4, gain: 54.26, holdings: 3 },
  { sector: 'Consumer Discretionary', allocation: 8.6, gain: 45.13, holdings: 1 },
  { sector: 'Communication Services', allocation: 10.8, gain: 67.6, holdings: 1 },
  { sector: 'Cryptocurrency', allocation: 15.0, gain: 79.16, holdings: 2 },
  { sector: 'Broad Market', allocation: 10.2, gain: 28.53, holdings: 1 },
] as const;

export const mockStatCards: readonly StatCard[] = [
  {
    id: 'total-value',
    label: 'Total Portfolio',
    value: '$2,847,392',
    change: 12847.32,
    changePercent: 0.45,
    trend: 'up',
    icon: 'Wallet',
    color: 'blue',
  },
  {
    id: 'total-gain',
    label: 'Total Return',
    value: '$487,219',
    change: 487219.83,
    changePercent: 20.65,
    trend: 'up',
    icon: 'TrendingUp',
    color: 'success',
  },
  {
    id: 'day-change',
    label: "Today's P&L",
    value: '$12,847',
    change: 12847.32,
    changePercent: 0.45,
    trend: 'up',
    icon: 'BarChart3',
    color: 'gold',
  },
  {
    id: 'invested',
    label: 'Invested Capital',
    value: '$2,360,172',
    change: -2400.0,
    changePercent: -0.1,
    trend: 'down',
    icon: 'PiggyBank',
    color: 'cyan',
  },
] as const;

export const mockNotifications: readonly Notification[] = [
  {
    id: 'n1',
    type: 'success',
    title: 'Order Executed',
    message: 'Bought 20 shares of NVDA at $878.36',
    timestamp: '2024-12-15T10:30:00Z',
    read: false,
  },
  {
    id: 'n2',
    type: 'info',
    title: 'Dividend Received',
    message: 'AAPL dividend of $1,125.00 credited',
    timestamp: '2024-12-12T00:00:00Z',
    read: false,
  },
  {
    id: 'n3',
    type: 'warning',
    title: 'Price Alert',
    message: 'BTC crossed $67,000 resistance level',
    timestamp: '2024-12-11T14:22:00Z',
    read: true,
  },
  {
    id: 'n4',
    type: 'info',
    title: 'Market Update',
    message: 'S&P 500 hit new all-time high at 5,021',
    timestamp: '2024-12-10T09:30:00Z',
    read: true,
  },
] as const;
