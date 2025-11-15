

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { QuestTier, ActiveDailyQuest, DailyRewardType } from '../types';
import { QuestIcon } from './icons/QuestIcon';
import { RelicIcon } from './icons/RelicIcon';
import { ShardIcon } from './icons/ShardIcon';
import { PointIndicator } from './PointIndicator';

interface QuestLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  allQuestTiers: QuestTier[];
  claimableQuests: string[];
  claimedQuests: string[];
  questProgressMap: Map<string, { value: number; target: number }>;
  onClaimTierReward: (tierId: number) => void;
  claimedTierRewards: number[];
  onClaimQuestReward: (questId: string) => void;
  activeDailyQuests: ActiveDailyQuest[];
  onClaimDailyQuestReward: (questId: string) => void;
  lastDailyQuestReset: string | null;
  formatNumber: (num: number) => string;
}

const ChestIcon = ({ status }: { status: 'locked' | 'claimable' | 'claimed' }) => {
    let filter = '';
    if (status === 'locked') filter = 'grayscale(1)';
    if (status === 'claimed') filter = 'sepia(0.5) brightness(0.8)';
    
    const animation = status === 'claimable' ? 'animate-pulse' : '';

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className={`w-10 h-10 ${animation}`}
            style={{ filter, transition: 'filter 0.3s' }}
            shapeRendering="crispEdges"
        >
            <path fill="#a16207" d="M4 8h16v2H4z M5 10h14v10H5z" />
            <path fill="#ca8a04" d="M6 11h12v8H6z" />
            <path fill="#facc15" d="M11 7h2v5h-2z M7 9h10v2H7z" />
            <path fill="#422006" d="M11 13h2v3h-2z" />
            {status === 'claimed' && <path fill="#facc15" d="M9 13h6v2H9z" />}
        </svg>
    );
};

const RewardIcon: React.FC<{ type: DailyRewardType }> = ({ type }) => {
    if (type === 'relics') return <RelicIcon />;
    if (type === 'shards') return <ShardIcon />;
    return <span className="text-yellow-400 font-bold">P</span>; // Points
};


export const QuestLogModal: React.FC<QuestLogModalProps> = ({ 
    isOpen, onClose, allQuestTiers, claimableQuests, claimedQuests, questProgressMap, onClaimTierReward, claimedTierRewards, onClaimQuestReward,
    activeDailyQuests, onClaimDailyQuestReward, lastDailyQuestReset, formatNumber,
}) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'main' | 'daily'>('daily');
    const [timeToReset, setTimeToReset] = useState('');

    useEffect(() => {
        if (!isOpen || activeTab !== 'daily') return;

        const calculateTime = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
            tomorrow.setUTCHours(0, 0, 0, 0);
            
            const diff = tomorrow.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeToReset(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, [isOpen, activeTab]);
    
    if (!isOpen) return null;
    
    const totalQuests = allQuestTiers.reduce((acc, tier) => acc + tier.quests.length, 0);
    const completedAndClaimedCount = new Set([...claimableQuests, ...claimedQuests]).size;
    const overallProgress = (completedAndClaimedCount / totalQuests) * 100;
    
    const allDoneQuests = new Set([...claimableQuests, ...claimedQuests]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="pixel-box p-4 max-w-xl w-full mx-4 flex flex-col h-[80vh] max-h-[700px] bg-gray-800 border-gray-900 text-white" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <QuestIcon />
                    <h2 className="text-2xl text-shadow-hard text-yellow-300">{t('quest_log_title')}</h2>
                  </div>
                  <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('close_button')}>&times;</button>
                </div>

                <div className="flex border-b-4 border-gray-900 mb-2">
                    <button onClick={() => setActiveTab('daily')} className={`guild-tab px-4 py-2 text-sm font-bold ${activeTab === 'daily' ? 'active' : ''}`}>{t('quest_log_tab_daily')}</button>
                    <button onClick={() => setActiveTab('main')} className={`guild-tab px-4 py-2 text-sm font-bold ${activeTab === 'main' ? 'active' : ''}`}>{t('quest_log_tab_main')}</button>
                </div>

                {activeTab === 'main' && (
                    <>
                        {/* Tier Reward Progress Bar */}
                        <div className="mb-4 p-2 pixel-box bg-gray-900/50">
                            <div className="relative h-4 w-full health-bar-bg mb-2">
                                <div className="absolute h-full bg-yellow-400 rounded-md" style={{ width: `${overallProgress}%` }}></div>
                            </div>
                            <div className="flex justify-around items-end -mt-1">
                                {allQuestTiers.map((tier) => {
                                    const isTierComplete = tier.quests.every(q => allDoneQuests.has(q.id));
                                    const isClaimed = claimedTierRewards.includes(tier.tierId);
                                    const isClaimable = isTierComplete && !isClaimed;

                                    let status: 'locked' | 'claimable' | 'claimed' = 'locked';
                                    if (isClaimable) status = 'claimable';
                                    if (isClaimed) status = 'claimed';
                                    
                                    return (
                                        <div key={tier.tierId} className="flex flex-col items-center">
                                            <ChestIcon status={status} />
                                            <button 
                                                onClick={() => onClaimTierReward(tier.tierId)}
                                                disabled={!isClaimable}
                                                className="pixel-button text-xs px-2 py-1 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                                                style={{ backgroundColor: isClaimable ? '#22c55e' : '#4b5563', color: isClaimable ? '#000' : '#fff' }}
                                            >
                                                {isClaimed ? t('quest_tier_reward_claimed') : isClaimable ? t('quest_tier_reward_claim') : t('quest_tier_reward_locked')}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto space-y-4 pr-2 -mr-2">
                            {allQuestTiers.map((tier) => {
                                return (
                                    <div key={tier.tierId}>
                                        <h3 className="text-lg text-yellow-400 text-shadow-hard mb-2">{t(tier.nameKey)}</h3>
                                        <div className="space-y-2">
                                            {tier.quests.map(quest => {
                                                const isClaimed = claimedQuests.includes(quest.id);
                                                const isClaimable = claimableQuests.includes(quest.id);
                                                
                                                let statusKey: string;
                                                let statusClass: string;
                                                let titleClass: string;

                                                if (isClaimed) {
                                                    statusKey = 'quest_status_completed';
                                                    statusClass = 'text-green-400';
                                                    titleClass = 'text-gray-400';
                                                } else if (isClaimable) {
                                                    statusKey = 'quest_status_claimable';
                                                    statusClass = 'text-yellow-400 animate-pulse';
                                                    titleClass = 'text-yellow-300';
                                                } else {
                                                    statusKey = 'quest_status_in_progress';
                                                    statusClass = 'text-cyan-400';
                                                    titleClass = 'text-gray-300';
                                                }
                                                
                                                const progressData = questProgressMap.get(quest.id) || { value: 0, target: quest.target };
                                                const currentProgressValue = Math.min(progressData.value, progressData.target);
                                                const progress = (currentProgressValue / progressData.target) * 100;

                                                return (
                                                    <div key={quest.id} className="pixel-box bg-gray-900/50 p-3">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <h4 className={`text-sm font-bold ${titleClass}`}>
                                                                {t(quest.nameKey)}
                                                            </h4>
                                                            <span className={`text-xs font-bold ${statusClass}`}>
                                                                {t(statusKey)}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mb-2 h-8 flex items-center">
                                                           {t(quest.descKey, { target: quest.target.toLocaleString() })}
                                                        </p>
                                                        
                                                        {isClaimable ? (
                                                            <button onClick={() => onClaimQuestReward(quest.id)} className="pixel-button w-full bg-green-600 hover:bg-green-500 text-black py-2 font-bold">
                                                                {t('quest_tier_reward_claim')}
                                                            </button>
                                                        ) : (
                                                            <>
                                                                <div className="health-bar-bg w-full mb-1">
                                                                    <div
                                                                        className="h-2 rounded-sm transition-all duration-300"
                                                                        style={{ 
                                                                            width: `${Math.min(100, progress)}%`,
                                                                            backgroundColor: isClaimed ? '#4ade80' : '#22d3ee'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <p className="text-xs text-right">
                                                                    {isClaimed ? '✔️' : `${Math.floor(currentProgressValue).toLocaleString()} / ${progressData.target.toLocaleString()}`}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                             {completedAndClaimedCount >= totalQuests && (
                                <div className="pixel-box bg-gray-900/50 p-4 text-center">
                                    <p className="text-lg text-green-400 font-bold">{t('quest_all_complete_title')}</p>
                                    <p className="text-sm text-gray-400">{t('quest_all_complete_desc')}</p>
                                </div>
                             )}
                        </div>
                    </>
                )}
                {activeTab === 'daily' && (
                    <div className="flex flex-col h-full">
                        <div className="flex-grow overflow-y-auto space-y-2 pr-2 -mr-2">
                             {activeDailyQuests.map(quest => {
                                const progress = (quest.progress / quest.target) * 100;
                                return (
                                    <div key={quest.id} className="pixel-box bg-gray-900/50 p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-sm font-bold text-gray-300">{t(quest.nameKey)}</h4>
                                            <span className={`text-xs font-bold ${quest.completed ? (quest.claimed ? 'text-green-400' : 'text-yellow-400') : 'text-cyan-400'}`}>
                                                {quest.claimed ? t('quest_status_completed') : quest.completed ? t('quest_status_claimable') : t('quest_status_in_progress')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">{t(quest.descKey, { target: quest.target.toLocaleString() })}</p>
                                        
                                        {quest.completed && !quest.claimed ? (
                                             <button onClick={() => onClaimDailyQuestReward(quest.id)} className="pixel-button w-full bg-green-600 hover:bg-green-500 text-black py-2 font-bold flex items-center justify-center gap-2">
                                                <span>{t('quest_tier_reward_claim')} (+{formatNumber(quest.reward.value)})</span>
                                                <RewardIcon type={quest.reward.type} />
                                            </button>
                                        ) : (
                                            <>
                                                <div className="health-bar-bg w-full mb-1">
                                                    <div
                                                        className="h-2 rounded-sm transition-all duration-300"
                                                        style={{ 
                                                            width: `${Math.min(100, progress)}%`,
                                                            backgroundColor: quest.claimed ? '#4ade80' : '#22d3ee'
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-xs text-right">
                                                    {quest.claimed ? '✔️' : `${Math.floor(quest.progress).toLocaleString()} / ${quest.target.toLocaleString()}`}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                );
                             })}
                        </div>
                        <div className="flex-shrink-0 text-center mt-2 p-2 pixel-box bg-gray-900 text-xs text-gray-400">
                           {t('daily_quest_reset_timer', { time: timeToReset })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};