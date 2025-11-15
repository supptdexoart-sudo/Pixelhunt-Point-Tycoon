import { PrestigeUpgrade } from '../types';

type PrestigeTrees = {
    [key: string]: PrestigeUpgrade[];
};

export const prestigeTrees: PrestigeTrees = {
    guardian: [
        {
            id: 'guardian_ppc_bonus', nameKey: 'prestige_upgrade_ppc_name', descKey: 'prestige_upgrade_ppc_desc', maxLevel: 20, level: 0,
            path: 'guardian',
            cost: level => 1 + level,
            getBonus: level => level * 0.1, // +10% PPC per level
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% PPC`,
            position: { x: 50, y: 15 },
        },
        {
            id: 'guardian_crit_chance', nameKey: 'skill_crit_click_name', descKey: 'skill_crit_click_desc', maxLevel: 10, level: 0,
            path: 'guardian',
            requires: ['guardian_ppc_bonus'],
            cost: level => 3 + level * 2,
            getBonus: level => level * 0.005, // +0.5% crit chance per level
            formatBonus: bonus => `${(bonus * 100).toFixed(1)}% Crit Chance`,
            position: { x: 30, y: 40 },
        },
        {
            id: 'guardian_diamond_damage', nameKey: 'skill_diamond_damage_name', descKey: 'skill_diamond_damage_desc', maxLevel: 10, level: 0,
            path: 'guardian',
            requires: ['guardian_ppc_bonus'],
            cost: level => 2 + level,
            getBonus: level => 1 + level * 1, // +100% click damage to diamond HP per level
            formatBonus: bonus => `+${((bonus - 1) * 100).toFixed(0)}% Diamond Damage`,
            position: { x: 70, y: 40 },
        },
        {
            id: 'guardian_crit_damage', nameKey: 'skill_crit_damage_name', descKey: 'skill_crit_damage_desc', maxLevel: 15, level: 0,
            path: 'guardian',
            requires: ['guardian_crit_chance'],
            cost: level => 5 + level * 3,
            getBonus: level => level * 0.5, // +50% crit damage per level
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Crit Damage`,
            position: { x: 30, y: 65 },
        },
        {
            id: 'guardian_combo_master', nameKey: 'skill_combo_master_name', descKey: 'skill_combo_master_desc', maxLevel: 5, level: 0,
            path: 'guardian',
            requires: ['guardian_diamond_damage'],
            cost: level => 10 + level * 2,
            getBonus: level => level * 0.1, // +10% combo duration per level
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Combo Duration`,
            position: { x: 70, y: 65 },
        },
        {
            id: 'guardian_capstone', nameKey: 'skill_focused_fury_name', descKey: 'skill_focused_fury_desc', maxLevel: 1, level: 0,
            path: 'guardian',
            requires: ['guardian_crit_damage', 'guardian_combo_master'],
            cost: () => 100,
            getBonus: level => level > 0 ? 5 : 0, // +500% crit damage
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Crit Damage`,
            position: { x: 50, y: 85 },
        }
    ],
    alchemist: [
        {
            id: 'alchemist_pps_bonus', nameKey: 'prestige_upgrade_pps_name', descKey: 'prestige_upgrade_pps_desc', maxLevel: 20, level: 0,
            path: 'alchemist',
            cost: level => 1 + level,
            getBonus: level => level * 0.1, // +10% PPS per level
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% PPS`,
            position: { x: 50, y: 15 },
        },
        {
            id: 'alchemist_cost_reduction', nameKey: 'prestige_upgrade_cost_name', descKey: 'prestige_upgrade_cost_desc', maxLevel: 10, level: 0,
            path: 'alchemist',
            requires: ['alchemist_pps_bonus'],
            cost: level => 2 + level,
            getBonus: level => level * 0.02, // 2% cost reduction per level
            formatBonus: bonus => `-${(bonus * 100).toFixed(0)}% Upgrade Cost`,
            position: { x: 30, y: 40 },
        },
        {
            id: 'alchemist_offline_bonus', nameKey: 'prestige_upgrade_offline_name', descKey: 'prestige_upgrade_offline_desc', maxLevel: 8, level: 0,
            path: 'alchemist',
            requires: ['alchemist_pps_bonus'],
            cost: level => 3 + level,
            getBonus: level => (2 * 3600) + (level * 1800), // +30 mins offline time per level
            formatBonus: bonus => `${(bonus / 3600).toFixed(1)}h Offline Time`,
            position: { x: 70, y: 40 },
        },
        {
            id: 'alchemist_bonus_duration', nameKey: 'skill_bonus_duration_name', descKey: 'skill_bonus_duration_desc', maxLevel: 10, level: 0,
            path: 'alchemist',
            requires: ['alchemist_cost_reduction'],
            cost: level => 8 + level * 2,
            getBonus: level => level * 0.05, // +5% bonus duration per level
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Bonus Duration`,
            position: { x: 30, y: 65 },
        },
        {
            id: 'alchemist_synergy_boost', nameKey: 'skill_synergy_boost_name', descKey: 'skill_synergy_boost_desc', maxLevel: 10, level: 0,
            path: 'alchemist',
            requires: ['alchemist_offline_bonus'],
            cost: level => 10 + level * 2,
            getBonus: level => level * 0.1, // +10% to pps_from_ppc upgrade effectiveness
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Synergy`,
            position: { x: 70, y: 65 },
        },
        {
            id: 'alchemist_capstone', nameKey: 'skill_perpetual_motion_name', descKey: 'skill_perpetual_motion_desc', maxLevel: 1, level: 0,
            path: 'alchemist',
            requires: ['alchemist_bonus_duration', 'alchemist_synergy_boost'],
            cost: () => 100,
            getBonus: level => level > 0 ? 0.10 : 0, // Generate 10% of PPS while modals are open
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% PPS in Menus`,
            position: { x: 50, y: 85 },
        }
    ],
    prospector: [
        {
            id: 'prospector_relic_gain', nameKey: 'skill_relic_gain_name', descKey: 'skill_relic_gain_desc', maxLevel: 20, level: 0,
            path: 'prospector',
            cost: level => 2 + level,
            getBonus: level => level * 0.05, // +5% more relics on prestige
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Relics on Prestige`,
            position: { x: 50, y: 15 },
        },
        {
            id: 'prospector_relic_hunter', nameKey: 'skill_relic_hunter_name', descKey: 'skill_relic_hunter_desc', maxLevel: 5, level: 0,
            path: 'prospector',
            requires: ['prospector_relic_gain'],
            cost: level => 5 + level * 5,
            getBonus: level => level * 0.002, // +0.2% chance to find relic on diamond break
            formatBonus: bonus => `${(bonus * 100).toFixed(1)}% Relic Chance`,
            position: { x: 30, y: 40 },
        },
        {
            id: 'prospector_shard_sense', nameKey: 'skill_shard_sense_name', descKey: 'skill_shard_sense_desc', maxLevel: 10, level: 0,
            path: 'prospector',
            requires: ['prospector_relic_gain'],
            cost: level => 4 + level,
            getBonus: level => level * 0.1, // +10% chance to find shards
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Shard Find Chance`,
            position: { x: 70, y: 40 },
        },
        {
            id: 'prospector_jackpot_chance', nameKey: 'skill_jackpot_chance_name', descKey: 'skill_jackpot_chance_desc', maxLevel: 5, level: 0,
            path: 'prospector',
            requires: ['prospector_relic_hunter'],
            cost: level => 15 + level * 5,
            getBonus: level => level * 0.01, // 1% chance per level for floating reward to be jackpot
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Jackpot Chance`,
            position: { x: 30, y: 65 },
        },
        {
            id: 'prospector_floating_rewards', nameKey: 'skill_floating_rewards_name', descKey: 'skill_floating_rewards_desc', maxLevel: 10, level: 0,
            path: 'prospector',
            requires: ['prospector_shard_sense'],
            cost: level => 8 + level * 2,
            getBonus: level => level * 0.15, // +15% points from floating rewards
            formatBonus: bonus => `+${(bonus * 100).toFixed(0)}% Floating Rewards`,
            position: { x: 70, y: 65 },
        },
        {
            id: 'prospector_capstone', nameKey: 'skill_treasure_trove_name', descKey: 'skill_treasure_trove_desc', maxLevel: 1, level: 0,
            path: 'prospector',
            requires: ['prospector_jackpot_chance', 'prospector_floating_rewards'],
            cost: () => 100,
            getBonus: level => level > 0 ? 0.05 : 0, // +5% chance for triple shards
            formatBonus: bonus => `${(bonus * 100).toFixed(0)}% for 3x Shards`,
            position: { x: 50, y: 85 },
        }
    ]
};