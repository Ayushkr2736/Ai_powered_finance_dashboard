import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// ALERT CARD – Contextual notification card
// ═══════════════════════════════════════════════════════

const alertVariants = cva(
  'relative flex gap-3 rounded-xl p-4 border transition-all duration-200',
  {
    variants: {
      variant: {
        info: 'bg-info-soft border-blue-600/15 text-blue-300',
        success: 'bg-success-soft border-success/15 text-success',
        warning: 'bg-warning-soft border-warning/15 text-warning',
        danger: 'bg-alert-soft border-alert/15 text-alert',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: XCircle,
} as const;

interface AlertCardProps extends VariantProps<typeof alertVariants> {
  title: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  action?: React.ReactNode;
}

export function AlertCard({ variant = 'info', title, message, onDismiss, className, action }: AlertCardProps) {
  const Icon = iconMap[variant ?? 'info'];

  return (
    <motion.div
      className={cn(alertVariants({ variant }), className)}
      role="alert"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <h4 className="text-body-md font-semibold">{title}</h4>
        <p className="text-label-sm opacity-80 mt-0.5">{message}</p>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
