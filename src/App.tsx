import React, { useState, useEffect } from 'react';
import { Heart, Calendar, BookOpen, X } from 'lucide-react';

interface JournalEntry {
  id: number;
  text: string;
  mood: string;
  date: string;
}

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('💚');

  useEffect(() => {
    const saved = localStorage.getItem('mindful-entries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mindful-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!text.trim()) return;
    const entry: JournalEntry = {
      id: Date.now(),
      text,
      mood,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    setEntries([entry, ...entries]);
    setText('');
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-pink-500" size={32} />
            <h1 className="text-4xl font-light text-gray-800">Mindful Moments</h1>
          </div>
          <p className="text-gray-600 text-lg">Capture your thoughts, track your feelings</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{entries.length}</h3>
                <p className="text-gray-600">Moments Captured</p>
              </div>
            </div>
            <Calendar className="text-gray-400" size={32} />
          </div>
        </div>

        {/* Add Entry Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">How are you feeling today?</h2>
          
          <div className="flex gap-3 mb-6 justify-center">
            {['💚', '💙', '💜', '🧡', '❤️'].map(e => (
              <button
                key={e}
                onClick={() => setMood(e)}
                className={`text-3xl p-4 rounded-full transition-all duration-200 ${
                  mood === e 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-110' 
                    : 'bg-white/50 hover:bg-white/80 hover:scale-105'
                }`}
              >
                {e}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share what's on your mind..."
            className="w-full p-4 border-0 rounded-2xl bg-white/50 backdrop-blur-sm resize-none h-32 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          
          <button
            onClick={addEntry}
            className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-2xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            Save Moment
          </button>
        </div>

        {/* Entries */}
        <div className="space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">Your mindful journey starts here</p>
            </div>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{entry.mood}</span>
                    <span className="text-sm text-gray-500 font-medium">{entry.date}</span>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">{entry.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;