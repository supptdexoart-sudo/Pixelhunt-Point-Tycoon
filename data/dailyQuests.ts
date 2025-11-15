import { DailyQuestDefinition } from '../types';

export const dailyQuestsPool: DailyQuestDefinition[] = [
    {
        id: 'dq_clicks_1',
        nameKey: 'daily_quest_clicks_1_name',
        descKey: 'daily_quest_clicks_1_desc',
        stat: 'dailyClicks',
        target: (stats) => 500 + (stats.timesPrestiged * 250),
        reward: (stats, pps) => ({ type: 'points', value: pps * 60 * 5 }), // 5 minutes of PPS
    },
    {
        id: 'dq_diamonds_1',
        nameKey: 'daily_quest_diamonds_1_name',
        descKey: 'daily_quest_diamonds_1_desc',
        stat: 'dailyDiamondsBroken',
        target: (stats) => 1 + Math.floor(stats.timesPrestiged / 2),
        reward: (stats, pps) => ({ type: 'points', value: pps * 60 * 10 }), // 10 minutes of PPS
    },
    {
        id: 'dq_upgrades_1',
        nameKey: 'daily_quest_upgrades_1_name',
        descKey: 'daily_quest_upgrades_1_desc',
        stat: 'dailyUpgradesPurchased',
        target: (stats) => 100 + (stats.timesPrestiged * 50),
        reward: (stats, pps) => ({ type: 'points', value: pps * 60 * 5 }), // 5 minutes of PPS
    },
    {
        id: 'dq_floating_1',
        nameKey: 'daily_quest_floating_1_name',
        descKey: 'daily_quest_floating_1_desc',
        stat: 'dailyFloatingRewardsClaimed',
        target: () => 3,
        reward: (stats, pps) => ({ type: 'shards', value: 1 }),
    },
    {
        id: 'dq_relics_1',
        nameKey: 'daily_quest_relics_1_name',
        descKey: 'daily_quest_relics_1_desc',
        stat: 'dailyClicks', // This is a placeholder stat, the reward is what matters
        target: () => 1, // Dummy target
        reward: (stats, pps) => ({ type: 'relics', value: 1 + Math.floor(stats.timesPrestiged / 5) }),
    },
     {
        id: 'dq_manual_points_1',
        nameKey: 'daily_quest_manual_points_1_name',
        descKey: 'daily_quest_manual_points_1_desc',
        stat: 'dailyManualPoints',
        target: (stats) => 10000 + (stats.timesPrestiged * 50000),
        reward: (stats, pps) => ({ type: 'points', value: pps * 60 * 8 }), // 8 minutes of PPS
    },
];
