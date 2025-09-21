import { Mood, MoodType } from '@/types';

const API_BASE = '/api';

export interface CreateMoodRequest {
  title: string;
  content: string;
  mood_type: MoodType;
}

export const api = {
  async getMoods(): Promise<Mood[]> {
    const response = await fetch(`${API_BASE}/moods`);
    if (!response.ok) {
      throw new Error('Failed to fetch moods');
    }
    return response.json();
  },

  async createMood(mood: CreateMoodRequest): Promise<Mood> {
    const response = await fetch(`${API_BASE}/moods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mood),
    });

    if (!response.ok) {
      throw new Error('Failed to create mood');
    }

    return response.json();
  },
};