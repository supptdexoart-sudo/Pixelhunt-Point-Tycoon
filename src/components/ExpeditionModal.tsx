import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Npc, Location, Expedition, InventoryItem } from '../types';
import { initialMaterials, initialLocations } from '../data/expeditions';
import { GuildIcon } from './icons/GuildIcon';
import { MagicWoodIcon } from './icons/MagicWoodIcon';
import { IronOreIcon } from './icons/IronOreIcon';
import { ScoutIcon } from './icons/ScoutIcon';
import { HelmetIcon } from './icons/HelmetIcon';
import { ChestplateIcon } from './icons/ChestplateIcon';
import { BootsIcon } from './icons/BootsIcon';
import { SwordIcon } from './icons/SwordIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { LockIcon } from './icons/LockIcon';

const NpcIcon: React.FC<{ iconId: string, className?: string }> = ({ iconId, className }) => {
    switch (iconId) {
        case 'scout':
            return <ScoutIcon className={className} />;
        default:
            return <div className={`w-full h-full bg-gray-500 ${className}`} />;
    }
};

interface ExpeditionModalProps {
    isOpen: boolean;
    onClose: () => void;
    npcs: Npc[];
    locations: Location[];
    expeditions: Expedition[];
    inventory: InventoryItem[];
    inventoryCapacity: number;
    onStartExpedition: (npcId: string, locationId: string) => void;
    onClaimExpedition: (expeditionId: number) => void;
    onUpgradeNpc: (npcId: string) => void;
}

type ActiveTab = 'expeditions' | 'scouts' | 'inventory' | 'base';

const ExpeditionInProgress: React.FC<{ expedition: Expedition; onClaim: (id: number) => void; npcs: Npc[] }> = ({ expedition, onClaim, npcs }) => {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState("");

    const location = initialLocations.find(l => l.id === expedition.locationId);
    const npc = npcs.find(n => n.id === expedition.npcId);

    useEffect(() => {
        const calculateProgress = () => {
            const now = Date.now();
            if (expedition.startTime >= now) { // Handle future start time edge case
                setProgress(0);
                setTimeLeft("Starting...");
                return;
            }
            const totalDuration = expedition.endTime - expedition.startTime;
            const elapsed = now - expedition.startTime;
            const currentProgress = Math.min(100, (elapsed / totalDuration) * 100);
            
            setProgress(currentProgress);

            if (currentProgress < 100) {
                const remainingSeconds = Math.max(0, Math.floor((expedition.endTime - now) / 1000));
                const hours = Math.floor(remainingSeconds / 3600);
                const minutes = Math.floor((remainingSeconds % 3600) / 60);
                const seconds = remainingSeconds % 60;
                setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            } else {
                setTimeLeft(t('expedition_claim_button'));
            }
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 1000);
        return () => clearInterval(interval);
    }, [expedition, t]);

    if (!location || !npc) return null;
    
    const isComplete = progress >= 100;

    return (
        <div className="pixel-box bg-gray-900/50 p-3">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-yellow-300">{t(location.nameKey)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <NpcIcon iconId={npc.icon} className="w-6 h-6" />
                      <p className="text-xs text-gray-400">{t('expedition_in_progress')} ({t(npc.nameKey)})</p>
                    </div>
                </div>
                {isComplete && 
                    <button onClick={() => onClaim(expedition.id)} className="pixel-button bg-green-600 hover:bg-green-500 text-black py-2 px-3 font-bold text-xs">
                        {t('expedition_claim_button')}
                    </button>
                }
            </div>
            <div className="relative h-6 w-full health-bar-bg mt-2">
                <div className="expedition-progress-bar" style={{ width: `${progress}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white text-shadow-hard">{isComplete ? t('expedition_claim_button') : timeLeft}</div>
            </div>
        </div>
    );
};

const EquipmentSlot: React.FC<{ icon: React.ReactNode; isLocked?: boolean; type: string }> = ({ icon, isLocked, type }) => (
    <div className="relative w-10 h-10 bg-gray-900 border-2 border-gray-600 rounded-sm flex items-center justify-center" title={type}>
        <div className={`w-3/4 h-3/4 text-gray-500 ${isLocked ? 'opacity-30' : ''}`}>
            {icon}
        </div>
        {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-sm">
                <LockIcon className="w-1/2 h-1/2 text-yellow-400" />
            </div>
        )}
    </div>
);

export const ExpeditionModal: React.FC<ExpeditionModalProps> = ({ isOpen, onClose, npcs, locations, expeditions, inventory, inventoryCapacity, onStartExpedition, onClaimExpedition, onUpgradeNpc }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<ActiveTab>('scouts');
    const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
    const [inventoryFilter, setInventoryFilter] = useState<'all' | 'materials' | 'equipment'>('all');

    useEffect(() => {
        if (isOpen) {
            const idleNpc = npcs.find(n => n.status === 'idle');
            setSelectedNpcId(idleNpc ? idleNpc.id : null);
            if(locations.length > 0) setSelectedLocationId(locations[0].id)
        }
    }, [isOpen, npcs, locations]);

    if (!isOpen) return null;

    const idleNpcs = npcs.filter(n => n.status === 'idle');
    const currentInventoryCount = inventory.reduce((acc, item) => acc + item.quantity, 0);

    const handleStart = () => {
        if (selectedNpcId && selectedLocationId) {
            onStartExpedition(selectedNpcId, selectedLocationId);
            const nextIdleNpc = idleNpcs.find(n => n.id !== selectedNpcId);
            setSelectedNpcId(nextIdleNpc ? nextIdleNpc.id : null);
        }
    };

    const MaterialIcon: React.FC<{ iconId: string, className?: string }> = ({ iconId, className }) => {
        switch (iconId) {
            case 'magic_wood':
                return <MagicWoodIcon className={className} />;
            case 'iron_ore':
                return <IronOreIcon className={className} />;
            case 'sword':
                return <SwordIcon className={className} />;
            case 'shield':
                return <ShieldIcon className={className} />;
            case 'helmet':
                return <HelmetIcon className={className} />;
            case 'chestplate':
                return <ChestplateIcon className={className} />;
            case 'boots':
                return <BootsIcon className={className} />;
            default:
                return <div className={`w-full h-full bg-gray-500 ${className}`} />;
        }
    };

    const filteredInventory = inventory.map(item => {
        const material = initialMaterials.find(m => m.id === item.materialId);
        return { ...item, material };
    }).filter(item => {
        if (!item.material) return false;
        if (inventoryFilter === 'all') return true;
        if (inventoryFilter === 'materials') return item.material.category === 'material';
        if (inventoryFilter === 'equipment') return item.material.category === 'equipment';
        return false;
    });

    return (
        <div className="guild-modal-fullscreen text-white" onClick={onClose}>
            <div className="guild-content-box pixel-box p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <GuildIcon />
                        <h2 className="text-2xl text-shadow-hard text-yellow-300">{t('expedition_guild_title')}</h2>
                    </div>
                    <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1 z-10" aria-label={t('close_button')}>&times;</button>
                </div>

                <div className="flex border-b-4 border-gray-900 mb-4 overflow-x-auto">
                    <button onClick={() => setActiveTab('base')} className={`guild-tab px-4 py-2 text-sm font-bold flex-shrink-0 whitespace-nowrap ${activeTab === 'base' ? 'active' : ''}`}>{t('expedition_tab_base')}</button>
                    <button onClick={() => setActiveTab('expeditions')} className={`guild-tab px-4 py-2 text-sm font-bold flex-shrink-0 whitespace-nowrap ${activeTab === 'expeditions' ? 'active' : ''}`}>{t('expedition_tab_expeditions')}</button>
                    <button onClick={() => setActiveTab('scouts')} className={`guild-tab px-4 py-2 text-sm font-bold flex-shrink-0 whitespace-nowrap ${activeTab === 'scouts' ? 'active' : ''}`}>{t('expedition_tab_scouts')}</button>
                    <button onClick={() => setActiveTab('inventory')} className={`guild-tab px-4 py-2 text-sm font-bold flex-shrink-0 whitespace-nowrap ${activeTab === 'inventory' ? 'active' : ''}`}>{t('expedition_tab_inventory')}</button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                    {activeTab === 'expeditions' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left: In Progress */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-yellow-400">{t('expedition_section_in_progress')}</h3>
                                {expeditions.length > 0 ? expeditions.map(exp => (
                                    <ExpeditionInProgress key={exp.id} expedition={exp} onClaim={onClaimExpedition} npcs={npcs} />
                                )) : <p className="text-sm text-gray-500">{t('expedition_npc_status_idle')}</p>}
                            </div>
                             {/* Right: Start New */}
                            <div className="pixel-box bg-gray-900/50 p-3 flex flex-col">
                                <h3 className="text-lg font-bold text-yellow-400 mb-2">{t('expedition_section_start_new')}</h3>
                                <div className="space-y-3 flex-grow">
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">{t('expedition_select_npc')}</label>
                                        <select value={selectedNpcId || ''} onChange={e => setSelectedNpcId(e.target.value)} className="w-full bg-gray-900 border-2 border-gray-600 p-2 text-sm text-white">
                                            {idleNpcs.map(npc => <option key={npc.id} value={npc.id}>{t(npc.nameKey)}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">{t('expedition_select_location')}</label>
                                        <select value={selectedLocationId || ''} onChange={e => setSelectedLocationId(e.target.value)} className="w-full bg-gray-900 border-2 border-gray-600 p-2 text-sm text-white">
                                            {locations.map(loc => <option key={loc.id} value={loc.id}>{t(loc.nameKey)}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={handleStart} disabled={!selectedNpcId || !selectedLocationId} className="pixel-button w-full mt-4 py-3 bg-cyan-700 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed font-bold">
                                    {t('expedition_start_button')}
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'scouts' && (
                        <div className="space-y-4">
                            {npcs.map(npc => {
                                const MAX_LEVEL = 10;
                                const isMaxLevel = npc.level >= MAX_LEVEL;
                                const costLevel = npc.level;
                                const woodCost = Math.floor(5 * Math.pow(costLevel, 1.5));
                                const oreCost = Math.floor(2 * Math.pow(costLevel, 1.5));

                                const woodAvailable = inventory.find(i => i.materialId === 'magic_wood')?.quantity || 0;
                                const oreAvailable = inventory.find(i => i.materialId === 'iron_ore')?.quantity || 0;
                                const canAfford = woodAvailable >= woodCost && oreAvailable >= oreCost;
                                const hpPercentage = (npc.currentHp / npc.maxHp) * 100;
                                const xpPercentage = (npc.currentXp / npc.xpToNextLevel) * 100;
                                
                                return (
                                <div key={npc.id} className="pixel-box bg-gray-900/50 p-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                          <NpcIcon iconId={npc.icon} className="w-8 h-8" />
                                          <h3 className="text-lg font-bold text-yellow-300">{t(npc.nameKey)}</h3>
                                        </div>
                                        <p className="text-sm text-gray-400">{t('scout_level', { level: npc.level })}</p>
                                    </div>

                                    <div className="relative health-bar-bg mb-1" style={{height: '16px'}}>
                                        <div className="health-bar" style={{ width: `${hpPercentage}%`, background: `linear-gradient(to right, #16a34a, #4ade80)` }}></div>
                                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white text-shadow-hard">HP: {npc.currentHp} / {npc.maxHp}</span>
                                    </div>
                                     <div className="relative health-bar-bg mb-2" style={{height: '16px'}}>
                                        <div className="health-bar" style={{ width: `${xpPercentage}%`, background: `linear-gradient(to right, #60a5fa, #a78bfa)` }}></div>
                                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white text-shadow-hard">XP: {Math.floor(npc.currentXp)} / {npc.xpToNextLevel}</span>
                                    </div>

                                    <div className="mt-2 mb-3 flex justify-center gap-2 p-1 bg-gray-800 rounded-md">
                                        <EquipmentSlot icon={<HelmetIcon />} type="Head" />
                                        <EquipmentSlot icon={<ChestplateIcon />} type="Body" />
                                        <EquipmentSlot icon={<BootsIcon />} type="Boots" />
                                        <EquipmentSlot icon={<SwordIcon />} type="Weapon" />
                                        <EquipmentSlot icon={<ShieldIcon />} type="Shield" isLocked={true} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Bonuses */}
                                        <div className="pixel-box bg-gray-900 p-2 space-y-1">
                                            <p className="text-xs text-cyan-400 flex justify-between">{t('scout_bonus_speed')}: <span className="font-bold text-white">-{ (npc.level - 1) * 5 }%</span></p>
                                            <p className="text-xs text-green-400 flex justify-between">{t('scout_bonus_yield')}: <span className="font-bold text-white">+{ (npc.level - 1) * 10 }%</span></p>
                                            <p className="text-xs text-purple-400 flex justify-between">{t('scout_bonus_luck')}: <span className="font-bold text-white">+{ (npc.level - 1) * 5 }%</span></p>
                                        </div>
                                        {/* Upgrade */}
                                        <div className="flex flex-col items-center justify-center">
                                            {isMaxLevel ? (
                                                <p className="font-bold text-yellow-400">{t('scout_max_level')}</p>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-gray-400 mb-1">{t('scout_upgrade_cost')}</p>
                                                    <div className="flex gap-4 text-xs mb-2">
                                                        <span className={woodAvailable >= woodCost ? 'text-white' : 'text-red-500'}>{woodCost} {t('material_magic_wood_name')}</span>
                                                        <span className={oreAvailable >= oreCost ? 'text-white' : 'text-red-500'}>{oreCost} {t('material_iron_ore_name')}</span>
                                                    </div>
                                                    <button onClick={() => onUpgradeNpc(npc.id)} disabled={!canAfford} className="pixel-button bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 font-bold text-sm">
                                                        {t('scout_upgrade_button')}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    )}
                    {activeTab === 'inventory' && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-yellow-400">{t('expedition_tab_inventory')}</h3>
                                <p className="text-sm text-gray-400">{t('expedition_inventory_capacity')}: {currentInventoryCount} / {inventoryCapacity}</p>
                            </div>
                            <div className="flex gap-2 mb-4 border-b-2 border-gray-700">
                                <button className={`px-3 py-1 text-sm font-bold transition-colors ${inventoryFilter === 'all' ? 'border-b-2 border-yellow-400 text-yellow-300' : 'text-gray-400 hover:text-white'}`} onClick={() => setInventoryFilter('all')}>
                                    {t('expedition_tab_all_items')}
                                </button>
                                <button className={`px-3 py-1 text-sm font-bold transition-colors ${inventoryFilter === 'materials' ? 'border-b-2 border-yellow-400 text-yellow-300' : 'text-gray-400 hover:text-white'}`} onClick={() => setInventoryFilter('materials')}>
                                    {t('expedition_tab_materials')}
                                </button>
                                <button className={`px-3 py-1 text-sm font-bold transition-colors ${inventoryFilter === 'equipment' ? 'border-b-2 border-yellow-400 text-yellow-300' : 'text-gray-400 hover:text-white'}`} onClick={() => setInventoryFilter('equipment')}>
                                    {t('expedition_tab_equipment')}
                                </button>
                            </div>
                            <div className="inventory-grid">
                                {filteredInventory.map(item => {
                                    const material = item.material;
                                    if (!material) return null;
                                    return (
                                        <div key={item.materialId} className="inventory-slot flex flex-col items-center justify-center p-1" title={t(material.nameKey)}>
                                            <MaterialIcon iconId={material.icon} className="inventory-item-icon" />
                                            <span className="inventory-item-count text-white font-bold">{item.quantity}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {activeTab === 'base' && <p className="text-center text-gray-500 mt-10">Coming soon...</p>}
                </div>
            </div>
        </div>
    );
};