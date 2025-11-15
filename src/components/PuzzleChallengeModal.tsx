import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface PuzzleChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (didWin: boolean) => void;
}

const icons = ['💎', '👑', '⚔️', '🛡️', '❤️', '🌟', '💰', '🔑'];

const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const PuzzleChallengeModal: React.FC<PuzzleChallengeModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isConfirmingClose, setConfirmingClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const gameCards = shuffleArray([...icons, ...icons]);
      setCards(gameCards);
      setFlippedIndices([]);
      setMatchedPairs([]);
      setMoves(0);
      setIsWon(false);
      setIsLocked(false);
      setConfirmingClose(false);
    }
  }, [isOpen]);

  const handleCardClick = (index: number) => {
    if (isLocked || flippedIndices.includes(index) || matchedPairs.includes(cards[index]) || isWon) {
      return;
    }
    
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Match
        setTimeout(() => {
            setMatchedPairs(prev => {
                const newMatched = [...prev, cards[firstIndex]];
                if (newMatched.length === icons.length) {
                    setIsWon(true);
                    setTimeout(() => onComplete(true), 1500);
                }
                return newMatched;
            });
            setFlippedIndices([]);
            setIsLocked(false);
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const handleClose = () => {
      onComplete(isWon);
      onClose();
  }
  
  const handleCloseRequest = () => {
    if (isWon) {
        handleClose();
    } else {
        setConfirmingClose(true);
    }
  };

  const handleForfeit = () => {
      onComplete(false);
      onClose();
  };

  const handleCancelClose = () => {
      setConfirmingClose(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 w-full max-w-lg text-center relative text-white">
        <button onClick={handleCloseRequest} className="absolute top-2 right-2 pixel-button bg-red-700 text-lg px-3 py-1 z-10" aria-label={t('close_button')}>&times;</button>
        <h2 className="text-xl sm:text-2xl text-shadow-hard text-yellow-300 mb-4">{t('mini_challenge_puzzle_title')}</h2>
        <p className="text-sm text-gray-400 mb-4">{t('mini_challenge_puzzle_desc')}</p>

        <div className="flex justify-between items-center text-lg mb-4">
            <div>{t('mini_challenge_moves')}: <span className="font-bold text-cyan-300">{moves}</span></div>
            <div>{t('mini_challenge_pairs_found')}: <span className="font-bold text-green-400">{matchedPairs.length} / {icons.length}</span></div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
            {cards.map((card, index) => {
                const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(card);
                return (
                    <div key={index} className="aspect-square" onClick={() => handleCardClick(index)}>
                        <div className={`puzzle-card ${isFlipped ? 'flipped' : ''}`}>
                            <div className="card-face card-front pixel-button bg-gray-700 hover:bg-gray-600"></div>
                            <div className="card-face card-back pixel-button bg-cyan-600">
                                <span className="text-3xl sm:text-4xl">{card}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {isWon && <p className="text-2xl font-bold text-green-400 animate-pulse">{t('mini_challenge_win')}</p>}

        <button onClick={handleCloseRequest} className="pixel-button bg-gray-700 mt-4 p-2">{t('close_button')}</button>
      </div>

      {isConfirmingClose && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
              <div className="pixel-box p-6 text-center max-w-sm w-full">
                  <h3 className="text-xl text-yellow-300 mb-2 text-shadow-hard">{t('mini_challenge_quit_confirm_title')}</h3>
                  <p className="text-sm text-gray-300 mb-6 leading-normal">{t('mini_challenge_quit_confirm_desc')}</p>
                  <div className="flex justify-center gap-4">
                      <button onClick={handleCancelClose} className="pixel-button bg-gray-600 hover:bg-gray-500 px-6 py-2">
                          {t('mini_challenge_quit_confirm_cancel')}
                      </button>
                      <button onClick={handleForfeit} className="pixel-button bg-red-700 hover:bg-red-600 px-6 py-2">
                          {t('mini_challenge_quit_confirm_forfeit')}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};