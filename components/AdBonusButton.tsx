import React from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface AdBonusButtonProps {
  isActive: boolean;
  cooldown: number;
  onClick: () => void;
  formatCooldown: (seconds: number) => string;
  isDisabled?: boolean;
}

export const AdBonusButton: React.FC<AdBonusButtonProps> = ({ isActive, cooldown, onClick, formatCooldown, isDisabled = false }) => {
  const { t } = useTranslation();

  const isReady = !isActive && cooldown <= 0;

  const buttonClass = `pixel-button w-full p-3 flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed ${
    isReady
      ? 'bg-green-600 hover:bg-green-500 text-gray-900'
      : 'bg-gray-700 disabled:opacity-60'
  }`;

  return (
    <button
      onClick={onClick}
      disabled={!isReady || isDisabled}
      className={buttonClass}
    >
      <PlayIcon />
      <div className="text-sm">
        {isActive ? (
          <p className="font-bold">{t('ad_bonus_button_active')}</p>
        ) : cooldown > 0 ? (
          <p>{t('ad_bonus_button_cooldown', { time: formatCooldown(cooldown) })}</p>
        ) : (
          <p className="font-bold">{t('ad_bonus_button_ready')}</p>
        )}
      </div>
    </button>
  );
};