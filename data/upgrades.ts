import { Upgrade } from '../types.ts';

export const initialUpgrades: Upgrade[] = [
  // PPC Upgrades
  { level: 0, retainedLevel: 0, baseCost: 10, cost: 10, type: 'ppc', value: 1, nameKey: 'upgrade_ppc_1_name', descKey: 'upgrade_ppc_1_desc' },
  { level: 0, retainedLevel: 0, baseCost: 100, cost: 100, type: 'ppc', value: 4, nameKey: 'upgrade_ppc_2_name', descKey: 'upgrade_ppc_2_desc' },
  { level: 0, retainedLevel: 0, baseCost: 1000, cost: 1000, type: 'ppc', value: 20, nameKey: 'upgrade_ppc_3_name', descKey: 'upgrade_ppc_3_desc' },
  { level: 0, retainedLevel: 0, baseCost: 10000, cost: 10000, type: 'ppc', value: 80, nameKey: 'upgrade_ppc_4_name', descKey: 'upgrade_ppc_4_desc' },
  { level: 0, retainedLevel: 0, baseCost: 100000, cost: 100000, type: 'ppc', value: 400, nameKey: 'upgrade_ppc_5_name', descKey: 'upgrade_ppc_5_desc' },
  { level: 0, retainedLevel: 0, baseCost: 1000000, cost: 1000000, type: 'ppc', value: 1500, nameKey: 'upgrade_ppc_6_name', descKey: 'upgrade_ppc_6_desc' },
  { level: 0, retainedLevel: 0, baseCost: 100000000, cost: 100000000, type: 'ppc', value: 8000, nameKey: 'upgrade_ppc_7_name', descKey: 'upgrade_ppc_7_desc' },
  
  // PPS Upgrades
  { level: 0, retainedLevel: 0, baseCost: 25, cost: 25, type: 'pps', value: 1, nameKey: 'upgrade_pps_1_name', descKey: 'upgrade_pps_1_desc' },
  { level: 0, retainedLevel: 0, baseCost: 250, cost: 250, type: 'pps', value: 4, nameKey: 'upgrade_pps_2_name', descKey: 'upgrade_pps_2_desc' },
  { level: 0, retainedLevel: 0, baseCost: 2500, cost: 2500, type: 'pps', value: 20, nameKey: 'upgrade_pps_3_name', descKey: 'upgrade_pps_3_desc' },
  { level: 0, retainedLevel: 0, baseCost: 25000, cost: 25000, type: 'pps', value: 80, nameKey: 'upgrade_pps_4_name', descKey: 'upgrade_pps_4_desc' },
  { level: 0, retainedLevel: 0, baseCost: 500000, cost: 500000, type: 'pps', value: 400, nameKey: 'upgrade_pps_5_name', descKey: 'upgrade_pps_5_desc' },
  { level: 0, retainedLevel: 0, baseCost: 5000000, cost: 5000000, type: 'pps_from_ppc', value: 0.001, nameKey: 'upgrade_pps_6_name', descKey: 'upgrade_pps_6_desc' },
  { level: 0, retainedLevel: 0, baseCost: 500000000, cost: 500000000, type: 'pps_relic_scaled', value: 50, nameKey: 'upgrade_pps_7_name', descKey: 'upgrade_pps_7_desc' },
];