import { QuestDefinition } from '../types.ts';

export const initialQuestTiers: QuestDefinition[] = [
    {
        tierId: 1,
        nameKey: 'quest_tier_1_name',
        quests: [
            { id: 'q1_1', nameKey: 'quest_1_name', descKey: 'quest_1_desc', target: 10, getValue: { type: 'stats', key: 'totalClicks' }, reward: { type: 'points', value: 50 } },
            { id: 'q1_2', nameKey: 'quest_1_2_name', descKey: 'quest_1_2_desc', target: 1, getValue: { type: 'diamond', key: 'level' }, reward: { type: 'points', value: 100 } },
            { id: 'q1_3', nameKey: 'quest_3_name', descKey: 'quest_3_desc', target: 1, getValue: { type: 'stats', key: 'upgradesPurchased' }, reward: { type: 'none' } },
            { id: 'q1_4', nameKey: 'quest_2_name', descKey: 'quest_2_desc', target: 1000, getValue: { type: 'stats', key: 'totalPointsEarned' }, reward: { type: 'points', value: 250 } },
            { id: 'q1_5', nameKey: 'quest_1_5_name', descKey: 'quest_1_5_desc', target: 5000, getValue: { type: 'stats', key: 'manualPointsEarned' }, reward: { type: 'unlock', value: true, key: 'timeBonus' } },
            { id: 'q1_6', nameKey: 'quest_1_6_name', descKey: 'quest_1_6_desc', target: 10, getValue: { type: 'base_pps', key: 'value' }, reward: { type: 'none' } },
            { id: 'q1_7', nameKey: 'quest_1_7_name', descKey: 'quest_1_7_desc', target: 5, getValue: { type: 'base_ppc', key: 'value' }, reward: { type: 'unlock', value: true, key: 'adBonus' } },
            { id: 'q1_8', nameKey: 'quest_1_8_name', descKey: 'quest_1_8_desc', target: 25, getValue: { type: 'stats', key: 'upgradesPurchased' }, reward: { type: 'unlock', value: true, key: 'autoMax' } },
            { id: 'q1_9', nameKey: 'quest_4_name', descKey: 'quest_4_desc', target: 50000, getValue: { type: 'stats', key: 'totalPointsEarned' }, reward: { type: 'points', value: 10000 } },
            { id: 'q1_10', nameKey: 'quest_10_name', descKey: 'quest_10_desc', target: 1, getValue: { type: 'stats', key: 'timeBonusesClaimed' }, reward: { type: 'unlock', value: true, key: 'shop' } },
            { id: 'q1_11', nameKey: 'quest_1_11_name', descKey: 'quest_1_11_desc', target: 1, getValue: { type: 'stats', key: 'adsWatched' }, reward: { type: 'shards', value: 1 } },
            { id: 'q1_12', nameKey: 'quest_1_12_name', descKey: 'quest_1_12_desc', target: 1, getValue: { type: 'stats', key: 'shards' }, reward: { type: 'relics', value: 1 } },
            { id: 'q1_13', nameKey: 'quest_5_name', descKey: 'quest_5_desc', target: 1000000, getValue: { type: 'stats', key: 'totalPointsEarned' }, reward: { type: 'unlock', value: true, key: 'prestige' } },
        ]
    },
    {
        tierId: 2,
        nameKey: 'quest_tier_2_name',
        quests: [
            { id: 'q2_1', nameKey: 'quest_7_name', descKey: 'quest_7_desc', target: 1, getValue: { type: 'stats', key: 'timesPrestiged' }, reward: { type: 'relics', value: 5 } },
            { id: 'q2_2', nameKey: 'quest_2_2_name', descKey: 'quest_2_2_desc', target: 25, getValue: { type: 'stats', key: 'totalRelicsEarned' }, reward: { type: 'none' } },
            { id: 'q2_3', nameKey: 'quest_8_name', descKey: 'quest_8_desc', target: 5, getValue: { type: 'prestige', key: 'level' }, reward: { type: 'relics', value: 10 } },
            { id: 'q2_4', nameKey: 'quest_6_name', descKey: 'quest_6_desc', target: 10, getValue: { type: 'diamond', key: 'level' }, reward: { type: 'shards', value: 1 } },
            { id: 'q2_5', nameKey: 'quest_2_5_name', descKey: 'quest_2_5_desc', target: 10, getValue: { type: 'stats', key: 'adsWatched' }, reward: { type: 'none' } },
            { id: 'q2_6', nameKey: 'quest_2_6_name', descKey: 'quest_2_6_desc', target: 100000000, getValue: { type: 'stats', key: 'totalPointsEarned' }, reward: { type: 'points', value: 10000000 } },
            { id: 'q2_7', nameKey: 'quest_2_7_name', descKey: 'quest_2_7_desc', target: 3600, getValue: { type: 'stats', key: 'playTime' }, reward: { type: 'none' } },
            { id: 'q2_8', nameKey: 'quest_2_8_name', descKey: 'quest_2_8_desc', target: 500, getValue: { type: 'stats', key: 'upgradesPurchased' }, reward: { type: 'none' } },
            { id: 'q2_9', nameKey: 'quest_2_9_name', descKey: 'quest_2_9_desc', target: 100, getValue: { type: 'stats', key: 'totalRelicsEarned' }, reward: { type: 'relics', value: 25 } },
            { id: 'q2_10', nameKey: 'quest_2_10_name', descKey: 'quest_2_10_desc', target: 10000, getValue: { type: 'stats', key: 'totalClicks' }, reward: { type: 'none' } },
            { id: 'q2_11', nameKey: 'quest_2_11_name', descKey: 'quest_2_11_desc', target: 10000000, getValue: { type: 'stats', key: 'highestPoints' }, reward: { type: 'none' } },
            { id: 'q2_12', nameKey: 'quest_2_12_name', descKey: 'quest_2_12_desc', target: 1000000000, getValue: { type: 'stats', key: 'totalPointsEarned' }, reward: { type: 'relics', value: 50 } },
            { id: 'q2_13', nameKey: 'quest_2_13_name', descKey: 'quest_2_13_desc', target: 2, getValue: { type: 'stats', key: 'timesPrestiged' }, reward: { type: 'none' } },
        ]
    },
    {
        tierId: 3,
        nameKey: 'quest_tier_3_name',
        quests: [
            { id: 'q3_1', nameKey: 'quest_3_1_name', descKey: 'quest_3_1_desc', target: 5, getValue: { type: 'stats', key: 'timesPrestiged' }, reward: { type: 'relics', value: 100 } },
            { id: 'q3_2', nameKey: 'quest_3_2_name', descKey: 'quest_3_2_desc', target: 25, getValue: { type: 'prestige', key: 'level' }, reward: { type: 'shards', value: 5 } },
            { id: 'q3_3', nameKey: 'quest_3_3_name', descKey: 'quest_3_3_desc', target: 1000, getValue: { type: 'stats', key: 'totalRelicsEarned' }, reward: { type: 'relics', value: 250 } },
            { id: 'q3_4', nameKey: 'quest_3_4_name', descKey: 'quest_3_4_desc', target: 10, getValue: { type: 'stats', key: 'shards' }, reward: { type: 'none' } },
            { id: 'q3_5', nameKey: 'quest_3_5_name', descKey: 'quest_3_5_desc', target: 100000, getValue: { type: 'base_pps', key: 'value' }, reward: { type: 'none' } },
            { id: 'q3_6', nameKey: 'quest_3_6_name', descKey: 'quest_3_6_desc', target: 50000, getValue: { type: 'base_ppc', key: 'value' }, reward: { type: 'none' } },
            { id: 'q3_7', nameKey: 'quest_3_7_name', descKey: 'quest_3_7_desc', target: 1e12, getValue: { type: 'stats', key: 'totalPointsEarned' }, reward: { type: 'shards', value: 10 } },
            { id: 'q3_8', nameKey: 'quest_3_8_name', descKey: 'quest_3_8_desc', target: 10, getValue: { type: 'stats', key: 'timesPrestiged' }, reward: { type: 'relics', value: 500 } },
            { id: 'q3_9', nameKey: 'quest_3_9_name', descKey: 'quest_3_9_desc', target: 50, getValue: { type: 'diamond', key: 'level' }, reward: { type: 'none' } },
            { id: 'q3_10', nameKey: 'quest_3_10_name', descKey: 'quest_3_10_desc', target: 5000, getValue: { type: 'stats', key: 'totalRelicsEarned' }, reward: { type: 'relics', value: 1000 } },
            { id: 'q3_11', nameKey: 'quest_3_11_name', descKey: 'quest_3_11_desc', target: 50, getValue: { type: 'prestige', key: 'level' }, reward: { type: 'none' } },
            { id: 'q3_12', nameKey: 'quest_3_12_name', descKey: 'quest_3_12_desc', target: 216000, getValue: { type: 'stats', key: 'playTime' }, reward: { type: 'none' } }, // 60 hours
            { id: 'q3_13', nameKey: 'quest_3_13_name', descKey: 'quest_3_13_desc', target: 25, getValue: { type: 'stats', key: 'shards' }, reward: { type: 'relics', value: 2500 } },
        ]
    }
];