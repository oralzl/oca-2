import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Search, Star, User } from 'lucide-react';
import { cn } from "@/lib/utils";

const navigation = [
  { name: '查询', href: '/search', icon: Search },
  { name: '收藏', href: '/favorites', icon: Star },
  { name: '我的', href: '/profile', icon: User },
];

interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ className }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const isActive = (path: string) => {
    // 如果当前在搜索页面且来源是收藏页面，则收藏应该保持激活状态
    if (location.pathname === '/search' && searchParams.get('from') === 'favorites') {
      return path === '/favorites';
    }
    return location.pathname === path;
  };

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 glass border-t bg-background/80 backdrop-blur-lg",
      className
    )}>
      <div className="flex items-center justify-around px-4 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all",
                "min-w-0 flex-1 text-center",
                active 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all",
                active && "bg-gradient-primary shadow-glow"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  active && "text-white"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium transition-colors",
                active && "text-primary"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};