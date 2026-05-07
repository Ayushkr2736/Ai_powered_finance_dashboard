import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// SKELETON – Tonal shimmer loading placeholder
// ═══════════════════════════════════════════════════════

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'default', width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'shimmer-bg animate-pulse bg-surface-mid rounded-lg',
        { 'rounded-full': variant === 'circular', 'h-4 rounded-md': variant === 'text' },
        className,
      )}
      style={{ width, height }}
      role="status"
      aria-label="Loading..."
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bento-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-24 h-3" />
        <Skeleton variant="circular" className="w-9 h-9" />
      </div>
      <Skeleton variant="text" className="w-36 h-8" />
      <Skeleton variant="text" className="w-20 h-3" />
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="bento-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-40 h-5" />
        <div className="flex gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-10 h-7 rounded-lg" />
          ))}
        </div>
      </div>
      <Skeleton className="w-full rounded-xl" height={height} />
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-edge-subtle">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} variant="text" className="flex-1 h-4" />
      ))}
    </div>
  );
}
