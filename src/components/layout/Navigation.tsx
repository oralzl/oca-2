import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Search, Star, User, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: '单词查询', href: '/search', icon: Search },
    { name: '我的收藏', href: '/favorites', icon: Star },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover-lift"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient">AI-Voca-2</h1>
              <p className="text-xs text-muted-foreground">智能词汇助手</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2",
                    isActive(item.href) 
                      ? "bg-gradient-primary text-white shadow-glow" 
                      : "hover:bg-muted"
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>账户</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <Card className="md:hidden absolute top-16 left-4 right-4 p-4 animate-slide-up">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start space-x-2",
                      isActive(item.href) && "bg-gradient-primary text-white"
                    )}
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={item.href}>
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
              <div className="pt-2 border-t">
                <Button variant="outline" className="w-full justify-start space-x-2">
                  <User className="w-4 h-4" />
                  <span>账户设置</span>
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </nav>
  );
};