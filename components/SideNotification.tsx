import React, { useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { SideNotification as SideNotificationType } from '../types';
import { RelicIcon } from './icons/RelicIcon';
import { ShardIcon } from './icons/ShardIcon';
import { ShipIcon } from './icons/ShipIcon';

interface SideNotificationProps {
  notification: SideNotificationType;
  onComplete: (id: number) => void;
}

export const SideNotification: React.FC<SideNotificationProps> = ({ notification, onComplete }) => {
  const { t } = useTranslation();
  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toFixed(0);
    const suffixes = ['', 'k', 'M', 'B', 'T', 'q', 'Q'];
    const i = Math.floor(Math.log10(num) / 3);
    if (i >= suffixes.length) return num.toExponential(2);
    return `${(num / Math.pow(1000, i)).toFixed(i > 0 ? 1 : 0)}${suffixes[i]}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(notification.id);
    }, 4000); // 4-second lifetime

    return () => clearTimeout(timer);
  }, [notification.id, onComplete]);

  let text, Icon, borderColor, textColor;

  switch (notification.type) {
    case 'relic':
      text = t('side_notification_relic', { count: notification.quantity });
      Icon = RelicIcon;
      borderColor = 'border-purple-500';
      textColor = 'text-purple-300';
      break;
    case 'shard':
      text = t('side_notification_shard', { count: notification.quantity });
      Icon = ShardIcon;
      borderColor = 'border-sky-500';
      textColor = 'text-sky-300';
      break;
    case 'ship':
      text = t('side_notification_ship', { count: formatNumber(notification.quantity) });
      Icon = () => <ShipIcon className="w-6 h-6 text-yellow-400" />;
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-300';
      break;
    default:
      return null;
  }

  return (
    <div className={`side-notification pixel-box ${borderColor} ${textColor}`}>
      <Icon />
      <span className="font-bold text-shadow-hard">{text}</span>
    </div>
  );
};
