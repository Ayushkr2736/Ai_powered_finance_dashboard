import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { TRANSITIONS } from '@/constants/animations';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  badge?: string;
  badgeIcon?: React.ElementType;
  actions?: React.ReactNode;
  sideContent?: React.ReactNode;
  variant?: 'blue' | 'gold' | 'dark';
  className?: string;
}

/**
 * High-end Hero component used for strategy announcements and main section headers.
 */
export function Hero({
  title,
  subtitle,
  badge,
  badgeIcon: BadgeIcon,
  actions,
  sideContent,
  variant = 'blue',
  className,
}: HeroProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-3xl p-8 lg:p-10 border shadow-xl',
        variant === 'blue' && 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 border-blue-400/20',
        variant === 'gold' && 'bg-gradient-to-br from-surface-mid to-bg border-edge-subtle',
        variant === 'dark' && 'bg-surface-low border-edge-subtle',
        className
      )}
      {...TRANSITIONS.card}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-2xl space-y-6">
          {badge && (
            <div className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest',
              variant === 'blue' ? 'bg-blue-400/10 border-blue-400/20 text-blue-300' : 'bg-gold-500/10 border-gold-500/20 text-gold-500'
            )}>
              {BadgeIcon && <BadgeIcon className="h-3 w-3" />}
              {badge}
            </div>
          )}
          
          <h2 className={cn(
            'text-display-md leading-[1.1] tracking-tight',
            variant === 'blue' ? 'text-white' : 'text-text-primary'
          )}>
            {title}
          </h2>
          
          <p className={cn(
            'text-body-md max-w-xl leading-relaxed',
            variant === 'blue' ? 'text-blue-100/70' : 'text-text-muted'
          )}>
            {subtitle}
          </p>
          
          {actions && (
            <div className="flex flex-wrap items-center gap-4">
              {actions}
            </div>
          )}
        </div>

        {sideContent && (
          <div className="shrink-0">
            {sideContent}
          </div>
        )}
      </div>
    </motion.div>
  );
}
