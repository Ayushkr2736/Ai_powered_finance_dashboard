import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency, formatPercentage, formatCompactNumber } from '@/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui';
import { useWatchlist } from '@/hooks';
import { TableRowSkeleton } from '@/components/ui';

// ─────────────────────────────────────────────────
// WATCHLIST WIDGET – Quick view of tracked assets
// ─────────────────────────────────────────────────

export function WatchlistWidget() {
  const { data: watchlist, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Watchlist</CardTitle>
        </CardHeader>
        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} columns={4} />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <span className="text-xs text-proton-500">{watchlist?.length ?? 0} assets</span>
      </CardHeader>

      <div className="space-y-0.5">
        {watchlist?.map((item, i) => {
          const isPositive = item.changePercent >= 0;
          return (
            <motion.div
              key={item.symbol}
              className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-surface-tertiary/50 transition-colors cursor-pointer group"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-tertiary flex items-center justify-center border border-border-secondary group-hover:border-border-accent transition-colors">
                  <span className="text-[10px] font-bold text-proton-300">
                    {item.symbol.slice(0, 3)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-proton-100">{item.symbol}</div>
                  <div className="text-xs text-proton-500 truncate max-w-[80px]">{item.name}</div>
                </div>
              </div>

              <div className="text-right flex items-center gap-4">
                <div className="hidden sm:block text-xs text-proton-500 font-mono">
                  Vol: {formatCompactNumber(item.volume)}
                </div>
                <div>
                  <div className="text-sm font-mono font-medium text-proton-100">
                    {formatCurrency(item.price)}
                  </div>
                  <div
                    className={cn(
                      'flex items-center gap-0.5 justify-end text-xs font-mono',
                      isPositive ? 'text-accent-emerald' : 'text-accent-rose',
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {formatPercentage(item.changePercent)}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
