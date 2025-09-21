import { useState } from 'react';
import { MoodForm } from '@/components/MoodForm';
import { MoodFeed } from '@/components/MoodFeed';
import { useMoods } from '@/hooks/useMoods';

function App() {
  const { moods, loading, error, createMood } = useMoods();
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateMood = async (moodData: { title: string; content: string; mood_type: any }) => {
    setSubmitting(true);
    setSuccessMessage('');

    try {
      await createMood(moodData);
      setSuccessMessage('心情分享成功！');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Error is handled by the hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              💭 心情日記
            </h1>
            <p className="text-xl text-white/90 drop-shadow">
              記錄生活點滴，分享真實感受
            </p>
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}

        {/* Main Content */}
        <main className="space-y-12">
          {/* Mood Form */}
          <section>
            <MoodForm onSubmit={handleCreateMood} loading={submitting} />
          </section>

          {/* Mood Feed */}
          <section>
            <MoodFeed moods={moods} loading={loading} error={error} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;