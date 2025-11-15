import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface RetainIntroModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const RetainIntroModal: React.FC<RetainIntroModalProps> = ({ isOpen, onConfirm }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 border-sky-500 text-white">
        <h2 className="text-2xl text-shadow-hard text-sky-400 mb-2">{t('retain_intro_title')}</h2>
        <p className="text-sm text-gray-300 mb-6 leading-normal">{t('retain_intro_desc')}</p>

        <button
          onClick={onConfirm}
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('retain_intro_button')}
        </button>
      </div>
    </div>
  );
};
