import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedSearchInput } from "@/components/ui/enhanced-search-input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  BookOpen, 
  Volume2, 
  Star, 
  RotateCcw, 
  Copy, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  Languages,
  Lightbulb
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Mock search result for demonstration
  const mockResult = {
    word: "extraordinary",
    pronunciation: "/ɪkˈstrɔːrd(ə)n(ə)ri/",
    partOfSpeech: "adjective",
    definition: "非常特殊的；非凡的；异常的",
    simpleExplanation: "Beyond what is normal or expected; remarkable or exceptional",
    examples: [
      {
        english: "She has an extraordinary talent for music.",
        chinese: "她在音乐方面有着非凡的天赋。"
      },
      {
        english: "The view from the mountain was extraordinary.",
        chinese: "从山上看到的景色非常壮观。"
      }
    ],
    synonyms: ["remarkable", "exceptional", "outstanding", "amazing"],
    antonyms: ["ordinary", "common", "normal", "typical"],
    etymology: "来自拉丁语 'extraordinarius'，由 'extra'（超出）+ 'ordinarius'（普通的）组成",
    memoryTips: "想象 EXTRA（额外的）+ ORDINARY（普通的）= 超越普通的 = 非凡的"
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-8 p-4 ${!hasSearched ? 'h-full flex flex-col justify-center' : 'pt-8'}`}>
      {/* Search Header */}
      {!isSearching && !hasSearched && (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gradient">智能单词查询</h1>
          <p className="text-muted-foreground">
            输入任何英文单词，获得AI驱动的深度解释
          </p>
        </div>
      )}

      {/* Enhanced Search Form */}
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

      {/* Search Result */}
      {hasSearched && searchTerm && !isSearching && (
        <Card className="shadow-medium border-0 animate-slide-up">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {mockResult.word}
                  </CardTitle>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-muted-foreground font-mono">
                      {mockResult.pronunciation}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  收藏
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Part of Speech & Definition */}
            <div className="space-y-3">
              <Badge variant="secondary" className="text-sm">
                {mockResult.partOfSpeech}
              </Badge>
              <div>
                <h3 className="font-semibold text-lg mb-2">中文释义</h3>
                <p className="text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                  {mockResult.definition}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-muted-foreground">English Definition</h3>
                <p className="text-muted-foreground italic">
                  {mockResult.simpleExplanation}
                </p>
              </div>
            </div>

            <Separator />

            {/* Examples */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">例句</h3>
              </div>
              <div className="space-y-4">
                {mockResult.examples.map((example, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg space-y-2">
                    <p className="font-medium">{example.english}</p>
                    <p className="text-muted-foreground">{example.chinese}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Details */}
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full justify-between hover:bg-muted/50"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>词汇扩展 & 学习辅助</span>
                </span>
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>

              {showDetails && (
                <div className="space-y-6 animate-slide-up">
                  {/* Synonyms & Antonyms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-success">同义词</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockResult.synonyms.map((synonym, index) => (
                          <Badge key={index} variant="outline" className="text-success border-success/20">
                            {synonym}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-destructive">反义词</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockResult.antonyms.map((antonym, index) => (
                          <Badge key={index} variant="outline" className="text-destructive border-destructive/20">
                            {antonym}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Etymology */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-accent-warm" />
                      <h4 className="font-semibold">词源</h4>
                    </div>
                    <p className="text-muted-foreground bg-accent-warm/5 p-3 rounded-lg">
                      {mockResult.etymology}
                    </p>
                  </div>

                  {/* Memory Tips */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-accent-warm" />
                      <h4 className="font-semibold">记忆技巧</h4>
                    </div>
                    <p className="text-muted-foreground bg-accent-warm/5 p-3 rounded-lg">
                      {mockResult.memoryTips}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                由 AI 生成 • 查询时间: {new Date().toLocaleTimeString()}
              </div>
              <Button variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                复制结果
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Start Tips */}
      {!hasSearched && (
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