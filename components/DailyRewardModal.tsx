import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface RewardInfo {
    pointReward: number;
    relicReward: number;
    multiplier: number;
    nextStreak: number;
}

interface DailyRewardModalProps {
  isOpen: boolean;
  onClaim: () => void;
  rewardInfo: RewardInfo;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ isOpen, onClaim, rewardInfo }) => {
  const { t } = useTranslation();
  
  if (!isOpen) {
    return null;
  }
  
  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toFixed(0);
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const i = Math.floor(Math.log10(num) / 3);
    return `${(num / Math.pow(1000, i)).toFixed(i > 0 ? 2 : 0)}${suffixes[i]}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="pixel-box p-6 text-center max-w-md w-full mx-4 text-white">
        <h2 className="text-2xl text-shadow-hard text-yellow-300 mb-2">{t('daily_reward_title')}</h2>
        <p className="text-xs text-gray-400 mb-6 leading-normal">{t('daily_reward_subtitle_new')}</p>

        <div className="bg-gray-900/50 border-2 border-gray-900 p-4 mb-6 space-y-3">
            <div>
              <p className="text-sm text-gray-300">{t('daily_reward_streak_info', { count: rewardInfo.nextStreak })}</p>
              <p className="text-lg text-cyan-400 font-semibold">
                {t('daily_reward_multiplier')}: {rewardInfo.multiplier.toFixed(1)}x
              </p>
            </div>
            
            <div className="border-t-2 border-gray-900 pt-3">
              <p className="text-sm text-gray-300">{t('daily_reward_earned')}</p>
              <p className="text-3xl text-shadow-hard text-yellow-300 my-1">
                  {formatNumber(rewardInfo.pointReward)} {t('points_name')}
              </p>
              {rewardInfo.relicReward > 0 && (
                 <p className="text-lg text-purple-400 font-bold animate-pulse">
                    + {rewardInfo.relicReward} {t('relic_name')}!
                 </p>
              )}
            </div>
        </div>

        <button
          onClick={onClaim}
          className="w-full bg-yellow-500 text-gray-900 font-bold text-lg py-3 px-4 pixel-button"
        >
          {t('claim_button')}
        </button>
      </div>
    </div>
  );
};