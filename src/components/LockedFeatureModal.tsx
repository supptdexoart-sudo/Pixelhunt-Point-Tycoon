import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { LockIcon } from './icons/LockIcon';

interface LockedFeatureModalProps {
  featureName: string;
  unlockDescription: string;
  onClose: () => void;
}

export const LockedFeatureModal: React.FC<LockedFeatureModalProps> = ({ featureName, unlockDescription, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 border-yellow-500 text-white">
        <div className="flex justify-center mb-4">
          <LockIcon className="w-12 h-12 text-yellow-400" />
        </div>
        <h2 className="text-2xl text-shadow-hard text-yellow-400 mb-2">{t('locked_feature_title', { feature: featureName })}</h2>
        <p className="text-sm text-gray-300 mb-6 leading-normal">{unlockDescription}</p>

        <button
          onClick={onClose}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('locked_feature_button')}
        </button>
      </div>
    </div>
  );
};