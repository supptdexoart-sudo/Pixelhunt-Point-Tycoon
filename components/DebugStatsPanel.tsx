import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { GameStats, ShopPurchases, PrestigeUpgrade, QuestTier, DiamondCore, Anomaly, Npc, InventoryItem } from '../types';
import { BugIcon } from './icons/BugIcon';
import { getDiamondConfig } from './DynamicDiamond';
import { initialMaterials } from '../data/expeditions';

// Constants from App.tsx for reference
const TIME_BONUS_COOLDOWN = 900;
const FLOATING_REWARD_MIN_INTERVAL = 25000;
const FLOATING_REWARD_MAX_INTERVAL = 45000;
const RIFT_EVENT_MIN_COOLDOWN = 180 * 1000;
const RIFT_EVENT_MAX_COOLDOWN = 300 * 1000;
const RIFT_EVENT_DURATION = 20 * 1000;

interface DebugStatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  shopPurchases: ShopPurchases;
  prestigeUpgrades: PrestigeUpgrade[];
  allQuestTiers: QuestTier[];
  formatNumber: (num: number) => string;
  points: number;
  basePointsPerSecond: number;
  questProgressMap: Map<string, { value: number; target: number }>;
  diamondCore: DiamondCore;
  isGoldenAgeActive: boolean;
  isAdBonusActive: boolean;
  adBonusEndTime: number | null;
  isRiftEventActive: boolean;
  riftEventTimeLeft: number | null;
  anomalies: Anomaly[];
  unlockedFeatures: any;
  inventory: InventoryItem[];
  npcs: Npc[];
}

const getQuestUnlockable = (questId: string, t: (key: string, replacements?: { [key: string]: string | number }) => string): string => {
    const unlockMap: { [key: string]: string } = {
        q1: t('debug_unlock_upg2'),
        q2: t('debug_unlock_bonuses'),
        q3: t('debug_unlock_automax_upg3'),
        q4: t('debug_unlock_minichallenge_upg4'),
        q5: t('debug_unlock_prestige_upg5'),
        q10: t('debug_unlock_shop'),
    };
    return unlockMap[questId] || t('debug_unlock_reward');
};

export const DebugStatsPanel: React.FC<DebugStatsPanelProps> = ({
  isOpen, onClose, stats, shopPurchases, prestigeUpgrades, allQuestTiers, formatNumber, points, basePointsPerSecond, questProgressMap,
  diamondCore, isGoldenAgeActive, isAdBonusActive, adBonusEndTime, isRiftEventActive, riftEventTimeLeft, anomalies, unlockedFeatures, inventory, npcs
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  const critChanceUpg = prestigeUpgrades.find(u => u.id === 'critical_clicks');
  const relicHunterUpg = prestigeUpgrades.find(u => u.id === 'relic_hunter');
  const costReductionUpg = prestigeUpgrades.find(u => u.id === 'cost_reduction');
  const singularityUpg = prestigeUpgrades.find(u => u.id === 'singularity');
  
  const critChance = critChanceUpg ? critChanceUpg.getBonus(critChanceUpg.level) : 0;
  const relicHunterChance = relicHunterUpg ? relicHunterUpg.getBonus(relicHunterUpg.level) : 0;
  const costReduction = costReductionUpg ? 1 - costReductionUpg.getBonus(costReductionUpg.level) : 0;
  const singularityBonus = singularityUpg ? singularityUpg.getBonus(singularityUpg.level) : 1;
  const relicShopBonus = 1 + (shopPurchases.relicBoostLevel * 0.05);

  const baseRelics = Math.floor(Math.sqrt(stats.totalPointsEarned / 5e6));
  const finalRelicGain = Math.floor(baseRelics * singularityBonus * relicShopBonus);

  const riftDrainPPS = basePointsPerSecond * 0.5;
  const riftDrainPoints = points * 0.001;
  const totalRiftDrain = riftDrainPPS + riftDrainPoints;

  const diamondConfig = getDiamondConfig(diamondCore.level);
  
  const formatTime = (totalSeconds: number): string => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let timeString = '';
    if (days > 0) timeString += `${days}d `;
    if (hours > 0) timeString += `${hours}h `;
    timeString += `${minutes}m`;
    return timeString.trim();
  };

  // FIX: Make the 'value' prop optional to allow for label-only stat items with child content.
  const StatItem: React.FC<{ label: string; value?: React.ReactNode; subtext?: React.ReactNode; children?: React.ReactNode }> = ({ label, value, subtext, children }) => (
    <div className="py-2 border-b border-gray-700/50 last:border-b-0">
      <div className="flex justify-between items-baseline gap-2">
        <span className="text-gray-400 shrink-0">{label}</span>
        {value !== undefined ? (
          <>
            <div className="flex-grow border-b border-dotted border-gray-600 mx-2"></div>
            <div className="font-bold text-yellow-300 text-right">{value}</div>
          </>
        ) : null}
      </div>
      {subtext && <p className="text-xs text-gray-500 text-right mt-1">{subtext}</p>}
      {children && <div className="text-xs text-gray-500 mt-1">{children}</div>}
    </div>
  );

  return (
    <>
      {isOpen && <div className="stats-panel-overlay" onClick={onClose} aria-hidden="true"></div>}
      <div 
        className={`stats-panel pixel-box p-4 flex flex-col text-white ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-labelledby="debug-panel-heading"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BugIcon />
            <h2 id="debug-panel-heading" className="text-3xl text-shadow-hard text-yellow-300">{t('debug_panel_title')}</h2>
          </div>
          <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1">&times;</button>
        </div>

        <div className="text-sm flex-grow pr-2 -mr-2 overflow-y-auto">
          {/* Section: Core State */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_core_state')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('points_name')} value={formatNumber(points)} subtext={points.toLocaleString()} />
              <StatItem label={t('relic_name')} value={stats.relics.toLocaleString()} />
              <StatItem label={t('shard_name')} value={(stats.shards || 0).toLocaleString()} />
              <StatItem label={t('stats_times_prestiged')} value={stats.timesPrestiged.toLocaleString()} />
              <StatItem label={t('debug_play_time')} value={formatTime(stats.playTime)} subtext={`${Math.floor(stats.playTime)}s`} />
            </div>
          </div>
          
           {/* Section: Diamond Status */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_diamond')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('debug_diamond_level')} value={diamondCore.level} subtext={t(diamondConfig.nameKey)} />
              <StatItem label={t('debug_diamond_hp')} value={`${formatNumber(diamondCore.currentHp)} / ${formatNumber(diamondCore.maxHp)}`} />
            </div>
          </div>

          {/* Section: Active Effects & Events */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_active_effects')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('debug_ad_bonus_active')} value={isAdBonusActive ? 'Yes' : 'No'} subtext={isAdBonusActive && adBonusEndTime ? `Ends in ${Math.ceil((adBonusEndTime - Date.now()) / 1000)}s` : ''} />
              <StatItem label={t('debug_golden_age_active')} value={isGoldenAgeActive ? 'Yes' : 'No'} />
              <StatItem label={t('debug_rift_event_active')} value={isRiftEventActive ? 'Yes' : 'No'} subtext={isRiftEventActive && riftEventTimeLeft ? `Ends in ${riftEventTimeLeft}s` : ''} />
              <StatItem label={t('debug_anomalies_active')} value={anomalies.length} />
            </div>
          </div>

          {/* Section: Expedition System */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_expeditions')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('debug_npcs')}>
                <div className="mt-1 space-y-1">
                  {npcs.map(npc => (
                    <div key={npc.id} className="text-gray-400">{t(npc.nameKey)} - Lvl {npc.level} ({Math.floor(npc.currentXp)}/{npc.xpToNextLevel} XP) - Status: {npc.status}</div>
                  ))}
                </div>
              </StatItem>
              <StatItem label={t('debug_inventory_summary')}>
                 <div className="mt-1 space-y-1 text-gray-400">
                    {inventory.length > 0 ? inventory.map(item => {
                        const material = initialMaterials.find(m => m.id === item.materialId);
                        return <div key={item.materialId}>{item.quantity}x {material ? t(material.nameKey) : item.materialId}</div>
                    }) : "Empty"}
                 </div>
              </StatItem>
            </div>
          </div>
          
          {/* Section: Timers & Cooldowns */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_timers')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('debug_time_bonus_cooldown')} value={`${(TIME_BONUS_COOLDOWN * (1 - (shopPurchases.timeBonusReductionLevel * 0.1))).toFixed(0)}s`} subtext={`-10% ${t('debug_per_level_shop')} (${shopPurchases.timeBonusReductionLevel * 10}% ${t('debug_total')})`} />
              <StatItem label={t('debug_floating_reward_interval')} value={`${FLOATING_REWARD_MIN_INTERVAL / 1000}s - ${FLOATING_REWARD_MAX_INTERVAL / 1000}s`} />
              <StatItem label={t('debug_rift_event_cooldown')} value={`${RIFT_EVENT_MIN_COOLDOWN / 1000}s - ${RIFT_EVENT_MAX_COOLDOWN / 1000}s`} />
              <StatItem label={t('debug_rift_event_duration')} value={`${RIFT_EVENT_DURATION / 1000}s`} />
            </div>
          </div>

          {/* Section: Probabilities & Chances */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_chances')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('debug_crit_chance')} value={`${(critChance * 100).toFixed(2)}%`} subtext={t('debug_from_prestige')} />
              <StatItem label={t('debug_relic_hunter_chance')} value={`${(relicHunterChance * 100).toFixed(2)}%`} subtext={t('debug_on_diamond_break')} />
              <StatItem label={t('debug_shard_chance_diamond')} value="2.00%" subtext={t('debug_on_diamond_break')} />
              <StatItem label={t('debug_shard_chance_floating')} value="0.50%" subtext={t('debug_from_floating')} />
              <StatItem label={t('debug_jackpot_chance_floating')} value="1.50%" subtext={t('debug_from_floating')} />
            </div>
          </div>

          {/* Section: Formulas & Calculations */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_formulas')}</h3>
            <div className="debug-section-content">
              <StatItem label={t('debug_relics_on_prestige')} value={`${formatNumber(finalRelicGain)}`} subtext={t('debug_relic_gain_breakdown', { base: formatNumber(baseRelics), singularity: singularityBonus, shop: relicShopBonus.toFixed(2) })} />
              <StatItem label={t('debug_rift_drain_formula')} value={`${formatNumber(totalRiftDrain)}/s`} subtext={t('debug_rift_drain_breakdown', { pps: formatNumber(riftDrainPPS), points: formatNumber(riftDrainPoints) })} />
              <StatItem label={t('debug_cost_reduction_from_prestige')} value={`-${(costReduction * 100).toFixed(0)}%`} subtext={`base * 1.18^lvl, ${t('debug_reduced_by_prestige')}`} />
            </div>
          </div>
          
          {/* Section: Unlocked Features State */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_unlocked_features_state')}</h3>
            <div className="debug-section-content text-xs text-gray-400 font-mono">
              <pre>{JSON.stringify(unlockedFeatures, null, 2)}</pre>
            </div>
          </div>

          {/* Section: Unlock Conditions */}
          <div className="debug-section-box">
            <h3 className="debug-section-header text-lg text-cyan-300 text-shadow-hard">{t('debug_section_unlocks')}</h3>
            <div className="debug-section-content">
              {allQuestTiers.flatMap(tier => tier.quests).map(quest => {
                const unlockable = getQuestUnlockable(quest.id, t);
                const progress = questProgressMap.get(quest.id) || { value: 0, target: quest.target };
                const progressText = t('debug_progress', {
                    current: formatNumber(Math.min(progress.value, progress.target)),
                    target: formatNumber(progress.target)
                });
                return (
                    <StatItem
                        key={quest.id}
                        label={t(quest.nameKey)}
                        value={<><span>{unlockable}</span><span className="text-xs text-cyan-400 ml-2">({progressText})</span></>}
                        subtext={t(quest.descKey, { target: formatNumber(quest.target) })}
                    />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
