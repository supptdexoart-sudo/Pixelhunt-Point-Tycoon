import React, { useState, useMemo, FC } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { PrestigeUpgrade } from '../types';
import { GuardianIcon } from './icons/GuardianIcon';
import { AlchemistIcon } from './icons/AlchemistIcon';
import { ProspectorIcon } from './icons/ProspectorIcon';

interface SkillDetailModalProps {
  upgrade: PrestigeUpgrade;
  currentRelics: number;
  onBuy: (id: string) => void;
  onClose: () => void;
}

const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ upgrade, currentRelics, onBuy, onClose }) => {
  const { t } = useTranslation();
  const cost = upgrade.cost(upgrade.level);
  const isMaxLevel = upgrade.level >= upgrade.maxLevel;
  const canAfford = currentRelics >= cost;
  
  const pathColors: Record<PrestigeUpgrade['path'], { text: string, button: string }> = {
    guardian: { text: 'text-cyan-300', button: 'bg-cyan-600 hover:bg-cyan-500' },
    alchemist: { text: 'text-violet-400', button: 'bg-violet-600 hover:bg-violet-500' },
    prospector: { text: 'text-green-400', button: 'bg-green-600 hover:bg-green-500' },
  };

  const colorClasses = pathColors[upgrade.path];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[55] p-4" onClick={onClose}>
      <div className="pixel-box p-6 w-full max-w-sm text-center relative text-white" onClick={(e) => e.stopPropagation()}>
        <h3 className={`text-xl font-bold ${colorClasses.text} mb-2 text-shadow-hard`}>{t(upgrade.nameKey)}</h3>
        <p className="text-sm text-gray-400 mb-4 h-16">{t(upgrade.descKey)}</p>
        
        <div className="bg-gray-900/50 border-2 border-gray-900 p-4 mb-6 space-y-3 text-left">
          <p className="text-sm">{t('skill_tooltip_level')}: <span className="text-yellow-300 float-right">{upgrade.level} / {upgrade.maxLevel}</span></p>
          <p className="text-sm">{t('skill_tooltip_bonus')}: <span className="text-green-400 float-right">{upgrade.formatBonus(upgrade.getBonus(upgrade.level))}</span></p>
          {!isMaxLevel && (
            <p className="text-sm">{t('skill_tooltip_next_bonus')}: <span className="text-green-400 float-right">{upgrade.formatBonus(upgrade.getBonus(upgrade.level + 1))}</span></p>
          )}
        </div>

        {isMaxLevel ? (
          <p className="text-yellow-400 font-bold text-center h-12 flex items-center justify-center">{t('skill_tooltip_max_level')}</p>
        ) : (
          <button 
            onClick={() => { onBuy(upgrade.id); onClose(); }}
            disabled={!canAfford}
            className={`pixel-button w-full ${canAfford ? colorClasses.button : ''} disabled:bg-gray-600 disabled:opacity-50 h-12`}
          >
            {`${t('prestige_buy_button')} (${cost} ${t('relic_name')})`}
          </button>
        )}
        
        <button
          onClick={onClose}
          className="w-full mt-4 pixel-button bg-gray-600 hover:bg-gray-500 py-2"
        >
          {t('close_button')}
        </button>
      </div>
    </div>
  );
};

interface SkillNodeProps {
  upgrade: PrestigeUpgrade;
  allUpgrades: PrestigeUpgrade[];
  currentRelics: number;
  onSelect: (id: string) => void;
  wasJustPurchased: boolean;
}

const SkillNode: FC<SkillNodeProps> = ({ upgrade, allUpgrades, currentRelics, onSelect, wasJustPurchased }) => {
    const cost = upgrade.cost(upgrade.level);
    const isMaxLevel = upgrade.level >= upgrade.maxLevel;
    const canAfford = currentRelics >= cost;

    const isLocked = useMemo(() => {
        if (!upgrade.requires) return false;
        return upgrade.requires.some(reqId => {
            const reqUpg = allUpgrades.find(u => u.id === reqId);
            return !reqUpg || reqUpg.level === 0;
        });
    }, [upgrade.requires, allUpgrades]);

    let nodeClass = `skill-node pixel-button path-${upgrade.path} `;
    if (isLocked) {
        nodeClass += 'locked';
    } else if (isMaxLevel) {
        nodeClass += 'maxed';
    } else if (canAfford) {
        nodeClass += 'affordable';
    } else {
        nodeClass += 'unaffordable';
    }

    if (wasJustPurchased) {
        nodeClass += ' flash-success';
    }

    const handleNodeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent the click from bubbling up to parent containers
        if (!isLocked) {
            onSelect(upgrade.id);
        }
    };

    return (
        <div 
            className="skill-node-wrapper"
            style={{ left: `${upgrade.position.x}%`, top: `${upgrade.position.y}%` }}
        >
            <button
                className={nodeClass}
                onClick={handleNodeClick}
            >
                <div className="skill-level-indicator">{upgrade.level}/{upgrade.maxLevel}</div>
            </button>
        </div>
    )
}

type RogueClass = 'guardian' | 'alchemist' | 'prospector';

interface PrestigeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  relicsToGain: number;
  currentRelics: number;
  currentShards: number;
  allTrees: { [key: string]: PrestigeUpgrade[] };
  activeTreeState: PrestigeUpgrade[];
  rogueClass: string | null;
  onBuyUpgrade: (upgradeId: string) => void;
  justPurchasedUpgradeId: string | null;
  timesPrestiged: number;
  prestigeMultiplier: number;
  multiplierIncrease: number;
}

export const PrestigeModal: React.FC<PrestigeModalProps> = ({ 
    isOpen, onClose, onConfirm, relicsToGain, currentRelics, currentShards, allTrees, activeTreeState, rogueClass,
    onBuyUpgrade, justPurchasedUpgradeId, timesPrestiged, prestigeMultiplier, multiplierIncrease 
}) => {
  const { t } = useTranslation();
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const newBonuses = useMemo(() => {
      return activeTreeState
          .filter(upg => upg.level > 0)
          .map(upg => ({
              nameKey: upg.nameKey,
              bonusText: upg.formatBonus(upg.getBonus(upg.level))
          }));
  }, [activeTreeState]);

  const handleClose = () => {
      onClose();
      setSelectedSkillId(null);
  }

  if (!isOpen) return null;
  
  // This case should not happen with the current game flow, but it's a safe fallback.
  if (!rogueClass) {
     return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleClose}>
             <div className="pixel-box p-4 max-w-5xl w-full relative flex flex-col h-[90vh] max-h-[800px] text-white" onClick={(e) => e.stopPropagation()}>
                <p>Error: No class selected.</p>
             </div>
        </div>
    );
  }

  const treeToDisplay = allTrees[rogueClass];
  const upgradesForSelectedTree = activeTreeState;

  const selectedSkill = selectedSkillId ? upgradesForSelectedTree.find(upg => upg.id === selectedSkillId) : null;

  const connectors = treeToDisplay.flatMap(upg =>
    (upg.requires || []).map(reqId => {
      const reqUpg = upgradesForSelectedTree.find(u => u.id === reqId);
      if (!reqUpg) return null;

      const p1 = upg.position;
      const p2 = treeToDisplay.find(u => u.id === reqId)!.position;
      const isUnlocked = reqUpg.level > 0;

      return { id: `${reqId}-${upg.id}`, p1, p2, isUnlocked, path: upg.path };
    }).filter(Boolean)
  );
  
  const classInfo: { [key: string]: { icon: React.FC<any>, color: string, nameKey: string } } = {
    guardian: { icon: GuardianIcon, color: 'text-cyan-400', nameKey: 'rogue_class_guardian_name' },
    alchemist: { icon: AlchemistIcon, color: 'text-purple-400', nameKey: 'rogue_class_alchemist_name' },
    prospector: { icon: ProspectorIcon, color: 'text-green-400', nameKey: 'rogue_class_prospector_name' },
  };

  const CurrentClassIcon = classInfo[rogueClass].icon;
  const currentClassColor = classInfo[rogueClass].color;
  const currentClassNameKey = classInfo[rogueClass].nameKey;


  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="pixel-box p-4 max-w-5xl w-full relative flex flex-col h-[90vh] max-h-[800px] text-white" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-2 right-2 pixel-button bg-red-700 text-lg px-3 py-1 z-20" aria-label={t('prestige_close_aria')}>&times;</button>
        
        {/* Top Action Bar */}
        <div className="flex-shrink-0 w-full flex flex-wrap items-center justify-between gap-4 p-2 border-b-4 border-gray-900 mb-4">
            <h2 className="text-2xl text-shadow-hard text-purple-400 w-full sm:w-auto text-center sm:text-left">{t('prestige_hub_title')}</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Currencies */}
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="text-sm text-gray-400">{t('prestige_relics_available')}</p>
                        <p className="text-2xl text-purple-300 font-bold">{currentRelics.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-400">{t('shard_name_plural')}</p>
                        <p className="text-2xl text-sky-300 font-bold">{(currentShards || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-900/50 border-2 border-gray-900 p-2 text-center">
                        <p className="text-sm text-gray-400">{t('prestige_relics_to_gain')}</p>
                        <p className="text-xl text-green-400 font-bold">+{relicsToGain.toLocaleString()}</p>
                    </div>
                </div>

                {/* New Multiplier Info */}
                {timesPrestiged > 0 || relicsToGain > 0 || newBonuses.length > 0 ? (
                    <div className="pixel-box bg-gray-900/50 p-2 text-xs text-center border-2 border-yellow-800">
                        <p className="text-sm text-yellow-400 mb-1">{t('prestige_multiplier_current')}</p>
                        <p className="text-base font-bold text-white mb-2">+{((prestigeMultiplier) * 100).toFixed(2)}%</p>
                        <p className="text-sm text-green-400">{t('prestige_multiplier_gain')}</p>
                        <p className="text-base font-bold text-green-300 mb-2">+{((multiplierIncrease) * 100).toFixed(2)}%</p>
                        <div className="border-t border-gray-600 my-1"></div>
                        <p className="text-sm text-yellow-300">{t('prestige_multiplier_total')}</p>
                        <p className="text-lg font-bold text-yellow-200 mb-2">+{((prestigeMultiplier + multiplierIncrease) * 100).toFixed(2)}%</p>

                        {newBonuses.length > 0 && (
                            <>
                                <div className="border-t border-gray-600 my-1"></div>
                                <p className="text-sm text-yellow-300">{t('prestige_skills_for_next_run')}</p>
                                <div className="text-left text-xs mt-1 space-y-1">
                                    {newBonuses.map(bonus => (
                                        <div key={bonus.nameKey} className="flex justify-between gap-2">
                                            <span className="text-gray-300">{t(bonus.nameKey)}</span>
                                            <span className="font-bold text-green-300 whitespace-nowrap">{bonus.bonusText}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : null}
            </div>

            <div className="w-full sm:w-auto flex items-center justify-center">
                <button
                    onClick={onConfirm}
                    disabled={relicsToGain <= 0}
                    className="w-full sm:w-auto pixel-button bg-green-700 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed py-2 px-4 text-base font-bold"
                >
                    {t('prestige_confirm_button')}
                </button>
            </div>
        </div>

        {/* Main Skill Tree Area */}
        <div className="flex-grow pixel-box bg-gray-900/50 relative flex flex-col min-h-0" onClick={() => setSelectedSkillId(null)}>
            <div className="px-4 pt-2 flex-shrink-0 flex justify-center items-center border-b-2 border-gray-700 mb-2 pb-2">
                <CurrentClassIcon className={`w-8 h-8 mr-3 ${currentClassColor}`} />
                <h3 className={`text-xl ${currentClassColor} text-shadow-hard`}>{t(currentClassNameKey)}</h3>
            </div>
            <div className="w-full flex-grow relative overflow-auto">
              <div className="relative w-full min-h-[600px]">
                {/* Connectors */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    {connectors.map(conn => (
                        <line 
                            key={conn!.id}
                            x1={`${conn!.p1.x}%`} y1={`${conn!.p1.y}%`}
                            x2={`${conn!.p2.x}%`} y2={`${conn!.p2.y}%`}
                            className={`skill-connector ${conn!.isUnlocked ? 'unlocked' : ''} path-${conn!.path}`}
                        />
                    ))}
                </svg>

                {/* Nodes */}
                {upgradesForSelectedTree.map(upg => (
                    <SkillNode
                        key={upg.id}
                        upgrade={upg}
                        allUpgrades={upgradesForSelectedTree}
                        currentRelics={currentRelics}
                        onSelect={setSelectedSkillId}
                        wasJustPurchased={justPurchasedUpgradeId === upg.id}
                    />
                ))}
              </div>
            </div>
        </div>
      </div>
      {selectedSkill && (
        <SkillDetailModal
          upgrade={selectedSkill}
          currentRelics={currentRelics}
          onBuy={onBuyUpgrade}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
    </div>
  );
};
