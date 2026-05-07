import { motion } from 'framer-motion';
import {
  Wallet, TrendingUp, BarChart3, PiggyBank,
  ArrowUpRight, ArrowDownRight, Minus,
} from 'lucide-react';
import { cn, formatPercentage } from '@/utils';
import { ANIMATION } from '@/constants';

// ═══════════════════════════════════════════════════════
// FINANCIAL STAT CARD – Key metric bento tile
// ═══════════════════════════════════════════════════════

const iconMap: Record<string, React.ElementType> = {
  Wallet, TrendingUp, BarChart3, PiggyBank,
};

const accentMap: Record<string, { bg: string; icon: string; glow: string }> = {
  blue: {
    bg: 'bg-blue-600/8',
    icon: 'text-blue-400',
    glow: 'hover:shadow-[0_0_24px_rgba(59,130,246,0.08)]',
  },
  gold: {
    bg: 'bg-gold-500/8',
    icon: 'text-gold-400',
    glow: 'hover:shadow-[0_0_24px_rgba(196,148,58,0.08)]',
  },
  success: {
    bg: 'bg-success/8',
    icon: 'text-success',
    glow: 'hover:shadow-[0_0_24px_rgba(34,197,94,0.08)]',
  },
  cyan: {
    bg: 'bg-blue-300/8',
    icon: 'text-blue-300',
    glow: 'hover:shadow-[0_0_24px_rgba(147,197,253,0.08)]',
  },
};

interface FinancialStatCardProps {
  label: string;
  value: string;
  changePercent: number;
  trend: 'up' | 'down' | 'flat';
  icon: string;
  accent?: string;
  subtitle?: string;
  index?: number;
}

export function FinancialStatCard({
  label,
  value,
  changePercent,
  trend,
  icon,
  accent = 'blue',
  subtitle,
  index = 0,
}: FinancialStatCardProps) {
  const IconComponent = iconMap[icon] ?? Wallet;
  const colors = accentMap[accent] ?? accentMap.blue!;

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;

  return (
    <motion.div
      className={cn(
        'bento-card rounded-2xl p-5 relative overflow-hidden group',
        colors.glow,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: ANIMATION.easeOut }}
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-600/[0.02] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-medium text-text-faint uppercase tracking-[0.08em]">
            {label}
          </span>
          <div className={cn('p-2 rounded-xl', colors.bg)}>
            <IconComponent className={cn('h-4 w-4', colors.icon)} aria-hidden="true" />
          </div>
        </div>

        {/* Value */}
        <div className="text-display-md text-text-primary font-mono tracking-tighter leading-none mb-1">
          {value}
        </div>

        {/* Trend */}
        <div className="flex items-center gap-2 mt-3">
          <div
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
              trend === 'up' && 'bg-success/10 text-success',
              trend === 'down' && 'bg-alert/10 text-alert',
              trend === 'flat' && 'bg-surface-high text-text-muted',
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {formatPercentage(changePercent)}
          </div>
          <span className="text-[11px] text-text-faint">
            {subtitle ?? 'vs last period'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
