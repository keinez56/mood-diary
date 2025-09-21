export interface Mood {
  id: number;
  title: string;
  content: string;
  mood_type: MoodType;
  created_at: string;
}

export type MoodType = 'happy' | 'sad' | 'excited' | 'calm' | 'anxious' | 'grateful' | 'confused' | 'love';

export interface MoodOption {
  value: MoodType;
  label: string;
  emoji: string;
}