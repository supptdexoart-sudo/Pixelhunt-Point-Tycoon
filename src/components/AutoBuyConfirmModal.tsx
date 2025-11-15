import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface AutoBuyConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const AutoBuyConfirmModal: React.FC<AutoBuyConfirmModalProps> = ({ isOpen, onConfirm, onClose }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 text-white">
        <h2 className="text-2xl text-shadow-hard text-yellow-300 mb-2">{t('auto_max_confirm_title')}</h2>
        <p className="text-xs text-gray-400 mb-6 leading-normal">{t('auto_max_confirm_desc')}</p>

        <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 pixel-button"
            >
              {t('auto_max_confirm_cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="w-full bg-green-600 hover:bg-green-500 text-gray-900 font-bold py-3 px-4 pixel-button"
            >
              {t('auto_max_confirm_confirm')}
            </button>
        </div>
      </div>
    </div>
  );
};