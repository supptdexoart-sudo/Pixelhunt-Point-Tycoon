import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { SettingsIcon } from './icons/SettingsIcon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileIcon } from './icons/ProfileIcon';
import { BugIcon } from './icons/BugIcon';
import { useAuth } from '../contexts/AuthContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfileModal: () => void;
  onOpenTestPanel: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onOpenProfileModal, onOpenTestPanel }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="pixel-box p-4 max-w-md w-full mx-4 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <SettingsIcon />
            <h2 className="text-2xl text-shadow-hard text-gray-300">{t('settings_title')}</h2>
          </div>
          <button onClick={onClose} className="pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('settings_close_aria')}>&times;</button>
        </div>

        <div className="space-y-4">
          {/* Profile Section */}
          <div className="pixel-box bg-gray-900/50 p-3">
            <h3 className="text-lg text-yellow-300 text-shadow-hard mb-3">{t('settings_profile_section')}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ProfileIcon />
                <div>
                  <p className="text-xs text-gray-400">{t('profile_logged_in_as')}</p>
                  <p className="text-cyan-300 font-bold">{user?.displayName}</p>
                </div>
              </div>
              <button onClick={onOpenProfileModal} className="pixel-button bg-cyan-700 hover:bg-cyan-600 px-4 py-2 text-sm">
                {t('settings_open_profile_button')}
              </button>
            </div>
          </div>
          
          {/* Language Section */}
          <div className="pixel-box bg-gray-900/50 p-3">
            <h3 className="text-lg text-yellow-300 text-shadow-hard mb-3">{t('settings_language_section')}</h3>
            <div className="flex justify-center">
                <LanguageSwitcher />
            </div>
          </div>
          
          {/* Developer Section */}
          <div className="pixel-box bg-gray-900/50 p-3">
            <h3 className="text-lg text-yellow-300 text-shadow-hard mb-3">{t('settings_developer_section')}</h3>
            <button onClick={onOpenTestPanel} className="pixel-button bg-yellow-700 hover:bg-yellow-600 w-full flex items-center justify-center gap-2 py-2">
              <BugIcon />
              <span>{t('settings_open_test_panel_button')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};