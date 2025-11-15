import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface GenesisIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  pointsReward: number;
  upgradeName: string;
}

export const GenesisIntroModal: React.FC<GenesisIntroModalProps> = ({ isOpen, onClose, pointsReward, upgradeName }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 text-white">
        <h2 className="text-2xl text-shadow-hard text-yellow-300 mb-2">{t('genesis_intro_title')}</h2>
        <p className="text-sm text-gray-400 mb-6 leading-normal" dangerouslySetInnerHTML={{ __html: t('genesis_intro_desc', { points: pointsReward, upgradeName: `<strong class="text-white">${upgradeName}</strong>` }) }} />

        <div className="bg-gray-900/50 border-2 border-gray-900 p-4 mb-6 space-y-3">
            <p className="text-lg text-yellow-300 font-semibold">+{pointsReward} {t('points_name')}</p>
            <div className="border-t-2 border-gray-900 pt-3">
              <p className="text-lg text-cyan-400 font-semibold">+1 {upgradeName}</p>
            </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-yellow-500 text-gray-900 font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('genesis_intro_button')}
        </button>
      </div>
    </div>
  );
};