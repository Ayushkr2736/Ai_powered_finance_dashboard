import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatPercentage } from '@/utils';
import { useMarketIndices } from '@/hooks';
import { Skeleton } from '@/components/ui';

// ─────────────────────────────────────────────────
// MARKET TICKER – Horizontal scrolling market indices
// ─────────────────────────────────────────────────

export function MarketTicker() {
  const { data: indices, isLoading } = useMarketIndices();

  if (isLoading) {
    return (
      <div className="flex gap-6 px-4 py-2 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton variant="text" className="w-16 h-4" />
            <Skeleton variant="text" className="w-20 h-4" />
            <Skeleton variant="text" className="w-14 h-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 px-4 py-2 overflow-x-auto no-scrollbar">
      {indices?.map((index, i) => {
        const isPositive = index.changePercent >= 0;
        return (
          <motion.div
            key={index.symbol}
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-xs font-semibold text-proton-300 group-hover:text-proton-100 transition-colors">
              {index.name}
            </span>
            <span className="text-xs font-mono text-proton-200">
              {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <div
              className={cn(
                'flex items-center gap-0.5 text-xs font-mono font-medium',
                isPositive ? 'text-accent-emerald' : 'text-accent-rose',
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatPercentage(index.changePercent)}
            </div>
            {i < (indices?.length ?? 0) - 1 && (
              <div className="w-px h-4 bg-border-secondary" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
