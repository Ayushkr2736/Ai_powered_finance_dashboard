import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn, formatPercentage } from '@/utils';

// ─────────────────────────────────────────────────
// STAT CARD – Key metric display with trend indicator
// ─────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  TrendingUp,
  BarChart3,
  PiggyBank,
};

const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
  proton: {
    bg: 'bg-proton-600/10',
    icon: 'text-proton-400',
    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.15)]',
  },
  emerald: {
    bg: 'bg-accent-emerald/10',
    icon: 'text-accent-emerald',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
  },
  cyan: {
    bg: 'bg-accent-cyan/10',
    icon: 'text-accent-cyan',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]',
  },
  violet: {
    bg: 'bg-accent-violet/10',
    icon: 'text-accent-violet',
    glow: 'shadow-[0_0_20px_rgba(167,139,250,0.15)]',
  },
};

interface StatCardProps {
  label: string;
  value: string;
  changePercent: number;
  trend: 'up' | 'down' | 'flat';
  icon: string;
  color: string;
  index?: number;
}

export function StatCard({ label, value, changePercent, trend, icon, color, index = 0 }: StatCardProps) {
  const IconComponent = iconMap[icon] ?? Wallet;
  const colors = colorMap[color] ?? colorMap.proton!;

  return (
    <motion.div
      className={cn(
        'glass-card glass-card-hover rounded-xl p-5 relative overflow-hidden group',
        colors.glow,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-proton-600/[0.03] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-proton-400 uppercase tracking-wider">
            {label}
          </span>
          <div className={cn('p-2 rounded-lg', colors.bg)}>
            <IconComponent className={cn('h-4 w-4', colors.icon)} />
          </div>
        </div>

        <div className="text-2xl font-bold text-proton-50 tracking-tight mb-2 font-mono">
          {value}
        </div>

        <div className="flex items-center gap-1.5">
          {trend === 'up' ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-accent-emerald" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-accent-rose" />
          )}
          <span
            className={cn(
              'text-xs font-semibold',
              trend === 'up' ? 'text-accent-emerald' : 'text-accent-rose',
            )}
          >
            {formatPercentage(changePercent)}
          </span>
          <span className="text-xs text-proton-500 ml-1">vs last period</span>
        </div>
      </div>
    </motion.div>
  );
}
