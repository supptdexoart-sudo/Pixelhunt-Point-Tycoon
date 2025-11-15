import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Upgrade, ShopPurchases } from '../types';
import { TimeBonusButton } from './TimeBonusButton';
import { AdBonusButton } from './AdBonusButton';
import { ShardIcon } from './icons/ShardIcon';

interface UpgradePanelProps {
    upgrades: Upgrade[];
    unlockedFeatures: {
        visibleUpgrades: number;
        autoMax: boolean;
        timeBonus: boolean;
        adBonus: boolean;
        prestige: boolean;
    };
    prestigeBonuses: Record<string, number>;
    points: number;
    shards: number;
    onBuyUpgrade: (index: number, buyMax?: boolean) => void;
    onSetRetainedLevel: (index: number, direction: 'increase' | 'decrease') => void;
    calculateRetainCost: (level: number) => number;
    onAutoBuyMax: () => void;
    canAffordAnyUpgrade: boolean;
    isRiftEventActive: boolean;
    timeBonusCooldown: number;
    onClaimTimeBonus: () => void;
    shopPurchases: ShopPurchases;
    isAdBonusActive: boolean;
    adBonusCooldownLeft: number;
    onWatchAd: () => void;
    formatCooldown: (seconds: number) => string;
    relicsToGain: number;
    onPrestige: () => void;
}

export const UpgradePanel: React.FC<UpgradePanelProps> = ({
    upgrades, unlockedFeatures, prestigeBonuses, points, shards, onBuyUpgrade, onSetRetainedLevel, calculateRetainCost, onAutoBuyMax, canAffordAnyUpgrade,
    isRiftEventActive, timeBonusCooldown, onClaimTimeBonus, shopPurchases, isAdBonusActive, adBonusCooldownLeft, onWatchAd, formatCooldown,
    relicsToGain, onPrestige
}) => {
    const { t } = useTranslation();

    const formatNumber = (num: number): string => {
        if (num < 1000) return num.toFixed(0);
        const suffixes = ['', 'k', 'M', 'B', 'T', 'q', 'Q'];
        const i = Math.floor(Math.log10(num) / 3);
        if (i >= suffixes.length) return num.toExponential(2);
        return `${(num / Math.pow(1000, i)).toFixed(i > 0 ? 2 : 0)}${suffixes[i]}`;
    };

    return (
        <section className="pixel-box p-4 flex flex-col order-2 md:order-2 md:h-full col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-4 flex-shrink-0">
                 {unlockedFeatures.timeBonus && (
                    <TimeBonusButton isReady={timeBonusCooldown <= 0} cooldown={timeBonusCooldown} onClick={onClaimTimeBonus} formatCooldown={formatCooldown} isDisabled={isRiftEventActive} />
                )}
                {unlockedFeatures.adBonus && (
                    <AdBonusButton isActive={isAdBonusActive} cooldown={adBonusCooldownLeft} onClick={onWatchAd} formatCooldown={formatCooldown} isDisabled={isRiftEventActive} />
                )}
            </div>
            
            {unlockedFeatures.autoMax && (
                <button
                    onClick={onAutoBuyMax}
                    disabled={!canAffordAnyUpgrade || isRiftEventActive}
                    className="pixel-button w-full p-2 mb-4 bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                    {t('auto_max_button')}
                </button>
            )}

            <div className="space-y-2 flex-grow overflow-y-auto pr-2 -mr-2">
                {upgrades.map((upgrade, index) => {
                    const ppcUpgradesCount = 7;
                    if ((upgrade.type === 'ppc' && (index + 1) > unlockedFeatures.visibleUpgrades) ||
                        (upgrade.type !== 'ppc' && (index - (ppcUpgradesCount - 1)) > unlockedFeatures.visibleUpgrades)) {
                        return null;
                    }
                    const costReduction = prestigeBonuses.cost_reduction || 0;
                    const actualCost = Math.floor(upgrade.cost * (1 - costReduction));
                    const canAffordOne = points >= actualCost;
                    const nextRetainCost = calculateRetainCost(upgrade.retainedLevel + 1);

                    return (
                        <div key={index} className="pixel-box bg-gray-900/50 p-2">
                            <div className="flex items-stretch gap-2">
                                <button
                                    className="flex-grow text-left p-2 pixel-button-upg disabled:opacity-50 disabled:cursor-not-allowed flex justify-between items-center"
                                    onClick={() => onBuyUpgrade(index)}
                                    disabled={!canAffordOne || isRiftEventActive}
                                >
                                    <div>
                                        <p className={`font-bold ${upgrade.type === 'ppc' ? 'text-cyan-300' : 'text-indigo-400'}`}>{t(upgrade.nameKey)} <span className="text-yellow-400 text-xs">(Lvl {upgrade.level})</span></p>
                                        <p className="text-xs text-gray-400">{t(upgrade.descKey)}</p>
                                    </div>
                                    <div className="text-right ml-2 flex-shrink-0">
                                        <p className="text-sm font-semibold">{formatNumber(actualCost)}</p>

                                        <p className="text-xs text-gray-500">{t('points_name')}</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => onBuyUpgrade(index, true)}
                                    disabled={!canAffordOne || isRiftEventActive}
                                    className="flex-shrink-0 w-16 pixel-button-upg bg-cyan-800 hover:enabled:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm flex items-center justify-center"
                                    aria-label={`${t('buy_max_single_button')} ${t(upgrade.nameKey)}`}
                                >
                                    {t('buy_max_single_button')}
                                </button>
                            </div>
                            {unlockedFeatures.prestige && (
                                <div className="mt-2 flex items-center justify-between gap-2 px-2 py-1 bg-gray-900/70 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onSetRetainedLevel(index, 'decrease')}
                                            disabled={upgrade.retainedLevel <= 0 || isRiftEventActive}
                                            className="pixel-button bg-red-800 hover:enabled:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-6 h-6 flex items-center justify-center font-bold"
                                            aria-label={t('upgrade_retain_button_aria_decrease', { upgradeName: t(upgrade.nameKey) })}
                                        >-</button>
                                        <span className="text-sm text-sky-300 font-bold text-center px-2">{t('upgrade_retained_levels', { count: upgrade.retainedLevel })}</span>
                                        <button
                                            onClick={() => onSetRetainedLevel(index, 'increase')}
                                            disabled={shards < nextRetainCost || upgrade.retainedLevel >= upgrade.level || isRiftEventActive}
                                            className="pixel-button bg-green-700 hover:enabled:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed w-6 h-6 flex items-center justify-center font-bold"
                                            aria-label={t('upgrade_retain_button_aria_increase', { upgradeName: t(upgrade.nameKey) })}
                                        >+</button>
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                        {t('upgrade_retain_cost', { cost: nextRetainCost })}
                                        <ShardIcon />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="flex-shrink-0 pt-4 mt-4 border-t-4 border-gray-900">
                <button
                    onClick={onPrestige}
                    disabled={isRiftEventActive}
                    className={`pixel-button w-full p-3 text-white font-bold disabled:bg-gray-600 disabled:cursor-not-allowed transition-all
                        ${!unlockedFeatures.prestige 
                            ? 'bg-gray-700 filter grayscale opacity-70' 
                            : (relicsToGain > 0 
                                ? 'bg-purple-700 hover:bg-purple-600 animate-pulse' 
                                : 'bg-gray-700')
                        }`}
                >
                    {unlockedFeatures.prestige && relicsToGain > 0 
                        ? t('prestige_confirm_text_short', { count: relicsToGain.toLocaleString() })
                        : t('prestige_hub_title')
                    }
                </button>
                {!unlockedFeatures.prestige ? (
                    <div className="prestige-help-box text-center mt-2">
                        <p className="text-xs text-gray-400 leading-normal">{t('prestige_first_relic_info')}</p>
                    </div>
                ) : (
                    relicsToGain <= 0 && (
                        <div className="prestige-help-box text-center mt-2">
                            <p className="text-xs text-gray-400 leading-normal">{t('prestige_gain_more_long')}</p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};