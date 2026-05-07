import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimeRange, ThemeMode } from '@/types';

// ─────────────────────────────────────────────────
// APP STORE – Global UI/App state
// ─────────────────────────────────────────────────

interface AppState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Time range
  selectedTimeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;

  // Command palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Notifications
  notificationPanelOpen: boolean;
  setNotificationPanelOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarOpen: true,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Time range
      selectedTimeRange: '1Y',
      setTimeRange: (range) => set({ selectedTimeRange: range }),

      // Command palette
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      // Notifications
      notificationPanelOpen: false,
      setNotificationPanelOpen: (open) => set({ notificationPanelOpen: open }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'proton-finance-app',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        selectedTimeRange: state.selectedTimeRange,
      }),
    },
  ),
);
