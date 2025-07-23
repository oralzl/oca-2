import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedSearchInput } from "@/components/ui/enhanced-search-input";
import { 
  Search, 
  BookOpen, 
  Sparkles,
  Languages,
  Lightbulb
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
    
    // Navigate to word result page
    navigate(`/word/${encodeURIComponent(term)}`);
  };

  const handleSearch = async () => {
    handleSearchWithTerm(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Default layout
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-4 h-full flex flex-col justify-center">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gradient">智能单词查询</h1>
        <p className="text-muted-foreground">
          输入任何英文单词，获得AI驱动的深度解释
        </p>
      </div>

      {/* Enhanced Search Form */}
      <div className="space-y-6 w-full">
        <EnhancedSearchInput
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
          onKeyPress={handleKeyPress}
          onSearch={handleSearch}
          placeholder="输入英文单词..."
        />
      </div>

      {/* Quick Start Tips */}
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
    </div>
  );
};