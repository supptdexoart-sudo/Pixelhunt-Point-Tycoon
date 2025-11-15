import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { BugIcon } from './icons/BugIcon';

interface TestPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPoints: (amount: number) => void;
  onAddRelics: (amount: number) => void;
  onAddShards: (amount: number) => void;
  onTriggerDaily: () => void;
  onTriggerTimeBonus: () => void;
  onTriggerAdBonus: () => void;
  onSpawnFloatingReward: () => void;
  onTriggerRiftEvent: () => void;
  onResetGame: () => void;
  onUnlockPrestige: () => void;
  onCompleteExpeditions: () => void;
  onTriggerRelicDrop: () => void;
  onTriggerShardDrop: () => void;
  onAddRetainedLevels: () => void;
  onAddExpeditionMaterials: () => void;
  onResetIntros: () => void;
  onTestDestroyDiamond: () => void;
  onResetDailyQuests: () => void;
  onCompleteDailyQuests: () => void;
  onTriggerCorruptedDiamond: () => void;
}

export const TestPanel: React.FC<TestPanelProps> = ({
  isOpen, onClose, onAddPoints, onAddRelics, onAddShards, onTriggerDaily,
  onTriggerTimeBonus, onTriggerAdBonus, 
  onSpawnFloatingReward, onTriggerRiftEvent, onResetGame, onUnlockPrestige,
  onCompleteExpeditions, onTriggerRelicDrop, onTriggerShardDrop, onAddRetainedLevels,
  onAddExpeditionMaterials, onResetIntros, onTestDestroyDiamond,
  onResetDailyQuests, onCompleteDailyQuests, onTriggerCorruptedDiamond
}) => {
  const { t } = useTranslation();
  const [pointsAmount, setPointsAmount] = useState('1000');
  const [relicsAmount, setRelicsAmount] = useState('10');
  const [shardsAmount, setShardsAmount] = useState('1');
  const [isResetConfirmOpen, setResetConfirmOpen] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleAddPoints = () => {
    const amount = parseInt(pointsAmount, 10);
    if (!isNaN(amount)) onAddPoints(amount);
  };
  
  const handleAddRelics = () => {
    const amount = parseInt(relicsAmount, 10);
    if (!isNaN(amount)) onAddRelics(amount);
  };

  const handleAddShards = () => {
    const amount = parseInt(shardsAmount, 10);
    if (!isNaN(amount)) onAddShards(amount);
  };

  const handleResetConfirm = () => {
    onResetGame();
    setResetConfirmOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="stats-panel-overlay" onClick={onClose} aria-hidden="true"></div>}
      <div 
        className={`stats-panel pixel-box p-4 flex flex-col text-white ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-labelledby="test-panel-heading"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BugIcon />
            <h2 id="test-panel-heading" className="text-3xl text-shadow-hard text-yellow-300">{t('test_panel_title')}</h2>
          </div>
          <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1">&times;</button>
        </div>

        <div className="space-y-3 text-sm flex-grow pr-2 -mr-2 overflow-y-auto">
          {/* Resource Addition */}
          <div className="space-y-3">
            <div>
              <label htmlFor="points-input" className="block text-sm text-gray-400 mb-1 text-left">{t('test_add_points_label')}</label>
              <div className="flex gap-2 items-center">
                <input id="points-input" type="number" value={pointsAmount} onChange={(e) => setPointsAmount(e.target.value)} className="flex-grow bg-gray-900 border-2 border-gray-600 p-1 text-sm focus:outline-none focus:border-cyan-400 text-white" />
                <button onClick={handleAddPoints} className="pixel-button bg-cyan-600 px-3 py-1">{t('test_add_button')}</button>
              </div>
            </div>
            <div>
              <label htmlFor="relics-input" className="block text-sm text-gray-400 mb-1 text-left">{t('test_add_relics_label')}</label>
              <div className="flex gap-2 items-center">
                <input id="relics-input" type="number" value={relicsAmount} onChange={(e) => setRelicsAmount(e.target.value)} className="flex-grow bg-gray-900 border-2 border-gray-600 p-1 text-sm focus:outline-none focus:border-cyan-400 text-white" />
                <button onClick={handleAddRelics} className="pixel-button bg-purple-600 px-3 py-1">{t('test_add_button')}</button>
              </div>
            </div>
            <div>
              <label htmlFor="shards-input" className="block text-sm text-gray-400 mb-1 text-left">{t('test_add_shards_label')}</label>
              <div className="flex gap-2 items-center">
                <input id="shards-input" type="number" value={shardsAmount} onChange={(e) => setShardsAmount(e.target.value)} className="flex-grow bg-gray-900 border-2 border-gray-600 p-1 text-sm focus:outline-none focus:border-cyan-400 text-white" />
                <button onClick={handleAddShards} className="pixel-button bg-sky-500 px-3 py-1">{t('test_add_button')}</button>
              </div>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-700 my-4"></div>

          {/* Event Triggers */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onTriggerDaily} className="pixel-button bg-gray-700 p-2 w-full">{t('test_trigger_daily')}</button>
            <button onClick={onTriggerTimeBonus} className="pixel-button bg-gray-700 p-2 w-full">{t('test_trigger_time_bonus')}</button>
            <button onClick={onTriggerAdBonus} className="pixel-button bg-gray-700 p-2 w-full">{t('test_trigger_ad_bonus')}</button>
            <button onClick={onSpawnFloatingReward} className="pixel-button bg-gray-700 p-2 w-full">{t('test_trigger_floating_reward')}</button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={onTriggerRiftEvent} className="pixel-button bg-purple-900 hover:bg-purple-800 p-2 w-full">{t('test_trigger_rift_event')}</button>
            <button onClick={onTestDestroyDiamond} className="pixel-button bg-red-800 hover:bg-red-700 p-2 w-full">{t('test_destroy_diamond')}</button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={onResetDailyQuests} className="pixel-button bg-yellow-800 p-2 w-full">{t('test_reset_daily_quests')}</button>
            <button onClick={onCompleteDailyQuests} className="pixel-button bg-yellow-700 p-2 w-full">{t('test_complete_daily_quests')}</button>
          </div>
          <button onClick={onTriggerCorruptedDiamond} className="pixel-button bg-purple-800 hover:bg-purple-700 p-2 w-full mt-2">{t('test_trigger_corrupted_diamond')}</button>


          <div className="border-t-2 border-gray-700 my-4"></div>
          
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onTriggerRelicDrop} className="pixel-button bg-purple-600 p-2 w-full">{t('test_trigger_relic_drop')}</button>
            <button onClick={onTriggerShardDrop} className="pixel-button bg-sky-500 p-2 w-full">{t('test_trigger_shard_drop')}</button>
            <button onClick={onCompleteExpeditions} className="pixel-button bg-lime-700 hover:bg-lime-600 p-2 w-full">{t('test_complete_expeditions')}</button>
            <button onClick={onAddExpeditionMaterials} className="pixel-button bg-lime-800 p-2 w-full">{t('test_add_expedition_materials')}</button>
            <button onClick={onAddRetainedLevels} className="pixel-button bg-gray-600 p-2 w-full">{t('test_add_retained_levels')}</button>
            <button onClick={onResetIntros} className="pixel-button bg-gray-600 p-2 w-full">{t('test_reset_intro_modals')}</button>
          </div>
          <button onClick={onUnlockPrestige} className="pixel-button bg-purple-700 hover:bg-purple-600 p-2 w-full mt-2">{t('test_unlock_prestige')}</button>

          <div className="border-t-2 border-gray-700 my-4"></div>
          
          {/* Reset */}
          <button onClick={() => setResetConfirmOpen(true)} className="pixel-button bg-red-800 hover:bg-red-700 p-3 w-full font-bold">{t('test_reset_game')}</button>
        </div>
      </div>
      
      {isResetConfirmOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
            <div className="pixel-box p-6 text-center max-w-sm w-full">
                <h3 className="text-xl text-yellow-300 mb-2 text-shadow-hard">{t('test_reset_confirm_title')}</h3>
                <p className="text-sm text-gray-300 mb-6 leading-normal">{t('test_reset_confirm_text')}</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setResetConfirmOpen(false)} className="pixel-button bg-gray-600 hover:bg-gray-500 px-6 py-2">
                        {t('profile_delete_button_cancel')}
                    </button>
                    <button onClick={handleResetConfirm} className="pixel-button bg-red-700 hover:bg-red-600 px-6 py-2">
                        {t('profile_delete_button_confirm')}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};