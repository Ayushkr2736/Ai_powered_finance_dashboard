import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// BUTTON – CVA-driven, accessible, premium fintech style
// ═══════════════════════════════════════════════════════

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none',
    'transition-all duration-200 ease-out cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.98]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-500 shadow-sm hover:shadow-glow-blue',
        secondary:
          'bg-surface-high text-text-secondary border border-edge-default hover:bg-surface-elevated hover:text-text-primary hover:border-edge-strong',
        ghost:
          'text-text-muted hover:text-text-secondary hover:bg-surface-mid',
        outline:
          'border border-edge-accent text-blue-400 hover:bg-blue-600/8 hover:text-blue-300',
        danger:
          'bg-alert/10 text-alert border border-alert/15 hover:bg-alert/15',
        gold:
          'bg-gradient-to-r from-gold-600 to-gold-500 text-white hover:from-gold-500 hover:to-gold-400 shadow-sm hover:shadow-glow-gold',
        premium:
          'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-sm hover:shadow-glow-blue bg-[length:200%_100%] hover:bg-right transition-[background-position,box-shadow] duration-500',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-md',
        sm: 'h-8 px-3 text-label-sm rounded-lg',
        md: 'h-9 px-4 text-body-md rounded-lg',
        lg: 'h-10 px-5 text-body-md rounded-lg',
        xl: 'h-11 px-6 text-title-md rounded-xl',
        icon: 'h-9 w-9 rounded-lg',
        'icon-sm': 'h-8 w-8 rounded-lg',
        'icon-xs': 'h-6 w-6 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
