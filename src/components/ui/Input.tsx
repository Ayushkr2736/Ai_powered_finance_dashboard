import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// INPUT – Accessible form input with tonal surface
// ═══════════════════════════════════════════════════════

const inputVariants = cva(
  [
    'w-full bg-surface-low text-text-primary placeholder:text-text-faint',
    'border border-edge-default rounded-xl',
    'transition-all duration-200',
    'focus:outline-none focus:border-blue-600/40 focus:ring-2 focus:ring-blue-600/10',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      inputSize: {
        sm: 'h-8 px-3 text-label-sm',
        md: 'h-9 px-3.5 text-body-md',
        lg: 'h-10 px-4 text-body-md',
        xl: 'h-11 px-4 text-title-md',
      },
      state: {
        default: '',
        error: 'border-alert/40 focus:border-alert/60 focus:ring-alert/10',
        success: 'border-success/40 focus:border-success/60 focus:ring-success/10',
      },
    },
    defaultVariants: {
      inputSize: 'md',
      state: 'default',
    },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, state, label, helperText, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const resolvedState = error ? 'error' : state;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-label-sm text-text-secondary block">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ inputSize, state: resolvedState, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-[11px] text-alert" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-[11px] text-text-faint">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
