import React from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { BottomNavigation } from './BottomNavigation';
import { useIsMobile } from "@/hooks/use-mobile";

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  // Check if we're on search page with results on mobile
  const isSearchPageWithResults = location.pathname === '/search' && searchParams.get('q');
  const shouldHideBottomNav = isMobile && isSearchPageWithResults;

  return (
    <SidebarProvider>
      <div className="h-screen bg-gradient-surface flex w-full overflow-hidden">
        {/* Desktop Sidebar */}
        <AppSidebar className="hidden md:flex" />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto px-4">
          <Outlet />
        </main>
        
        {/* Mobile Bottom Navigation - Hidden on search results */}
        {!shouldHideBottomNav && <BottomNavigation className="md:hidden" />}
        
        <Toaster />
        <Sonner />
      </div>
    </SidebarProvider>
  );
};