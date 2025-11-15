import React from 'react';
import { ActiveBonus } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { DaggerIcon } from './icons/DaggerIcon';
import { AutoClickIcon } from './icons/AutoClickIcon';
import { GoldenHandIcon } from './ImageUploader';
import { SproutIcon } from './icons/SproutIcon';
import { CloverIcon } from './icons/CloverIcon';
import { PriceTagIcon } from './icons/PriceTagIcon';
import { WaveIcon } from './icons/WaveIcon';
import { CrackedLensIcon } from './icons/CrackedLensIcon';

interface ActiveBonusesDisplayProps {
  bonuses: ActiveBonus[];
  timers: Record<string, string>;
}

const BonusIcon: React.FC<{ type: ActiveBonus['type']; className?: string }> = ({ type, className }) => {
    switch (type) {
        case 'CRIT_DAMAGE_BOOST':
            return <DaggerIcon className={className} />;
        case 'AUTO_CLICKER':
            return <AutoClickIcon className={className} />;
        case 'GOLDEN_CLICKS':
            return <GoldenHandIcon className={className} />;
        case 'PPS_BOOST':
            return <SproutIcon className={className} />;
        case 'FLOATING_REWARD_BONUS':
            return <CloverIcon className={className} />;
        case 'UPGRADE_COST_REDUCTION':
            return <PriceTagIcon className={className} />;
        case 'COMBO_WINDOW_INCREASE':
            return <WaveIcon className={className} />;
        case 'PPC_BOOST':
            return <CrackedLensIcon className={className} />;
        // FIX: Add case for PPC_REDUCTION
        case 'PPC_REDUCTION':
            return <CrackedLensIcon className={className} />;
        default:
            return null;
    }
};

export const ActiveBonusesDisplay: React.FC<ActiveBonusesDisplayProps> = ({ bonuses, timers }) => {
    const { t } = useTranslation();

    if (bonuses.length === 0) {
        return null;
    }

    const styles: Record<ActiveBonus['type'], { borderColor: string; textColor: string }> = {
        'CRIT_DAMAGE_BOOST': {
            borderColor: '#f97316', // orange-500
            textColor: '#fdba74', // orange-300
        },
        'AUTO_CLICKER': {
            borderColor: '#facc15', // yellow-400
            textColor: '#fde047', // yellow-300
        },
        'GOLDEN_CLICKS': {
            borderColor: '#eab308', // amber-600
            textColor: '#fde047', // yellow-300
        },
        'PPS_BOOST': {
            borderColor: '#22c55e', // green-500
            textColor: '#86efac', // green-300
        },
        'FLOATING_REWARD_BONUS': {
            borderColor: '#16a34a', // green-600
            textColor: '#4ade80', // green-400
        },
        'UPGRADE_COST_REDUCTION': {
            borderColor: '#dc2626', // red-600
            textColor: '#f87171', // red-400
        },
        'COMBO_WINDOW_INCREASE': {
            borderColor: '#3b82f6', // blue-500
            textColor: '#93c5fd', // blue-300
        },
        'PPC_BOOST': {
            borderColor: '#06b6d4', // cyan-600
            textColor: '#67e8f9', // cyan-300
        },
        // FIX: Add styles for PPC_REDUCTION
        'PPC_REDUCTION': {
            borderColor: '#dc2626', // red-600
            textColor: '#f87171', // red-400
        }
    };

    return (
        <div className="active-bonuses-container">
            {bonuses.map((bonus, index) => {
                const timerKey = `${bonus.type}-${index}`;
                const timeLeft = timers[timerKey] || '00:00';
                
                const style = styles[bonus.type];

                return (
                    <div
                        key={timerKey}
                        className="active-bonus-item pixel-box bg-gray-900/50"
                        style={{ borderColor: style.borderColor }}
                    >
                        <BonusIcon type={bonus.type} className="w-5 h-5" />
                        <div className="text-xs">
                            <p className="font-bold text-shadow-hard" style={{ color: style.textColor }}>{t(`active_bonus_${bonus.type}`)}</p>
                            <p className="text-gray-300">{timeLeft}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};