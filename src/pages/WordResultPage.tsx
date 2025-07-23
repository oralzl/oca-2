import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedSearchInput } from "@/components/ui/enhanced-search-input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Volume2, 
  Star, 
  RotateCcw, 
  Copy, 
  Sparkles,
  Languages,
  Lightbulb,
  FileText,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface WordResultPageProps {}

export const WordResultPage: React.FC<WordResultPageProps> = () => {
  const { word } = useParams<{ word: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Start search when word parameter changes
  useEffect(() => {
    if (word) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        setIsSearching(false);
      }, 1500);
    }
  }, [word]);

  const handleBack = () => {
    const fromParam = searchParams.get('from');
    if (fromParam === 'favorites') {
      navigate('/favorites');
    } else {
      navigate('/search');
    }
  };

  const handleSearchWithTerm = async (term: string) => {
    if (!term.trim()) return;
    
    setIsSearching(true);
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

  // Mock search result for demonstration
  const mockResult = {
    word: word || "extraordinary",
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

  // Loading state
  if (isSearching) {
    return (
      <div className="w-full h-full flex flex-col">
        {/* Loading Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <div className="absolute inset-0 w-12 h-12 border-2 border-primary/20 rounded-full animate-pulse mx-auto"></div>
            </div>
            <p className="text-muted-foreground">
              正在查询单词...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout after search
  if (isDesktop) {
    return (
      <div className="w-full h-full flex flex-col animate-fade-in">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回</span>
            </Button>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative animate-scale-in">
                <EnhancedSearchInput
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value)}
                  onKeyPress={handleKeyPress}
                  onSearch={handleSearch}
                  placeholder="输入英文单词..."
                  disabled={isSearching}
                  className="w-full"
                  compact={true}
                />
              </div>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>

        {/* Search Results Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-medium border-0 animate-slide-up">
              <CardHeader className="pb-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                      <CardTitle className="text-xl sm:text-2xl font-bold break-words">
                        {mockResult.word}
                      </CardTitle>
                      <Badge variant="secondary" className="text-sm w-fit">
                        {mockResult.partOfSpeech}
                      </Badge>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 mt-2">
                      <span className="text-muted-foreground font-mono text-sm break-all">
                        {mockResult.pronunciation}
                      </span>
                      <Button variant="ghost" size="sm" className="w-fit">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Star className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">收藏</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Definition */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">释义</h3>
                  </div>
                  <p className="text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                    {mockResult.definition}
                  </p>
                  <p className="text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                    {mockResult.simpleExplanation}
                  </p>
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

                <Separator />

                {/* Vocabulary Extensions & Learning Aids */}
                <div className="space-y-6">
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
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto space-y-8 p-4 pt-8 pb-20">
          {/* Search Result */}
          <Card className="shadow-medium border-0 animate-slide-up">
            <CardHeader className="pb-4">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                    <CardTitle className="text-xl sm:text-2xl font-bold break-words">
                      {mockResult.word}
                    </CardTitle>
                    <Badge variant="secondary" className="text-sm w-fit">
                      {mockResult.partOfSpeech}
                    </Badge>
                  </div>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 mt-2">
                    <span className="text-muted-foreground font-mono text-sm break-all">
                      {mockResult.pronunciation}
                    </span>
                    <Button variant="ghost" size="sm" className="w-fit">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Definition */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">释义</h3>
                </div>
                <p className="text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                  {mockResult.definition}
                </p>
                <p className="text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                  {mockResult.simpleExplanation}
                </p>
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

              <Separator />

              {/* Vocabulary Extensions & Learning Aids */}
              <div className="space-y-6">
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/40 px-4 py-3">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center justify-center p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center justify-center p-3"
          >
            <Star className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="flex items-center justify-center p-3"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Copy word result to clipboard
              navigator.clipboard.writeText(`${mockResult.word} - ${mockResult.definition}`);
            }}
            className="flex items-center justify-center p-3"
          >
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};