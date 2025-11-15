import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Card } from '../types';
import { JournalIcon } from './icons/JournalIcon';

interface CardJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Card[];
}

export const CardJournalModal: React.FC<CardJournalModalProps> = ({ isOpen, onClose, cards }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="pixel-box p-4 max-w-2xl w-full mx-4 flex flex-col h-[80vh] max-h-[700px] bg-gray-800 border-gray-900 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <JournalIcon />
            <h2 className="text-2xl text-shadow-hard text-yellow-500">{t('card_journal_title')}</h2>
          </div>
          <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('close_button')}>&times;</button>
        </div>
        <p className="text-xs text-gray-400 mb-4 flex-shrink-0">{t('card_journal_desc')}</p>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {cards.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <div key={`${card.id}-${index}`} className="pixel-box bg-gray-900/50 p-3 flex flex-col items-center">
                  <div className="w-16 h-16 mb-2">
                    <card.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-sm font-bold text-yellow-300 text-center mb-1">{t(card.nameKey)}</h4>
                  <p className="text-xs text-gray-400 text-center flex-grow">{t(card.descKey)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">{t('card_journal_empty')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};