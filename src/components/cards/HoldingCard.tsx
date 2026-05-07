import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/utils';
import type { Holding } from '@/types';

// ─────────────────────────────────────────────────
// HOLDING CARD – Individual asset position display
// ─────────────────────────────────────────────────

interface HoldingCardProps {
  holding: Holding;
  index?: number;
}

const typeColors: Record<string, string> = {
  stock: 'bg-proton-600/15 text-proton-300',
  etf: 'bg-accent-cyan/10 text-accent-cyan',
  crypto: 'bg-accent-amber/10 text-accent-amber',
  bond: 'bg-accent-emerald/10 text-accent-emerald',
  commodity: 'bg-accent-violet/10 text-accent-violet',
  reit: 'bg-accent-rose/10 text-accent-rose',
};

export function HoldingCard({ holding, index = 0 }: HoldingCardProps) {
  const isPositive = holding.gainPercent >= 0;

  return (
    <motion.div
      className="glass-card glass-card-hover rounded-xl p-4 group cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-tertiary flex items-center justify-center border border-border-secondary">
            <span className="text-xs font-bold text-proton-300">{holding.symbol.slice(0, 3)}</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-proton-100">{holding.symbol}</h4>
            <p className="text-xs text-proton-500 truncate max-w-[120px]">{holding.name}</p>
          </div>
        </div>
        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', typeColors[holding.type] ?? typeColors.stock)}>
          {holding.type.toUpperCase()}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-bold text-proton-50 font-mono">
            {formatCurrency(holding.marketValue, 'USD', 'en-US', true)}
          </div>
          <div className="text-xs text-proton-500 mt-0.5">
            {holding.quantity} × {formatCurrency(holding.currentPrice)}
          </div>
        </div>
        <div className="text-right">
          <div className={cn('flex items-center gap-0.5 justify-end', isPositive ? 'text-accent-emerald' : 'text-accent-rose')}>
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            <span className="text-sm font-semibold font-mono">{formatPercentage(holding.gainPercent)}</span>
          </div>
          <div className={cn('text-xs font-mono', isPositive ? 'text-accent-emerald/70' : 'text-accent-rose/70')}>
            {formatCurrency(holding.gain)}
          </div>
        </div>
      </div>

      {/* Allocation bar */}
      <div className="mt-3 pt-3 border-t border-border-secondary">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-proton-500">Allocation</span>
          <span className="text-proton-300 font-medium">{holding.allocation}%</span>
        </div>
        <div className="w-full h-1 rounded-full bg-surface-tertiary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-proton-600 to-proton-400"
            initial={{ width: 0 }}
            animate={{ width: `${holding.allocation}%` }}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
