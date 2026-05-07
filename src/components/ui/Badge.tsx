import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// BADGE – Semantic status & label indicator
// ═══════════════════════════════════════════════════════

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600/10 text-blue-400 border border-blue-600/15',
        gold: 'bg-gold-500/10 text-gold-400 border border-gold-500/15',
        success: 'bg-success/10 text-success border border-success/15',
        danger: 'bg-alert/10 text-alert border border-alert/15',
        warning: 'bg-warning/10 text-warning border border-warning/15',
        neutral: 'bg-surface-high text-text-muted border border-edge-subtle',
        outline: 'border border-edge-default text-text-secondary bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant, size, className, dot }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} role="status">
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', {
            'bg-blue-400': variant === 'default' || !variant,
            'bg-gold-400': variant === 'gold',
            'bg-success': variant === 'success',
            'bg-alert': variant === 'danger',
            'bg-warning': variant === 'warning',
            'bg-text-muted': variant === 'neutral',
            'bg-text-secondary': variant === 'outline',
          })}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
