import { Mood } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getMoodOption } from '@/lib/constants';

interface MoodFeedProps {
  moods: Mood[];
  loading: boolean;
  error: string | null;
}

export const MoodFeed = ({ moods, loading, error }: MoodFeedProps) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '今天';
    } else if (diffDays === 2) {
      return '昨天';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} 天前`;
    } else {
      return date.toLocaleDateString('zh-TW');
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">載入中...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-500 mb-2">{error}</p>
            <p className="text-muted-foreground text-sm">請重新整理頁面試試</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!moods || moods.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-muted-foreground">還沒有人分享心情，成為第一個吧！</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold mb-4">大家的心情</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {moods.map((mood) => {
          const moodOption = getMoodOption(mood.mood_type);
          return (
            <Card
              key={mood.id}
              className="transition-all duration-200 hover:shadow-md hover:translate-x-1"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-semibold text-lg flex-1">{mood.title}</h3>
                  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                    <span className="text-lg">{moodOption.emoji}</span>
                    <span className="text-sm font-medium">{moodOption.label}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {mood.content}
                </p>
                <p className="text-xs text-muted-foreground text-right">
                  {formatTime(mood.created_at)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};