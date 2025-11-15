import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { SaveIndicator } from './SaveIndicator';
import { StatsIcon } from './icons/StatsIcon';
import { ShopIcon } from './icons/ShopIcon';
import { GuildIcon } from './icons/GuildIcon';
import { QuestIcon } from './icons/QuestIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { RelicIcon } from './icons/RelicIcon';
import { ShardIcon } from './icons/ShardIcon';

interface HeaderProps {
    relics: number;
    shards: number;
    formatNumber: (num: number) => string;
    onOpenStats: () => void;
    onOpenQuests: () => void;
    onOpenShop: () => void;
    onOpenGuild: () => void;
    isShopUnlocked: boolean;
    isGuildUnlocked: boolean;
    onOpenSettings: () => void;
    hasClaimableRewards: boolean;
    shouldShopIconGlow: boolean;
    shouldGuildIconGlow: boolean;
    isRiftEventActive: boolean;
    hasClaimableExpeditions: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    relics, shards, formatNumber, onOpenStats, onOpenQuests, onOpenShop, onOpenGuild, onOpenSettings,
    hasClaimableRewards, shouldShopIconGlow, shouldGuildIconGlow, isRiftEventActive, hasClaimableExpeditions,
    isShopUnlocked, isGuildUnlocked
}) => {
    const { t } = useTranslation();

    return (
        <header className="pixel-box w-full max-w-7xl mx-auto p-2 sm:p-4 mt-2 mb-4">
            <div className="flex justify-between items-center gap-2 sm:gap-4">
                {/* Left Side: Currencies */}
                <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="flex items-center gap-1.5" title={`${relics.toLocaleString()} ${t('relic_name')}`}>
                        <RelicIcon />
                        <span className="font-bold text-xl text-purple-300 text-shadow-hard">{relics.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title={`${shards.toLocaleString()} ${t('shard_name_plural')}`}>
                        <ShardIcon />
                        <span className="font-bold text-xl text-sky-300 text-shadow-hard">{shards.toLocaleString()}</span>
                    </div>
                </div>

                {/* Right Side: Icons */}
                <div className="flex items-center gap-2 sm:gap-5">
                    <button onClick={onOpenStats} aria-label={t('stats_title')} disabled={isRiftEventActive} className="disabled:opacity-50 disabled:cursor-not-allowed"><StatsIcon /></button>
                    
                    <button 
                        onClick={onOpenShop} 
                        aria-label={t('shop_title')} 
                        className={`${!isShopUnlocked ? 'opacity-50 filter grayscale' : (shouldShopIconGlow ? 'icon-attention-glow' : '')} disabled:opacity-50 disabled:cursor-not-allowed transition-all`} 
                        disabled={isRiftEventActive}
                    >
                        <ShopIcon />
                    </button>
                    
                    <button 
                        onClick={onOpenGuild} 
                        aria-label={t('expedition_guild_title')} 
                        className={`relative ${!isGuildUnlocked ? 'opacity-50 filter grayscale' : (shouldGuildIconGlow ? 'icon-attention-glow' : '')} disabled:opacity-50 disabled:cursor-not-allowed transition-all`} 
                        disabled={isRiftEventActive}
                    >
                        <GuildIcon />
                        {isGuildUnlocked && hasClaimableExpeditions && (
                            <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-gray-800 animate-pulse"></span>
                        )}
                    </button>

                    <button onClick={onOpenQuests} aria-label={t('quest_log_title')} className="relative disabled:opacity-50 disabled:cursor-not-allowed" disabled={isRiftEventActive}>
                        <QuestIcon />
                        {hasClaimableRewards && (
                            <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-gray-800 animate-pulse"></span>
                        )}
                    </button>
                    <button onClick={onOpenSettings} aria-label={t('settings_title')} disabled={isRiftEventActive} className="disabled:opacity-50 disabled:cursor-not-allowed"><SettingsIcon /></button>
                    <div className="hidden lg:block">
                        <SaveIndicator state={'idle'} />
                    </div>
                </div>
            </div>
        </header>
    );
};