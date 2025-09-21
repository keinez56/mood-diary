import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('moods')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: 'Failed to fetch moods' });
            }

            return res.status(200).json(data || []);
        }

        if (req.method === 'POST') {
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

            return res.status(201).json(data[0]);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });

    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}