import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface AdModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const AD_DURATION = 5; // seconds

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onComplete }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(AD_DURATION);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onComplete]);

  if (!isOpen) {
    return null;
  }

  const progressPercentage = ((AD_DURATION - timeLeft) / AD_DURATION) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 w-full max-w-md text-center text-white">
        <h2 className="text-2xl text-shadow-hard text-yellow-300 mb-2">{t('ad_modal_title')}</h2>
        <p className="text-sm text-gray-400 mb-6">{t('ad_modal_desc')}</p>
        
        <div className="w-full bg-gray-900 border-2 border-black mb-2">
            <div 
                className="h-4 bg-green-500 transition-all duration-1000 linear"
                style={{ width: `${progressPercentage}%`}}
            ></div>
        </div>
        <p className="text-lg font-bold">{timeLeft}s</p>
      </div>
    </div>
  );
};
