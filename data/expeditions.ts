import { Material, Npc, Location } from '../types.ts';

export const initialMaterials: Material[] = [
    { id: 'magic_wood', nameKey: 'material_magic_wood_name', icon: 'magic_wood', category: 'material' },
    { id: 'iron_ore', nameKey: 'material_iron_ore_name', icon: 'iron_ore', category: 'material' },
    { id: 'basic_sword', nameKey: 'equipment_basic_sword_name', icon: 'sword', category: 'equipment', slot: 'weapon' },
    { id: 'basic_shield', nameKey: 'equipment_basic_shield_name', icon: 'shield', category: 'equipment', slot: 'shield' },
    { id: 'leather_helmet', nameKey: 'equipment_leather_helmet_name', icon: 'helmet', category: 'equipment', slot: 'head' },
    { id: 'leather_tunic', nameKey: 'equipment_leather_tunic_name', icon: 'chestplate', category: 'equipment', slot: 'body' },
    { id: 'leather_boots', nameKey: 'equipment_leather_boots_name', icon: 'boots', category: 'equipment', slot: 'boots' },
];

export const initialNpcs: Npc[] = [
    { 
        id: 'scout_1', 
        nameKey: 'npc_scout_name', 
        status: 'idle', 
        level: 1, 
        currentXp: 0,
        xpToNextLevel: 100,
        icon: 'scout', 
        currentHp: 100, 
        maxHp: 100,
        equipment: {
            head: null,
            body: null,
            boots: null,
            weapon: null,
            shield: null,
        }
    },
];

export const initialLocations: Location[] = [
    {
        id: 'forest',
        nameKey: 'location_forest_name',
        duration: 15 * 60, // 15 minutes
        rewards: [
            { materialId: 'magic_wood', min: 2, max: 5, chance: 0.9 },
            { materialId: 'leather_helmet', min: 1, max: 1, chance: 0.05 },
            { materialId: 'leather_boots', min: 1, max: 1, chance: 0.05 },
        ],
        requiredPrestige: 0,
    },
    {
        id: 'mines',
        nameKey: 'location_mines_name',
        duration: 60 * 60, // 1 hour
        rewards: [
            { materialId: 'iron_ore', min: 1, max: 3, chance: 0.8 },
            { materialId: 'magic_wood', min: 1, max: 2, chance: 0.3 },
            { materialId: 'basic_sword', min: 1, max: 1, chance: 0.02 },
            { materialId: 'basic_shield', min: 1, max: 1, chance: 0.02 },
            { materialId: 'leather_tunic', min: 1, max: 1, chance: 0.03 },
        ],
        requiredPrestige: 1,
    }
];