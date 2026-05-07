// ═══════════════════════════════════════════════════════
// HOOKS BARREL EXPORTS
// ═══════════════════════════════════════════════════════

// Core Utils
export { useLocalStorage, useDebounce, useAnalytics, useFetch } from './useCore';

// Domain Hooks
export {
  usePortfolio,
  useHoldings,
  useTransactions,
  useBudgets,
  useAIInsights,
  useMarketSentiment,
  useAlerts,
  useAllocation,
} from './useFinance';

// System & Utility Hooks
export { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop, useKeyboardShortcut } from './useResponsive';
export { 
  useWatchlist, 
  useMarketIndices, 
  usePerformance, 
  useStatCards, 
  useNotifications 
} from './useQueries';
