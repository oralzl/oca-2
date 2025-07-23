import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  BookOpen, 
  Trash2, 
  Eye,
  Calendar,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleWordClick = (word: string) => {
    navigate(`/search?q=${encodeURIComponent(word)}&from=favorites`);
  };
  
  // Mock favorites data
  const mockFavorites = [
    {
      id: '1',
      word: 'extraordinary',
      definition: '非常特殊的；非凡的；异常的',
      partOfSpeech: 'adjective',
      createdAt: '2024-01-15',
      examples: 2
    },
    {
      id: '2',
      word: 'magnificent',
      definition: '壮丽的；宏伟的；极好的',
      partOfSpeech: 'adjective',
      createdAt: '2024-01-14',
      examples: 3
    },
    {
      id: '3',
      word: 'serendipity',
      definition: '意外发现珍奇事物的能力；偶然发现',
      partOfSpeech: 'noun',
      createdAt: '2024-01-13',
      examples: 2
    },
    {
      id: '4',
      word: 'perseverance',
      definition: '坚持不懈；毅力；不屈不挠',
      partOfSpeech: 'noun',
      createdAt: '2024-01-12',
      examples: 3
    },
    {
      id: '5',
      word: 'ephemeral',
      definition: '短暂的；朝生暮死的',
      partOfSpeech: 'adjective',
      createdAt: '2024-01-11',
      examples: 2
    },
    {
      id: '6',
      word: 'ubiquitous',
      definition: '无处不在的；普遍存在的',
      partOfSpeech: 'adjective',
      createdAt: '2024-01-10',
      examples: 2
    }
  ];

  const filteredFavorites = mockFavorites.filter(favorite =>
    favorite.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    favorite.definition.includes(searchQuery)
  );

  const FavoriteCard = ({ favorite }: { favorite: typeof mockFavorites[0] }) => (
    <Card className="hover-lift hover-glow transition-all duration-300 border-0 shadow-soft cursor-pointer" onClick={() => handleWordClick(favorite.word)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-primary">
              {favorite.word}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {favorite.partOfSpeech}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-base leading-relaxed">
          {favorite.definition}
        </CardDescription>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(favorite.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3" />
            <span>{favorite.examples} 个例句</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FavoriteListItem = ({ favorite }: { favorite: typeof mockFavorites[0] }) => (
    <Card className="hover:bg-muted/50 transition-colors border-0 cursor-pointer" onClick={() => handleWordClick(favorite.word)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-lg text-primary">{favorite.word}</h3>
              <Badge variant="secondary" className="text-xs">
                {favorite.partOfSpeech}
              </Badge>
            </div>
            <p className="text-muted-foreground">{favorite.definition}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(favorite.createdAt).toLocaleDateString('zh-CN')}</span>
              </span>
              <span className="flex items-center space-x-1">
                <BookOpen className="w-3 h-3" />
                <span>{favorite.examples} 个例句</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-8 pb-4">
      {/* Header */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between pt-2 pb-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gradient">我的收藏</h1>
            <p className="text-muted-foreground">
              管理你收藏的单词，建立个人词汇库
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-4 py-2">
              <Star className="w-3 h-3 mr-1" />
              {mockFavorites.length} 个单词
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索收藏的单词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          找到 {filteredFavorites.length} 个匹配的单词
        </div>
      )}

      {/* Favorites Grid/List */}
      {filteredFavorites.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-3"
        }>
          {filteredFavorites.map((favorite) => 
            viewMode === 'grid' ? (
              <FavoriteCard key={favorite.id} favorite={favorite} />
            ) : (
              <FavoriteListItem key={favorite.id} favorite={favorite} />
            )
          )}
        </div>
      ) : (
        <Card className="p-12 text-center border-dashed">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? '没有找到匹配的单词' : '还没有收藏任何单词'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? '尝试使用不同的关键词搜索' 
                  : '开始查询单词并收藏到这里，建立你的个人词汇库'
                }
              </p>
              {!searchQuery && (
                <Button className="bg-gradient-primary text-white">
                  <Search className="w-4 h-4 mr-2" />
                  开始查询单词
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {filteredFavorites.length > 12 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="default" size="sm" className="bg-gradient-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
            </div>
            <Button variant="outline" size="sm">
              下一页
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};