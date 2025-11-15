import React from 'react';
import { useTranslation } from '../contexts/LanguageContext.tsx';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`pixel-button px-4 py-1 text-xs ${language === 'en' ? 'bg-cyan-600' : 'bg-gray-700'}`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('cz')}
        className={`pixel-button px-4 py-1 text-xs ${language === 'cz' ? 'bg-cyan-600' : 'bg-gray-700'}`}
        aria-pressed={language === 'cz'}
      >
        CZ
      </button>
    </div>
  );
};