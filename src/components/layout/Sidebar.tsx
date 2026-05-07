import { Zap, ChevronLeft, ChevronRight, HelpCircle, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarItem } from '@/components/ui';
import { useAppStore } from '@/store';
import { NAV_ITEMS, SIDEBAR_WIDTH, ANIMATION } from '@/constants';
import { LayoutDashboard, Briefcase, BarChart3, ArrowLeftRight, Eye, Settings, PieChart } from 'lucide-react';
import { cn } from '@/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  ArrowLeftRight,
  Eye,
  Settings,
};

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, sidebarOpen, toggleSidebar } = useAppStore();
  const width = sidebarCollapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded;

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
      <motion.aside
        className={cn(
          "fixed md:relative top-0 left-0 h-screen z-40 flex flex-col shrink-0 bg-surface-low border-r border-edge-subtle transition-transform duration-300",
          !sidebarOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        )}
        animate={{ width }}
        transition={{ duration: 0.3, ease: ANIMATION.easeOut }}
      >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-5 h-20 border-b border-edge-subtle shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shrink-0 shadow-glow-blue">
          <Zap className="h-4 w-4 text-white fill-current" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              className="overflow-hidden whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-title-md font-bold text-text-primary tracking-tight">
                Proton <span className="text-gold-500">.</span>
              </h1>
              <p className="text-[10px] text-text-faint font-medium uppercase tracking-widest -mt-1">
                Wealth Curator
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            to={item.path}
            icon={iconMap[item.icon] ?? LayoutDashboard}
            label={item.label}
            badge={item.badge}
            collapsed={sidebarCollapsed}
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-6 space-y-6 border-t border-edge-subtle shrink-0">
        {!sidebarCollapsed && (
          <motion.div
            className="bg-gradient-to-br from-gold-600/20 to-gold-400/5 rounded-2xl p-5 border border-gold-500/10 relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-110 transition-transform">
              <Sparkles className="h-8 w-8 text-gold-500" />
            </div>
            <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1">Elite Tier</div>
            <div className="text-sm font-bold text-text-primary mb-3">Upgrade Account</div>
            <button className="w-full h-8 bg-gold-600 hover:bg-gold-500 text-white text-[10px] font-bold rounded-lg transition-colors uppercase tracking-widest">
              Explore Pro
            </button>
          </motion.div>
        )}

        <div className="space-y-1">
          <SidebarItem to="/help" icon={HelpCircle} label="Help Center" collapsed={sidebarCollapsed} />
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-faint hover:text-alert hover:bg-alert/5 transition-all text-body-md font-medium cursor-pointer">
            <LogOut className="h-[18px] w-[18px]" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-text-faint hover:text-text-secondary hover:bg-surface-mid transition-all text-xs cursor-pointer"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!sidebarCollapsed && <span className="font-medium">Minimize Sidebar</span>}
        </button>
      </div>
    </motion.aside>
    </>
  );
}
