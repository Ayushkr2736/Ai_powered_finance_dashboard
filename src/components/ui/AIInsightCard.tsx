import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// AI INSIGHT CARD – Premium AI-generated insight display
// ═══════════════════════════════════════════════════════

interface AIInsightCardProps {
  title: string;
  insight: string;
  confidence?: number;
  category?: string;
  action?: React.ReactNode;
  className?: string;
  index?: number;
}

export function AIInsightCard({
  title,
  insight,
  confidence,
  category,
  action,
  className,
  index = 0,
}: AIInsightCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl p-5',
        'bg-gradient-to-br from-surface-mid via-surface-low to-surface-ground',
        'border border-edge-subtle',
        'group hover:border-edge-gold transition-all duration-300',
        className,
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Gold glow overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gold-500/10">
            <Sparkles className="h-4 w-4 text-gold-400" aria-hidden="true" />
          </div>
          {category && (
            <span className="text-[10px] font-medium text-gold-500 uppercase tracking-wider">
              {category}
            </span>
          )}
        </div>
        {confidence != null && (
          <div className="flex items-center gap-1.5">
            <div className="w-12 h-1 rounded-full bg-surface-high overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
              />
            </div>
            <span className="text-[10px] text-gold-500 font-mono">{confidence}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        <h4 className="text-body-md font-semibold text-text-primary mb-1.5">{title}</h4>
        <p className="text-label-sm text-text-muted leading-relaxed">{insight}</p>
      </div>

      {/* Action */}
      {action && <div className="relative mt-4 pt-3 border-t border-edge-subtle">{action}</div>}
    </motion.div>
  );
}
