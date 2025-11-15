import React from 'react';
import { Card } from '../types';
import { DaggerIcon } from '../components/icons/DaggerIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { AutoClickIcon } from '../components/icons/AutoClickIcon';
import { LensIcon } from '../components/icons/LensIcon';
import { MountainIcon } from '../components/icons/MountainIcon';
import { ShipIcon } from '../components/icons/ShipIcon';
import { MetronomeIcon } from '../components/ImageDisplay';
import { TransmuteIcon } from '../components/LoadingOverlay';
import { GoldenHandIcon } from '../components/ImageUploader';
import { SproutIcon } from '../components/icons/SproutIcon';
import { ShardClusterIcon } from '../components/icons/ShardClusterIcon';
import { FractureIcon } from '../components/icons/FractureIcon';
import { CloverIcon } from '../components/icons/CloverIcon';
import { PriceTagIcon } from '../components/icons/PriceTagIcon';
import { ReticleIcon } from '../components/icons/ReticleIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { WaveIcon } from '../components/icons/WaveIcon';
import { MoonIcon } from '../components/icons/MoonIcon';
import { PickaxeRelicIcon } from '../components/icons/PickaxeRelicIcon';


export const cardPool: Card[] = [
    {
        id: 'crit_damage_1',
        type: 'CRIT_DAMAGE_BOOST',
        persistence: 'temporary',
        value: 0.30, // 30%
        duration: 60, // 60 seconds
        nameKey: 'card_crit_dmg_name',
        descKey: 'card_crit_dmg_desc',
        icon: DaggerIcon
    },
    {
        id: 'add_points_1',
        type: 'ADD_POINTS',
        persistence: 'instant',
        value: 300, // 300 seconds (5 minutes) of PPS
        nameKey: 'card_points_name',
        descKey: 'card_points_desc',
        icon: PlusIcon
    },
    {
        id: 'auto_clicker_1',
        type: 'AUTO_CLICKER',
        persistence: 'temporary',
        value: 10, // Clicks per second
        duration: 60, // 60 seconds
        nameKey: 'card_auto_clicker_name',
        descKey: 'card_auto_clicker_desc',
        icon: AutoClickIcon
    },
    {
        id: 'perm_ppc_1',
        type: 'PPC_MUL',
        persistence: 'permanent',
        value: 0.05, // 5%
        nameKey: 'card_perm_ppc_1_name',
        descKey: 'card_perm_ppc_1_desc',
        icon: LensIcon
    },
    {
        id: 'perm_pps_1',
        type: 'PPS_MUL',
        persistence: 'permanent',
        value: 0.10, // 10%
        nameKey: 'card_perm_pps_1_name',
        descKey: 'card_perm_pps_1_desc',
        icon: MountainIcon
    },
    {
        id: 'perm_pps_2',
        type: 'PPS_MUL',
        persistence: 'permanent',
        value: 0.15, // 15%
        nameKey: 'card_perm_pps_2_name',
        descKey: 'card_perm_pps_2_desc',
        icon: ShipIcon
    },
    {
        id: 'perm_combo_1',
        type: 'COMBO_THRESHOLD_REDUCE',
        persistence: 'permanent',
        value: 1,
        nameKey: 'card_perm_combo_1_name',
        descKey: 'card_perm_combo_1_desc',
        icon: MetronomeIcon
    },
    {
        id: 'instant_relic_to_shard_1',
        type: 'CONVERT_RELIC_TO_SHARD',
        persistence: 'instant',
        value: 3, // 3 shards per relic
        nameKey: 'card_instant_relic_to_shard_1_name',
        descKey: 'card_instant_relic_to_shard_1_desc',
        icon: TransmuteIcon
    },
    {
        id: 'temp_midas_1',
        type: 'GOLDEN_CLICKS',
        persistence: 'temporary',
        value: 0.0001, // 0.01% of current points per click
        duration: 30,
        nameKey: 'card_temp_midas_1_name',
        descKey: 'card_temp_midas_1_desc',
        icon: GoldenHandIcon
    },
    // New Cards
    {
        id: 'temp_pps_boost_1',
        type: 'PPS_BOOST',
        persistence: 'temporary',
        value: 0.50, // 50%
        duration: 60,
        nameKey: 'card_temp_pps_boost_1_name',
        descKey: 'card_temp_pps_boost_1_desc',
        icon: SproutIcon
    },
    {
        id: 'instant_add_shards_1',
        type: 'ADD_SHARDS',
        persistence: 'instant',
        value: 2,
        nameKey: 'card_instant_add_shards_1_name',
        descKey: 'card_instant_add_shards_1_desc',
        icon: ShardClusterIcon
    },
    {
        id: 'perm_diamond_dmg_1',
        type: 'DIAMOND_DAMAGE_MUL',
        persistence: 'permanent',
        value: 0.25, // 25%
        nameKey: 'card_perm_diamond_dmg_1_name',
        descKey: 'card_perm_diamond_dmg_1_desc',
        icon: FractureIcon
    },
    {
        id: 'temp_float_reward_1',
        type: 'FLOATING_REWARD_BONUS',
        persistence: 'temporary',
        value: 2, // Double points
        duration: 90,
        nameKey: 'card_temp_float_reward_1_name',
        descKey: 'card_temp_float_reward_1_desc',
        icon: CloverIcon
    },
    {
        id: 'temp_cost_reduc_1',
        type: 'UPGRADE_COST_REDUCTION',
        persistence: 'temporary',
        value: 0.25, // 25%
        duration: 30,
        nameKey: 'card_temp_cost_reduc_1_name',
        descKey: 'card_temp_cost_reduc_1_desc',
        icon: PriceTagIcon
    },
    {
        id: 'perm_crit_chance_1',
        type: 'CRIT_CHANCE_BONUS',
        persistence: 'permanent',
        value: 0.001, // 0.1%
        nameKey: 'card_perm_crit_chance_1_name',
        descKey: 'card_perm_crit_chance_1_desc',
        icon: ReticleIcon
    },
    {
        id: 'instant_add_points_2',
        type: 'ADD_POINTS',
        persistence: 'instant',
        value: 600, // 600 seconds (10 minutes) of PPS
        nameKey: 'card_instant_add_points_2_name',
        descKey: 'card_instant_add_points_2_desc',
        icon: ClockIcon
    },
    {
        id: 'temp_combo_window_1',
        type: 'COMBO_WINDOW_INCREASE',
        persistence: 'temporary',
        value: 0.5, // 50%
        duration: 60,
        nameKey: 'card_temp_combo_window_1_name',
        descKey: 'card_temp_combo_window_1_desc',
        icon: WaveIcon
    },
    {
        id: 'perm_offline_gains_1',
        type: 'OFFLINE_GAINS_MUL',
        persistence: 'permanent',
        value: 0.10, // 10%
        nameKey: 'card_perm_offline_gains_1_name',
        descKey: 'card_perm_offline_gains_1_desc',
        icon: MoonIcon
    },
    {
        id: 'special_relic_bonus_1',
        type: 'NEXT_PRESTIGE_RELIC_BONUS',
        persistence: 'instant',
        value: 0.10, // 10%
        nameKey: 'card_special_relic_bonus_1_name',
        descKey: 'card_special_relic_bonus_1_desc',
        icon: PickaxeRelicIcon
    }
];