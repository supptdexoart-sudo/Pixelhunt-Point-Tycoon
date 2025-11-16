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
  onTriggerSharpeningStone: () => void;
}

export const TestPanel: React.FC<TestPanelProps> = ({
  isOpen, onClose, onAddPoints, onAddRelics, onAddShards, onTriggerDaily,
  onTriggerTimeBonus, onTriggerAdBonus, 
  onSpawnFloatingReward, onTriggerRiftEvent, onResetGame, onUnlockPrestige,
  onCompleteExpeditions, onTriggerRelicDrop, onTriggerShardDrop, onAddRetainedLevels,
  onAddExpeditionMaterials, onResetIntros, onTestDestroyDiamond,
  onResetDailyQuests, onCompleteDailyQuests, onTriggerCorruptedDiamond, onTriggerSharpeningStone
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
