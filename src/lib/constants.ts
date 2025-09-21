import { MoodOption } from '@/types';

export const MOOD_OPTIONS: MoodOption[] = [
  { value: 'happy', label: '開心', emoji: '😊' },
  { value: 'sad', label: '難過', emoji: '😢' },
  { value: 'excited', label: '興奮', emoji: '🎉' },
  { value: 'calm', label: '平靜', emoji: '😌' },
  { value: 'anxious', label: '焦慮', emoji: '😰' },
  { value: 'grateful', label: '感謝', emoji: '🙏' },
  { value: 'confused', label: '困惑', emoji: '🤔' },
  { value: 'love', label: '愛', emoji: '❤️' },
];

export const getMoodOption = (moodType: string) => {
  return MOOD_OPTIONS.find(option => option.value === moodType) || {
    value: 'happy' as const,
    label: '其他',
    emoji: '😐'
  };
};