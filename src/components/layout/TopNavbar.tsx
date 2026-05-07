import { Bell, Moon, Sun, Search } from 'lucide-react';
import { Button, SearchBar, Tooltip, Tabs } from '@/components/ui';
import { useAppStore } from '@/store';
import { useNotifications } from '@/hooks';
import { cn } from '@/utils';
import { useState } from 'react';

const topTabs = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'markets', label: 'Markets' },
] as const;

export function TopNavbar() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const {
    searchQuery,
    setSearchQuery,
    theme,
    setTheme,
    notificationPanelOpen,
    setNotificationPanelOpen,
    toggleSidebar,
  } = useAppStore();
  const { data: notifications } = useNotifications();

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <header className="h-20 border-b border-edge-subtle bg-bg/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4 sm:gap-10 flex-1">
        {/* Mobile Sidebar Toggle */}
        <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>

        {/* Search Bar Component */}
        <div className="hidden sm:block w-full max-w-[280px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search assets..."
            showShortcut={false}
          />
        </div>

        {/* Top Navigation Tabs */}
        <div className="hidden md:block">
          <Tabs
            tabs={topTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            className="h-20 border-none"
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        <Tooltip content={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-text-muted hover:text-blue-400 transition-colors" />
            ) : (
              <Moon className="h-4 w-4 text-text-muted hover:text-blue-400 transition-colors" />
            )}
          </Button>
        </Tooltip>

        <Tooltip content="Notifications">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-text-muted hover:text-blue-400 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-500 shadow-glow-gold" />
            )}
          </Button>
        </Tooltip>

        {/* User Account Section */}
        <div className="ml-2 flex items-center gap-3 pl-5 border-l border-edge-subtle">
          <div className="text-right hidden sm:block">
            <div className="text-label-sm font-semibold text-text-primary">Ayush Kumar</div>
            <div className="text-[10px] text-gold-500 font-bold uppercase tracking-wider">
              Private Client
            </div>
          </div>
          <div className={cn(
            'w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold text-white',
            'ring-1 ring-white/10 shadow-lg',
          )}>
            AK
          </div>
        </div>
      </div>
    </header>
  );
}
