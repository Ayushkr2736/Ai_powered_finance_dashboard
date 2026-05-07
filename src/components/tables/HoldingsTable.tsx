import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/utils';
import { Badge } from '@/components/ui';
import type { Holding } from '@/types';

// ─────────────────────────────────────────────────
// HOLDINGS TABLE – Sortable asset position grid
// ─────────────────────────────────────────────────

interface HoldingsTableProps {
  holdings: readonly Holding[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-secondary">
            {['Asset', 'Type', 'Qty', 'Avg Cost', 'Price', 'Value', 'P&L', 'P&L %', 'Alloc.'].map(
              (header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-[11px] font-semibold text-proton-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => {
            const isPositive = holding.gainPercent >= 0;
            return (
              <tr
                key={holding.id}
                className="border-b border-border-secondary/50 hover:bg-surface-tertiary/50 transition-colors cursor-pointer group"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-tertiary flex items-center justify-center border border-border-secondary group-hover:border-border-accent transition-colors">
                      <span className="text-[10px] font-bold text-proton-300">
                        {holding.symbol.slice(0, 3)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-proton-100">{holding.symbol}</div>
                      <div className="text-xs text-proton-500 truncate max-w-[100px]">
                        {holding.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="neutral" size="sm">
                    {holding.type.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-proton-200 font-mono">
                  {holding.quantity.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-proton-300 font-mono">
                  {formatCurrency(holding.avgCost)}
                </td>
                <td className="px-4 py-3 text-sm text-proton-100 font-mono font-medium">
                  {formatCurrency(holding.currentPrice)}
                </td>
                <td className="px-4 py-3 text-sm text-proton-100 font-mono font-semibold">
                  {formatCurrency(holding.marketValue, 'USD', 'en-US', true)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'text-sm font-mono font-medium',
                      isPositive ? 'text-accent-emerald' : 'text-accent-rose',
                    )}
                  >
                    {formatCurrency(holding.gain)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div
                    className={cn(
                      'inline-flex items-center gap-1 text-sm font-mono font-semibold',
                      isPositive ? 'text-accent-emerald' : 'text-accent-rose',
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {formatPercentage(holding.gainPercent)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-proton-600 to-proton-400"
                        style={{ width: `${Math.min(holding.allocation * 4, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-proton-400 font-mono">{holding.allocation}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
