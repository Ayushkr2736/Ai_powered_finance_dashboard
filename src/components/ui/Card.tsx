import { cn } from '@/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ANIMATION } from '@/constants';

// ═══════════════════════════════════════════════════════
// CARD – Bento-style card with tonal depth, no hard borders
// ═══════════════════════════════════════════════════════

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'gold' | 'success' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
  xl: 'p-8',
} as const;

const glowMap = {
  none: '',
  blue: 'glow-blue',
  gold: 'glow-gold',
  success: 'glow-success',
} as const;

export function Card({
  children,
  className,
  hover = true,
  glow = 'none',
  padding = 'md',
  animate: shouldAnimate = true,
  ...motionProps
}: CardProps) {
  return (
    <motion.div
      className={cn(
        'bento-card rounded-2xl',
        paddingMap[padding],
        hover && 'bento-card',
        glowMap[glow],
        className,
      )}
      {...(shouldAnimate
        ? {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: ANIMATION.normal, ease: ANIMATION.easeOut },
          }
        : {})}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between mb-5', className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn('text-title-md text-text-primary', className)}>
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('', className)}>{children}</div>;
}
