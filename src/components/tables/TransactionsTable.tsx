import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/utils';
import { Badge } from '@/components/ui';
import type { Transaction } from '@/types';

// ─────────────────────────────────────────────────
// TRANSACTIONS TABLE – Activity feed with status
// ─────────────────────────────────────────────────

interface TransactionsTableProps {
  transactions: readonly Transaction[];
}

const typeConfig: Record<string, { color: string; badgeVariant: 'success' | 'danger' | 'info' | 'warning' | 'neutral'; icon: React.ElementType }> = {
  buy: { color: 'text-accent-emerald', badgeVariant: 'success', icon: ArrowUpRight },
  sell: { color: 'text-accent-rose', badgeVariant: 'danger', icon: ArrowDownRight },
  dividend: { color: 'text-accent-cyan', badgeVariant: 'info', icon: ArrowUpRight },
  deposit: { color: 'text-accent-emerald', badgeVariant: 'success', icon: ArrowUpRight },
  withdrawal: { color: 'text-accent-rose', badgeVariant: 'danger', icon: ArrowDownRight },
  fee: { color: 'text-accent-amber', badgeVariant: 'warning', icon: Minus },
};

const statusBadge: Record<string, 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'danger',
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-secondary">
            {['Type', 'Description', 'Amount', 'Category', 'Date', 'Status'].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-[11px] font-semibold text-proton-500 uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const config = typeConfig[tx.type] ?? typeConfig.buy!;
            const Icon = config.icon;
            return (
              <tr
                key={tx.id}
                className="border-b border-border-secondary/50 hover:bg-surface-tertiary/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={cn('p-1.5 rounded-lg bg-surface-tertiary', config.color)}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <Badge variant={config.badgeVariant} size="sm">
                      {tx.type.toUpperCase()}
                    </Badge>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-proton-100 font-medium">{tx.name}</div>
                  {tx.symbol && (
                    <div className="text-xs text-proton-500">
                      {tx.quantity && `${tx.quantity} shares`}
                      {tx.price && ` @ ${formatCurrency(tx.price)}`}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'text-sm font-mono font-semibold',
                      tx.type === 'sell' || tx.type === 'withdrawal' || tx.type === 'fee'
                        ? 'text-accent-rose'
                        : 'text-accent-emerald',
                    )}
                  >
                    {tx.type === 'sell' || tx.type === 'withdrawal' || tx.type === 'fee' ? '-' : '+'}
                    {formatCurrency(tx.amount)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-proton-400">{tx.category}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-proton-400">
                    {formatDate(tx.date, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusBadge[tx.status] ?? 'neutral'} size="sm" dot>
                    {tx.status}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
