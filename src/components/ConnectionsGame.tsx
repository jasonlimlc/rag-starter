import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Shuffle, Sparkles, AlertCircle } from 'lucide-react';

interface ConnectionsGameProps {
  onBack: () => void;
}

interface Category {
  level: number; // 1 to 4
  color: string;
  bgColor: string;
  title: string;
  words: string[];
}

const CATEGORIES: Category[] = [
  {
    level: 1,
    color: '#000000',
    bgColor: '#f9df6d', // Yellow
    title: 'NEWSPAPER SECTIONS',
    words: ['FRONT', 'OPINION', 'SPORTS', 'ARTS']
  },
  {
    level: 2,
    color: '#000000',
    bgColor: '#a0c35a', // Green
    title: 'TYPES OF BREAD',
    words: ['BRIOCHE', 'SOURDOUGH', 'RYE', 'PITA']
  },
  {
    level: 3,
    color: '#ffffff',
    bgColor: '#4a72b2', // Blue
    title: 'SYNONYMS FOR GATHER',
    words: ['ASSEMBLE', 'CONVENE', 'MUSTER', 'COLLECT']
  },
  {
    level: 4,
    color: '#ffffff',
    bgColor: '#ba81c5', // Purple
    title: 'WORDS THAT FOLLOW “PRESS”',
    words: ['CORPS', 'RELEASE', 'CONFERENCE', 'SECRETARY']
  }
];

export const ConnectionsGame: React.FC<ConnectionsGameProps> = ({ onBack }) => {
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(() => {
    const all = CATEGORIES.flatMap(c => c.words);
    return [...all].sort(() => Math.random() - 0.5);
  });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setBannerMessage(msg);
    setTimeout(() => setBannerMessage(null), 2500);
  };

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      if (selectedWords.length < 4) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const handleShuffle = () => {
    setRemainingWords([...remainingWords].sort(() => Math.random() - 0.5));
  };

  const handleDeselectAll = () => {
    setSelectedWords([]);
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return;

    // Check if matching any category
    const foundCategory = CATEGORIES.find(cat => 
      cat.words.every(w => selectedWords.includes(w))
    );

    if (foundCategory) {
      setSolvedCategories(prev => [...prev, foundCategory]);
      setRemainingWords(prev => prev.filter(w => !foundCategory.words.includes(w)));
      setSelectedWords([]);
      showBanner(`Great! Solved: ${foundCategory.title}`);
    } else {
      // Check if "One away"
      let isOneAway = false;
      for (const cat of CATEGORIES) {
        if (!solvedCategories.includes(cat)) {
          const matchCount = cat.words.filter(w => selectedWords.includes(w)).length;
          if (matchCount === 3) {
            isOneAway = true;
            break;
          }
        }
      }

      setMistakesRemaining(m => {
        const next = m - 1;
        if (next <= 0) {
          showBanner('Game Over! Better luck tomorrow.');
        } else if (isOneAway) {
          showBanner('One away...');
        } else {
          showBanner('Incorrect guess');
        }
        return Math.max(0, next);
      });
    }
  };

  const handleReset = () => {
    setSolvedCategories([]);
    const all = CATEGORIES.flatMap(c => c.words);
    setRemainingWords([...all].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setMistakesRemaining(4);
  };

  const isWon = solvedCategories.length === CATEGORIES.length;
  const isLost = mistakesRemaining === 0 && !isWon;

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col items-center">
      {/* Toast Banner */}
      {bannerMessage && (
        <div className="fixed top-14 z-50 bg-[#121212] text-white text-xs font-bold px-4 py-2 rounded shadow-lg animate-bounce">
          {bannerMessage}
        </div>
      )}

      {/* Header */}
      <header className="w-full max-w-[500px] border-b border-[#e2e2e2] px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-xs font-semibold hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to News
        </button>

        <div className="text-center">
          <h1 className="font-serif font-bold text-xl tracking-wide">Connections</h1>
          <p className="text-[10px] text-[#727272] uppercase tracking-wider">The New York Times</p>
        </div>

        <button 
          onClick={handleReset} 
          className="p-1 text-[#121212] hover:text-[#555]"
          title="Reset Game"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[500px] px-4 py-6 flex-1 flex flex-col items-center">
        <p className="text-sm font-medium text-center text-[#333] mb-4">
          Create four groups of four!
        </p>

        {/* Solved Groups */}
        <div className="w-full space-y-2 mb-3">
          {solvedCategories.map(cat => (
            <div 
              key={cat.title} 
              style={{ backgroundColor: cat.bgColor, color: cat.color }}
              className="w-full p-3.5 rounded text-center transition-all animate-fadeIn"
            >
              <div className="font-bold text-xs uppercase tracking-wider">{cat.title}</div>
              <div className="text-xs tracking-wide mt-1 font-medium">
                {cat.words.join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Word Grid */}
        {!isWon && !isLost && (
          <div className="w-full grid grid-cols-4 gap-2 mb-6">
            {remainingWords.map(word => {
              const isSelected = selectedWords.includes(word);
              return (
                <button
                  key={word}
                  onClick={() => toggleWord(word)}
                  className={`h-18 sm:h-20 rounded-md font-bold text-[11px] sm:text-xs uppercase flex items-center justify-center p-2 text-center select-none transition-all ${
                    isSelected 
                      ? 'bg-[#5a595e] text-white scale-98 shadow-inner' 
                      : 'bg-[#efefe6] text-[#121212] hover:bg-[#e4e4db]'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        )}

        {/* Mistakes counter */}
        {!isWon && (
          <div className="flex items-center justify-center space-x-2 mb-6 text-xs text-[#555]">
            <span>Mistakes remaining:</span>
            <div className="flex space-x-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < mistakesRemaining ? 'bg-[#5a595e]' : 'bg-[#e2e2e2]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        {!isWon && !isLost && (
          <div className="flex items-center justify-center gap-2 w-full max-w-sm">
            <button
              onClick={handleShuffle}
              className="px-4 py-2 border border-[#121212] rounded-full text-xs font-semibold hover:bg-neutral-100 flex items-center"
            >
              <Shuffle className="w-3.5 h-3.5 mr-1.5" /> Shuffle
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selectedWords.length === 0}
              className={`px-4 py-2 border border-[#121212] rounded-full text-xs font-semibold ${
                selectedWords.length === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-100'
              }`}
            >
              Deselect All
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedWords.length !== 4}
              className={`px-5 py-2 rounded-full text-xs font-bold ${
                selectedWords.length === 4
                  ? 'bg-[#121212] text-white hover:bg-black cursor-pointer'
                  : 'bg-[#e2e2e2] text-[#888] cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        )}

        {/* Win / Loss State */}
        {(isWon || isLost) && (
          <div className="text-center p-6 bg-[#f7f7f7] border border-[#e2e2e2] rounded-lg w-full mt-4">
            <h3 className="font-serif font-bold text-lg mb-2">
              {isWon ? 'Perfect Connections!' : 'Better Luck Next Time!'}
            </h3>
            <p className="text-xs text-[#555] mb-4">
              {isWon ? 'You solved all four categories.' : 'Review today’s category groups above.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-[#121212] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-black"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 border border-[#121212] rounded text-xs font-bold uppercase tracking-wider hover:bg-white"
              >
                Back to News
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
