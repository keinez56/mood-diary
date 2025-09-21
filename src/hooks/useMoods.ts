import { useState, useEffect } from 'react';
import { Mood } from '@/types';
import { api, CreateMoodRequest } from '@/lib/api';

export const useMoods = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoods = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getMoods();
      setMoods(data);
    } catch (err) {
      setError('載入心情失敗，請稍後再試');
      console.error('Failed to fetch moods:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMood = async (moodData: CreateMoodRequest) => {
    try {
      setError(null);
      const newMood = await api.createMood(moodData);
      setMoods(prevMoods => [newMood, ...prevMoods]);
      return newMood;
    } catch (err) {
      setError('分享心情失敗，請稍後再試');
      console.error('Failed to create mood:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return {
    moods,
    loading,
    error,
    fetchMoods,
    createMood,
  };
};