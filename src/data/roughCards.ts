import { Card } from '../types';
import { CrackedLensIcon } from '../components/icons/CrackedLensIcon';
import { FlickeringSproutIcon } from '../components/icons/FlickeringSproutIcon';
import { ShardGambleIcon } from '../components/icons/ShardGambleIcon';

export const roughCardPool: Card[] = [
    {
        id: 'rough_ppc_boost_1',
        // FIX: Corrected card type to match definition in types.ts
        type: 'ROUGH_PPC_BOOST',
        persistence: 'temporary',
        value: 0.25, // +25% PPC
        duration: 90,
        nameKey: 'card_rough_ppc_name',
        descKey: 'card_rough_ppc_desc',
        icon: CrackedLensIcon,
    },
    {
        id: 'rough_unstable_pps_1',
        type: 'UNSTABLE_PPS_BOOST',
        persistence: 'temporary',
        value: 1.5, // +150% PPS
        duration: 30,
        nameKey: 'card_unstable_pps_name',
        descKey: 'card_unstable_pps_desc',
        icon: FlickeringSproutIcon,
    },
    {
        id: 'rough_shard_gamble_1',
        type: 'SHARD_GAMBLE',
        persistence: 'instant',
        value: 0, // value is not used, logic is in handler
        nameKey: 'card_shard_gamble_name',
        descKey: 'card_shard_gamble_desc',
        icon: ShardGambleIcon,
    },
];
