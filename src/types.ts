// FIX: Replaced incorrect content with all necessary type definitions for the application.
// This resolves numerous 'module has no exported member' and 'circular definition' errors across the codebase.
import React from 'react';

export interface GameStats {
  highestPoints: number;
  totalPointsEarned: number;
  playTime: number;
  upgradesPurchased: number;
  totalClicks: number;
  manualPointsEarned: number;
  timesPrestiged: number;
  relics: number;
  shards: number;
  totalRelicsEarned: number;
  dailyRewardsClaimed: number;
  consecutiveDays: number;
  timeBonusesClaimed: number;
  adsWatched: number;
  lastSaveTimestamp?: number;
  prestigeMultiplier: number;
  // Daily Quest Stats
  dailyClicks?: number;
  dailyManualPoints?: number;
  dailyDiamondsBroken?: number;
  dailyUpgradesPurchased?: number;
  dailyFloatingRewardsClaimed?: number;
}

export interface Upgrade {
  level: number;
  retainedLevel: number;
  baseCost: number;
  cost: number;
  type: 'ppc' | 'pps' | 'pps_from_ppc' | 'pps_relic_scaled';
  value: number;
  nameKey: string;
  descKey: string;
}

export interface PrestigeUpgrade {
  id: string;
  nameKey: string;
  descKey: string;
  maxLevel: number;
  level: number;
  path: 'guardian' | 'alchemist' | 'prospector';
  requires?: string[];
  cost: (level: number) => number;
  getBonus: (level: number) => number;
  formatBonus: (bonus: number) => string;
  position: { x: number; y: number };
}

export interface FloatingReward {
  id: number;
  x: number;
  y: number;
  value: number;
  type: 'points' | 'jackpot' | 'shard';
}

export interface PointIndicator {
  id: number;
  x: number;
  y: number;
  value: string;
  type: 'click' | 'crit' | 'bonus' | 'combo1' | 'combo2' | 'combo3' | 'echo';
}

export interface DiamondCore {
  level: number;
  currentHp: number;
  maxHp: number;
}

export interface ShopPurchases {
  relicBoostLevel: number;
  timeBonusReductionLevel: number;
  unlockedCosmetics: string[];
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  onComplete: () => void;
}

export interface InventoryItem {
  materialId: string;
  quantity: number;
}

export interface Material {
  id: string;
  nameKey: string;
  icon: string;
  category: 'material' | 'equipment';
  slot?: 'head' | 'body' | 'boots' | 'weapon' | 'shield';
}

export interface Npc {
  id: string;
  nameKey: string;
  status: 'idle' | 'onExpedition';
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  icon: string;
  currentHp: number;
  maxHp: number;
  equipment: {
    head: string | null;
    body: string | null;
    boots: string | null;
    weapon: string | null;
    shield: string | null;
  };
}

export interface LocationReward {
  materialId: string;
  min: number;
  max: number;
  chance: number;
}

export interface Location {
  id: string;
  nameKey: string;
  duration: number; // in seconds
  rewards: LocationReward[];
  requiredPrestige: number;
}

export interface Expedition {
  id: number;
  npcId: string;
  locationId: string;
  startTime: number;
  endTime: number;
}

export interface Anomaly {
  id: number;
  x: number;
  y: number;
  animationType: number;
  disappearing?: boolean;
}

export interface RiftProjectile {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
}

// FIX: Add missing TriviaQuestion type.
export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Quest related types
export interface Quest {
  id: string;
  nameKey: string;
  descKey: string;
  target: number;
  getValue: (stats: GameStats, points: number, upgrades: Upgrade[], diamondCore: DiamondCore, prestigeUpgrades: PrestigeUpgrade[]) => number;
  reward: () => void;
}

export interface QuestTier {
  tierId: number;
  nameKey: string;
  quests: Quest[];
}

// FIX: Added QuestDefinitionQuest to break circular dependency with data/quests.ts
export interface QuestDefinitionQuest {
  id: string;
  nameKey: string;
  descKey: string;
  target: number;
  getValue: {
      type: 'stats' | 'diamond' | 'prestige' | 'base_ppc' | 'base_pps';
      key: string;
  };
  reward: {
      type: 'points' | 'none' | 'unlock' | 'relics' | 'shards';
      value?: number | boolean;
      key?: string | string[];
  };
}

export interface QuestDefinition {
  tierId: number;
  nameKey: string;
  quests: QuestDefinitionQuest[];
}

export interface SideNotification {
  id: number;
  type: 'relic' | 'shard' | 'ship';
  quantity: number;
}

// FIX: Added 'ROUGH_PPC_BOOST', 'UNSTABLE_PPS_BOOST', and 'SHARD_GAMBLE' to CardType to resolve type errors in roughCards.ts.
export type CardType = 'CRIT_DAMAGE_BOOST' | 'ADD_POINTS' | 'AUTO_CLICKER' | 'PPC_MUL' | 'PPS_MUL' | 'COMBO_THRESHOLD_REDUCE' | 'CONVERT_RELIC_TO_SHARD' | 'GOLDEN_CLICKS'
  | 'PPS_BOOST' | 'ADD_SHARDS' | 'DIAMOND_DAMAGE_MUL' | 'FLOATING_REWARD_BONUS' | 'UPGRADE_COST_REDUCTION' | 'CRIT_CHANCE_BONUS' | 'COMBO_WINDOW_INCREASE' | 'OFFLINE_GAINS_MUL' | 'NEXT_PRESTIGE_RELIC_BONUS' | 'ROUGH_PPC_BOOST' | 'UNSTABLE_PPS_BOOST' | 'SHARD_GAMBLE';

export interface Card {
    id: string;
    type: CardType;
    persistence: 'instant' | 'temporary' | 'permanent';
    value: number;
    duration?: number; // in seconds
    nameKey: string;
    descKey: string;
    icon: React.FC<{ className?: string }>;
}

// FIX: Added 'PPC_BOOST' and 'PPC_REDUCTION' to ActiveBonus type to resolve error in ActiveBonusesDisplay.tsx.
export interface ActiveBonus {
    type: 'CRIT_DAMAGE_BOOST' | 'AUTO_CLICKER' | 'GOLDEN_CLICKS' | 'PPS_BOOST' | 'FLOATING_REWARD_BONUS' | 'UPGRADE_COST_REDUCTION' | 'COMBO_WINDOW_INCREASE' | 'PPC_BOOST' | 'PPC_REDUCTION';
    value: number;
    expiresAt: number;
}

// Daily Quest Types
export type DailyQuestStat = 'dailyClicks' | 'dailyManualPoints' | 'dailyDiamondsBroken' | 'dailyUpgradesPurchased' | 'dailyFloatingRewardsClaimed';

export type DailyRewardType = 'points' | 'relics' | 'shards';

export interface DailyQuestReward {
    type: DailyRewardType;
    value: number;
}

export interface DailyQuestDefinition {
    id: string;
    nameKey: string;
    descKey: string;
    stat: DailyQuestStat;
    target: (stats: GameStats) => number;
    reward: (stats: GameStats, pps: number) => DailyQuestReward;
}

export interface ActiveDailyQuest {
    id: string;
    nameKey: string;
    descKey: string;
    stat: DailyQuestStat;
    progress: number;
    target: number;
    reward: DailyQuestReward;
    completed: boolean;
    claimed: boolean;
}