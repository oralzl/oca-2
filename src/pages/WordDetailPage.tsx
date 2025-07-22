import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Volume2, 
  Star, 
  RotateCcw, 
  Copy, 
  Sparkles,
  Languages,
  Lightbulb,
  FileText,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

export const WordDetailPage: React.FC = () => {
  const { word } = useParams<{ word: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (word) {
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
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

  const handleRetry = () => {
    if (word) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(mockResult, null, 2));
  };

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    console.log('Adding to favorites:', word);
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

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        {/* Mobile Bottom Toolbar - Loading State */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="p-2" disabled>
                <Star className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2" disabled>
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2" disabled>
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto pb-32 max-w-2xl mx-auto space-y-8 p-4 pt-4">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">正在查询中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
      {/* Desktop Top Bar */}
      <div className="hidden md:block sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
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
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleFavorite}>
              <Star className="w-4 h-4 mr-2" />
              收藏
            </Button>
            <Button variant="ghost" size="sm" onClick={handleRetry}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="p-2" onClick={handleFavorite}>
              <Star className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={handleRetry}>
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" onClick={handleCopy}>
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results Content */}
      <div className="flex-1 overflow-auto px-6 py-6 pb-32 md:pb-6">
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
                <div className="hidden md:flex items-center space-x-2 shrink-0">
                  <Button variant="outline" size="sm" className="text-xs" onClick={handleFavorite}>
                    <Star className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">收藏</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleRetry}>
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
                <Button variant="ghost" size="sm" onClick={handleCopy}>
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
};