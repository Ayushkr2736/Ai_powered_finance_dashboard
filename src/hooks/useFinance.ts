import { useQuery } from '@tanstack/react-query';
import { mockService } from '@/services/mockService';
import { generateAIInsights } from '@/utils/insightEngine';
import type { 
  PortfolioSummary, 
  Holding, 
  Transaction, 
  BudgetAnalytics, 
  AIInsight, 
  MarketSentiment,
  AppAlert,
  AllocationSlice
} from '@/types';

// --- DOMAIN HOOKS – Portfolio & Finance Data ---

export const usePortfolio = () => {
  return useQuery<PortfolioSummary>({
    queryKey: ['portfolio'],
    queryFn: () => mockService.getPortfolio() as Promise<PortfolioSummary>,
  });
};

export const useHoldings = () => {
  return useQuery<Holding[]>({
    queryKey: ['holdings'],
    queryFn: () => mockService.getHoldings() as Promise<Holding[]>,
  });
};

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () => mockService.getTransactions() as Promise<Transaction[]>,
  });
};

export const useBudgets = () => {
  return useQuery<BudgetAnalytics>({
    queryKey: ['budgets'],
    queryFn: () => mockService.getBudgets() as Promise<BudgetAnalytics>,
  });
};

export const useAIInsights = () => {
  const { data: holdings } = useHoldings();
  const { data: budgets } = useBudgets();

  return useQuery<AIInsight[]>({
    queryKey: ['ai-insights', holdings?.length, budgets?.totalSpent],
    queryFn: async () => {
      const staticInsights = (await mockService.getAIInsights()) as AIInsight[];

      if (holdings && budgets) {
        const dynamicInsights = generateAIInsights([], holdings, budgets);
        return [...staticInsights, ...dynamicInsights];
      }

      return staticInsights;
    },
    enabled: !!holdings && !!budgets,
  });
};

export const useMarketSentiment = () => {
  return useQuery<MarketSentiment>({
    queryKey: ['market-sentiment'],
    queryFn: () => mockService.getMarketSentiment() as Promise<MarketSentiment>,
  });
};

export const useAlerts = () => {
  return useQuery<AppAlert[]>({
    queryKey: ['alerts'],
    queryFn: () => mockService.getAlerts() as Promise<AppAlert[]>,
  });
};

export const useAllocation = () => {
  return useQuery<AllocationSlice[]>({
    queryKey: ['allocation'],
    queryFn: () => mockService.getAllocation() as Promise<AllocationSlice[]>,
  });
};
