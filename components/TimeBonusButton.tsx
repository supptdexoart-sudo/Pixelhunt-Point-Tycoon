import React from 'react';
import { GiftIcon } from './icons/GiftIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface TimeBonusButtonProps {
  isReady: boolean;
  cooldown: number;
  onClick: () => void;
  formatCooldown: (seconds: number) => string;
  isDisabled?: boolean;
}

export const TimeBonusButton: React.FC<TimeBonusButtonProps> = ({ isReady, cooldown, onClick, formatCooldown, isDisabled = false }) => {
  const { t } = useTranslation();

  const buttonClass = `pixel-button w-full p-3 flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed ${
    isReady
      ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 bonus-ready-glow'
      : 'bg-gray-700 disabled:opacity-60'
  }`;

  return (
    <button
      onClick={onClick}
      disabled={!isReady || isDisabled}
      className={buttonClass}
    >
      <GiftIcon />
      <div className="text-sm">
        {isReady ? (
          <p className="font-bold">{t('time_bonus_button_ready')}</p>
        ) : (
          <p>{t('time_bonus_button_cooldown', { time: formatCooldown(cooldown) })}</p>
        )}
      </div>
    </button>
  );
};