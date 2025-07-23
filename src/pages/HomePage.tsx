
/**
 * HomePage Component - AI-Voca-2 Landing Page
 * 
 * This component renders the main landing page with two distinct views:
 * 1. Authenticated view: Dashboard with quick actions and features overview
 * 2. Unauthenticated view: Marketing landing page with call-to-action
 * 
 * Design System Usage:
 * - Uses semantic color tokens from design system (text-gradient, bg-gradient-primary, etc.)
 * - Responsive design with mobile-first approach using Tailwind breakpoints
 * - Glass morphism effects with 'glass' utility class
 * - Hover animations with 'hover-lift' and 'hover-scale' utilities
 */

import React, { useState } from 'react';
import { Brain, Search, Star, Users, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

/**
 * Features configuration array
 * Defines the main features displayed on both authenticated and unauthenticated views
 * Each feature has an icon, title, description, and semantic color class
 */
const features = [
  {
    icon: Brain,
    title: 'AI驱动智能解释',
    description: '采用Gemini 2.5模型提供深度、个性化的单词解释',
    color: 'text-blue-500' // Using semantic color from design system
  },
  {
    icon: Zap,
    title: '词形还原技术',
    description: '智能识别单词变形，提供标准形式和变形说明',
    color: 'text-yellow-500'
  },
  {
    icon: Star,
    title: '个性化收藏系统',
    description: '用户可收藏单词，建立个人词汇库',
    color: 'text-purple-500'
  },
  {
    icon: Globe,
    title: '云原生架构',
    description: '无服务器架构，零运维，全球加速访问',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: '学习者友好',
    description: '专注中文用户英语学习需求，提供结构化学习内容',
    color: 'text-indigo-500'
  },
  {
    icon: Shield,
    title: '数据安全',
    description: '用户数据安全存储，隐私保护放心使用',
    color: 'text-red-500'
  }
];

export const HomePage: React.FC = () => {
  // Authentication context to determine which view to render
  const { isAuthenticated, user } = useAuth();
  // State for controlling authentication modal visibility
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Authenticated User Dashboard View
  if (isAuthenticated && user) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pt-8 pb-4">
        {/* Welcome Section - Brand identity and user greeting */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient">AI-Voca-2</h1>
              <p className="text-muted-foreground">智能词汇学习助手</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">欢迎回来，{user.displayName}！</h2>
            <p className="text-lg text-muted-foreground">
              继续你的智能词汇学习之旅
            </p>
          </div>
        </div>

        {/* Quick Actions - Primary user actions in card format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-lift glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <span>开始查询</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                输入任何英文单词，获取AI驱动的智能解释
              </p>
              <Button asChild className="w-full">
                <Link to="/search">开始查询单词</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>我的收藏</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                查看和管理你收藏的单词，建立个人词汇库
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/favorites">查看收藏</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid - Comprehensive feature showcase for authenticated users */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">功能特性</h3>
            <p className="text-muted-foreground">
              AI-Voca-2 为你提供全面的英语词汇学习体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift glass">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-background/50 ${feature.color}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated Landing Page View
  return (
    <>
      {/* Full-screen centered layout for marketing impact */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-4xl w-full space-y-8 sm:space-y-12">
          {/* Hero Section - Main value proposition and CTA */}
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gradient">
                AI-Voca-2
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                采用先进的 Gemini 2.5 模型，为你提供深度、个性化的单词解释。
                支持词形还原、智能收藏，助你高效构建个人词汇库。
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 h-12 sm:h-14 font-semibold hover-scale transition-all duration-300"
                onClick={() => setShowAuthModal(true)}
              >
                立即开始学习
              </Button>
            </div>
          </div>

          {/* Features Section - Showcase top 3 features for marketing */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 pt-4 sm:pt-8">
            {features.slice(0, 3).map((feature, index) => (
              <Card key={index} className="hover-lift glass text-center border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className={`p-3 sm:p-4 rounded-full bg-background/50 ${feature.color}`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-semibold text-base sm:text-lg">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialType="register"
      />
    </>
  );
};
