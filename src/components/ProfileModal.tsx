import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, profiles, createProfile, switchProfile, logout, deleteProfile } = useAuth();
  const [newProfileName, setNewProfileName] = useState('');
  const [profileToDelete, setProfileToDelete] = useState<UserProfile | null>(null);
  
  if (!isOpen) return null;
  
  const handleCreate = () => {
    if (newProfileName.trim()) {
      createProfile(newProfileName.trim());
      setNewProfileName('');
    }
  };

  const confirmDelete = () => {
    if (profileToDelete) {
        deleteProfile(profileToDelete.uid);
        setProfileToDelete(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="pixel-box p-6 text-center max-w-sm w-full relative text-white">
          <button onClick={onClose} className="absolute top-2 right-2 pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('profile_close_aria')}>&times;</button>
          <h2 className="text-2xl text-shadow-hard text-yellow-300 mb-4">{t('profile_title')}</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">{t('profile_logged_in_as')}</p>
            <p className="text-lg text-cyan-300 font-bold">{user?.displayName}</p>
          </div>

          <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
              {profiles.filter(p => p.uid !== user?.uid).map(profile => {
                  const canDelete = profile.uid !== 'guest';
                  return (
                    <div key={profile.uid} className="flex gap-2">
                        <button onClick={() => switchProfile(profile.uid)} className="flex-grow w-full pixel-button bg-gray-600 p-2 text-sm">
                            {t('profile_switch_to')} {profile.displayName}
                        </button>
                        {canDelete && (
                            <button
                                onClick={() => setProfileToDelete(profile)}
                                className="pixel-button bg-red-800 hover:bg-red-700 p-2"
                                aria-label={t('profile_delete_aria', { profileName: profile.displayName })}
                            >
                                <TrashIcon />
                            </button>
                        )}
                    </div>
                  );
              })}
          </div>

          <div className="flex gap-2 mb-4">
              <input type="text" value={newProfileName} onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder={t('profile_enter_name')}
                  className="flex-grow bg-gray-900 border-2 border-gray-600 p-2 text-sm focus:outline-none focus:border-cyan-400" />
              <button onClick={handleCreate} className="pixel-button bg-green-600 px-4 text-sm">{t('profile_create_button')}</button>
          </div>
          
          {user?.uid !== 'guest' && (
              <button onClick={logout} className="w-full pixel-button bg-yellow-600 p-2 text-sm">{t('profile_logout')}</button>
          )}
        </div>
      </div>

      {profileToDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
            <div className="pixel-box p-6 text-center max-w-sm w-full">
                <h3 className="text-xl text-yellow-300 mb-2 text-shadow-hard">{t('profile_delete_confirm_title')}</h3>
                <p className="text-sm text-gray-300 mb-6 leading-normal">{t('profile_delete_confirm_text', { profileName: profileToDelete.displayName })}</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setProfileToDelete(null)} className="pixel-button bg-gray-600 hover:bg-gray-500 px-6 py-2">
                        {t('profile_delete_button_cancel')}
                    </button>
                    <button onClick={confirmDelete} className="pixel-button bg-red-700 hover:bg-red-600 px-6 py-2">
                        {t('profile_delete_button_confirm')}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};