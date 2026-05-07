import * as mockData from '../data/mockData';

// --- MOCK API SERVICE ---
// Simulating backend latency

const LATENCY = 400;

export const mockService = {
  getPortfolio: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockPortfolio), LATENCY)),

  getHoldings: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockHoldings), LATENCY)),

  getTransactions: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockTransactions), LATENCY)),

  getBudgets: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockBudgetAnalytics), LATENCY)),

  getAIInsights: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockAIInsights), LATENCY)),

  getMarketSentiment: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockMarketSentiment), LATENCY)),

  getAlerts: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockAlerts), LATENCY)),

  getAllocation: () => 
    new Promise((resolve) => setTimeout(() => resolve(mockData.mockAllocation), LATENCY)),
};
