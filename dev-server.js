import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// 中間件
app.use(cors());
app.use(express.json());

// Supabase 客戶端
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// API 路由
app.get('/api/moods', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch moods' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/moods', async (req, res) => {
  try {
    const { title, content, mood_type } = req.body;

    if (!title || !content || !mood_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('moods')
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          mood_type: mood_type,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to create mood' });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dev API server running on http://localhost:${PORT}`);
});