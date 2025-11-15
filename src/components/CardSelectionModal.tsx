

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Card } from '../types';

interface CardSelectionModalProps {
  isOpen: boolean;
  cards: Card[];
  onSelectCard: (card: Card) => void;
  titleKey: string;
  descKey: string;
}

export const CardSelectionModal: React.FC<CardSelectionModalProps> = ({ isOpen, cards, onSelectCard, titleKey, descKey }) => {
  const { t } = useTranslation();
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFlippedIndices([]);
      setSelectedCardIndex(null);
      setIsLocked(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  
  const handleCardClick = (index: number) => {
    if (isLocked) return;

    if (!flippedIndices.includes(index)) {
      setFlippedIndices(prev => [...prev, index]);
    }
    setSelectedCardIndex(index);
  };

  const handleConfirmSelection = (card: Card) => {
    setIsLocked(true);
    setTimeout(() => {
        onSelectCard(card);
    }, 200);
  };

  const selected_card = selectedCardIndex !== null ? cards[selectedCardIndex] : null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 p-4 overflow-y-auto">
      <div className="flex flex-col items-center justify-start sm:justify-center min-h-full py-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl text-shadow-hard text-yellow-300 mb-2 animate-pulse">{t(titleKey)}</h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">{t(descKey)}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-4xl card-selection-container">
          {cards.map((card, index) => {
            const isFlipped = flippedIndices.includes(index);
            const isSelected = selectedCardIndex === index;
            return (
              <div
                key={card.id}
                className={`reward-card aspect-[3/4] ${isFlipped ? 'flipped' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCardClick(index)}
                role="button"
                aria-label={`Select card ${index + 1}`}
              >
                <div className="reward-card-inner">
                  {/* Front Face */}
                  <div className="reward-card-face reward-card-front pixel-box bg-gray-800 border-4 border-yellow-400 p-2 sm:p-4 justify-center">
                      <div className="flex-grow flex flex-col items-center justify-center">
                        <div className="w-3/4 h-3/4">
                          <card.icon className="w-full h-full" />
                        </div>
                      </div>
                  </div>
                  {/* Back Face */}
                  <div className="reward-card-face reward-card-back pixel-box border-4 border-purple-600">
                    <div className="w-16 h-16 text-purple-400 opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v5l10 5 10-5V7L12 2zm0 2.236L19.364 7 12 9.764 4.636 7 12 4.236zM4 12.382l8 4 8-4V8.618l-8 4-8-4v3.764z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Description and Confirmation Section */}
        <div className="mt-8 h-40 flex flex-col items-center justify-center w-full max-w-md">
            {selected_card && (
                <div className="w-full text-center animate-fade-in-up">
                    <h3 className="text-xl text-shadow-hard text-yellow-200 mb-2">{t(selected_card.nameKey)}</h3>
                    <p className="text-sm text-gray-300 mb-4 h-10">{t(selected_card.descKey)}</p>
                    <button
                        className="pixel-button w-full sm:w-auto px-12 py-3 bg-green-600 hover:bg-green-500 text-black font-bold text-lg"
                        onClick={() => handleConfirmSelection(selected_card)}
                        disabled={isLocked}
                    >
                        {t('rogue_class_select_button')}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
