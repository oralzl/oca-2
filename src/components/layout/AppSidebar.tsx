import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Search, Star, User } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const navigation = [{
  name: '单词查询',
  href: '/search',
  icon: Search
}, {
  name: '我的收藏',
  href: '/favorites',
  icon: Star
}];
interface AppSidebarProps {
  className?: string;
}
export const AppSidebar: React.FC<AppSidebarProps> = ({
  className
}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <Sidebar className={cn("border-r glass", className)}>
      <SidebarContent>
        {/* Brand */}
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">AI-Voca-2</h1>
              <p className="text-xs text-muted-foreground">智能词汇助手</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-6 py-6">
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map(item => {
              const Icon = item.icon;
              return <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className={cn("w-full justify-start space-x-4 px-6 py-5 rounded-lg transition-all text-base", isActive(item.href) ? "bg-gradient-primary text-white shadow-glow" : "hover:bg-muted")}>
                      <Link to={item.href}>
                        <Icon className="w-6 h-6" />
                        <span className="font-semibold">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile */}
        <div className="mt-auto p-6 border-t border-border/50">
          <SidebarMenuButton className="w-full justify-start space-x-4 px-6 py-5 rounded-lg hover:bg-muted text-base">
            <User className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">用户账户</span>
              <span className="text-sm text-muted-foreground">点击管理</span>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>;
};