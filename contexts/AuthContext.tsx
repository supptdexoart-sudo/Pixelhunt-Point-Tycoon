import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from 'react';
// FIX: Removed .ts extension from import
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  profiles: UserProfile[];
  createProfile: (name: string) => void;
  switchProfile: (uid: string) => void;
  deleteProfile: (uid: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_PROFILE: UserProfile = { uid: 'guest', displayName: 'Guest' };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([GUEST_PROFILE]);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('idleGame_profiles');
    const savedCurrentUser = localStorage.getItem('idleGame_currentUser');
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }

    if (savedCurrentUser) {
      setUser(JSON.parse(savedCurrentUser));
    } else {
      setUser(GUEST_PROFILE);
    }
  }, []);

  const createProfile = useCallback((name: string) => {
    if (name && !profiles.find(p => p.displayName === name)) {
      const newUser: UserProfile = {
        uid: `user_${Date.now()}`,
        displayName: name,
      };
      const newProfiles = [...profiles, newUser];
      setProfiles(newProfiles);
      localStorage.setItem('idleGame_profiles', JSON.stringify(newProfiles));
      switchProfile(newUser.uid);
    }
  }, [profiles]);

  const switchProfile = useCallback((uid: string) => {
    const profileToSwitch = profiles.find(p => p.uid === uid) || GUEST_PROFILE;
    setUser(profileToSwitch);
    localStorage.setItem('idleGame_currentUser', JSON.stringify(profileToSwitch));
  }, [profiles]);

  const deleteProfile = useCallback((uid: string) => {
    if (uid === 'guest' || uid === user?.uid) return;

    const newProfiles = profiles.filter(p => p.uid !== uid);
    setProfiles(newProfiles);
    localStorage.setItem('idleGame_profiles', JSON.stringify(newProfiles));
    localStorage.removeItem(`idleGame_save_${uid}`);
  }, [profiles, user]);

  const logout = useCallback(() => {
    switchProfile(GUEST_PROFILE.uid);
  }, [switchProfile]);

  const value = useMemo(() => ({ user, profiles, createProfile, switchProfile, deleteProfile, logout }), [user, profiles, createProfile, switchProfile, deleteProfile, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};