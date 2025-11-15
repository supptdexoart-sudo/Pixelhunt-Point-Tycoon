import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface PrestigeIntroModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const PrestigeIntroModal: React.FC<PrestigeIntroModalProps> = ({ isOpen, onConfirm }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 border-purple-500 text-white">
        <h2 className="text-2xl text-shadow-hard text-purple-400 mb-2">{t('prestige_intro_title')}</h2>
        <p className="text-sm text-gray-300 mb-6 leading-normal">{t('prestige_intro_desc')}</p>

        <button
          onClick={onConfirm}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('prestige_intro_button')}
        </button>
      </div>
    </div>
  );
};
