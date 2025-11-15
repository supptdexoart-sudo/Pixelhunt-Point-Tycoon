import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface TriviaLoadingOverlayProps {
  isLoading: boolean;
}

export const TriviaLoadingOverlay: React.FC<TriviaLoadingOverlayProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-center p-4 text-white">
      <div className="pixel-box p-8">
        <h2 className="text-2xl font-bold text-white mb-2 text-shadow-hard">{t('trivia_loading_title')}</h2>
        <p className="text-gray-400 max-w-sm">{t('trivia_loading_subtitle')}</p>
      </div>
    </div>
  );
};