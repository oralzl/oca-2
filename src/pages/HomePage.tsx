import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Search, 
  Star, 
  Zap, 
  Globe, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI 智能解释',
      description: '基于 Gemini 2.5 模型，提供深度个性化的单词解释',
      color: 'text-primary'
    },
    {
      icon: Zap,
      title: '词形还原技术',
      description: '智能识别单词变形，提供标准形式和变形说明',
      color: 'text-accent-warm'
    },
    {
      icon: Star,
      title: '个性化收藏',
      description: '建立个人词汇库，随时复习重要单词',
      color: 'text-success'
    },
    {
      icon: Globe,
      title: '云原生架构',
      description: '无服务器部署，零运维，全球加速访问',
      color: 'text-primary'
    }
  ];

  const stats = [
    { label: '准确率', value: '99%', color: 'text-success' },
    { label: '响应时间', value: '<1s', color: 'text-accent-warm' },
    { label: '支持语言', value: '中英', color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 lg:py-24">
        <div className="space-y-6 max-w-4xl mx-auto">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI驱动的智能学习
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            <span className="text-gradient">AI-Voca-2</span>
            <br />
            <span className="text-foreground">智能词汇学习助手</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            采用最新AI技术，为英语学习者提供深度、个性化的单词解释。
            让每一个词汇都成为你英语进步的基石。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-white px-8 py-3 hover-glow"
              asChild
            >
              <Link to="/search">
                <Search className="w-5 h-5 mr-2" />
                开始查询单词
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 hover-lift"
              asChild
            >
              <Link to="/favorites">
                <Star className="w-5 h-5 mr-2" />
                查看收藏
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 pt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            为什么选择 <span className="text-gradient">AI-Voca-2</span>？
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我们将人工智能与语言学习完美结合，为你打造最智能的词汇学习体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover-lift hover-glow transition-all duration-300 border-0 shadow-soft"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-primary/10`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <Card className="bg-gradient-primary text-white border-0 shadow-strong">
          <CardContent className="p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">
                开始你的智能学习之旅
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                无需下载，无需安装。在浏览器中即可享受专业级的AI词汇解释服务。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="px-8 py-3 bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link to="/search">
                    <BookOpen className="w-5 h-5 mr-2" />
                    立即开始学习
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};