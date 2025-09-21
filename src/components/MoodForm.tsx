import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { MOOD_OPTIONS } from '@/lib/constants';
import { MoodType } from '@/types';

interface MoodFormProps {
  onSubmit: (data: { title: string; content: string; mood_type: MoodType }) => Promise<void>;
  loading?: boolean;
}

export const MoodForm = ({ onSubmit, loading = false }: MoodFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood_type: '' as MoodType | '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = '請輸入心情標題';
    }

    if (!formData.content.trim()) {
      newErrors.content = '請輸入心情內容';
    }

    if (!formData.mood_type) {
      newErrors.mood_type = '請選擇心情類型';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
        mood_type: formData.mood_type as MoodType,
      });

      // Reset form on success
      setFormData({
        title: '',
        content: '',
        mood_type: '',
      });
      setErrors({});
    } catch (error) {
      // Error is handled by the parent component
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💭 寫下今天的心情
        </CardTitle>
        <CardDescription>
          記錄生活點滴，分享真實感受
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="今天的心情是...？"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="分享你的想法和感受..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className={`min-h-[120px] ${errors.content ? 'border-red-500' : ''}`}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">選擇心情：</label>
            <Select
              value={formData.mood_type}
              onChange={(e) => setFormData(prev => ({ ...prev, mood_type: e.target.value as MoodType }))}
              className={errors.mood_type ? 'border-red-500' : ''}
            >
              <option value="">選擇...</option>
              {MOOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </Select>
            {errors.mood_type && <p className="text-sm text-red-500">{errors.mood_type}</p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? '分享中...' : '分享心情'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};