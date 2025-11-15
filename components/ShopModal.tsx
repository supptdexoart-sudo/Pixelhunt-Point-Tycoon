import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { ShopPurchases } from '../types';
import { ShardIcon } from './icons/ShardIcon';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  shards: number;
  shopPurchases: ShopPurchases;
  onBuyItem: (itemId: string, cost: number) => void;
  onApplyCosmetic: (cosmeticId: string | null) => void;
  activeCosmetic: string | null;
}

const shopItems = {
    upgrades: [
        { id: 'relicBoost', nameKey: 'shop_item_relic_boost_name', descKey: 'shop_item_relic_boost_desc', bonusKey: 'shop_item_relic_boost_bonus', maxLevel: 10, cost: (level: number) => 1 + level * 2, getBonus: (level: number) => level * 5 },
        { id: 'timeBonusReduction', nameKey: 'shop_item_time_crystal_name', descKey: 'shop_item_time_crystal_desc', bonusKey: 'shop_item_time_crystal_bonus', maxLevel: 5, cost: (level: number) => 2 + level * 2, getBonus: (level: number) => level * 10 },
    ],
    cosmetics: [
        { id: 'cosmic', nameKey: 'shop_item_cosmic_bg_name', descKey: 'shop_item_cosmic_bg_desc', cost: 5 },
    ]
};

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, shards, shopPurchases, onBuyItem, onApplyCosmetic, activeCosmetic }) => {
    const { t } = useTranslation();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="pixel-box p-4 max-w-xl w-full mx-4 flex flex-col h-[80vh] max-h-[700px] bg-gray-800 border-gray-900 text-white" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <ShardIcon />
                    <h2 className="text-2xl text-shadow-hard text-sky-300">{t('shop_title')}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sky-300">
                        <ShardIcon />
                        <span className="font-bold text-2xl text-shadow-hard">{shards.toLocaleString()}</span>
                    </div>
                    <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('close_button')}>&times;</button>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto space-y-3 pr-2 -mr-2">
                    {shopItems.upgrades.map(item => {
                        const level = shopPurchases[`${item.id}Level` as keyof ShopPurchases] as number || 0;
                        const isMax = level >= item.maxLevel;
                        const cost = item.cost(level);
                        const canAfford = shards >= cost;

                        return (
                            <div key={item.id} className="pixel-box bg-gray-900/50 p-3 flex items-center gap-4">
                                <div className="flex-grow">
                                    <h3 className="text-md font-bold text-yellow-300">{t(item.nameKey)} <span className="text-sm text-gray-400">(Lvl {level}/{item.maxLevel})</span></h3>
                                    <p className="text-xs text-gray-400 mb-2">{t(item.descKey)}</p>
                                    <p className="text-sm font-bold text-green-400">{t(item.bonusKey, { value: item.getBonus(level) })}</p>
                                </div>
                                <div className="flex-shrink-0 w-28 text-center">
                                    {isMax ? (
                                        <p className="font-bold text-yellow-400">{t('shop_item_max_level')}</p>
                                    ) : (
                                        <button 
                                            onClick={() => onBuyItem(item.id, cost)}
                                            disabled={!canAfford}
                                            className="pixel-button bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed w-full py-2"
                                        >
                                            <p className="font-bold text-sm">{t('shop_item_buy_button')}</p>
                                            <p className="text-xs">{cost} {t('shard_name_plural')}</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <div className="border-t-2 border-gray-700 my-4"></div>
                    
                    {shopItems.cosmetics.map(item => {
                        const isOwned = shopPurchases.unlockedCosmetics.includes(item.id);
                        const isApplied = activeCosmetic === item.id;
                        const canAfford = shards >= item.cost;
                        
                        return (
                            <div key={item.id} className="pixel-box bg-gray-900/50 p-3 flex items-center gap-4">
                                <div className="flex-grow">
                                    <h3 className="text-md font-bold text-yellow-300">{t(item.nameKey)}</h3>
                                    <p className="text-xs text-gray-400">{t(item.descKey)}</p>
                                </div>
                                <div className="flex-shrink-0 w-28 text-center">
                                    {isOwned ? (
                                        isApplied ? (
                                            <p className="font-bold text-green-400">{t('shop_item_applied_cosmetic')}</p>
                                        ) : (
                                            <button 
                                                onClick={() => onApplyCosmetic(item.id)}
                                                className="pixel-button bg-green-600 hover:bg-green-500 w-full py-2 font-bold text-sm"
                                            >
                                                {t('shop_item_apply_cosmetic')}
                                            </button>
                                        )
                                    ) : (
                                        <button 
                                            onClick={() => onBuyItem(item.id, item.cost)}
                                            disabled={!canAfford}
                                            className="pixel-button bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed w-full py-2"
                                        >
                                            <p className="font-bold text-sm">{t('shop_item_buy_button')}</p>
                                            <p className="text-xs">{item.cost} {t('shard_name_plural')}</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                     <button 
                        onClick={() => onApplyCosmetic(null)}
                        disabled={activeCosmetic === null}
                        className="pixel-button bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:opacity-50 w-full mt-2 py-2 text-sm"
                    >
                        {t('shop_item_reset_cosmetic')}
                    </button>
                </div>
            </div>
        </div>
    );
};