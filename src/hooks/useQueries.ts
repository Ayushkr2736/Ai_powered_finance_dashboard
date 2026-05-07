import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { QUERY_KEYS } from '@/constants';

// ─────────────────────────────────────────────────
// REACT QUERY HOOKS
// Encapsulate data fetching with caching, refetching,
// and stale-time strategies per domain entity.
// ─────────────────────────────────────────────────

export function usePortfolio() {
  return useQuery({
    queryKey: QUERY_KEYS.portfolio,
    queryFn: apiService.getPortfolio,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useHoldings() {
  return useQuery({
    queryKey: QUERY_KEYS.holdings,
    queryFn: apiService.getHoldings,
    staleTime: 30_000,
  });
}

export function useTransactions(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: [...QUERY_KEYS.transactions, page, pageSize],
    queryFn: () => apiService.getTransactions(page, pageSize),
    staleTime: 60_000,
  });
}

export function useWatchlist() {
  return useQuery({
    queryKey: QUERY_KEYS.watchlist,
    queryFn: apiService.getWatchlist,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useMarketIndices() {
  return useQuery({
    queryKey: QUERY_KEYS.marketIndices,
    queryFn: apiService.getMarketIndices,
    staleTime: 10_000,
    refetchInterval: 15_000,
  });
}

export function usePerformance() {
  return useQuery({
    queryKey: QUERY_KEYS.performance,
    queryFn: apiService.getPerformanceData,
    staleTime: 300_000,
  });
}

export function useAllocation() {
  return useQuery({
    queryKey: QUERY_KEYS.analytics,
    queryFn: apiService.getAllocation,
    staleTime: 300_000,
  });
}

export function useStatCards() {
  return useQuery({
    queryKey: ['stat-cards'],
    queryFn: apiService.getStatCards,
    staleTime: 30_000,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.notifications,
    queryFn: apiService.getNotifications,
    staleTime: 60_000,
  });
}
