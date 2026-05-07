import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// PROGRESS BAR – Animated fill with glow
// ═══════════════════════════════════════════════════════

const progressVariants = cva('w-full rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2',
      xl: 'h-3',
    },
    variant: {
      blue: '',
      gold: '',
      success: '',
      danger: '',
      gradient: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'blue',
  },
});

const fillColors = {
  blue: 'bg-blue-500',
  gold: 'bg-gradient-to-r from-gold-600 to-gold-400',
  success: 'bg-success',
  danger: 'bg-alert',
  gradient: 'bg-gradient-to-r from-blue-600 via-blue-400 to-gold-500',
} as const;

interface ProgressBarProps extends VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue,
  size,
  variant = 'blue',
  className,
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-label-sm text-text-muted">{label}</span>}
          {showValue && (
            <span className="text-label-sm text-text-secondary font-mono">{pct.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div
        className={cn(progressVariants({ size, variant }), 'bg-surface-low')}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <motion.div
          className={cn('h-full rounded-full', fillColors[variant ?? 'blue'])}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
