import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface ShopIntroModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const ShopIntroModal: React.FC<ShopIntroModalProps> = ({ isOpen, onConfirm }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 border-amber-500 text-white">
        <h2 className="text-2xl text-shadow-hard text-amber-400 mb-2">{t('shop_intro_title')}</h2>
        <p className="text-sm text-gray-300 mb-6 leading-normal">{t('shop_intro_desc')}</p>

        <button
          onClick={onConfirm}
          className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('shop_intro_button')}
        </button>
      </div>
    </div>
  );
};