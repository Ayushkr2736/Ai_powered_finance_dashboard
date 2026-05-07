import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { useAppStore } from '@/store';
import { SIDEBAR_WIDTH } from '@/constants';

export function AppShell() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();
  const sidebarWidth = sidebarCollapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded;

  useEffect(() => {
    if (window.innerWidth < 768) {
      useAppStore.setState({ sidebarOpen: false });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-text-primary">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
