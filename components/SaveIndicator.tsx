import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface SaveIndicatorProps {
    state: 'idle' | 'saving' | 'saved';
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ state }) => {
    const { t } = useTranslation();

    const text = state === 'saving' ? t('save_indicator_saving') : t('save_indicator_saved');
    const color = state === 'saving' ? 'text-yellow-400' : 'text-green-400';
    
    let animationClass = '';
    if (state === 'saving') {
        animationClass = 'saving-pulse';
    } else if (state === 'saved') {
        animationClass = 'saved-pop';
    }

    return (
        <div className={`text-sm font-semibold transition-opacity duration-300 ${state !== 'idle' ? 'opacity-100' : 'opacity-0'} ${color}`}>
            {state !== 'idle' && (
                <span className={`inline-block ${animationClass}`}>
                    {text}
                </span>
            )}
        </div>
    );
}