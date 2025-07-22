import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EnhancedSearchInput } from "@/components/ui/enhanced-search-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Check URL params for search term
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchTerm(queryParam);
      handleSearchWithTerm(queryParam);
    }
  }, [searchParams]);

  const handleSearchWithTerm = async (term: string) => {
    if (!term.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to word detail page instead of showing results
      navigate(`/word/${encodeURIComponent(term.trim())}`);
    }, 1500);
  };

  const handleSearch = async () => {
    handleSearchWithTerm(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-2xl mx-auto space-y-8 p-4">
      {/* Search Header */}
      {!isSearching && (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gradient">智能单词查询</h1>
          <p className="text-muted-foreground">
            输入任何英文单词，获得AI驱动的深度解释
          </p>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">正在查询中...</p>
        </div>
      )}

      {/* Enhanced Search Form */}
      {!isSearching && (
        <div className="space-y-6 w-full">
          <EnhancedSearchInput
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            onKeyPress={handleKeyPress}
            onSearch={handleSearch}
            placeholder="输入英文单词..."
            disabled={isSearching}
          />
        </div>
      )}

      {/* Quick Start Tips */}
      {!isSearching && (
        <Card className="bg-gradient-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>使用技巧</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p>• 支持词形变化查询（如 running → run）</p>
                <p>• 提供多层次的单词解释</p>
              </div>
              <div className="space-y-2">
                <p>• 包含词源和记忆技巧</p>
                <p>• 一键收藏重要单词</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};