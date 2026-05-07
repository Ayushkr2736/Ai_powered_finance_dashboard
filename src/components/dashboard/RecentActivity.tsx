import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus, Clock } from 'lucide-react';
import { cn, formatCurrency, formatRelativeTime } from '@/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui';
import { useTransactions } from '@/hooks';
import { Skeleton } from '@/components/ui';

// ─────────────────────────────────────────────────
// RECENT ACTIVITY – Latest transactions feed
// ─────────────────────────────────────────────────

const typeIcon: Record<string, React.ElementType> = {
  buy: ArrowUpRight,
  sell: ArrowDownRight,
  dividend: ArrowUpRight,
  deposit: ArrowUpRight,
  withdrawal: ArrowDownRight,
  fee: Minus,
};

const typeColor: Record<string, string> = {
  buy: 'text-accent-emerald bg-accent-emerald/10',
  sell: 'text-accent-rose bg-accent-rose/10',
  dividend: 'text-accent-cyan bg-accent-cyan/10',
  deposit: 'text-accent-emerald bg-accent-emerald/10',
  withdrawal: 'text-accent-rose bg-accent-rose/10',
  fee: 'text-accent-amber bg-accent-amber/10',
};

export function RecentActivity() {
  const { data, isLoading } = useTransactions(1, 5);

  if (isLoading) {
    return (
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circular" className="w-9 h-9" />
              <div className="flex-1 space-y-1.5">
                <Skeleton variant="text" className="w-32 h-3.5" />
                <Skeleton variant="text" className="w-20 h-3" />
              </div>
              <Skeleton variant="text" className="w-16 h-4" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const transactions = data?.data ?? [];

  return (
    <Card padding="lg">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <button className="text-xs text-proton-500 hover:text-proton-300 transition-colors">
          View all
        </button>
      </CardHeader>

      <div className="space-y-1">
        {transactions.map((tx, i) => {
          const Icon = typeIcon[tx.type] ?? Minus;
          const colorClass = typeColor[tx.type] ?? typeColor.fee;
          const isNegative = tx.type === 'sell' || tx.type === 'withdrawal' || tx.type === 'fee';

          return (
            <motion.div
              key={tx.id}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-surface-tertiary/50 transition-colors cursor-pointer group"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className={cn('p-2 rounded-lg', colorClass)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-proton-100 truncate">{tx.name}</div>
                <div className="flex items-center gap-1 text-xs text-proton-500">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(tx.date)}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    'text-sm font-mono font-semibold',
                    isNegative ? 'text-accent-rose' : 'text-accent-emerald',
                  )}
                >
                  {isNegative ? '-' : '+'}
                  {formatCurrency(tx.amount, 'USD', 'en-US', tx.amount > 10000)}
                </div>
                <div className="text-[10px] text-proton-500 uppercase">{tx.type}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
