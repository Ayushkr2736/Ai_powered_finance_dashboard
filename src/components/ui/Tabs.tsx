import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// TABS – Animated tab navigation with underline indicator
// ═══════════════════════════════════════════════════════

interface Tab {
  id: string;
  label: string;
  badge?: string | number;
}

interface TabsProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills';
}

export function Tabs({ tabs, activeTab, onTabChange, className, variant = 'underline' }: TabsProps) {
  return (
    <div
      className={cn(
        'flex gap-0',
        variant === 'underline' && 'border-b border-edge-subtle',
        variant === 'pills' && 'bg-surface-low rounded-xl p-1 gap-1',
        className,
      )}
      role="tablist"
      aria-orientation="horizontal"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => {
              const idx = tabs.findIndex((t) => t.id === tab.id);
              if (e.key === 'ArrowRight' && idx < tabs.length - 1) {
                onTabChange(tabs[idx + 1]!.id);
              }
              if (e.key === 'ArrowLeft' && idx > 0) {
                onTabChange(tabs[idx - 1]!.id);
              }
            }}
            className={cn(
              'relative px-4 py-2.5 text-label-sm font-medium transition-colors cursor-pointer',
              variant === 'underline' && [
                isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary',
              ],
              variant === 'pills' && [
                'rounded-lg',
                isActive
                  ? 'text-text-primary bg-surface-high shadow-xs'
                  : 'text-text-muted hover:text-text-secondary',
              ],
            )}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.badge != null && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-blue-600/12 text-blue-400">
                  {tab.badge}
                </span>
              )}
            </span>
            {/* Animated underline */}
            {variant === 'underline' && isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                layoutId="tab-underline"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB PANEL – Content area paired with Tabs
// ═══════════════════════════════════════════════════════

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
  if (id !== activeTab) return null;
  return (
    <motion.div
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={cn('', className)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
