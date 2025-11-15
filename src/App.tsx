import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Header } from './components/Header';
import { UpgradePanel } from './components/UpgradePanel';
import { StatsPanel } from './components/StatsPanel';
import { DailyRewardModal } from './components/DailyRewardModal';
import { ProfileModal } from './components/ProfileModal';
import { PrestigeModal } from './components/PrestigeConfirmModal';
import { SettingsModal } from './components/SettingsModal';
import { DynamicDiamond, getDiamondConfig, getDiamondConfigCount } from './components/DynamicDiamond';
import { PrestigeAnimationOverlay } from './components/PrestigeAnimationOverlay';
import { FloatingReward } from './components/FloatingReward';
import { PointIndicator } from './components/PointIndicator';
import { TestPanel } from './components/TestPanel';
import { ToastNotification } from './components/ToastNotification';
import { AdModal } from './components/AdModal';
import { AutoBuyConfirmModal } from './components/AutoBuyConfirmModal';
import { QuestLogModal } from './components/QuestLogModal';
import { Anomaly } from './components/Ghost';
import { GenesisDiamond } from './components/GenesisDiamond';
import { GenesisIntroModal } from './components/GenesisIntroModal';
import { ShopModal } from './components/ShopModal';
import { RiftIntroModal } from './components/RiftIntroModal';
import { FloatingRewardIntroModal } from './components/FloatingRewardIntroModal';
import { ShopIntroModal } from './components/ShopIntroModal';
import { ExpeditionModal } from './components/ExpeditionModal';
import { ExpeditionIntroModal } from './components/ExpeditionIntroModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LockedFeatureModal } from './components/LockedFeatureModal';
import { PrestigeIntroModal } from './components/PrestigeIntroModal';
import { RetainIntroModal } from './components/RetainIntroModal';
import { OfflineGainsModal } from './components/OfflineGainsModal';
import { SideNotification } from './components/SideNotification';
import { RiftProjectile } from './components/RiftProjectile';
import { RogueClassSelectionModal } from './components/RogueClassSelectionModal';
import { CardSelectionModal } from './components/CardSelectionModal';
import { CardJournalModal } from './components/CardJournalModal';
import { JournalIcon } from './components/icons/JournalIcon';
import { ActiveBonusesDisplay } from './components/ActiveBonusesDisplay';
import { SupportShip } from './components/SupportShip';
import { PathIcon } from './components/icons/PathIcon';


import { useAuth } from './contexts/AuthContext';
import { useTranslation } from './contexts/LanguageContext';

// FIX: Import Anomaly type from types.ts
import { GameStats, Upgrade, PrestigeUpgrade, FloatingReward as FloatingRewardType, PointIndicator as PointIndicatorType, DiamondCore, QuestTier, ShopPurchases, InventoryItem, Npc, Expedition, QuestDefinition, Anomaly as AnomalyType, SideNotification as SideNotificationType, RiftProjectile as RiftProjectileType, Card, ActiveBonus, ActiveDailyQuest, DailyQuestStat } from './types';
import { initialUpgrades as initialUpgradesData } from './data/upgrades';
import { prestigeTrees } from './data/prestige';
import { initialQuestTiers as initialQuestTiersData } from './data/quests';
import { initialLocations, initialNpcs } from './data/expeditions';
import { cardPool } from './data/cards';
import { dailyQuestsPool } from './data/dailyQuests';
import { roughCardPool } from './data/roughCards';


// Constants
const TIME_BONUS_COOLDOWN = 900; // 15 minutes
const AD_BONUS_DURATION = 480; // 8 minutes
const AD_BONUS_COOLDOWN = 600; // 10 minutes
const AD_BONUS_MULTIPLIER = 1.5;
const SAVE_DEBOUNCE_TIME = 2000; // 2 seconds
const FLOATING_REWARD_LIFETIME = 7000; // 7 seconds
const FLOATING_REWARD_MIN_INTERVAL = 25000; // 25 seconds
const FLOATING_REWARD_MAX_INTERVAL = 45000; // 45 seconds
const MAX_FLOATING_REWARDS = 5;
const RIFT_EVENT_MIN_COOLDOWN = 180 * 1000; // 3 minutes
const RIFT_EVENT_MAX_COOLDOWN = 300 * 1000; // 5 minutes
const RIFT_EVENT_DURATION = 20 * 1000; // 20 seconds
const INITIAL_INVENTORY_CAPACITY = 20;

const SHIP_SHOOT_DURATION = 15000; // 15 seconds
const SHIP_COOLDOWN_DURATION = 10000; // 10 seconds
const SHIP_BONUS_PPS_MULTIPLIER = 0.20; // 20% of base PPS

const COMBO_CONFIG = [
  // Tier 0 (no combo)
  { threshold: 0, window: 0, duration: 0, multiplier: 1, nameKey: '', colors: { main: '', light: '' } },
  // Tier 1
  { threshold: 5, window: 1500, duration: 3000, multiplier: 1.5, nameKey: 'combo_name_1', colors: { main: '#22d3ee', light: '#a5f3fc' } }, // cyan
  // Tier 2
  { threshold: 7, window: 1200, duration: 4000, multiplier: 2.0, nameKey: 'combo_name_2', colors: { main: '#facc15', light: '#fde047' } }, // yellow
  // Tier 3
  { threshold: 9, window: 1000, duration: 5000, multiplier: 3.0, nameKey: 'combo_name_3', colors: { main: '#c084fc', light: '#e9d5ff' } }, // purple
];


const initialUpgrades = JSON.parse(JSON.stringify(initialUpgradesData));
const initialQuestTiers = JSON.parse(JSON.stringify(initialQuestTiersData));

// --- Initial Game State ---
const initialStats: GameStats = {
  highestPoints: 0,
  totalPointsEarned: 0,
  playTime: 0,
  upgradesPurchased: 0,
  totalClicks: 0,
  manualPointsEarned: 0,
  timesPrestiged: 0,
  relics: 0,
  shards: 0,
  totalRelicsEarned: 0,
  dailyRewardsClaimed: 0,
  consecutiveDays: 0,
  timeBonusesClaimed: 0,
  adsWatched: 0,
  prestigeMultiplier: 0,
  dailyClicks: 0,
  dailyManualPoints: 0,
  dailyDiamondsBroken: 0,
  dailyUpgradesPurchased: 0,
  dailyFloatingRewardsClaimed: 0,
};

const initialDiamondCore: DiamondCore = {
    level: 0,
    currentHp: 100,
    maxHp: 100,
    isCorrupted: false,
};

const initialShopPurchases: ShopPurchases = {
    relicBoostLevel: 0,
    timeBonusReductionLevel: 0,
    unlockedCosmetics: [],
};

const initialUnlockedFeatures = {
    visibleUpgrades: 1, // number of pairs
    timeBonus: false,
    adBonus: false,
    autoMax: false,
    prestige: false,
    shop: false,
    expeditions: false,
};

interface GameState {
  points: number;
  upgrades: Upgrade[];
  stats: GameStats;
  allPrestigeUpgrades: { [key: string]: PrestigeUpgrade[] };
  lastDailyReward: string | null;
  lastTimeBonus: number | null;
  adBonusEndTime: number | null;
  adBonusCooldownEndTime: number | null;
  diamondCore: DiamondCore;
  claimableQuests: string[];
  claimedQuests: string[];
  claimedTierRewards: number[];
  completedQuests?: string[]; // For backwards compatibility
  hasCompletedGenesis: boolean;
  shopPurchases: ShopPurchases;
  activeCosmetic: string | null;
  hasSeenRiftIntro: boolean;
  hasSeenFloatingRewardIntro: boolean;
  hasSeenShopIntro: boolean;
  hasOpenedShop: boolean;
  inventory: InventoryItem[];
  inventoryCapacity: number;
  npcs: Npc[];
  expeditions: Expedition[];
  hasSeenExpeditionIntro: boolean;
  hasOpenedExpeditions: boolean;
  hasSeenPrestigeIntro: boolean;
  hasSeenRetainIntro: boolean;
  rogueClass: string | null;
  hasChosenRogueClass: boolean;
  activeBonuses: ActiveBonus[];
  collectedCards: Card[];
  nextPrestigeRelicBonus: number;
  activeDailyQuests: ActiveDailyQuest[];
  lastDailyQuestReset: string | null;
}

interface ActiveModals {
    statsPanel: boolean;
    dailyReward: boolean;
    profile: boolean;
    prestige: boolean;
    autoBuyConfirm: boolean;
    questLog: boolean;
    shop: boolean;
    expedition: boolean;
    expeditionIntro: boolean;
    settings: boolean;
    testPanel: boolean;
    ad: boolean;
    genesisIntro: boolean;
    rogueClass: boolean;
    cardSelection: { titleKey: string; descKey: string; cards: Card[] } | null;
    cardJournal: boolean;
    riftIntro: boolean;
    floatingRewardIntro: boolean;
    shopIntro: boolean;
    prestigeIntro: boolean;
    retainIntro: boolean;
    lockedFeature: { nameKey: string; type: 'quest' | 'prestige'; value: string | number } | null;
}

const initialActiveModals: ActiveModals = {
    statsPanel: false,
    dailyReward: false,
    profile: false,
    prestige: false,
    autoBuyConfirm: false,
    questLog: false,
    shop: false,
    expedition: false,
    expeditionIntro: false,
    settings: false,
    testPanel: false,
    ad: false,
    genesisIntro: false,
    rogueClass: false,
    cardSelection: null,
    cardJournal: false,
    riftIntro: false,
    floatingRewardIntro: false,
    shopIntro: false,
    prestigeIntro: false,
    retainIntro: false,
    lockedFeature: null,
};

const deepCopyPrestigeTrees = () => {
    const newTrees: {[key: string]: PrestigeUpgrade[]} = {};
    for (const key in prestigeTrees) {
        if (Object.prototype.hasOwnProperty.call(prestigeTrees, key)) {
            newTrees[key] = prestigeTrees[key].map(upg => ({...upg}));
        }
    }
    return newTrees;
};

const App: React.FC = () => {
  // --- Hooks and Contexts ---
  const { user } = useAuth();
  const { t, language } = useTranslation();

  // --- Game State ---
  const [points, setPoints] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => JSON.parse(JSON.stringify(initialUpgradesData)));
  const [stats, setStats] = useState<GameStats>(() => ({ ...initialStats }));
  const [allPrestigeUpgrades, setAllPrestigeUpgrades] = useState<{[key: string]: PrestigeUpgrade[]}>(() => deepCopyPrestigeTrees());
  const [diamondCore, setDiamondCore] = useState<DiamondCore>(initialDiamondCore);
  const [lastDailyReward, setLastDailyReward] = useState<string | null>(null);
  const [lastTimeBonus, setLastTimeBonus] = useState<number | null>(null);
  const [dailyRewardReady, setDailyRewardReady] = useState(false);
  const [timeBonusCooldown, setTimeBonusCooldown] = useState(TIME_BONUS_COOLDOWN);
  const [adBonusEndTime, setAdBonusEndTime] = useState<number | null>(null);
  const [adBonusCooldownEndTime, setAdBonusCooldownEndTime] = useState<number | null>(null);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [claimableQuests, setClaimableQuests] = useState<string[]>([]);
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);
  const [claimedTierRewards, setClaimedTierRewards] = useState<number[]>([]);
  const [unlockedFeatures, setUnlockedFeatures] = useState(initialUnlockedFeatures);
  const [hasCompletedGenesis, setHasCompletedGenesis] = useState(false);
  const [shopPurchases, setShopPurchases] = useState<ShopPurchases>(initialShopPurchases);
  const [activeCosmetic, setActiveCosmetic] = useState<string | null>(null);
  const [hasSeenRiftIntro, setHasSeenRiftIntro] = useState(false);
  const [hasSeenFloatingRewardIntro, setHasSeenFloatingRewardIntro] = useState(false);
  const [hasSeenShopIntro, setHasSeenShopIntro] = useState(false);
  const [hasSeenPrestigeIntro, setHasSeenPrestigeIntro] = useState(false);
  const [hasSeenRetainIntro, setHasSeenRetainIntro] = useState(false);
  const [hasOpenedShop, setHasOpenedShop] = useState(false);
  const [comboState, setComboState] = useState<{ tier: number; endTime: number; clicksInWindow: number[] }>({ tier: 0, endTime: 0, clicksInWindow: [] });
  const [offlineGains, setOfflineGains] = useState<number | null>(null);
  const [rogueClass, setRogueClass] = useState<string | null>(null);
  const [hasChosenRogueClass, setHasChosenRogueClass] = useState(false);
  const [activeBonuses, setActiveBonuses] = useState<ActiveBonus[]>([]);
  const [collectedCards, setCollectedCards] = useState<Card[]>([]);
  const [shipState, setShipState] = useState<{ status: 'shooting' | 'cooldown', cycleEndTime: number }>({ status: 'cooldown', cycleEndTime: 0 });
  const [isPathPanelVisible, setIsPathPanelVisible] = useState(false);
  const [nextPrestigeRelicBonus, setNextPrestigeRelicBonus] = useState(0);
  
  // Daily Quest State
  const [activeDailyQuests, setActiveDailyQuests] = useState<ActiveDailyQuest[]>([]);
  const [lastDailyQuestReset, setLastDailyQuestReset] = useState<string | null>(null);

  // --- Expedition State ---
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventoryCapacity, setInventoryCapacity] = useState(INITIAL_INVENTORY_CAPACITY);
  const [npcs, setNpcs] = useState<Npc[]>(initialNpcs);
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [hasSeenExpeditionIntro, setHasSeenExpeditionIntro] = useState(false);
  const [hasOpenedExpeditions, setHasOpenedExpeditions] = useState(false);

  // --- UI State ---
  const [activeModals, setActiveModals] = useState<ActiveModals>(initialActiveModals);
  const [sideNotifications, setSideNotifications] = useState<SideNotificationType[]>([]);
  const [delayedHpPercentage, setDelayedHpPercentage] = useState(100);
  const [isDiamondShaking, setDiamondShaking] = useState(false);
  const [isCrystalHit, setIsCrystalHit] = useState(false);
  const [isDiamondExploding, setIsDiamondExploding] = useState(false);
  const [floatingRewards, setFloatingRewards] = useState<FloatingRewardType[]>([]);
  const [pointIndicators, setPointIndicators] = useState<PointIndicatorType[]>([]);
  const [isPrestigeAnimating, setIsPrestigeAnimating] = useState(false);
  const [justPurchasedUpgradeId, setJustPurchasedUpgradeId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [comboProgress, setComboProgress] = useState(100);
  const [adBonusTimeLeftFormatted, setAdBonusTimeLeftFormatted] = useState('00:00');
  const [bonusTimers, setBonusTimers] = useState<Record<string, string>>({});

  // Rift Event State
  const [isRiftEventActive, setRiftEventActive] = useState(false);
  // FIX: Use the imported AnomalyType which is an alias for Anomaly
  const [anomalies, setAnomalies] = useState<AnomalyType[]>([]);
  const [projectiles, setProjectiles] = useState<RiftProjectileType[]>([]);
  const [pointsDrainedPerSecond, setPointsDrainedPerSecond] = useState(0);
  const [riftEventTimeLeft, setRiftEventTimeLeft] = useState<number | null>(null);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalsOpenRef = useRef(false);
  const diamondContainerRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef<GameState | null>(null);
  const riftEventTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const riftEventDurationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const floatingRewardSpawnerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  // Smooth point display animation
  useEffect(() => {
    if (Math.abs(points - displayPoints) < 1) {
      if (points !== displayPoints) setDisplayPoints(points);
      return;
    }
    const animationFrameId = window.requestAnimationFrame(() => {
      setDisplayPoints(current => current + (points - current) * 0.1);
    });
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [points, displayPoints]);

  useEffect(() => {
    const anyModalOpen = offlineGains !== null || 
        Object.values(activeModals).some(value => {
            if (typeof value === 'boolean') return value;
            if (typeof value === 'object' && value !== null) return true;
            return false;
        });
    modalsOpenRef.current = anyModalOpen;
    setIsGamePaused(anyModalOpen);
  }, [offlineGains, activeModals]);

  // Keep the gameStateRef updated for save-on-exit
  useEffect(() => {
    gameStateRef.current = {
        points, upgrades, stats, allPrestigeUpgrades, lastDailyReward, lastTimeBonus, adBonusEndTime, adBonusCooldownEndTime, diamondCore, claimableQuests, claimedQuests, claimedTierRewards, hasCompletedGenesis, shopPurchases, activeCosmetic, hasSeenRiftIntro, hasSeenFloatingRewardIntro, hasSeenShopIntro, hasOpenedShop, inventory, inventoryCapacity, npcs, expeditions, hasSeenExpeditionIntro, hasOpenedExpeditions, hasSeenPrestigeIntro, hasSeenRetainIntro, rogueClass, hasChosenRogueClass, activeBonuses, collectedCards, nextPrestigeRelicBonus, activeDailyQuests, lastDailyQuestReset,
    };
  }, [points, upgrades, stats, allPrestigeUpgrades, lastDailyReward, lastTimeBonus, adBonusEndTime, adBonusCooldownEndTime, diamondCore, claimableQuests, claimedQuests, claimedTierRewards, hasCompletedGenesis, shopPurchases, activeCosmetic, hasSeenRiftIntro, hasSeenFloatingRewardIntro, hasSeenShopIntro, hasOpenedShop, inventory, inventoryCapacity, npcs, expeditions, hasSeenExpeditionIntro, hasOpenedExpeditions, hasSeenPrestigeIntro, hasSeenRetainIntro, rogueClass, hasChosenRogueClass, activeBonuses, collectedCards, nextPrestigeRelicBonus, activeDailyQuests, lastDailyQuestReset]);

  // FIX: Reordered memoized calculations to fix dependency issues and resolved redeclaration errors.
  // --- Calculated Values ---
  const prestigeUpgrades = useMemo(() => {
    if (rogueClass && allPrestigeUpgrades[rogueClass]) {
        return allPrestigeUpgrades[rogueClass];
    }
    return [];
  }, [rogueClass, allPrestigeUpgrades]);

  const rogueClassBonuses = useMemo(() => {
    const bonuses = {
        ppcMultiplier: 1,
        ppsMultiplier: 1,
        diamondDamageMultiplier: 1,
        critChanceBonus: 0,
        bonusDurationMultiplier: 1,
        diamondBreakShardChanceBonus: 0,
        floatingRewardShardChanceBonus: 0,
        floatingRewardPointsMultiplier: 1,
        offlinePointsMultiplier: 1,
    };

    switch (rogueClass) {
        case 'guardian':
            bonuses.ppcMultiplier = 1.15; // +15% base PPC
            bonuses.diamondDamageMultiplier = 1.5; // +50% base diamond damage
            bonuses.critChanceBonus = 0.01; // +1% flat crit chance
            break;
        case 'alchemist':
            bonuses.ppsMultiplier = 1.15; // +15% base PPS
            bonuses.bonusDurationMultiplier = 1.1; // +10% duration for Ad and temporary card bonuses
            bonuses.offlinePointsMultiplier = 1.2; // +20% offline points
            break;
        case 'prospector':
            bonuses.diamondBreakShardChanceBonus = 0.005; // +0.5% shard chance on diamond break
            bonuses.floatingRewardShardChanceBonus = 0.01; // +1.0% shard chance on floating rewards
            bonuses.floatingRewardPointsMultiplier = 1.1; // +10% points from floating rewards
            break;
    }
    return bonuses;
  }, [rogueClass]);

  const rogueClassDetails = useMemo(() => {
    if (!rogueClass) return null;

    switch (rogueClass) {
        case 'guardian':
            return {
                nameKey: 'rogue_class_guardian_name',
                bonuses: [
                    t('guardian_bonus_ppc', { value: ((rogueClassBonuses.ppcMultiplier - 1) * 100).toFixed(0) }),
                    t('guardian_bonus_dmg', { value: ((rogueClassBonuses.diamondDamageMultiplier - 1) * 100).toFixed(0) }),
                    t('guardian_bonus_crit', { value: (rogueClassBonuses.critChanceBonus * 100).toFixed(0) }),
                ]
            };
        case 'alchemist':
            return {
                nameKey: 'rogue_class_alchemist_name',
                bonuses: [
                    t('alchemist_bonus_pps', { value: ((rogueClassBonuses.ppsMultiplier - 1) * 100).toFixed(0) }),
                    t('alchemist_bonus_dura', { value: ((rogueClassBonuses.bonusDurationMultiplier - 1) * 100).toFixed(0) }),
                    t('alchemist_bonus_off', { value: ((rogueClassBonuses.offlinePointsMultiplier - 1) * 100).toFixed(0) }),
                ]
            };
        case 'prospector':
             return {
                nameKey: 'rogue_class_prospector_name',
                bonuses: [
                    t('prospector_bonus_shard'),
                    t('prospector_bonus_points', { value: ((rogueClassBonuses.floatingRewardPointsMultiplier - 1) * 100).toFixed(0) }),
                ]
            };
        default:
            return null;
    }
  }, [rogueClass, rogueClassBonuses, t]);

  const pointsScalingFactor = useMemo(() => 1 + Math.log10(Math.max(1, stats.totalPointsEarned)) / 2, [stats.totalPointsEarned]);

  const prestigeBonuses = useMemo(() => {
    return Object.values(allPrestigeUpgrades).flat().reduce((acc, upg: PrestigeUpgrade) => {
      if (upg.level > 0) {
        acc[upg.id] = upg.getBonus(upg.level);
      }
      return acc;
    }, {} as Record<string, number>);
  }, [allPrestigeUpgrades]);
  
  const permanentCardBonuses = useMemo(() => {
      const bonuses = { ppcMultiplier: 0, ppsMultiplier: 0, comboThresholdReduction: 0, diamondDamageMultiplier: 0, critChanceBonus: 0, offlineGainsMultiplier: 0 };
      collectedCards.forEach(card => {
          if (card.type === 'PPC_MUL') bonuses.ppcMultiplier += card.value;
          if (card.type === 'PPS_MUL') bonuses.ppsMultiplier += card.value;
          if (card.type === 'COMBO_THRESHOLD_REDUCE') bonuses.comboThresholdReduction += card.value;
          if (card.type === 'DIAMOND_DAMAGE_MUL') bonuses.diamondDamageMultiplier += card.value;
          if (card.type === 'CRIT_CHANCE_BONUS') bonuses.critChanceBonus += card.value;
          if (card.type === 'OFFLINE_GAINS_MUL') bonuses.offlineGainsMultiplier += card.value;
      });
      return bonuses;
  }, [collectedCards]);
  
  const costReductionMultiplier = 1 - (prestigeBonuses.alchemist_cost_reduction || 0);

  const basePointsPerClick = useMemo(() => (upgrades.filter(u => u.type === 'ppc' && u.level > 0).reduce((sum, u) => sum + (u.value * u.level), 1)) * (1 + permanentCardBonuses.ppcMultiplier) * pointsScalingFactor * rogueClassBonuses.ppcMultiplier, [upgrades, permanentCardBonuses.ppcMultiplier, pointsScalingFactor, rogueClassBonuses]);
  
  const totalPpcBonus = (prestigeBonuses.guardian_ppc_bonus || 0);
  
  const basePointsPerSecond = useMemo(() => {
      const basePpsFromNormalUpgrades = upgrades.filter(u => u.type === 'pps' && u.level > 0).reduce((sum, u) => sum + (u.value * u.level), 0) * pointsScalingFactor;
      const ppsFromRelicResonance = upgrades.filter(u => u.type === 'pps_relic_scaled' && u.level > 0).reduce((sum, u) => sum + u.value * u.level * stats.relics, 0);

      return ((basePpsFromNormalUpgrades * (1 + permanentCardBonuses.ppsMultiplier)) + ppsFromRelicResonance) * rogueClassBonuses.ppsMultiplier;
  }, [upgrades, permanentCardBonuses.ppsMultiplier, stats.relics, pointsScalingFactor, rogueClassBonuses]);
  
  const isAdBonusActive = adBonusEndTime !== null && Date.now() < adBonusEndTime;
  
  const isShipUnlocked = useMemo(() => collectedCards.some(card => card.id === 'perm_pps_2'), [collectedCards]);

  const shipBonusPerSecond = useMemo(() => {
    if (isShipUnlocked && shipState.status === 'shooting') {
        return (basePointsPerSecond * SHIP_BONUS_PPS_MULTIPLIER) + (basePointsPerClick * 1);
    }
    return 0;
  }, [isShipUnlocked, shipState.status, basePointsPerSecond, basePointsPerClick]);

  const activeTempBonuses = useMemo(() => {
    const now = Date.now();
    const active = {
        critDamage: 0,
        isMidasTouch: false,
        ppsMultiplier: 1,
        ppcMultiplier: 1,
        floatingRewardMultiplier: 1,
        costReduction: 1,
        comboWindowMultiplier: 1,
    };
    activeBonuses.forEach(b => {
        if (b.expiresAt > now) {
            if (b.type === 'CRIT_DAMAGE_BOOST') active.critDamage += b.value;
            if (b.type === 'GOLDEN_CLICKS') active.isMidasTouch = true;
            if (b.type === 'PPS_BOOST') active.ppsMultiplier += b.value;
            if (b.type === 'FLOATING_REWARD_BONUS') active.floatingRewardMultiplier *= b.value;
            if (b.type === 'UPGRADE_COST_REDUCTION') active.costReduction *= (1 - b.value);
            if (b.type === 'COMBO_WINDOW_INCREASE') active.comboWindowMultiplier += b.value;
            if (b.type === 'PPC_BOOST') active.ppcMultiplier += b.value;
            if (b.type === 'PPC_REDUCTION') active.ppcMultiplier *= (1 - b.value);
        }
    });
    return active;
  }, [activeBonuses]);

  const pointsPerClick = useMemo(() => basePointsPerClick * (1 + totalPpcBonus) * activeTempBonuses.ppcMultiplier, [basePointsPerClick, totalPpcBonus, activeTempBonuses.ppcMultiplier]);

  const pointsPerSecond = useMemo(() => {
    const totalPpsBonus = (prestigeBonuses.alchemist_pps_bonus || 0);
    const ppsWithBonuses = basePointsPerSecond * (1 + totalPpsBonus);

    const synergyBoostUpg = prestigeUpgrades.find(u => u.id === 'alchemist_synergy_boost');
    const synergyMultiplier = 1 + (synergyBoostUpg ? synergyBoostUpg.getBonus(synergyBoostUpg.level) : 0);

    const synergyUpgrade = upgrades.find(u => u.type === 'pps_from_ppc');
    const synergyBonus = synergyUpgrade && synergyUpgrade.level > 0
        ? pointsPerClick * synergyUpgrade.value * synergyUpgrade.level * synergyMultiplier
        : 0;
    
    const adBonusAdjustedPps = (ppsWithBonuses + synergyBonus) * (isAdBonusActive ? AD_BONUS_MULTIPLIER : 1) * activeTempBonuses.ppsMultiplier;

    return adBonusAdjustedPps + shipBonusPerSecond;
  }, [basePointsPerSecond, prestigeBonuses, isAdBonusActive, shipBonusPerSecond, upgrades, pointsPerClick, prestigeUpgrades, activeTempBonuses.ppsMultiplier]);

  const relicsToGain = useMemo(() => {
      const baseRelics = Math.floor(Math.sqrt(stats.totalPointsEarned / 5e6));
      const relicGainBonus = 1 + (shopPurchases.relicBoostLevel * 0.05) + (prestigeBonuses.prospector_relic_gain || 0) + nextPrestigeRelicBonus;
      return Math.floor(baseRelics * relicGainBonus);
  }, [stats.totalPointsEarned, prestigeBonuses.prospector_relic_gain, shopPurchases.relicBoostLevel, nextPrestigeRelicBonus]);

  const activeSkillBonuses = useMemo(() => {
    return Object.values(allPrestigeUpgrades).flat()
        .filter((upg: PrestigeUpgrade) => upg.level > 0)
        .map((upg: PrestigeUpgrade) => {
            const bonusValue = upg.getBonus(upg.level);
            return {
                nameKey: upg.nameKey,
                bonusText: upg.formatBonus(bonusValue)
            };
        });
  }, [allPrestigeUpgrades]);

  const totalCostReductionMultiplier = useMemo(() => costReductionMultiplier * activeTempBonuses.costReduction, [costReductionMultiplier, activeTempBonuses.costReduction]);

  const formatNumber = useCallback((num: number): string => {
    if (num < 1000) return num.toFixed(0);
    const suffixes = ['', 'k', 'M', 'B', 'T', 'q', 'Q'];
    const i = Math.floor(Math.log10(num) / 3);
    if (i >= suffixes.length) return num.toExponential(2);
    return `${(num / Math.pow(1000, i)).toFixed(i > 0 ? 2 : 0)}${suffixes[i]}`;
  }, []);

  const dailyRewardInfo = useMemo(() => {
    const streak = stats.consecutiveDays;
    const baseReward = pointsPerSecond * 60; // 1 minute of PPS
    const multiplier = 1 + Math.min(streak, 30) * 0.2;
    const pointReward = Math.max(100, Math.floor(baseReward * multiplier));
    const relicReward = (streak + 1) % 7 === 0 ? Math.floor((streak + 1) / 7) : 0;
    return { pointReward, relicReward, multiplier, nextStreak: streak + 1 };
  }, [stats.consecutiveDays, pointsPerSecond]);
  
  const triggerToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastKey(k => k + 1);
  }, []);

  // --- Game Logic Functions ---
  const addSideNotification = useCallback((type: 'relic' | 'shard' | 'ship', quantity: number) => {
    setSideNotifications(current => [...current, { id: Date.now(), type, quantity }]);
  }, []);

  const handleRemoveSideNotification = useCallback((id: number) => {
      setSideNotifications(current => current.filter(n => n.id !== id));
  }, []);
  
  const addPoints = useCallback((amount: number) => {
    setPoints(prev => {
      const newTotal = prev + amount;
      setStats(s => ({...s, totalPointsEarned: s.totalPointsEarned + amount, highestPoints: Math.max(s.highestPoints, newTotal)}));
      return newTotal;
    });
  }, []);

  const trackDailyQuestProgress = useCallback((stat: DailyQuestStat, amount: number) => {
    setStats(s => ({ ...s, [stat]: (s[stat] || 0) + amount }));
    setActiveDailyQuests(quests => quests.map(q => {
        if (q.stat === stat && !q.completed) {
            const newProgress = q.progress + amount;
            const isCompleted = newProgress >= q.target;
            return { ...q, progress: newProgress, completed: isCompleted };
        }
        return q;
    }));
  }, []);

  const handleCompleteGenesis = useCallback(() => {
    setHasCompletedGenesis(true);
    addPoints(25);
    const newUpgrades = [...upgrades];
    newUpgrades[0] = {...newUpgrades[0], level: 1, cost: Math.floor(newUpgrades[0].baseCost * 1.18)};
    setUpgrades(newUpgrades);
    setStats(s => ({ ...s, upgradesPurchased: s.upgradesPurchased + 1, totalClicks: s.totalClicks + 10 }));
    setActiveModals(prev => ({ ...prev, genesisIntro: true }));
  }, [addPoints, upgrades]);
  
  const handleCloseGenesisIntro = useCallback(() => {
    setActiveModals(prev => ({ ...prev, genesisIntro: false }));
  }, []);

  const handleSelectRogueClass = useCallback((className: 'guardian' | 'alchemist' | 'prospector') => {
    setRogueClass(className);
    setHasChosenRogueClass(true);
    setActiveModals(prev => ({ ...prev, rogueClass: false }));
  }, []);

  const handleCorruptedDiamondBreak = useCallback(() => {
    const shardReward = 3 + Math.floor(stats.timesPrestiged / 5);
    setStats(s => ({ ...s, shards: (s.shards || 0) + shardReward }));
    triggerToast(t('corrupted_diamond_break_toast', { count: shardReward }));
    
    // Choose from a special 'rough' card pool
    const shuffled = roughCardPool.sort(() => 0.5 - Math.random());
    setActiveModals(prev => ({
        ...prev,
        cardSelection: {
            cards: shuffled.slice(0, 3),
            titleKey: 'rough_card_selection_title',
            descKey: 'rough_card_selection_desc',
        }
    }));
    
    // Reset the diamond to a normal one
    setDiamondCore(prev => ({ ...prev, isCorrupted: false }));
  }, [stats.timesPrestiged, t, triggerToast]);

  const handleDiamondBreak = useCallback((isAutoClick: boolean = false) => {
    setIsDiamondExploding(true);
    trackDailyQuestProgress('dailyDiamondsBroken', 1);

    if (diamondCore.isCorrupted) {
        setTimeout(() => {
            handleCorruptedDiamondBreak();
            setIsDiamondExploding(false);
        }, 300);
        return;
    }

    const performBreak = () => {
        const currentConfig = getDiamondConfig(diamondCore.level);
        let breakBonus = Math.floor(pointsPerSecond * currentConfig.bonusMultiplier + 100);

        const affinityUpgrade = upgrades.find(u => u.nameKey === 'upgrade_ppc_7_name');
        if (affinityUpgrade && affinityUpgrade.level > 0) {
            const affinityMultiplier = 1 + (affinityUpgrade.level * 0.02); // +2% per level
            breakBonus = Math.floor(breakBonus * affinityMultiplier);
        }

        addPoints(breakBonus);

        if ((prestigeBonuses.prospector_relic_hunter || 0) > 0 && Math.random() < prestigeBonuses.prospector_relic_hunter) {
            setStats(s => ({...s, relics: s.relics + 1, totalRelicsEarned: s.totalRelicsEarned + 1}));
            triggerToast(t('skill_relic_hunter_toast'));
        }
        
        const shardChanceMultiplier = 1 + (prestigeBonuses.prospector_shard_sense || 0);
        if (Math.random() < ((0.02 + rogueClassBonuses.diamondBreakShardChanceBonus) * shardChanceMultiplier)) {
            setStats(s => ({...s, shards: (s.shards || 0) + 1}));
            triggerToast(t('shard_drop_toast'));
        }

        const container = diamondContainerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const explosionX = rect.left + rect.width / 2;
            const explosionY = rect.top + rect.height / 2;
            setPointIndicators(current => [...current, { id: Date.now(), x: explosionX, y: explosionY - 40, value: `${t('diamond_break_bonus')} +${formatNumber(breakBonus)}`, type: 'bonus'}]);
        }
        
        setIsDiamondExploding(false);
        
        const collectedCardIds = new Set(collectedCards.map(c => c.id));
        const availableCards = cardPool.filter(card => {
            if (card.persistence !== 'permanent') {
                return true; // Always include instant and temporary cards
            }
            return !collectedCardIds.has(card.id); // Only include permanent cards if not already collected
        });

        const shuffled = availableCards.sort(() => 0.5 - Math.random());
        setActiveModals(prev => ({ 
            ...prev, 
            cardSelection: {
                cards: shuffled.slice(0, 3),
                titleKey: 'card_selection_title',
                descKey: 'card_selection_desc',
            } 
        }));
    };

    setTimeout(performBreak, 300);
  }, [addPoints, collectedCards, diamondCore.level, diamondCore.isCorrupted, formatNumber, prestigeBonuses, pointsPerSecond, t, triggerToast, upgrades, rogueClassBonuses, trackDailyQuestProgress, handleCorruptedDiamondBreak]);

  const handleAutoClick = useCallback(() => {
    if (isRiftEventActive || isDiamondExploding) return;

    let baseClickAmount = pointsPerClick;
    let isCriticalClick = false;
    const critChance = (prestigeBonuses.guardian_crit_chance || 0) + rogueClassBonuses.critChanceBonus + permanentCardBonuses.critChanceBonus;
    if (critChance > 0 && Math.random() < critChance) {
        const critDamageMultiplier = 10 * (1 + (prestigeBonuses.guardian_crit_damage || 0) + activeTempBonuses.critDamage);
        baseClickAmount *= critDamageMultiplier;
        isCriticalClick = true;
    }
    
    addPoints(baseClickAmount);
    setStats(s => ({ ...s, totalClicks: s.totalClicks + 1, manualPointsEarned: s.manualPointsEarned + baseClickAmount }));
    trackDailyQuestProgress('dailyClicks', 1);
    trackDailyQuestProgress('dailyManualPoints', baseClickAmount);
    
    setDiamondShaking(true);
    setTimeout(() => setDiamondShaking(false), 300);

    const baseDiamondDamage = 1 * (prestigeBonuses.guardian_diamond_damage || 1) * rogueClassBonuses.diamondDamageMultiplier * (1 + permanentCardBonuses.diamondDamageMultiplier);
    const finalDiamondDamage = isCriticalClick ? baseDiamondDamage * 10 : baseDiamondDamage;
    const newHp = diamondCore.currentHp - finalDiamondDamage;

    if (newHp <= 0) {
        handleDiamondBreak(true);
    } else {
        setDiamondCore(prev => ({ ...prev, currentHp: newHp }));
    }
  }, [isRiftEventActive, isDiamondExploding, pointsPerClick, prestigeBonuses, activeTempBonuses.critDamage, addPoints, diamondCore.currentHp, rogueClassBonuses, handleDiamondBreak, permanentCardBonuses, trackDailyQuestProgress]);
  

    const handlePixelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isRiftEventActive || isDiamondExploding) return;

        const now = Date.now();

        // 1. Determine effective tier for THIS click
        const effectiveTier = now < comboState.endTime ? comboState.tier : 0;
        const currentMultiplier = COMBO_CONFIG[effectiveTier].multiplier;

        // 2. Click amount calculation
        let baseClickAmount = pointsPerClick;
        let isCriticalClick = false;
        const critChance = (prestigeBonuses.guardian_crit_chance || 0) + rogueClassBonuses.critChanceBonus + permanentCardBonuses.critChanceBonus;
        if (critChance > 0 && Math.random() < critChance) {
            const critDamageMultiplier = 10 * (1 + (prestigeBonuses.guardian_crit_damage || 0) + activeTempBonuses.critDamage);
            baseClickAmount *= critDamageMultiplier;
            isCriticalClick = true;
        }

        let finalClickAmount = baseClickAmount * currentMultiplier;

        if (activeTempBonuses.isMidasTouch) {
            // Midas Touch bonus scales with total lifetime points earned
            const midasBonus = stats.totalPointsEarned * 0.000001; // 0.0001%
            finalClickAmount += midasBonus;
        }

        addPoints(finalClickAmount);
        setStats(s => ({ ...s, totalClicks: s.totalClicks + 1, manualPointsEarned: s.manualPointsEarned + finalClickAmount }));
        trackDailyQuestProgress('dailyClicks', 1);
        trackDailyQuestProgress('dailyManualPoints', finalClickAmount);
        
        const echoUpgrade = upgrades.find(u => u.nameKey === 'upgrade_ppc_6_name');
        if (echoUpgrade && echoUpgrade.level > 0) {
            const echoChance = echoUpgrade.level * 0.01;
            if (Math.random() < echoChance) {
                const echoAmount = pointsPerClick * 0.25;
                addPoints(echoAmount);
                setPointIndicators(current => [...current, { 
                    id: Date.now() + Math.random(),
                    x: e.clientX + (Math.random() * 40 - 20),
                    y: e.clientY + (Math.random() * 40 - 20),
                    value: `+${formatNumber(Math.floor(echoAmount))}`, 
                    type: 'echo'
                }]);
            }
        }
        
        // Add a chance to find a relic or shard on ANY click
        const dropRoll = Math.random();
        const shardChanceMultiplier = 1 + (prestigeBonuses.prospector_shard_sense || 0);
        if (dropRoll < (0.0001 * shardChanceMultiplier)) { // 0.01% chance for a shard
            setStats(s => ({ ...s, shards: (s.shards || 0) + 1 }));
            addSideNotification('shard', 1);
        } else if (dropRoll < 0.001) { // 0.1% chance for a relic
            setStats(s => ({ ...s, relics: s.relics + 1, totalRelicsEarned: s.totalRelicsEarned + 1}));
            addSideNotification('relic', 1);
        }

        const pointIndicatorType: PointIndicatorType['type'] = isCriticalClick ? 'crit'
            : (effectiveTier > 0 ? `combo${effectiveTier}` as 'combo1' | 'combo2' | 'combo3'
            : 'click');
        setPointIndicators(current => [...current, { id: Date.now(), x: e.clientX, y: e.clientY, value: `+${formatNumber(Math.floor(finalClickAmount))}`, type: pointIndicatorType }]);
        
        setDiamondShaking(true);
        setTimeout(() => setDiamondShaking(false), 300);

        const baseDiamondDamage = 1 * (prestigeBonuses.guardian_diamond_damage || 1) * rogueClassBonuses.diamondDamageMultiplier * (1 + permanentCardBonuses.diamondDamageMultiplier);
        const finalDiamondDamage = isCriticalClick ? baseDiamondDamage * 10 : baseDiamondDamage;
        const newHp = diamondCore.currentHp - finalDiamondDamage;

        if (newHp <= 0) {
            handleDiamondBreak();
        } else {
            setDiamondCore(prev => ({ ...prev, currentHp: newHp }));
        }

        // 3. Update combo state for NEXT clicks
        const comboDurationMultiplier = 1 + (prestigeBonuses.guardian_combo_master || 0);
        const updatedClicksInWindow = [...comboState.clicksInWindow, now].filter(t => now - t < (COMBO_CONFIG[1].window * activeTempBonuses.comboWindowMultiplier));
        
        for (let i = COMBO_CONFIG.length - 1; i > 0; i--) {
            const config = COMBO_CONFIG[i];
            const clicksForThisTier = updatedClicksInWindow.filter(t => now - t < (config.window * activeTempBonuses.comboWindowMultiplier));
            if (clicksForThisTier.length >= (config.threshold - permanentCardBonuses.comboThresholdReduction)) {
                if (i >= effectiveTier) {
                    setComboState({ tier: i, endTime: now + (config.duration * comboDurationMultiplier), clicksInWindow: clicksForThisTier });
                    return;
                }
            }
        }
        
        setComboState(prev => ({ ...prev, clicksInWindow: updatedClicksInWindow, tier: effectiveTier }));
        
  };

  const handleSelectCard = useCallback((card: Card) => {
    switch (card.persistence) {
        case 'instant':
            if (card.type === 'ADD_POINTS') {
                const pointValue = Math.max(1000, pointsPerSecond * card.value);
                addPoints(pointValue);
                triggerToast(`+${formatNumber(pointValue)} Points!`);
            }
            if (card.type === 'CONVERT_RELIC_TO_SHARD') {
                if (stats.relics >= 1) {
                    setStats(s => ({ ...s, relics: s.relics - 1, shards: (s.shards || 0) + card.value }));
                    triggerToast(t('alchemist_touch_success_toast'));
                } else {
                    triggerToast(t('alchemist_touch_fail_toast'));
                }
            }
            if (card.type === 'ADD_SHARDS') {
                setStats(s => ({ ...s, shards: (s.shards || 0) + card.value }));
                triggerToast(t('card_shard_cluster_toast', { count: card.value }));
            }
            if (card.type === 'NEXT_PRESTIGE_RELIC_BONUS') {
                setNextPrestigeRelicBonus(prev => prev + card.value);
                triggerToast(t('card_prospector_boon_toast', { value: card.value * 100 }));
            }
            if (card.type === 'SHARD_GAMBLE') {
                if (Math.random() < 0.5) {
                    setStats(s => ({ ...s, shards: (s.shards || 0) + 3 }));
                    triggerToast(t('shard_gamble_win_toast'));
                } else {
                    setStats(s => ({ ...s, shards: Math.max(0, (s.shards || 0) - 1) }));
                    triggerToast(t('shard_gamble_lose_toast'));
                }
            }
            break;
        case 'temporary':
            if (card.type === 'CRIT_DAMAGE_BOOST' || card.type === 'AUTO_CLICKER' || card.type === 'GOLDEN_CLICKS' || card.type === 'PPS_BOOST' || card.type === 'FLOATING_REWARD_BONUS' || card.type === 'UPGRADE_COST_REDUCTION' || card.type === 'COMBO_WINDOW_INCREASE' || card.type === 'PPC_BOOST') {
                if (card.duration) {
                    // FIX: TypeScript was unable to infer the narrowed type of `card.type` inside the `setActiveBonuses` callback.
                    // Creating the new bonus object here allows TypeScript to correctly assign the narrowed type.
                    const newBonus: ActiveBonus = {
                        type: card.type,
                        value: card.value,
                        expiresAt: Date.now() + (card.duration * 1000 * rogueClassBonuses.bonusDurationMultiplier),
                    };
                    setActiveBonuses(prev => [...prev, newBonus]);
                    triggerToast(`${t(card.nameKey)} activated!`);
                }
            } else if (card.type === 'UNSTABLE_PPS_BOOST' && card.duration) {
                const expiresAt = Date.now() + (card.duration * 1000 * rogueClassBonuses.bonusDurationMultiplier);
                const ppsBonus: ActiveBonus = { type: 'PPS_BOOST', value: card.value, expiresAt };
                const ppcReduction: ActiveBonus = { type: 'PPC_REDUCTION', value: 0.75, expiresAt };
                setActiveBonuses(prev => [...prev, ppsBonus, ppcReduction]);
                triggerToast(`${t(card.nameKey)} activated!`);
            }
            break;
        case 'permanent':
            setCollectedCards(prev => [...prev, card]);
            triggerToast(`${t(card.nameKey)} collected!`);
            break;
    }

    const cycle = Math.floor(diamondCore.level / getDiamondConfigCount());
    const nextLevel = diamondCore.level + 1;
    const nextConfig = getDiamondConfig(nextLevel);
    const newMaxHp = Math.floor(nextConfig.baseHp * Math.pow(1.8, cycle));
    setDiamondCore({ level: nextLevel, currentHp: newMaxHp, maxHp: newMaxHp, isCorrupted: false });
    
    setActiveModals(prev => ({ ...prev, cardSelection: null }));
  }, [addPoints, t, triggerToast, formatNumber, diamondCore.level, pointsPerSecond, stats.relics, rogueClassBonuses]);

  const handleBuyUpgrade = (index: number, buyMax = false) => {
    if (isRiftEventActive) return;

    let tempPoints = points;
    const newUpgrades = JSON.parse(JSON.stringify(upgrades));
    const upgrade = newUpgrades[index];
    let levelsPurchased = 0;
    let somethingWasBought = false;
    let totalCost = 0;

    do {
      const actualCost = Math.floor(upgrade.cost * totalCostReductionMultiplier);
      if (tempPoints >= actualCost) {
        tempPoints -= actualCost;
        totalCost += actualCost;
        upgrade.level++;
        upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.18, upgrade.level));
        levelsPurchased++;
        somethingWasBought = true;
      } else {
        break;
      }
    } while (buyMax);

    if (somethingWasBought) {
      setPoints(p => p - totalCost);
      setUpgrades(newUpgrades);
      setStats(s => ({ ...s, upgradesPurchased: s.upgradesPurchased + levelsPurchased }));
      trackDailyQuestProgress('dailyUpgradesPurchased', levelsPurchased);
    }
  };

  const calculateRetainCost = useCallback((level: number): number => {
    if (level <= 5) return 1;
    if (level <= 10) return 3;
    if (level <= 15) return 7;
    if (level <= 20) return 15;
    return Math.floor(Math.pow(2, Math.floor((level - 1) / 5) + 2) - 1);
  }, []);

  const handleSetRetainedLevel = useCallback((upgradeIndex: number, direction: 'increase' | 'decrease') => {
    const newUpgrades = [...upgrades];
    const upgrade = newUpgrades[upgradeIndex];
    
    if (direction === 'increase') {
        const cost = calculateRetainCost(upgrade.retainedLevel + 1);
        if ((stats.shards || 0) >= cost && upgrade.retainedLevel < upgrade.level) {
            setStats(s => ({ ...s, shards: s.shards - cost }));
            upgrade.retainedLevel++;
            setUpgrades(newUpgrades);
            triggerToast(t('upgrade_retain_success_toast', { level: upgrade.retainedLevel, upgradeName: t(upgrade.nameKey) }));
        }
    } else if (direction === 'decrease') {
        if (upgrade.retainedLevel > 0) {
            const refundAmount = calculateRetainCost(upgrade.retainedLevel);
            setStats(s => ({ ...s, shards: (s.shards || 0) + refundAmount }));
            upgrade.retainedLevel--;
            setUpgrades(newUpgrades);
            triggerToast(t('upgrade_retain_refund_toast', { shards: refundAmount }));
        }
    }
  }, [upgrades, stats.shards, calculateRetainCost, triggerToast, t]);

  const executeAutoBuyMax = useCallback(() => {
    if (isRiftEventActive) return;
    
    let tempPoints = points;
    const newUpgrades = JSON.parse(JSON.stringify(upgrades));
    let upgradesPurchasedThisTurn = 0;
    let somethingWasBought = false;
    let totalCost = 0;

    for (let i = 0; i < newUpgrades.length; i++) {
        const upgrade = newUpgrades[i];
        while (true) {
            const actualCost = Math.floor(upgrade.cost * totalCostReductionMultiplier);
            if (tempPoints >= actualCost) {
                tempPoints -= actualCost;
                totalCost += actualCost;
                upgrade.level++;
                upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.18, upgrade.level));
                upgradesPurchasedThisTurn++;
                somethingWasBought = true;
            } else {
                break;
            }
        }
    }

    if (somethingWasBought) {
        setPoints(p => p - totalCost);
        setUpgrades(newUpgrades);
        setStats(s => ({ ...s, upgradesPurchased: s.upgradesPurchased + upgradesPurchasedThisTurn }));
        trackDailyQuestProgress('dailyUpgradesPurchased', upgradesPurchasedThisTurn);
    }
  }, [points, upgrades, totalCostReductionMultiplier, isRiftEventActive, trackDailyQuestProgress]);

  const handleConfirmAutoBuy = () => {
    executeAutoBuyMax();
    setActiveModals(prev => ({ ...prev, autoBuyConfirm: false }));
  };
  
  const canAffordAnyUpgrade = useMemo(() => {
    return upgrades.some(upgrade => points >= Math.floor(upgrade.cost * totalCostReductionMultiplier));
  }, [points, upgrades, totalCostReductionMultiplier]);

  const handleClaimDailyReward = () => {
    const { pointReward, relicReward } = dailyRewardInfo;
    addPoints(pointReward);
    if (relicReward > 0) setStats(s => ({ ...s, relics: s.relics + relicReward, totalRelicsEarned: s.totalRelicsEarned + relicReward }));
    setStats(s => ({ ...s, dailyRewardsClaimed: s.dailyRewardsClaimed + 1, consecutiveDays: s.consecutiveDays + 1 }));
    setLastDailyReward(new Date().toISOString().split('T')[0]);
    setActiveModals(prev => ({ ...prev, dailyReward: false }));
    setDailyRewardReady(false);
  };
  
  const handleClaimFloatingReward = useCallback((reward: FloatingRewardType, x: number, y: number) => {
    if (isRiftEventActive) return;
    
    trackDailyQuestProgress('dailyFloatingRewardsClaimed', 1);
    let indicatorValue = ``;
    let toastParams: { [key: string]: string | number } = {};

    if (reward.type === 'shard') {
        setStats(s => ({...s, shards: (s.shards || 0) + 1}));
        indicatorValue = `+1 ${t('shard_name')}`;
        triggerToast(t('floating_reward_shard_toast'));
    } else {
        const finalValue = reward.value * activeTempBonuses.floatingRewardMultiplier;
        addPoints(finalValue);
        indicatorValue = `+${formatNumber(finalValue)}`;
        toastParams = { points: formatNumber(finalValue) };
        triggerToast(t(reward.type === 'jackpot' ? 'floating_reward_jackpot_toast' : 'floating_reward_claimed_toast', toastParams));
    }
    setPointIndicators(current => [...current, { id: Date.now(), x, y, value: indicatorValue, type: reward.type === 'shard' ? 'bonus' : (reward.type === 'jackpot' ? 'crit' : 'bonus') }]);
    setFloatingRewards(current => current.filter(r => r.id !== reward.id));
  }, [addPoints, formatNumber, t, triggerToast, isRiftEventActive, activeTempBonuses.floatingRewardMultiplier, trackDailyQuestProgress]);

  const handleClaimTimeBonus = useCallback(() => {
    if (timeBonusCooldown > 0 || isRiftEventActive) return;

    const pointReward = Math.max(500, pointsPerSecond * 60 * 3);
    addPoints(pointReward);
    triggerToast(t('time_bonus_claimed_toast', { points: formatNumber(pointReward) }));
    setStats(s => ({ ...s, timeBonusesClaimed: (s.timeBonusesClaimed || 0) + 1 }));
    const effectiveCooldown = TIME_BONUS_COOLDOWN * (1 - (shopPurchases.timeBonusReductionLevel * 0.1));
    setTimeBonusCooldown(effectiveCooldown);
    setLastTimeBonus(Date.now());
  }, [timeBonusCooldown, pointsPerSecond, addPoints, t, formatNumber, triggerToast, isRiftEventActive, shopPurchases.timeBonusReductionLevel]);

  const handleWatchAd = () => {
    if (isRiftEventActive) return;
    setActiveModals(prev => ({ ...prev, ad: true }));
  };

  const handleAdComplete = useCallback(() => {
    setActiveModals(prev => ({ ...prev, ad: false }));
    setAdBonusEndTime(Date.now() + (AD_BONUS_DURATION * 1000 * rogueClassBonuses.bonusDurationMultiplier));
    setAdBonusCooldownEndTime(Date.now() + AD_BONUS_COOLDOWN * 1000);
    setStats(s => ({ ...s, adsWatched: (s.adsWatched || 0) + 1 }));
    triggerToast(t('ad_bonus_toast'));
  }, [triggerToast, t, rogueClassBonuses]);

  const applyClaimedQuests = useCallback((quests: string[], timesPrestiged: number) => {
      let features = { ...initialUnlockedFeatures };
      const allQuests = initialQuestTiers.flatMap((t: QuestDefinition) => t.quests);
      quests.forEach(questId => {
          const quest = allQuests.find(q => q.id === questId);
          if (quest?.reward.type === 'unlock' && quest.reward.key) {
            const keys = Array.isArray(quest.reward.key) ? quest.reward.key : [quest.reward.key];
            keys.forEach(k => {
                (features as any)[k] = quest.reward.value;
            });
          }
      });
      if (timesPrestiged >= 2) features.expeditions = true;
      setUnlockedFeatures(features);
  }, []);

  const handlePrestige = () => {
    setActiveModals(prev => ({ ...prev, prestige: true }));
  };

  const confirmPrestige = useCallback(() => {
    if (relicsToGain <= 0) return;

    setActiveModals(prev => ({ ...prev, prestige: false }));
    setIsPrestigeAnimating(true);
    setTimeout(() => {
        const multiplierIncrease = 0.02 * relicsToGain;
        const newTimesPrestiged = stats.timesPrestiged + 1;

        const questsToPreserve = {
            claimed: [...claimedQuests],
            tiers: [...claimedTierRewards],
        };

        const oldUpgrades = [...upgrades];
        const startingUpgrades: Upgrade[] = JSON.parse(JSON.stringify(initialUpgradesData));
        startingUpgrades.forEach((upgrade: Upgrade, index: number) => {
            const retainedLevelFromShards = oldUpgrades[index]?.retainedLevel || 0;
            if (retainedLevelFromShards > 0) {
                upgrade.level = retainedLevelFromShards;
                upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.18, upgrade.level));
            }
            upgrade.retainedLevel = retainedLevelFromShards;
        });
        
        setPoints(0);
        setUpgrades(startingUpgrades);
        setDiamondCore(initialDiamondCore);
        setStats(s => ({
            ...initialStats,
            highestPoints: s.highestPoints,
            totalPointsEarned: s.totalPointsEarned,
            playTime: s.playTime,
            dailyRewardsClaimed: s.dailyRewardsClaimed,
            consecutiveDays: s.consecutiveDays,
            timeBonusesClaimed: s.timeBonusesClaimed,
            adsWatched: s.adsWatched,
            relics: s.relics + relicsToGain,
            shards: s.shards,
            totalRelicsEarned: s.totalRelicsEarned + relicsToGain,
            timesPrestiged: newTimesPrestiged,
            prestigeMultiplier: (s.prestigeMultiplier || 0) + multiplierIncrease,
        }));
        
        // Reset run-specific progress
        setHasOpenedShop(false);
        setExpeditions([]);
        setNpcs(initialNpcs);
        setActiveBonuses([]);
        setCollectedCards([]);
        setRogueClass(null);
        setHasChosenRogueClass(false);
        setNextPrestigeRelicBonus(0);
        // Daily quest progress will be reset by the daily reset handler on next load/tick

        // Restore preserved quests and re-evaluate unlocks
        setClaimedQuests(questsToPreserve.claimed);
        setClaimedTierRewards(questsToPreserve.tiers);
        setClaimableQuests([]);
        applyClaimedQuests(questsToPreserve.claimed, newTimesPrestiged);

        setIsPrestigeAnimating(false);
    }, 1000);
  }, [relicsToGain, stats, upgrades, claimedQuests, claimedTierRewards, applyClaimedQuests]);

  const handleBuyPrestigeUpgrade = useCallback((upgradeId: string) => {
    if (!rogueClass) return;

    const treeToUpdate = allPrestigeUpgrades[rogueClass];
    const upgradeIndex = treeToUpdate.findIndex(u => u.id === upgradeId);
    if (upgradeIndex === -1) return;
    
    const upgrade = treeToUpdate[upgradeIndex];
    const cost = upgrade.cost(upgrade.level);

    if (stats.relics >= cost && upgrade.level < upgrade.maxLevel) {
      if (upgrade.requires && upgrade.requires.some(reqId => { const reqUpg = treeToUpdate.find(u => u.id === reqId); return !reqUpg || reqUpg.level === 0; })) {
        triggerToast(t('skill_tooltip_requires'));
        return;
      }
        
      setStats(s => ({ ...s, relics: s.relics - cost }));
      
      const newTree = [...treeToUpdate];
      const newLevel = upgrade.level + 1;
      newTree[upgradeIndex] = { ...upgrade, level: newLevel };
      
      setAllPrestigeUpgrades(prev => ({
          ...prev,
          [rogueClass]: newTree
      }));

      triggerToast(t('prestige_upgrade_purchased_toast', { name: t(upgrade.nameKey), level: newLevel }));
      setJustPurchasedUpgradeId(upgradeId);
      setTimeout(() => setJustPurchasedUpgradeId(null), 500);
    }
  }, [rogueClass, allPrestigeUpgrades, stats.relics, t, triggerToast]);

  const handleOpenShop = () => {
    setActiveModals(prev => ({ ...prev, shop: true }));
    if (!hasOpenedShop) setHasOpenedShop(true);
  };

  const handleBuyShopItem = useCallback((itemId: string, cost: number) => {
    if ((stats.shards || 0) < cost) return;

    setStats(s => ({...s, shards: (s.shards || 0) - cost}));
    setShopPurchases(prev => {
        const newPurchases = {...prev};
        if (itemId === 'relicBoost') newPurchases.relicBoostLevel += 1;
        else if (itemId === 'timeBonusReduction') newPurchases.timeBonusReductionLevel += 1;
        else if (itemId === 'cosmic' && !newPurchases.unlockedCosmetics.includes('cosmic')) newPurchases.unlockedCosmetics = [...newPurchases.unlockedCosmetics, 'cosmic'];
        return newPurchases;
    });
  }, [stats.shards]);

  const handleApplyCosmetic = useCallback((cosmeticId: string | null) => setActiveCosmetic(cosmeticId), []);
  
  // --- Quest System ---
  const allQuestTiers: QuestTier[] = useMemo(() => initialQuestTiers.map((tier: QuestDefinition) => ({
      ...tier,
      quests: tier.quests.map(q => ({
          id: q.id,
          nameKey: q.nameKey,
          descKey: q.descKey,
          target: q.target,
          getValue: (stats: GameStats, points: number, upgrades: Upgrade[], diamondCore: DiamondCore, prestigeUpgrades: PrestigeUpgrade[]) => {
              const { type, key } = q.getValue;
              if (type === 'stats') return stats[key as keyof GameStats] as number || 0;
              if (type === 'diamond') return diamondCore[key as keyof DiamondCore] as number || 0;
              if (type === 'prestige') return prestigeUpgrades.reduce((acc, u) => acc + u.level, 0);
              if (type === 'base_ppc') return upgrades.filter(u => u.type === 'ppc').reduce((sum, u) => sum + (u.value * u.level), 1);
              if (type === 'base_pps') return upgrades.filter(u => u.type === 'pps').reduce((sum, u) => sum + (u.value * u.level), 0);
              return 0;
          },
          reward: () => {
              if (q.reward.type === 'unlock' && q.reward.key) {
                setUnlockedFeatures(prev => {
                    const newFeatures = { ...prev };
                    const keys = Array.isArray(q.reward.key) ? q.reward.key : [q.reward.key];
                    keys.forEach(k => {
                        (newFeatures as any)[k] = q.reward.value;
                    });
                    return newFeatures;
                });
              }
              const rewardValue = q.reward.value;
              if (q.reward.type === 'points' && typeof rewardValue === 'number') { addPoints(rewardValue); triggerToast(t('quest_reward_toast', { points: formatNumber(rewardValue) })); }
              if (q.reward.type === 'relics' && typeof rewardValue === 'number') { setStats(s => ({...s, relics: s.relics + rewardValue, totalRelicsEarned: s.totalRelicsEarned + rewardValue})); triggerToast(t('quest_reward_relics', { relics: rewardValue })); }
              if (q.reward.type === 'shards' && typeof rewardValue === 'number') { setStats(s => ({...s, shards: (s.shards || 0) + rewardValue})); triggerToast(t('quest_reward_shards', { shards: rewardValue })); }
          }
      }))
  })), [t, formatNumber, addPoints, triggerToast]);

  useEffect(() => {
    if (!isGameLoaded) return;
    const newlyClaimable = allQuestTiers.flatMap(t => t.quests).filter(q => !claimedQuests.includes(q.id) && !claimableQuests.includes(q.id) && q.getValue(stats, points, upgrades, diamondCore, prestigeUpgrades) >= q.target).map(q => q.id);
    if (newlyClaimable.length > 0) setClaimableQuests(prev => [...new Set([...prev, ...newlyClaimable])]);
  }, [stats, points, upgrades, diamondCore, prestigeUpgrades, isGameLoaded, allQuestTiers, claimedQuests, claimableQuests]);

  const questProgressMap = useMemo(() => {
    const map = new Map<string, { value: number; target: number }>();
    if (!isGameLoaded) return map;
    allQuestTiers.flatMap(t => t.quests).forEach(q => map.set(q.id, { value: q.getValue(stats, points, upgrades, diamondCore, prestigeUpgrades), target: q.target }));
    return map;
  }, [isGameLoaded, allQuestTiers, stats, points, upgrades, diamondCore, prestigeUpgrades]);

  const handleClaimQuestReward = (questId: string) => {
    const quest = allQuestTiers.flatMap(t => t.quests).find(q => q.id === questId);
    
    const questDef = initialQuestTiers.flatMap(tier => tier.quests).find(q => q.id === questId);
    
    if (quest && questDef && claimableQuests.includes(questId)) {
      const allQuestsFlat = allQuestTiers.flatMap(t => t.quests);
      const questIndex = allQuestsFlat.findIndex(q => q.id === questId);
      const rewardTier = Math.floor(questIndex / 13); // 13 quests per tier
      const basePoints = [1000, 50000, 1000000];
      const totalReward = Math.max(basePoints[rewardTier] || 100, Math.floor((pointsPerSecond * 60 * (1 + questIndex * 0.5)) + (100 * (questIndex + 1))));

      // Only give the big point reward if the quest isn't just an unlocker
      if (questDef.reward.type !== 'unlock') {
          addPoints(totalReward);
          triggerToast(t('quest_reward_toast', { points: formatNumber(totalReward) }));
      }
      quest.reward();

      if (quest.id === 'q1_10' && !hasSeenShopIntro) setActiveModals(prev => ({ ...prev, shopIntro: true }));
      if (quest.id === 'q1_13' && !hasSeenPrestigeIntro) setActiveModals(prev => ({ ...prev, prestigeIntro: true }));
      
      setClaimableQuests(prev => prev.filter(id => id !== questId));
      setClaimedQuests(prev => [...prev, questId]);
    }
  };

  const handleConfirmShopIntro = useCallback(() => {
    setHasSeenShopIntro(true);
    setActiveModals(prev => ({ ...prev, shopIntro: false }));
  }, []);
  
  const handleConfirmPrestigeIntro = useCallback(() => {
    setHasSeenPrestigeIntro(true);
    setActiveModals(prev => ({ ...prev, prestigeIntro: false }));
    if (!hasSeenRetainIntro) {
      setActiveModals(prev => ({ ...prev, retainIntro: true }));
    }
  }, [hasSeenRetainIntro]);

  const handleConfirmRetainIntro = useCallback(() => {
    setHasSeenRetainIntro(true);
    setActiveModals(prev => ({ ...prev, retainIntro: false }));
  }, []);

  const handleClaimTierReward = (tierId: number) => {
    if (claimedTierRewards.includes(tierId)) return;
    const rewards = [{p: 5, r: 1, s: 0}, {p: 30, r: 5, s: 2}, {p: 120, r: 15, s: 5}];
    const reward = rewards[tierId-1];
    if(!reward) return;

    const pointReward = Math.max(100, Math.floor(pointsPerSecond * 60 * reward.p));
    addPoints(pointReward);
    setStats(s => ({ ...s, relics: s.relics + reward.r, shards: (s.shards || 0) + reward.s, totalRelicsEarned: s.totalRelicsEarned + reward.r }));
    setClaimedTierRewards(prev => [...prev, tierId]);
    triggerToast(t('tier_reward_toast_both', { points: formatNumber(pointReward), relics: reward.r, shards: reward.s }));
  };

  const hasClaimableDailyQuests = useMemo(() => activeDailyQuests.some(q => q.completed && !q.claimed), [activeDailyQuests]);

  const hasClaimableRewards = useMemo(() => {
    if (claimableQuests.length > 0 || hasClaimableDailyQuests) return true;
    for (const tier of allQuestTiers) {
      if (!claimedTierRewards.includes(tier.tierId) && tier.quests.every(q => claimedQuests.includes(q.id) || claimableQuests.includes(q.id))) return true;
    }
    return false;
  }, [claimableQuests, claimedQuests, allQuestTiers, claimedTierRewards, hasClaimableDailyQuests]);

  // --- Locked Feature Logic ---
  const featureUnlockQuests: Record<string, {nameKey: string, type: 'quest' | 'prestige', value: string | number}> = {
    shop: { nameKey: 'shop_title', type: 'quest', value: 'q1_10' },
    expeditions: { nameKey: 'expedition_guild_title', type: 'prestige', value: 2 },
    prestige: { nameKey: 'prestige_hub_title', type: 'quest', value: 'q1_13' },
  };

  const handleLockedFeatureClick = (featureKey: keyof typeof featureUnlockQuests) => {
      const feature = featureUnlockQuests[featureKey];
      if (feature) {
          setActiveModals(prev => ({ ...prev, lockedFeature: feature }));
      }
  };

  const handleOpenShopClick = () => {
      if (unlockedFeatures.shop) {
          handleOpenShop();
      } else {
          handleLockedFeatureClick('shop');
      }
  };

  const handleOpenGuildClick = () => {
      if (unlockedFeatures.expeditions) {
          handleOpenExpeditions();
      } else {
          handleLockedFeatureClick('expeditions');
      }
  };

  const handlePrestigeClick = () => {
      if (unlockedFeatures.prestige) {
          handlePrestige();
      } else {
          handleLockedFeatureClick('prestige');
      }
  };

  // --- Expedition Logic ---
  const calculateXpForNextLevel = useCallback((level: number) => {
    return Math.floor(100 * Math.pow(level, 1.5));
  }, []);

  const handleOpenExpeditions = () => {
    setActiveModals(prev => ({ ...prev, expedition: true }));
    if (!hasOpenedExpeditions) {
      setHasOpenedExpeditions(true);
    }
  };

  const hasClaimableExpeditions = useMemo(() => {
    const now = Date.now();
    return expeditions.some(exp => now >= exp.endTime);
  }, [expeditions]);

  useEffect(() => {
    if (unlockedFeatures.expeditions && !hasSeenExpeditionIntro) {
        setActiveModals(prev => ({ ...prev, expeditionIntro: true }));
    }
  }, [unlockedFeatures.expeditions, hasSeenExpeditionIntro]);

  const handleStartExpedition = useCallback((npcId: string, locationId: string) => {
    const npc = npcs.find(n => n.id === npcId);
    const location = initialLocations.find(l => l.id === locationId);
    if (npc && npc.status === 'idle' && location) {
      const now = Date.now();
      const speedModifier = 1 - (npc.level - 1) * 0.05; // 5% faster per level > 1
      const durationInSeconds = location.duration * speedModifier;
      setExpeditions(prev => [...prev, { id: now, npcId, locationId, startTime: now, endTime: now + durationInSeconds * 1000 }]);
      setNpcs(prev => prev.map(n => n.id === npcId ? { ...n, status: 'onExpedition' } : n));
    }
  }, [npcs]);

  const handleClaimExpedition = useCallback((expeditionId: number) => {
    const expedition = expeditions.find(e => e.id === expeditionId);
    if (!expedition || expedition.endTime > Date.now()) return;
    
    const location = initialLocations.find(l => l.id === expedition.locationId);
    let npc = npcs.find(n => n.id === expedition.npcId);
    if (!location || !npc) return;

    // --- Grant Rewards ---
    const yieldModifier = 1 + (npc.level - 1) * 0.1; // 10% more yield
    const luckModifier = 1 + (npc.level - 1) * 0.05; // 5% more luck (applied to chance)
    const rewards: { materialId: string, quantity: number }[] = [];
    if (location.rewards.length > 0) {
        const guaranteedReward = location.rewards[0];
        const baseQuantity = Math.floor(Math.random() * (guaranteedReward.max - guaranteedReward.min + 1)) + guaranteedReward.min;
        const finalQuantity = Math.ceil(baseQuantity * yieldModifier);
        rewards.push({ materialId: guaranteedReward.materialId, quantity: finalQuantity });
        for (let i = 1; i < location.rewards.length; i++) {
            const rewardInfo = location.rewards[i];
            if (Math.random() < rewardInfo.chance * luckModifier) {
                const baseAddQuantity = Math.floor(Math.random() * (rewardInfo.max - rewardInfo.min + 1)) + rewardInfo.min;
                const finalAddQuantity = Math.ceil(baseAddQuantity * yieldModifier);
                rewards.push({ materialId: rewardInfo.materialId, quantity: finalAddQuantity });
            }
        }
    }

    if (rewards.length > 0) {
      setInventory(prev => {
        const newInv = [...prev];
        rewards.forEach(r => {
          const item = newInv.find(i => i.materialId === r.materialId);
          if (item) item.quantity += r.quantity;
          else newInv.push(r);
        });
        return newInv;
      });
      const rewardStr = rewards.map(r => `${r.quantity}x ${t(initialLocations.find(m => m.id === r.materialId)?.nameKey || '')}`).join(', ');
      triggerToast(t('expedition_rewards_toast', { rewards: rewardStr }));
    }

    // --- Grant XP and Handle Level Up ---
    const xpGained = Math.floor(location.duration / 60); // ~1 XP per minute
    let updatedNpc = { ...npc, currentXp: npc.currentXp + xpGained, status: 'idle' as 'idle' | 'onExpedition' };
    
    let leveledUp = false;
    while (updatedNpc.currentXp >= updatedNpc.xpToNextLevel) {
        leveledUp = true;
        updatedNpc.level += 1;
        updatedNpc.currentXp -= updatedNpc.xpToNextLevel;
        updatedNpc.xpToNextLevel = calculateXpForNextLevel(updatedNpc.level);
    }
    
    if (leveledUp) {
        triggerToast(t('scout_level_up_toast', { name: t(updatedNpc.nameKey), level: updatedNpc.level }));
    }

    setExpeditions(prev => prev.filter(e => e.id !== expeditionId));
    setNpcs(prev => prev.map(n => n.id === expedition.npcId ? updatedNpc : n));

  }, [expeditions, npcs, t, triggerToast, calculateXpForNextLevel]);

  const handleUpgradeNpc = useCallback((npcId: string) => {
    const npc = npcs.find(n => n.id === npcId);
    if (!npc || npc.level >= 10) return; // Max level 10 for now

    const costLevel = npc.level;
    const woodCost = 5 * Math.pow(costLevel, 1.5);
    const oreCost = 2 * Math.pow(costLevel, 1.5);

    const woodItem = inventory.find(i => i.materialId === 'magic_wood');
    const oreItem = inventory.find(i => i.materialId === 'iron_ore');

    if ((woodItem?.quantity || 0) >= woodCost && (oreItem?.quantity || 0) >= oreCost) {
        setInventory(prev => {
            const newInv = JSON.parse(JSON.stringify(prev));
            const wood = newInv.find((i: InventoryItem) => i.materialId === 'magic_wood');
            const ore = newInv.find((i: InventoryItem) => i.materialId === 'iron_ore');
            if(wood) wood.quantity -= woodCost;
            if(ore) ore.quantity -= oreCost;
            return newInv;
        });

        setNpcs(prev => prev.map(n => n.id === npcId ? { ...n, level: n.level + 1 } : n));
        triggerToast(t('scout_upgrade_toast', { name: t(npc.nameKey), level: npc.level + 1 }));
    }
  }, [npcs, inventory, t, triggerToast]);

  const handleConfirmExpeditionIntro = useCallback(() => {
    setHasSeenExpeditionIntro(true);
    setActiveModals(prev => ({ ...prev, expeditionIntro: false }));
  }, []);

  const isAutoClickerActive = useMemo(() => {
    return activeBonuses.some(b => b.type === 'AUTO_CLICKER' && b.expiresAt > Date.now());
  }, [activeBonuses]);

  // --- Daily Quest Logic ---
  const handleDailyReset = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (lastDailyQuestReset === today) return;

    setLastDailyQuestReset(today);
    setStats(s => ({
        ...s,
        dailyClicks: 0,
        dailyManualPoints: 0,
        dailyDiamondsBroken: 0,
        dailyUpgradesPurchased: 0,
        dailyFloatingRewardsClaimed: 0,
    }));
    
    // Select 3 unique quests
    const shuffled = [...dailyQuestsPool].sort(() => 0.5 - Math.random());
    const newQuests = shuffled.slice(0, 3).map((def): ActiveDailyQuest => {
        const currentStats = gameStateRef.current?.stats || initialStats;
        const currentPPS = pointsPerSecond; // Use current PPS, it will be available
        return {
            id: def.id,
            nameKey: def.nameKey,
            descKey: def.descKey,
            stat: def.stat,
            progress: 0,
            target: def.target(currentStats),
            reward: def.reward(currentStats, currentPPS),
            completed: false,
            claimed: false
        };
    });
    setActiveDailyQuests(newQuests);
  }, [lastDailyQuestReset, pointsPerSecond]);

  useEffect(() => {
    if (!isGameLoaded) return;
    handleDailyReset();
    const interval = setInterval(handleDailyReset, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [isGameLoaded, handleDailyReset]);
  
  const handleClaimDailyQuestReward = useCallback((questId: string) => {
    const quest = activeDailyQuests.find(q => q.id === questId);
    if (!quest || !quest.completed || quest.claimed) return;

    // Grant reward
    if (quest.reward.type === 'points') addPoints(quest.reward.value);
    if (quest.reward.type === 'relics') setStats(s => ({ ...s, relics: s.relics + quest.reward.value, totalRelicsEarned: s.totalRelicsEarned + quest.reward.value }));
    if (quest.reward.type === 'shards') setStats(s => ({ ...s, shards: (s.shards || 0) + quest.reward.value }));
    
    triggerToast(`+${formatNumber(quest.reward.value)} ${quest.reward.type}`);

    // Mark as claimed
    setActiveDailyQuests(quests => quests.map(q => q.id === questId ? { ...q, claimed: true } : q));
  }, [activeDailyQuests, addPoints, formatNumber, triggerToast]);

  // --- Game Loop and Timers ---
  // This is the main game loop for passive income and cooldowns.
  useEffect(() => {
    if (!isGameLoaded || !hasCompletedGenesis || isGamePaused) return;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      
      if (pointsPerSecond > 0 && !isRiftEventActive) {
        addPoints(pointsPerSecond / 10);
      }
      
      setStats(s => ({ ...s, playTime: s.playTime + 0.1 }));
      setTimeBonusCooldown(prev => Math.max(0, prev - 0.1));
      if (adBonusEndTime && now > adBonusEndTime) {
        setAdBonusEndTime(null);
      }
      if (activeBonuses.some(b => b.expiresAt < now)) {
        setActiveBonuses(prev => prev.filter(b => b.expiresAt >= now));
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [isGameLoaded, hasCompletedGenesis, isGamePaused, isRiftEventActive, pointsPerSecond, addPoints, adBonusEndTime, activeBonuses]);
  
  // Alchemist Capstone: Perpetual Motion
  useEffect(() => {
    const perpetualMotionUpg = prestigeUpgrades.find(u => u.id === 'alchemist_capstone');
    const hasCapstone = perpetualMotionUpg && perpetualMotionUpg.level > 0;

    if (!isGameLoaded || !hasCompletedGenesis || !isGamePaused || !hasCapstone) return;
    
    const modalIncomeLoop = setInterval(() => {
        const bonus = perpetualMotionUpg.getBonus(perpetualMotionUpg.level); // should be 0.10
        if (pointsPerSecond > 0 && !isRiftEventActive) {
            addPoints((pointsPerSecond * bonus) / 10); // divide by 10 for 100ms interval
        }
    }, 100);

    return () => clearInterval(modalIncomeLoop);
  }, [isGameLoaded, hasCompletedGenesis, isGamePaused, prestigeUpgrades, pointsPerSecond, addPoints, isRiftEventActive]);

  // Support Ship Cycle Manager
  useEffect(() => {
    if (!isShipUnlocked || isGamePaused) return;

    const shipLoop = setInterval(() => {
        const now = Date.now();
        if (now >= shipState.cycleEndTime) {
            setShipState(prev => {
                if (prev.status === 'shooting') {
                    return { status: 'cooldown', cycleEndTime: now + SHIP_COOLDOWN_DURATION };
                } else {
                    const shipBonusForNotification = (basePointsPerSecond * SHIP_BONUS_PPS_MULTIPLIER) + (basePointsPerClick * 1);
                    addSideNotification('ship', Math.floor(shipBonusForNotification));
                    return { status: 'shooting', cycleEndTime: now + SHIP_SHOOT_DURATION };
                }
            });
        }
    }, 1000);

    return () => clearInterval(shipLoop);
  }, [isShipUnlocked, isGamePaused, shipState.cycleEndTime, basePointsPerSecond, addSideNotification, basePointsPerClick]);


  // Auto-clicker loop
  useEffect(() => {
    if (!isAutoClickerActive || isGamePaused) return;

    const autoClickerLoop = setInterval(() => {
        handleAutoClick();
    }, 100); // 10 clicks per second

    return () => clearInterval(autoClickerLoop);
  }, [isAutoClickerActive, isGamePaused, handleAutoClick]);


  // This handles the point drain during a rift event, independent of the pause state.
  useEffect(() => {
    if (!isRiftEventActive) {
      setPointsDrainedPerSecond(0);
      return;
    }

    const drainInterval = setInterval(() => {
      setPoints(p => {
        // Calculate drain based on the most recent points value 'p'
        const drainPerTick = ((basePointsPerSecond * 0.5) + (p * 0.001)) * anomalies.length / 10;
        if (drainPerTick > 0) {
          return Math.max(0, p - drainPerTick);
        }
        return p;
      });
    }, 100);

    return () => clearInterval(drainInterval);
  }, [isRiftEventActive, basePointsPerSecond, anomalies]);
  
  // This effect is just for updating the display of points drained per second.
  // It runs whenever points change during an event.
  useEffect(() => {
      if (isRiftEventActive) {
          const currentDrainPerSecond = ((basePointsPerSecond * 0.5) + (points * 0.001)) * anomalies.length;
          setPointsDrainedPerSecond(currentDrainPerSecond);
      }
  }, [points, isRiftEventActive, basePointsPerSecond, anomalies]);
  
  const spawnFloatingReward = useCallback(() => {
    if (!hasSeenFloatingRewardIntro) {
        setActiveModals(prev => ({ ...prev, floatingRewardIntro: true }));
        return;
    }
    if (floatingRewards.length >= MAX_FLOATING_REWARDS) return;

    const shardChanceMultiplier = 1 + (prestigeBonuses.prospector_shard_sense || 0);
    const jackpotChanceUpg = prestigeUpgrades.find(u => u.id === 'prospector_jackpot_chance');
    const jackpotChanceBonus = jackpotChanceUpg ? jackpotChanceUpg.getBonus(jackpotChanceUpg.level) : 0;
    
    const shardChance = (0.005 + rogueClassBonuses.floatingRewardShardChanceBonus) * shardChanceMultiplier;
    const jackpotChance = 0.015 + jackpotChanceBonus; // Base 1.5% + skill bonus

    const rand = Math.random();
    let type: FloatingRewardType['type'] = 'points';
    if (rand < shardChance) {
        type = 'shard';
    } else if (rand < shardChance + jackpotChance) {
        type = 'jackpot';
    }
    
    let value = 0;
    if (type === 'shard') {
        value = 1;
    } else {
        const baseValue = (pointsPerSecond * 10) + (stats.totalPointsEarned * 0.00001);
        value = Math.floor((type === 'jackpot' ? baseValue * 5 : baseValue) * rogueClassBonuses.floatingRewardPointsMultiplier);
    }
    
    const newReward: FloatingRewardType = { id: Date.now(), x: 10 + Math.random() * 80, y: 10 + Math.random() * 80, value, type };
    setFloatingRewards(current => [...current, newReward]);
    setTimeout(() => setFloatingRewards(prev => prev.filter(r => r.id !== newReward.id)), FLOATING_REWARD_LIFETIME);
  }, [pointsPerSecond, stats.totalPointsEarned, hasSeenFloatingRewardIntro, floatingRewards.length, rogueClassBonuses, prestigeUpgrades, prestigeBonuses]);

  const spawnFloatingRewardRef = useRef(spawnFloatingReward);
  useEffect(() => {
    spawnFloatingRewardRef.current = spawnFloatingReward;
  }, [spawnFloatingReward]);

  const handleConfirmFloatingRewardIntro = useCallback(() => {
    setHasSeenFloatingRewardIntro(true);
    setActiveModals(prev => ({ ...prev, floatingRewardIntro: false }));
    setTimeout(() => {
      spawnFloatingRewardRef.current();
    }, 0);
  }, []);

  // Floating reward spawner
  useEffect(() => {
    if (!isGameLoaded || !hasCompletedGenesis) return;
    const scheduleNextSpawn = () => {
      if (floatingRewardSpawnerRef.current) clearTimeout(floatingRewardSpawnerRef.current);
      const nextTime = Math.random() * (FLOATING_REWARD_MAX_INTERVAL - FLOATING_REWARD_MIN_INTERVAL) + FLOATING_REWARD_MIN_INTERVAL;
      floatingRewardSpawnerRef.current = setTimeout(() => {
        if (!modalsOpenRef.current && !isRiftEventActive) spawnFloatingReward();
        scheduleNextSpawn();
      }, nextTime);
    };
    scheduleNextSpawn();
    return () => { if (floatingRewardSpawnerRef.current) clearTimeout(floatingRewardSpawnerRef.current) };
  }, [spawnFloatingReward, isRiftEventActive, isGameLoaded, hasCompletedGenesis]);
  
  // --- Rift Event Logic ---
  const handleFireProjectile = useCallback((startX: number, startY: number) => {
    if (!diamondContainerRef.current) return;
    
    const crystalRect = diamondContainerRef.current.getBoundingClientRect();
    const endX = crystalRect.left + crystalRect.width / 2;
    const endY = crystalRect.top + crystalRect.height / 2;

    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const duration = distance / 300; // Adjust speed by changing divisor

    const newProjectile: RiftProjectileType = {
        id: Date.now() + Math.random(),
        startX,
        startY,
        endX,
        endY,
        duration
    };
    setProjectiles(current => [...current, newProjectile]);
  }, []);

  const handleProjectileComplete = useCallback((id: number) => {
      setProjectiles(current => current.filter(p => p.id !== id));
      setIsCrystalHit(true);
      setTimeout(() => setIsCrystalHit(false), 200); // Duration of the hit-flash animation
  }, []);
  
  const endRiftEvent = useCallback(() => {
    if (riftEventDurationRef.current) clearTimeout(riftEventDurationRef.current);
    riftEventDurationRef.current = null;
    setRiftEventActive(false);
    setPointsDrainedPerSecond(0);
    setRiftEventTimeLeft(null); 
    setAnomalies(current => current.map(g => ({ ...g, disappearing: true })));
    setProjectiles([]);
    setTimeout(() => setAnomalies([]), 1000);
  }, []);
  
  const handleAnomalyClick = useCallback((id: number) => {
    setAnomalies(current => {
        const remaining = current.filter(g => g.id !== id);
        if (remaining.length === 0) endRiftEvent();
        return remaining;
    });
  }, [endRiftEvent]);

  const startRiftEvent = useCallback(() => {
    if (isRiftEventActive) return;
    if (!hasSeenRiftIntro) {
        setActiveModals(prev => ({ ...prev, riftIntro: true }));
        return;
    }
    setRiftEventActive(true);
    setRiftEventTimeLeft(RIFT_EVENT_DURATION / 1000);
    setAnomalies(Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, i) => ({ id: Date.now() + i, x: 10 + Math.random() * 80, y: 10 + Math.random() * 80, animationType: (i % 4) + 1 })));
    riftEventDurationRef.current = setTimeout(endRiftEvent, RIFT_EVENT_DURATION);
  }, [isRiftEventActive, endRiftEvent, hasSeenRiftIntro]);
  
  const startRiftEventRef = useRef(startRiftEvent);
  useEffect(() => {
    startRiftEventRef.current = startRiftEvent;
  }, [startRiftEvent]);

  const handleConfirmRiftIntro = useCallback(() => {
    setHasSeenRiftIntro(true);
    setActiveModals(prev => ({ ...prev, riftIntro: false }));
    setTimeout(() => {
      startRiftEventRef.current();
    }, 0);
  }, []);

  const triggerManualRiftEvent = useCallback(() => {
    if (isRiftEventActive) return;
    if (riftEventTimerRef.current) clearTimeout(riftEventTimerRef.current);
    setActiveModals(prev => ({ ...prev, testPanel: false }));
    setTimeout(startRiftEvent, 0);
  }, [isRiftEventActive, startRiftEvent]);
  
  // Auto-close interfering modals when a rift event starts
  useEffect(() => {
      if (isRiftEventActive) {
          setActiveModals(prev => ({ 
              ...prev, 
              statsPanel: false, 
              settings: false, 
              profile: false, 
              questLog: false, 
              shop: false, 
              expedition: false, 
              testPanel: false 
          }));
      }
  }, [isRiftEventActive]);

  useEffect(() => {
    // The rift event timer runs independently of the game's paused state
    // to allow it to interrupt gameplay (e.g., when a modal is open).
    if (isGameLoaded && !isRiftEventActive && hasCompletedGenesis) {
      const nextTime = Math.random() * (RIFT_EVENT_MAX_COOLDOWN - RIFT_EVENT_MIN_COOLDOWN) + RIFT_EVENT_MIN_COOLDOWN;
      riftEventTimerRef.current = setTimeout(startRiftEvent, nextTime);
    }
    
    // The cleanup function is crucial. It runs when any dependency changes,
    // ensuring the old timer is cleared before a new one is potentially set.
    return () => {
      if (riftEventTimerRef.current) {
        clearTimeout(riftEventTimerRef.current);
        riftEventTimerRef.current = null;
      }
    };
  }, [isGameLoaded, isRiftEventActive, hasCompletedGenesis, startRiftEvent]);
  
  useEffect(() => {
    if (!isRiftEventActive || riftEventTimeLeft === null || riftEventTimeLeft <= 0) return;
    const timerId = setInterval(() => setRiftEventTimeLeft(prev => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearInterval(timerId);
  }, [isRiftEventActive, riftEventTimeLeft]);

  // Combo progress bar
  useEffect(() => {
    const activeTier = Date.now() < comboState.endTime ? comboState.tier : 0;
    if (activeTier === 0) {
        if(comboProgress !== 0) setComboProgress(0);
        return;
    }
    const config = COMBO_CONFIG[activeTier];

    const updateProgress = () => {
      const now = Date.now();
      const timeLeft = comboState.endTime - now;
      if (timeLeft <= 0) {
          setComboProgress(0);
          if (comboState.tier > 0) {
             setComboState({ tier: 0, endTime: 0, clicksInWindow: [] });
          }
          return;
      }
      const percentage = (timeLeft / config.duration) * 100;
      setComboProgress(percentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 50);
    return () => clearInterval(interval);
  }, [comboState.tier, comboState.endTime, comboProgress]);

  // --- Test Panel Functions ---
    const handleTestTriggerRelicDrop = useCallback(() => {
        setStats(s => ({ ...s, relics: s.relics + 1, totalRelicsEarned: s.totalRelicsEarned + 1 }));
        addSideNotification('relic', 1);
        triggerToast(t('test_trigger_relic_drop_toast'));
    }, [addSideNotification, triggerToast, t]);

    const handleTestTriggerShardDrop = useCallback(() => {
        setStats(s => ({ ...s, shards: (s.shards || 0) + 1 }));
        addSideNotification('shard', 1);
        triggerToast(t('test_trigger_shard_drop_toast'));
    }, [addSideNotification, triggerToast, t]);

    const handleTestAddRetainedLevels = useCallback(() => {
        setUpgrades(currentUpgrades => 
            currentUpgrades.map(upg => ({
                ...upg,
                retainedLevel: upg.retainedLevel + 10
            }))
        );
        triggerToast(t('test_add_retained_levels_toast'));
    }, [triggerToast, t]);

    const handleTestAddExpeditionMaterials = useCallback(() => {
        setInventory(prev => {
            const newInv = [...prev];
            
            const wood = newInv.find(i => i.materialId === 'magic_wood');
            if (wood) wood.quantity += 100;
            else newInv.push({ materialId: 'magic_wood', quantity: 100 });
            
            const ore = newInv.find(i => i.materialId === 'iron_ore');
            if (ore) ore.quantity += 50;
            else newInv.push({ materialId: 'iron_ore', quantity: 50 });

            return newInv;
        });
        triggerToast(t('test_add_expedition_materials_toast'));
    }, [triggerToast, t]);

    const handleTestResetIntros = useCallback(() => {
        setHasSeenFloatingRewardIntro(false);
        setHasSeenRiftIntro(false);
        setHasSeenShopIntro(false);
        setHasSeenExpeditionIntro(false);
        setHasSeenPrestigeIntro(false);
        setHasSeenRetainIntro(false);
        setHasChosenRogueClass(false); // Also reset rogue class choice
        triggerToast(t('test_reset_intro_modals_toast'));
    }, [triggerToast, t]);

    const handleTestDestroyDiamond = useCallback(() => {
        handleDiamondBreak(true);
        triggerToast(t('test_destroy_diamond_toast'));
    }, [handleDiamondBreak, triggerToast, t]);
    
    const handleTestResetDailyQuests = useCallback(() => {
        setLastDailyQuestReset(null);
        handleDailyReset(); // Force reset
        triggerToast(t('test_reset_daily_quests_toast'));
    }, [handleDailyReset, triggerToast, t]);

    const handleTestCompleteDailyQuests = useCallback(() => {
        setActiveDailyQuests(quests => quests.map(q => ({ ...q, progress: q.target, completed: true })));
        triggerToast(t('test_complete_daily_quests_toast'));
    }, [triggerToast, t]);

  const handleTestTriggerCorruptedDiamond = useCallback(() => {
    if (diamondCore.isCorrupted) return;
    setDiamondCore(prev => ({ ...prev, isCorrupted: true }));
    triggerToast(t('corrupted_diamond_appeared_toast'));
  }, [diamondCore.isCorrupted, triggerToast, t]);

  // --- Save/Load Logic ---
  const saveGameState = useCallback(() => {
    if (!user || !isGameLoaded) return;
    setSaveState('saving');
    const currentState = gameStateRef.current;
    if (!currentState) return;
    const stateToSave: GameState = { ...currentState, stats: { ...currentState.stats, lastSaveTimestamp: Date.now() } };
    localStorage.setItem(`idleGame_save_${user.uid}`, JSON.stringify(stateToSave));
    setTimeout(() => setSaveState('saved'), 500);
    setTimeout(() => setSaveState('idle'), 1500);
  }, [user, isGameLoaded]);

  const resetGameState = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(`idleGame_save_${user.uid}`);
    setPoints(0); setDisplayPoints(0); setUpgrades(JSON.parse(JSON.stringify(initialUpgradesData))); setStats({ ...initialStats, prestigeMultiplier: 0 }); setAllPrestigeUpgrades(deepCopyPrestigeTrees()); setDiamondCore(initialDiamondCore); setLastDailyReward(null); setLastTimeBonus(null); setTimeBonusCooldown(TIME_BONUS_COOLDOWN); setAdBonusEndTime(null); setAdBonusCooldownEndTime(null); setFloatingRewards([]); setPointIndicators([]); setClaimableQuests([]); setClaimedQuests([]); setClaimedTierRewards([]); setHasCompletedGenesis(false); setShopPurchases(initialShopPurchases); setActiveCosmetic(null); setHasSeenRiftIntro(false); setHasSeenFloatingRewardIntro(false); setHasSeenShopIntro(false); setHasOpenedShop(false); setInventory([]); setInventoryCapacity(INITIAL_INVENTORY_CAPACITY); setNpcs(initialNpcs); setExpeditions([]); setHasSeenExpeditionIntro(false); setHasOpenedExpeditions(false); setHasSeenPrestigeIntro(false); setHasSeenRetainIntro(false); setRogueClass(null); setHasChosenRogueClass(false); setActiveBonuses([]); setCollectedCards([]); setNextPrestigeRelicBonus(0);
    setActiveDailyQuests([]); setLastDailyQuestReset(null);
    applyClaimedQuests([], 0);
  }, [user, applyClaimedQuests]);

  const loadGameState = useCallback(() => {
    if (!user) return;
    try {
        const savedStateJSON = localStorage.getItem(`idleGame_save_${user.uid}`);
        if (savedStateJSON) {
            const savedState: GameState = JSON.parse(savedStateJSON);

            if (typeof savedState.points !== 'number' || !savedState.upgrades || !savedState.stats) {
                throw new Error("Invalid save file structure.");
            }
            
            const mergedUpgrades = initialUpgradesData.map(initialUpg => {
                const savedUpg = savedState.upgrades.find(su => su.nameKey === initialUpg.nameKey);
                return savedUpg ? { ...initialUpg, level: savedUpg.level, cost: savedUpg.cost, retainedLevel: savedUpg.retainedLevel || 0 } : initialUpg;
            });

            const newAllPrestigeUpgrades: {[key: string]: PrestigeUpgrade[]} = {};
            for (const className in prestigeTrees) {
                newAllPrestigeUpgrades[className] = prestigeTrees[className].map(initialUpg => {
                    let foundLevel = initialUpg.level; // Default to 0 from data file
        
                    // Look for saved level in the new format
                    const savedTree = savedState.allPrestigeUpgrades ? savedState.allPrestigeUpgrades[className] : undefined;
                    const savedUpg = savedTree ? savedTree.find(su => su.id === initialUpg.id) : undefined;
                    if (savedUpg) {
                        foundLevel = savedUpg.level;
                    }
                    
                    // Backwards compatibility for old save format
                    else if ((savedState as any).prestigeUpgrades && savedState.rogueClass === className) {
                        const legacySavedUpg = ((savedState as any).prestigeUpgrades as any).find((su: any) => su.id === initialUpg.id);
                        if (legacySavedUpg) {
                            foundLevel = legacySavedUpg.level;
                        }
                    }

                    return { ...initialUpg, level: foundLevel };
                });
            }
            setAllPrestigeUpgrades(newAllPrestigeUpgrades);
            
            let prestigeMultiplierBonus = savedState.stats.prestigeMultiplier || 0;
            if (prestigeMultiplierBonus >= 1) { // Migration for old save files
                prestigeMultiplierBonus = prestigeMultiplierBonus - 1;
            }
            const loadedStats = { ...initialStats, ...savedState.stats, prestigeMultiplier: prestigeMultiplierBonus };
            
            setPoints(savedState.points);
            setDisplayPoints(savedState.points);
            setUpgrades(mergedUpgrades);
            setStats(loadedStats);

            setLastDailyReward(savedState.lastDailyReward || null);
            setLastTimeBonus(savedState.lastTimeBonus || null);
            setAdBonusEndTime(savedState.adBonusEndTime || null);
            setAdBonusCooldownEndTime(savedState.adBonusCooldownEndTime || null);
            setDiamondCore(savedState.diamondCore || initialDiamondCore);

            const allClaimed = [...(savedState.claimedQuests || []), ...(savedState.completedQuests || [])];
            setClaimedQuests([...new Set(allClaimed)]);
            
            setClaimableQuests(savedState.claimableQuests || []);
            setClaimedTierRewards(savedState.claimedTierRewards || []);
            setHasCompletedGenesis(savedState.hasCompletedGenesis || false);

            setShopPurchases(savedState.shopPurchases || initialShopPurchases);
            setActiveCosmetic(savedState.activeCosmetic || null);
            setHasSeenRiftIntro(savedState.hasSeenRiftIntro || false);
            setHasSeenFloatingRewardIntro(savedState.hasSeenFloatingRewardIntro || false);
            setHasSeenShopIntro(savedState.hasSeenShopIntro || false);
            setHasOpenedShop(savedState.hasOpenedShop || false);
            setHasSeenPrestigeIntro(savedState.hasSeenPrestigeIntro || false);
            setHasSeenRetainIntro(savedState.hasSeenRetainIntro || false);
            setRogueClass(savedState.rogueClass || null);
            setHasChosenRogueClass(savedState.hasChosenRogueClass || false);
            setNextPrestigeRelicBonus(savedState.nextPrestigeRelicBonus || 0);
            
            setLastDailyQuestReset(savedState.lastDailyQuestReset || null);
            setActiveDailyQuests(savedState.activeDailyQuests || []);

            const now = Date.now();
            setActiveBonuses((savedState.activeBonuses || []).filter(b => b.expiresAt > now));
            setCollectedCards(savedState.collectedCards || []);

            setInventory(savedState.inventory || []);
            setInventoryCapacity(savedState.inventoryCapacity || INITIAL_INVENTORY_CAPACITY);
            setNpcs(savedState.npcs || initialNpcs);
            setExpeditions(savedState.expeditions || []);
            setHasSeenExpeditionIntro(savedState.hasSeenExpeditionIntro || false);
            setHasOpenedExpeditions(savedState.hasOpenedExpeditions || false);
            
            applyClaimedQuests([...new Set(allClaimed)], savedState.stats.timesPrestiged || 0);
            
            if (savedState.stats.lastSaveTimestamp) {
                const activePrestigeTree = savedState.rogueClass ? newAllPrestigeUpgrades[savedState.rogueClass] : [];
                const offlineBonusPrestigeFromSave = activePrestigeTree.find(u => u.id.includes('offline_bonus'));
                const maxOfflineTime = offlineBonusPrestigeFromSave ? offlineBonusPrestigeFromSave.getBonus(offlineBonusPrestigeFromSave.level) * 1000 : (2 * 3600 * 1000);
                
                const timeOffline = Math.min(Date.now() - savedState.stats.lastSaveTimestamp, maxOfflineTime);
                
                if (timeOffline > 0) {
                    const loadedCollectedCards = savedState.collectedCards || [];
                    const cardBonuses = { ppcMultiplier: 0, ppsMultiplier: 0, offlineGainsMultiplier: 0 };
                    loadedCollectedCards.forEach(card => {
                        if (card.type === 'PPC_MUL') cardBonuses.ppcMultiplier += card.value;
                        if (card.type === 'PPS_MUL') cardBonuses.ppsMultiplier += card.value;
                        if (card.type === 'OFFLINE_GAINS_MUL') cardBonuses.offlineGainsMultiplier += card.value;
                    });

                    const basePpsFromSave = (mergedUpgrades.filter(u => u.type === 'pps' && u.level > 0).reduce((sum, u) => sum + (u.value * u.level), 0)) * (1 + cardBonuses.ppsMultiplier);
                    
                    const ppsBonusUpg = activePrestigeTree.find(u => u.id.includes('pps_bonus'));
                    const prestigePpsBonus = ppsBonusUpg ? ppsBonusUpg.getBonus(ppsBonusUpg.level) : 0;
                    
                    const ppsFromSave = basePpsFromSave * (1 + prestigePpsBonus + (loadedStats.prestigeMultiplier || 0));

                    if (ppsFromSave > 0) {
                        let pointsGained = Math.floor(ppsFromSave * (timeOffline / 1000));
                        if (savedState.rogueClass === 'alchemist') {
                            pointsGained = Math.floor(pointsGained * 1.2);
                        }
                        pointsGained *= (1 + cardBonuses.offlineGainsMultiplier);
                        if (pointsGained > 0) {
                            addPoints(pointsGained);
                            setOfflineGains(pointsGained);
                        }
                    }
                }
            }

        } else {
             applyClaimedQuests([], 0);
        }
    } catch (e) {
        console.error("Failed to load or parse saved state, resetting.", e);
        resetGameState();
    } finally {
        setIsGameLoaded(true);
    }
  }, [user, resetGameState, applyClaimedQuests, addPoints, formatNumber]);

  // Load game state on user change
  useEffect(() => {
    setIsGameLoaded(false);
    loadGameState();
  }, [user, loadGameState]);

  // Save game state periodically
  useEffect(() => {
    if (!isGameLoaded) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(saveGameState, SAVE_DEBOUNCE_TIME);
  }, [points, upgrades, stats, allPrestigeUpgrades, diamondCore, claimableQuests, claimedQuests, claimedTierRewards, isGameLoaded, saveGameState, shopPurchases, activeCosmetic, hasSeenRiftIntro, hasSeenFloatingRewardIntro, hasSeenShopIntro, hasOpenedShop, inventory, inventoryCapacity, npcs, expeditions, hasSeenExpeditionIntro, hasOpenedExpeditions, hasSeenPrestigeIntro, hasSeenRetainIntro, rogueClass, hasChosenRogueClass, activeBonuses, collectedCards, nextPrestigeRelicBonus, activeDailyQuests, lastDailyQuestReset]);
  
  // Save on exit
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user && isGameLoaded) {
          const currentState = gameStateRef.current;
          if (!currentState) return;
          const stateToSave: GameState = { ...currentState, stats: { ...currentState.stats, lastSaveTimestamp: Date.now() } };
          localStorage.setItem(`idleGame_save_${user.uid}`, JSON.stringify(stateToSave));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user, isGameLoaded]);

  const formatCooldown = useCallback((totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const adBonusCooldownLeft = useMemo(() => {
      if (!adBonusCooldownEndTime) return 0;
      const timeLeft = (adBonusCooldownEndTime - Date.now()) / 1000;
      return Math.max(0, timeLeft);
  }, [adBonusCooldownEndTime]);

  // Ad Bonus Timer
  useEffect(() => {
      if (!isAdBonusActive || !adBonusEndTime) {
          return;
      }

      const updateTimer = () => {
          const timeLeftSeconds = Math.max(0, (adBonusEndTime - Date.now()) / 1000);
          setAdBonusTimeLeftFormatted(formatCooldown(timeLeftSeconds));
      };
      
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
  }, [isAdBonusActive, adBonusEndTime, formatCooldown]);

  // Active Card Bonus Timers
  useEffect(() => {
    if (activeBonuses.length === 0) {
        if (Object.keys(bonusTimers).length > 0) setBonusTimers({});
        return;
    }

    const interval = setInterval(() => {
        const now = Date.now();
        const newTimers: Record<string, string> = {};
        
        activeBonuses.forEach((bonus, index) => {
            const timeLeftSeconds = Math.max(0, (bonus.expiresAt - now) / 1000);
            if (timeLeftSeconds > 0) {
                newTimers[`${bonus.type}-${index}`] = formatCooldown(timeLeftSeconds);
            }
        });

        setBonusTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeBonuses, formatCooldown, bonusTimers]);

  // Delayed HP for visual effect
  useEffect(() => {
    const hpPercent = (diamondCore.currentHp / diamondCore.maxHp) * 100;
    const timeoutId = setTimeout(() => {
        setDelayedHpPercentage(hpPercent);
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [diamondCore.currentHp, diamondCore.maxHp]);
  
  const shouldShopIconGlow = unlockedFeatures.shop && !hasOpenedShop;
  const shouldGuildIconGlow = unlockedFeatures.expeditions && !hasOpenedExpeditions;


  if (!isGameLoaded) {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
             <LoadingSpinner />
        </div>
    );
  }
  
  if (hasCompletedGenesis && !hasChosenRogueClass) {
    return (
        <div className={`w-screen h-screen flex flex-col font-pixel text-white bg-transparent`}>
            <RogueClassSelectionModal isOpen={true} onSelectClass={handleSelectRogueClass} />
        </div>
    );
  }

  const diamondConfig = getDiamondConfig(diamondCore.level);
  const activeComboTier = Date.now() < comboState.endTime ? comboState.tier : 0;
  const comboConfig = COMBO_CONFIG[activeComboTier];
  const multiplierIncrease = 0.02 * relicsToGain;

  return (
    <div className={`w-screen h-screen flex flex-col font-pixel text-white bg-transparent`}>
        
        {!hasCompletedGenesis ? (
            <GenesisDiamond onComplete={handleCompleteGenesis} />
        ) : (
            <>
                {/* NEW Points Bar */}
                <div className="pixel-box w-full max-w-7xl mx-auto p-2 sm:p-4 mt-4 text-center">
                    <p className="text-sm text-gray-400 mb-2">{t('points_name')}</p>
                    <p className={`text-4xl sm:text-5xl text-yellow-300 text-shadow-hard truncate ${isRiftEventActive ? 'score-blinking' : ''}`} title={displayPoints.toLocaleString()}>
                        {formatNumber(displayPoints)}
                    </p>
                </div>

                <Header
                    relics={stats.relics}
                    shards={stats.shards || 0}
                    formatNumber={formatNumber}
                    onOpenStats={() => setActiveModals(prev => ({...prev, statsPanel: true}))}
                    onOpenQuests={() => setActiveModals(prev => ({...prev, questLog: true}))}
                    onOpenShop={handleOpenShopClick}
                    isShopUnlocked={unlockedFeatures.shop}
                    onOpenGuild={handleOpenGuildClick}
                    isGuildUnlocked={unlockedFeatures.expeditions}
                    onOpenSettings={() => setActiveModals(prev => ({...prev, settings: true}))}
                    hasClaimableRewards={hasClaimableRewards}
                    shouldShopIconGlow={shouldShopIconGlow}
                    shouldGuildIconGlow={shouldGuildIconGlow}
                    hasClaimableExpeditions={hasClaimableExpeditions}
                    isRiftEventActive={isRiftEventActive}
                />

                <main className="flex-grow md:grid md:grid-cols-5 gap-4 px-4 pb-4 min-h-0 overflow-y-auto">
                    {/* Game Area */}
                    <section className="order-1 p-4 flex flex-col items-center md:col-span-3 relative min-h-0">
                        {/* Top Info Bar */}
                        <div className="w-full flex justify-between items-start">
                            {/* Diamond Name & Level */}
                            <div className="text-left">
                                <p className="text-lg text-gray-400 text-shadow-hard">{t(diamondConfig.nameKey)}</p>
                                <p className="text-2xl text-yellow-300 text-shadow-hard">{t('diamond_level_label')} {diamondCore.level}</p>
                                
                                <div className="pixel-box bg-gray-900/50 p-2 text-sm flex justify-start gap-4 items-center mt-2">
                                    <div className="flex items-baseline gap-2 whitespace-nowrap">
                                        <span className="text-gray-400">{t('ppc_short')}:</span>
                                        <span className="text-white font-bold">{formatNumber(basePointsPerClick)}</span>
                                        <span className="text-cyan-400 font-bold">({formatNumber(pointsPerClick)})</span>
                                    </div>
                                    <div className="flex items-baseline gap-2 whitespace-nowrap">
                                        <span className="text-gray-400">{t('pps_short')}:</span>
                                        <span className="text-white font-bold">{formatNumber(basePointsPerSecond)}</span>
                                        <span className="text-cyan-400 font-bold">({formatNumber(pointsPerSecond)})</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-2 mt-2">
                                    <button
                                        onClick={() => setActiveModals(prev => ({...prev, cardJournal: true}))}
                                        aria-label={t('card_journal_button_aria')}
                                        disabled={isRiftEventActive}
                                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <JournalIcon className="h-8 w-8" />
                                    </button>
                                    {hasChosenRogueClass && (
                                        <button
                                            onClick={() => setIsPathPanelVisible(prev => !prev)}
                                            aria-label={t('toggle_path_panel_aria')}
                                            disabled={isRiftEventActive}
                                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <PathIcon className="h-8 w-8 text-yellow-600 hover:text-yellow-500" />
                                        </button>
                                    )}
                                </div>


                                {isPathPanelVisible && hasChosenRogueClass && rogueClassDetails && (
                                    <div className="mt-4 pixel-box bg-gray-900/50 p-2 text-xs w-full max-w-xs">
                                        <h3 className="text-center text-sm text-yellow-300 text-shadow-hard mb-1">{t('active_path_title')}</h3>
                                        <p className="text-center font-bold text-white mb-2">{t(rogueClassDetails.nameKey)}</p>
                                        <ul className="space-y-1 text-gray-300">
                                            {rogueClassDetails.bonuses.map((bonus, i) => <li key={`base-${i}`} className="flex items-center"><span className="text-yellow-400 mr-2 text-base">◆</span>{bonus}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="absolute top-4 right-4">
                            {/* Combo Indicator */}
                            {activeComboTier > 0 && (
                                 <div 
                                    className="combo-indicator"
                                    style={{
                                        '--combo-color': comboConfig.colors.main,
                                        '--combo-color-light': comboConfig.colors.light,
                                    } as React.CSSProperties}
                                    onClick={handlePixelClick}
                                >
                                    <div className="flex-grow"></div>
                                    <div className="combo-content">
                                        <p className="combo-text">
                                            {t(comboConfig.nameKey)} x{comboConfig.multiplier.toFixed(1)}
                                        </p>
                                        <div className="combo-timer-bg">
                                            <div className="combo-timer-bar" style={{ width: `${comboProgress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Clicker Zone */}
                        <div ref={diamondContainerRef} className="w-full flex-grow flex items-center justify-center clicker-zone" onClick={handlePixelClick} aria-disabled={isRiftEventActive} role="button" aria-label="Click the diamond">
                            <div className="diamond-wrapper-main">
                                {isShipUnlocked && <SupportShip state={shipState.status} />}
                                <div className="diamond-wrapper-inner">
                                    <DynamicDiamond 
                                        level={diamondCore.level} 
                                        hpPercentage={(diamondCore.currentHp / diamondCore.maxHp) * 100} 
                                        isShaking={isDiamondShaking} 
                                        isExploding={isDiamondExploding} 
                                        isHit={isCrystalHit}
                                        isCorrupted={diamondCore.isCorrupted} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Health Bar */}
                        <div className="w-[90%] max-w-md mt-4">
                            <div className="flex justify-between items-baseline text-sm mb-1">
                                <span className="text-gray-300 font-bold text-shadow-hard">{t('diamond_health')}</span>
                                <span className="text-white font-bold text-shadow-hard">{formatNumber(diamondCore.currentHp)} / {formatNumber(diamondCore.maxHp)}</span>
                            </div>
                            <div className="w-full health-bar-bg">
                                <div className="h-full bg-red-700 rounded-md" style={{ width: `${(diamondCore.currentHp / diamondCore.maxHp) * 100}%`, transition: 'width 0.1s linear' }}>
                                    <div className="h-full bg-red-500 rounded-md" style={{ width: `${delayedHpPercentage}%`, transition: 'width 0.2s ease-out' }}></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-[90%] max-w-md mt-2 flex flex-col items-center gap-2">
                            {/* Active Prestige Bonuses Panel */}
                            {((stats.prestigeMultiplier && stats.prestigeMultiplier > 0) || activeSkillBonuses.length > 0) && (
                                <div className="pixel-box bg-gray-900/50 p-2 text-xs w-full">
                                    <h3 className="text-center text-sm text-purple-300 text-shadow-hard mb-1">{t('prestige_bonus_label')}</h3>
                                    <div className="space-y-1">
                                        {(stats.prestigeMultiplier && stats.prestigeMultiplier > 0) &&
                                            <div className="flex justify-between items-center text-left">
                                                <span className="text-yellow-400">{t('prestige_multiplier_label')}</span>
                                                <span className="font-bold text-white">+{((stats.prestigeMultiplier) * 100).toFixed(2)}%</span>
                                            </div>
                                        }
                                        {activeSkillBonuses.map((skill, i) => (
                                            <div key={i} className="flex justify-between items-center text-left">
                                               <span className="text-gray-300">{t(skill.nameKey)}</span>
                                               <span className="font-bold text-green-400">{skill.bonusText}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Bonuses on Next Prestige Panel */}
                            {unlockedFeatures.prestige && relicsToGain > 0 && (
                                <div className="w-full pixel-box bg-gray-900/50 p-2 text-xs">
                                    <h3 className="text-center text-sm text-purple-300 text-shadow-hard mb-1">{t('prestige_next_bonus_label')}</h3>
                                    <div className="text-center space-y-1">
                                        <p className="text-yellow-400">{t('prestige_relics_to_gain')}: <span className="text-white font-bold">+{relicsToGain.toLocaleString()}</span></p>
                                        <p className="text-yellow-400">{t('prestige_multiplier_gain_label')} <span className="text-white font-bold">+{((multiplierIncrease) * 100).toFixed(2)}%</span></p>
                                    </div>
                                    <p className="text-center text-gray-500 text-xs mt-1">{t('prestige_next_bonus_clarification')}</p>
                                </div>
                            )}
                        </div>
                    </section>
                    
                    <UpgradePanel
                        upgrades={upgrades}
                        unlockedFeatures={unlockedFeatures}
                        prestigeBonuses={prestigeBonuses}
                        points={points}
                        shards={stats.shards || 0}
                        onBuyUpgrade={handleBuyUpgrade}
                        onSetRetainedLevel={handleSetRetainedLevel}
                        calculateRetainCost={calculateRetainCost}
                        onAutoBuyMax={() => setActiveModals(prev => ({ ...prev, autoBuyConfirm: true }))}
                        canAffordAnyUpgrade={canAffordAnyUpgrade}
                        isRiftEventActive={isRiftEventActive}
                        timeBonusCooldown={timeBonusCooldown}
                        onClaimTimeBonus={handleClaimTimeBonus}
                        shopPurchases={shopPurchases}
                        isAdBonusActive={isAdBonusActive}
                        adBonusCooldownLeft={adBonusCooldownLeft}
                        onWatchAd={handleWatchAd}
                        formatCooldown={formatCooldown}
                        relicsToGain={relicsToGain}
                        onPrestige={handlePrestigeClick}
                    />
                </main>
                
                {/* Modals */}
                {modalRoot && createPortal(
                    <>
                        {activeModals.statsPanel && <StatsPanel isOpen={activeModals.statsPanel} onClose={() => setActiveModals(prev => ({...prev, statsPanel: false}))} stats={stats} pointsPerClick={pointsPerClick} pointsPerSecond={pointsPerSecond} formatNumber={formatNumber} />}
                        {dailyRewardReady && <DailyRewardModal isOpen={dailyRewardReady} onClaim={handleClaimDailyReward} rewardInfo={dailyRewardInfo} />}
                        {activeModals.profile && <ProfileModal isOpen={activeModals.profile} onClose={() => setActiveModals(prev => ({...prev, profile: false}))} />}
                        {activeModals.prestige && <PrestigeModal isOpen={activeModals.prestige} onClose={() => setActiveModals(prev => ({...prev, prestige: false}))} onConfirm={confirmPrestige} relicsToGain={relicsToGain} currentRelics={stats.relics} currentShards={stats.shards || 0} allTrees={allPrestigeUpgrades} activeTreeState={prestigeUpgrades} rogueClass={rogueClass} onBuyUpgrade={handleBuyPrestigeUpgrade} justPurchasedUpgradeId={justPurchasedUpgradeId} timesPrestiged={stats.timesPrestiged} prestigeMultiplier={stats.prestigeMultiplier} multiplierIncrease={multiplierIncrease} />}
                        {activeModals.autoBuyConfirm && <AutoBuyConfirmModal isOpen={activeModals.autoBuyConfirm} onConfirm={handleConfirmAutoBuy} onClose={() => setActiveModals(prev => ({...prev, autoBuyConfirm: false}))} />}
                        {activeModals.questLog && <QuestLogModal isOpen={activeModals.questLog} onClose={() => setActiveModals(prev => ({...prev, questLog: false}))} allQuestTiers={allQuestTiers} claimableQuests={claimableQuests} claimedQuests={claimedQuests} questProgressMap={questProgressMap} onClaimTierReward={handleClaimTierReward} claimedTierRewards={claimedTierRewards} onClaimQuestReward={handleClaimQuestReward} activeDailyQuests={activeDailyQuests} onClaimDailyQuestReward={handleClaimDailyQuestReward} lastDailyQuestReset={lastDailyQuestReset} formatNumber={formatNumber} />}
                        {activeModals.settings && <SettingsModal isOpen={activeModals.settings} onClose={() => setActiveModals(prev => ({...prev, settings: false}))} onOpenProfileModal={() => setActiveModals(prev => ({...prev, profile: true}))} onOpenTestPanel={() => setActiveModals(prev => ({...prev, testPanel: true}))} />}
                        {activeModals.testPanel && <TestPanel
                            isOpen={activeModals.testPanel}
                            onClose={() => setActiveModals(prev => ({...prev, testPanel: false}))}
                            onAddPoints={addPoints}
                            onAddRelics={(amt) => setStats(s => ({ ...s, relics: s.relics + amt, totalRelicsEarned: s.totalRelicsEarned + amt }))}
                            onAddShards={(amt) => setStats(s => ({ ...s, shards: (s.shards || 0) + amt }))}
                            onTriggerDaily={() => setDailyRewardReady(true)}
                            onTriggerTimeBonus={() => setTimeBonusCooldown(0)}
                            onTriggerAdBonus={handleAdComplete}
                            onSpawnFloatingReward={spawnFloatingReward}
                            onTriggerRiftEvent={triggerManualRiftEvent}
                            onResetGame={resetGameState}
                            onUnlockPrestige={() => {
                                applyClaimedQuests(allQuestTiers.flatMap(t => t.quests.map(q => q.id)), 2);
                                triggerToast(t('test_unlock_prestige_toast'));
                            }}
                            onCompleteExpeditions={() => {
                                setExpeditions(current => current.map(e => ({...e, endTime: Date.now() - 1})));
                                triggerToast(t('test_complete_expeditions_toast'));
                            }}
                            onTriggerRelicDrop={handleTestTriggerRelicDrop}
                            onTriggerShardDrop={handleTestTriggerShardDrop}
                            onAddRetainedLevels={handleTestAddRetainedLevels}
                            onAddExpeditionMaterials={handleTestAddExpeditionMaterials}
                            onResetIntros={handleTestResetIntros}
                            onTestDestroyDiamond={handleTestDestroyDiamond}
                            onResetDailyQuests={handleTestResetDailyQuests}
                            onCompleteDailyQuests={handleTestCompleteDailyQuests}
                            onTriggerCorruptedDiamond={handleTestTriggerCorruptedDiamond}
                        />}
                        {activeModals.ad && <AdModal isOpen={activeModals.ad} onComplete={handleAdComplete} />}
                        {activeModals.genesisIntro && <GenesisIntroModal isOpen={activeModals.genesisIntro} onClose={handleCloseGenesisIntro} pointsReward={25} upgradeName={t('upgrade_ppc_1_name')} />}
                        {offlineGains !== null && <OfflineGainsModal isOpen={offlineGains !== null} onClose={() => setOfflineGains(null)} pointsGained={offlineGains} formatNumber={formatNumber} />}
                        {activeModals.cardSelection && <CardSelectionModal isOpen={!!activeModals.cardSelection} cards={activeModals.cardSelection.cards} onSelectCard={handleSelectCard} titleKey={activeModals.cardSelection.titleKey} descKey={activeModals.cardSelection.descKey} />}
                        {activeModals.cardJournal && <CardJournalModal isOpen={activeModals.cardJournal} onClose={() => setActiveModals(prev => ({...prev, cardJournal: false}))} cards={collectedCards} />}
                        {activeModals.riftIntro && <RiftIntroModal isOpen={activeModals.riftIntro} onConfirm={handleConfirmRiftIntro} />}
                        {activeModals.floatingRewardIntro && <FloatingRewardIntroModal isOpen={activeModals.floatingRewardIntro} onConfirm={handleConfirmFloatingRewardIntro} />}
                        {activeModals.shopIntro && <ShopIntroModal isOpen={activeModals.shopIntro} onConfirm={handleConfirmShopIntro} />}
                        {activeModals.prestigeIntro && <PrestigeIntroModal isOpen={activeModals.prestigeIntro} onConfirm={handleConfirmPrestigeIntro} />}
                        {activeModals.retainIntro && <RetainIntroModal isOpen={activeModals.retainIntro} onConfirm={handleConfirmRetainIntro} />}
                        {activeModals.lockedFeature && <LockedFeatureModal
                            featureName={t(activeModals.lockedFeature.nameKey)}
                            unlockDescription={
                                activeModals.lockedFeature.type === 'quest'
                                ? t('locked_feature_desc_quest', { condition: t(allQuestTiers.flatMap(t => t.quests).find(q => q.id === activeModals.lockedFeature!.value)?.nameKey || '') })
                                : t('locked_feature_desc_prestige', { count: activeModals.lockedFeature.value as number })
                            }
                            onClose={() => setActiveModals(prev => ({ ...prev, lockedFeature: null }))}
                        />}
                        {activeModals.shop && <ShopModal isOpen={activeModals.shop} onClose={() => setActiveModals(prev => ({...prev, shop: false}))} shards={stats.shards || 0} shopPurchases={shopPurchases} onBuyItem={handleBuyShopItem} onApplyCosmetic={handleApplyCosmetic} activeCosmetic={activeCosmetic} />}
                        {activeModals.expedition && <ExpeditionModal isOpen={activeModals.expedition} onClose={() => setActiveModals(prev => ({...prev, expedition: false}))} npcs={npcs} locations={initialLocations} expeditions={expeditions} inventory={inventory} inventoryCapacity={inventoryCapacity} onStartExpedition={handleStartExpedition} onClaimExpedition={handleClaimExpedition} onUpgradeNpc={handleUpgradeNpc} />}
                        {activeModals.expeditionIntro && <ExpeditionIntroModal isOpen={activeModals.expeditionIntro} onConfirm={handleConfirmExpeditionIntro} />}
                    </>
                , modalRoot)}
                
                {/* Non-Portal UI */}
                <ToastNotification message={toastMessage} key={toastKey} />
                {floatingRewards.map(reward => <FloatingReward key={reward.id} reward={reward} onClick={handleClaimFloatingReward} />)}
                {pointIndicators.map(indicator => <PointIndicator key={indicator.id} indicator={indicator} onComplete={() => setPointIndicators(current => current.filter(i => i.id !== indicator.id))} />)}
                {anomalies.map(anomaly => <Anomaly key={anomaly.id} anomaly={anomaly} onClick={(id, x, y) => {
                    handleAnomalyClick(id);
                    setPointIndicators(current => [...current, { id: Date.now(), x, y, value: `stabilized!`, type: 'bonus' }]);
                }} onFire={handleFireProjectile} />)}
                {projectiles.map(proj => <RiftProjectile key={proj.id} projectile={proj} onComplete={handleProjectileComplete} />)}
                {sideNotifications.map(notification => (
                    <SideNotification key={notification.id} notification={notification} onComplete={handleRemoveSideNotification} />
                ))}
                <ActiveBonusesDisplay bonuses={activeBonuses} timers={bonusTimers} />

                {isRiftEventActive && (
                    <div className="rift-overlay">
                        <div className="rift-vignette"></div>
                        <div className="rift-timer">{t('rift_event_timer_label', { time: riftEventTimeLeft })}</div>
                        <div className="rift-drain-indicator">-{formatNumber(pointsDrainedPerSecond)}/s</div>
                    </div>
                )}
                {isPrestigeAnimating && <PrestigeAnimationOverlay isAnimating={isPrestigeAnimating} />}
            </>
        )}
    </div>
  );
};

export default App;