import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { BottomNavigation } from './BottomNavigation';

export const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="h-screen bg-gradient-surface flex w-full overflow-hidden">
        {/* Desktop Sidebar */}
        <AppSidebar className="hidden md:flex" />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto px-4">
          <Outlet />
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNavigation className="md:hidden" />
        
        <Toaster />
        <Sonner />
      </div>
    </SidebarProvider>
  );
};