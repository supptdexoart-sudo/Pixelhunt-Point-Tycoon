import React from 'react';
import { GameStats } from '../types';
import { StatsIcon } from './icons/StatsIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface StatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  pointsPerClick: number;
  pointsPerSecond: number;
  formatNumber: (num: number) => string;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ isOpen, onClose, stats, pointsPerClick, pointsPerSecond, formatNumber }) => {
  const { t } = useTranslation();

  const formatTime = (totalSeconds: number): string => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    let timeString = '';
    if (days > 0) timeString += `${days}${t('time_days')} `;
    if (hours > 0) timeString += `${hours}${t('time_hours')} `;
    if (minutes > 0) timeString += `${minutes}${t('time_minutes')} `;
    timeString += `${seconds}${t('time_seconds')}`;
    return timeString.trim() || `0${t('time_seconds')}`;
  };
  
  return (
    <>
      {isOpen && <div className="stats-panel-overlay" onClick={onClose} aria-hidden="true"></div>}
      <div 
        className={`stats-panel pixel-box p-4 flex flex-col text-white ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="stats-heading"
      >
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <StatsIcon />
                <h2 id="stats-heading" className="text-3xl text-shadow-hard text-cyan-300">{t('stats_title')}</h2>
            </div>
            <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('stats_close_aria')}>&times;</button>
        </div>
        
        <div className="space-y-3 text-sm flex-grow pr-2 -mr-2 overflow-y-auto">
            <h3 className="text-xl text-yellow-300 text-shadow-hard mt-4">{t('stats_lifetime')}</h3>
            <p>{t('stats_highest_points')}: <span className="text-yellow-300 float-right">{formatNumber(stats.highestPoints)}</span></p>
            <p>{t('stats_total_points')}: <span className="text-yellow-300 float-right">{formatNumber(stats.totalPointsEarned)}</span></p>
            <p>{t('stats_play_time')}: <span className="text-yellow-300 float-right">{formatTime(stats.playTime)}</span></p>
            <p>{t('stats_upgrades_purchased')}: <span className="text-yellow-300 float-right">{stats.upgradesPurchased.toLocaleString()}</span></p>

            <h3 className="text-xl text-yellow-300 text-shadow-hard mt-4">{t('stats_clicks')}</h3>
            <p>{t('stats_total_clicks')}: <span className="text-yellow-300 float-right">{stats.totalClicks.toLocaleString()}</span></p>
            <p>{t('stats_manual_points')}: <span className="text-yellow-300 float-right">{formatNumber(stats.manualPointsEarned)}</span></p>
            <p>{t('stats_ppc')}: <span className="text-yellow-300 float-right">{formatNumber(pointsPerClick)}</span></p>
            <p>{t('stats_pps')}: <span className="text-yellow-300 float-right">{formatNumber(pointsPerSecond)}</span></p>

            <h3 className="text-xl text-yellow-300 text-shadow-hard mt-4">{t('stats_prestige')}</h3>
            <p>{t('stats_times_prestiged')}: <span className="text-yellow-300 float-right">{stats.timesPrestiged.toLocaleString()}</span></p>
            <p>{t('stats_total_relics_earned')}: <span className="text-yellow-300 float-right">{stats.totalRelicsEarned.toLocaleString()}</span></p>
            <p>{t('stats_total_shards')}: <span className="text-sky-300 float-right">{(stats.shards || 0).toLocaleString()}</span></p>

            <h3 className="text-xl text-yellow-300 text-shadow-hard mt-4">{t('stats_activities')}</h3>
            <p>{t('stats_daily_rewards')}: <span className="text-yellow-300 float-right">{stats.dailyRewardsClaimed.toLocaleString()}</span></p>
            <p>{t('stats_time_bonuses_claimed')}: <span className="text-yellow-300 float-right">{(stats.timeBonusesClaimed || 0).toLocaleString()}</span></p>
            <p>{t('stats_ads_watched')}: <span className="text-yellow-300 float-right">{(stats.adsWatched || 0).toLocaleString()}</span></p>
            <p>{t('stats_current_streak')}: <span className="text-yellow-300 float-right">{t('stats_streak_value', { count: stats.consecutiveDays })}</span></p>
        </div>
      </div>
    </>
  );
};