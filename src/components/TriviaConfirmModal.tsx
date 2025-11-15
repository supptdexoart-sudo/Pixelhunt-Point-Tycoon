import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface TriviaConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const TriviaConfirmModal: React.FC<TriviaConfirmModalProps> = ({ isOpen, onConfirm, onClose }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 text-white">
        <h2 className="text-2xl text-shadow-hard text-yellow-300 mb-2">{t('trivia_confirm_title')}</h2>
        <p className="text-xs text-gray-400 mb-6 leading-normal">{t('trivia_confirm_desc')}</p>

        <div className="bg-gray-900/50 border-2 border-gray-900 p-4 mb-6 space-y-3 text-left">
            <div className="text-green-400">
              <p className="font-bold">{t('trivia_confirm_reward')}</p>
            </div>
            
            <div className="border-t-2 border-gray-900 pt-3 text-red-500">
               <p className="font-bold">{t('trivia_confirm_penalty')}</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 pixel-button"
            >
              {t('trivia_confirm_decline')}
            </button>
            <button
              onClick={onConfirm}
              className="w-full bg-green-600 hover:bg-green-500 text-gray-900 font-bold py-3 px-4 pixel-button"
            >
              {t('trivia_confirm_accept')}
            </button>
        </div>
      </div>
    </div>
  );
};