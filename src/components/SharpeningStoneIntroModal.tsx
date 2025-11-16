import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { SharpeningStoneIcon } from './icons/SharpeningStoneIcon';

interface SharpeningStoneIntroModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const SharpeningStoneIntroModal: React.FC<SharpeningStoneIntroModalProps> = ({ isOpen, onConfirm }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 border-gray-500 text-white">
        <div className="flex justify-center mb-4">
          <SharpeningStoneIcon className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-2xl text-shadow-hard text-gray-300 mb-2">{t('sharpening_stone_intro_title')}</h2>
        <p className="text-sm text-gray-400 mb-6 leading-normal">{t('sharpening_stone_intro_desc')}</p>

        <button
          onClick={onConfirm}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('sharpening_stone_intro_button')}
        </button>
      </div>
    </div>
  );
};
