import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Share2, HelpCircle, BarChart2 } from 'lucide-react';

interface WordleGameProps {
  onBack: () => void;
}

const TARGET_WORDS = ['TIMES', 'PRESS', 'PAPER', 'TRUTH', 'PRINT', 'MEDIA', 'VOICE', 'STORY'];

export const WordleGame: React.FC<WordleGameProps> = ({ onBack }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const targetWord = TARGET_WORDS[wordIndex % TARGET_WORDS.length];
  
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'IN_PROGRESS' | 'WON' | 'LOST'>('IN_PROGRESS');
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ played: 14, won: 13, streak: 6, maxStreak: 9 });
  const [shakeRow, setShakeRow] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'IN_PROGRESS') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setShakeRow(true);
        showToast('Not enough letters');
        setTimeout(() => setShakeRow(false), 500);
        return;
      }

      const nextGuesses = [...guesses, currentGuess];
      setGuesses(nextGuesses);
      setCurrentGuess('');

      if (currentGuess === targetWord) {
        setGameStatus('WON');
        setStats(s => ({ ...s, played: s.played + 1, won: s.won + 1, streak: s.streak + 1, maxStreak: Math.max(s.maxStreak, s.streak + 1) }));
        setTimeout(() => setShowStats(true), 1200);
        showToast('Genius!');
      } else if (nextGuesses.length >= 6) {
        setGameStatus('LOST');
        setStats(s => ({ ...s, played: s.played + 1, streak: 0 }));
        setTimeout(() => setShowStats(true), 1200);
        showToast(`The word was ${targetWord}`);
      }
    } else if (key === 'BACKSPACE' || key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameStatus, guesses, targetWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter') handleKeyPress('ENTER');
      else if (e.key === 'Backspace') handleKeyPress('BACKSPACE');
      else {
        const char = e.key.toUpperCase();
        if (/^[A-Z]$/.test(char)) handleKeyPress(char);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const getTileStatus = (rowIndex: number, charIndex: number) => {
    const guess = guesses[rowIndex];
    if (!guess) return 'EMPTY';
    const char = guess[charIndex];
    if (targetWord[charIndex] === char) return 'CORRECT'; // green
    if (targetWord.includes(char)) return 'PRESENT'; // yellow
    return 'ABSENT'; // gray
  };

  const getKeyStatus = (key: string): 'CORRECT' | 'PRESENT' | 'ABSENT' | 'DEFAULT' => {
    let hasPresent = false;
    let hasAbsent = false;
    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (targetWord[i] === key) return 'CORRECT';
          if (targetWord.includes(key)) {
            hasPresent = true;
          } else {
            hasAbsent = true;
          }
        }
      }
    }
    if (hasPresent) return 'PRESENT';
    if (hasAbsent) return 'ABSENT';
    return 'DEFAULT';
  };

  const startNewGame = () => {
    setWordIndex(w => w + 1);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('IN_PROGRESS');
    setShowStats(false);
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col items-center">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 z-50 bg-[#121212] text-white text-xs font-bold px-4 py-2 rounded shadow-lg animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="w-full max-w-[480px] border-b border-[#e2e2e2] px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-xs font-semibold hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to News
        </button>

        <div className="text-center">
          <h1 className="font-serif font-bold text-xl tracking-wide">Wordle</h1>
          <p className="text-[10px] text-[#727272] uppercase tracking-wider">The New York Times</p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowStats(true)} 
            className="p-1 text-[#121212] hover:text-[#555]"
            title="Statistics"
          >
            <BarChart2 className="w-5 h-5" />
          </button>
          <button 
            onClick={startNewGame} 
            className="p-1 text-[#121212] hover:text-[#555]"
            title="Next Word"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Grid Container */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 w-full max-w-[400px]">
        <div className="grid grid-rows-6 gap-1.5 w-[280px] sm:w-[320px]">
          {Array.from({ length: 6 }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const rowGuess = guesses[rowIndex] || (isCurrentRow ? currentGuess : '');
            const isShaking = isCurrentRow && shakeRow;

            return (
              <div 
                key={rowIndex} 
                className={`grid grid-cols-5 gap-1.5 ${isShaking ? 'animate-shake' : ''}`}
              >
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const letter = rowGuess[colIndex] || '';
                  const status = rowIndex < guesses.length ? getTileStatus(rowIndex, colIndex) : 'EMPTY';

                  let bgClass = 'bg-white border-[#d3d6da] text-[#121212]';
                  if (status === 'CORRECT') bgClass = 'bg-[#6aaa64] border-[#6aaa64] text-white';
                  else if (status === 'PRESENT') bgClass = 'bg-[#c9b458] border-[#c9b458] text-white';
                  else if (status === 'ABSENT') bgClass = 'bg-[#787c7e] border-[#787c7e] text-white';
                  else if (letter) bgClass = 'bg-white border-[#878a8c] text-[#121212]';

                  return (
                    <div
                      key={colIndex}
                      className={`w-full aspect-square border-2 flex items-center justify-center font-bold text-2xl uppercase select-none transition-colors duration-300 ${bgClass}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Action helper */}
        <div className="text-center mt-3 mb-1">
          <p className="text-[11px] text-[#727272]">
            {gameStatus === 'IN_PROGRESS' 
              ? `Attempt ${guesses.length + 1} of 6 · Guess the 5-letter word`
              : gameStatus === 'WON' 
              ? 'Splendid! You solved today’s puzzle.' 
              : 'Better luck next time!'}
          </p>
        </div>
      </main>

      {/* Virtual Keyboard */}
      <div className="w-full max-w-[480px] px-2 pb-6">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5 my-1">
            {row.map(key => {
              const status = getKeyStatus(key);
              let btnClass = 'bg-[#d3d6da] text-[#121212]';
              if (status === 'CORRECT') btnClass = 'bg-[#6aaa64] text-white';
              else if (status === 'PRESENT') btnClass = 'bg-[#c9b458] text-white';
              else if (status === 'ABSENT') btnClass = 'bg-[#787c7e] text-white';

              const isWide = key === 'ENTER' || key === 'DEL';

              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`h-12 rounded text-xs font-bold transition-transform active:scale-95 flex items-center justify-center select-none uppercase ${
                    isWide ? 'px-3 text-[11px] font-semibold' : 'w-8 sm:w-10 text-sm'
                  } ${btnClass}`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Stats Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center shadow-2xl relative">
            <button 
              onClick={() => setShowStats(false)} 
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl font-bold p-1"
            >
              ×
            </button>
            <h2 className="font-serif font-bold text-xl uppercase tracking-wider mb-4">Statistics</h2>
            
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div>
                <div className="text-2xl font-bold">{stats.played}</div>
                <div className="text-[10px] text-gray-500 uppercase">Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.round((stats.won / stats.played) * 100)}%</div>
                <div className="text-[10px] text-gray-500 uppercase">Win %</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.streak}</div>
                <div className="text-[10px] text-gray-500 uppercase">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.maxStreak}</div>
                <div className="text-[10px] text-gray-500 uppercase">Max Streak</div>
              </div>
            </div>

            <div className="border-t border-[#e2e2e2] pt-4 flex gap-3">
              <button
                onClick={startNewGame}
                className="flex-1 bg-[#6aaa64] text-white py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:opacity-90"
              >
                Play Next Word
              </button>
              <button
                onClick={() => {
                  showToast('Result copied to clipboard!');
                  navigator.clipboard?.writeText?.(`NYT Wordle ${guesses.length}/6\n🟩🟩🟩🟩🟩`);
                }}
                className="flex items-center justify-center px-4 border border-[#121212] rounded font-bold text-xs uppercase tracking-wider hover:bg-neutral-50"
              >
                <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
