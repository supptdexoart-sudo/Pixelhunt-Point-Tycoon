import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { GuardianIcon } from './icons/GuardianIcon';
import { AlchemistIcon } from './icons/AlchemistIcon';
import { ProspectorIcon } from './icons/ProspectorIcon';

interface RogueClassSelectionModalProps {
  isOpen: boolean;
  onSelectClass: (className: 'guardian' | 'alchemist' | 'prospector') => void;
}

const classes = [
  { id: 'guardian', nameKey: 'rogue_class_guardian_name', descKey: 'rogue_class_guardian_desc', icon: GuardianIcon, color: 'border-cyan-500' },
  { id: 'alchemist', nameKey: 'rogue_class_alchemist_name', descKey: 'rogue_class_alchemist_desc', icon: AlchemistIcon, color: 'border-purple-500' },
  { id: 'prospector', nameKey: 'rogue_class_prospector_name', descKey: 'rogue_class_prospector_desc', icon: ProspectorIcon, color: 'border-yellow-500' },
] as const;


export const RogueClassSelectionModal: React.FC<RogueClassSelectionModalProps> = ({ isOpen, onSelectClass }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 p-4 overflow-y-auto">
      <div className="flex flex-col items-center justify-start sm:justify-center min-h-full">
        <div className="text-center my-4 sm:my-0 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl text-shadow-hard text-yellow-300 mb-2">{t('rogue_class_selection_title')}</h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">{t('rogue_class_selection_desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
          {classes.map(cls => (
            <div key={cls.id} className={`pixel-box p-4 sm:p-6 text-center text-white flex flex-col items-center border-4 ${cls.color}`}>
              <cls.icon className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl text-shadow-hard mb-2 sm:mb-3">{t(cls.nameKey)}</h2>
              <p className="text-xs text-gray-400 flex-grow mb-4 sm:mb-6 leading-normal">{t(cls.descKey)}</p>
              <button
                onClick={() => onSelectClass(cls.id)}
                className="w-full bg-green-600 hover:bg-green-500 text-gray-900 font-bold text-lg py-3 px-4 pixel-button"
              >
                {t('rogue_class_select_button')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};