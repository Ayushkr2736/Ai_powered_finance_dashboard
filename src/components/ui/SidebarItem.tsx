import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// SIDEBAR ITEM – Navigation link with active indicator
// ═══════════════════════════════════════════════════════

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string | number;
  collapsed?: boolean;
}

export function SidebarItem({ to, icon: Icon, label, badge, collapsed = false }: SidebarItemProps) {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-md font-medium relative group',
        'transition-all duration-200',
        isActive
          ? 'text-text-primary bg-blue-600/8'
          : 'text-text-muted hover:text-text-secondary hover:bg-surface-mid',
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-blue-500"
          layoutId="sidebar-active-indicator"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}

      <Icon
        className={cn(
          'h-[18px] w-[18px] shrink-0 transition-colors duration-200',
          isActive ? 'text-blue-400' : 'text-text-faint group-hover:text-text-muted',
        )}
        aria-hidden="true"
      />

      <AnimatePresence>
        {!collapsed && (
          <motion.span
            className="truncate"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      {badge != null && !collapsed && (
        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold bg-blue-600/12 text-blue-400 rounded-full">
          {badge}
        </span>
      )}

      {/* Collapsed tooltip */}
      {collapsed && (
        <div
          className="absolute left-full ml-3 px-2.5 py-1.5 bg-surface-elevated border border-edge-subtle rounded-lg text-xs text-text-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg"
          role="tooltip"
        >
          {label}
        </div>
      )}
    </Link>
  );
}
