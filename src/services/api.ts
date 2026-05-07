import {
  mockPortfolio,
  mockHoldings,
  mockTransactions,
  mockWatchlist,
  mockMarketIndices,
  mockPerformanceData,
  mockAllocation,
  mockStatCards,
  mockNotifications,
} from '@/data/mock';

// ─────────────────────────────────────────────────
// API SERVICE LAYER
// Simulates async API calls with realistic latency.
// Replace with real fetch/axios calls in production.
// ─────────────────────────────────────────────────

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getPortfolio() {
    await delay(600);
    return mockPortfolio;
  },

  async getHoldings() {
    await delay(800);
    return [...mockHoldings];
  },

  async getTransactions(page = 1, pageSize = 20) {
    await delay(700);
    const start = (page - 1) * pageSize;
    const data = mockTransactions.slice(start, start + pageSize);
    return {
      data,
      pagination: {
        page,
        pageSize,
        total: mockTransactions.length,
        totalPages: Math.ceil(mockTransactions.length / pageSize),
      },
    };
  },

  async getWatchlist() {
    await delay(500);
    return [...mockWatchlist];
  },

  async getMarketIndices() {
    await delay(400);
    return [...mockMarketIndices];
  },

  async getPerformanceData() {
    await delay(900);
    return [...mockPerformanceData];
  },

  async getAllocation() {
    await delay(600);
    return [...mockAllocation];
  },

  async getStatCards() {
    await delay(300);
    return [...mockStatCards];
  },

  async getNotifications() {
    await delay(400);
    return [...mockNotifications];
  },
} as const;
