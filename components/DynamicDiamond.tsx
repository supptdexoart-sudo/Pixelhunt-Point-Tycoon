import React from 'react';

interface DynamicDiamondProps {
    level: number;
    hpPercentage: number;
    isShaking: boolean;
    isExploding: boolean;
    isHit?: boolean;
}

const DIAMOND_CONFIG = [
    // Diamond
    { level: 0, nameKey: 'diamond_name_diamond', colors: ['#ffffff', '#dffcff', '#a5f3fc', '#6ee7f7', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#164e63'], baseHp: 100, bonusMultiplier: 15 },
    // Amethyst
    { level: 1, nameKey: 'diamond_name_amethyst', colors: ['#ffffff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#581c87'], baseHp: 250, bonusMultiplier: 30 },
    // Emerald
    { level: 2, nameKey: 'diamond_name_emerald', colors: ['#ffffff', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#064e3b'], baseHp: 500, bonusMultiplier: 60 },
    // Ruby
    { level: 3, nameKey: 'diamond_name_ruby', colors: ['#ffffff', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#7f1d1d'], baseHp: 1000, bonusMultiplier: 120 },
    // Onyx
    { level: 4, nameKey: 'diamond_name_onyx', colors: ['#ffffff', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717'], baseHp: 2500, bonusMultiplier: 250 },
];

const DiamondSVG: React.FC<{ colors: string[] }> = ({ colors }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shapeRendering="crispEdges" className="w-full h-full">
        <path fill={colors[0]} d="M16 4h1v1h-1z M15 5h1v1h-1z M17 5h1v1h-1z M14 6h1v1h-1z M18 6h1v1h-1z M16 7h1v1h-1z" />
        <path fill={colors[1]} d="M15 4h1v1h-1z M17 4h1v1h-1z M16 5h1v1h-1z M13 6h1v1h-1z M15 6h1v1h-1z M17 6h1v1h-1z M19 6h1v1h-1z M12 7h1v1h-1z M14 7h2v1h-2z M17 7h2v1h-2z M11 8h1v1h-1z M13 8h1v1h-1z M16 8h1v1h-1z M20 8h1v1h-1z M12 9h1v1h-1z M19 9h1v1h-1z M11 10h1v1h-1z M20 10h1v1h-1z M12 11h1v1h-1z M19 11h1v1h-1z M11 12h1v1h-1z M20 12h1v1h-1z M10 14h1v1h-1z M21 14h1v1h-1z M9 16h1v1h-1z M22 16h1v1h-1z M10 18h1v1h-1z M21 18h1v1h-1z M11 20h1v1h-1z M20 20h1v1h-1z M12 22h1v1h-1z M19 22h1v1h-1z M13 24h1v1h-1z M18 24h1v1h-1z M14 26h1v1h-1z M17 26h1v1h-1z M15 28h1v1h-1z" />
        <path fill={colors[2]} d="M14 5h1v1h-1z M18 5h1v1h-1z M12 6h1v1h-1z M11 7h1v1h-1z M19 7h1v1h-1z M10 8h1v1h-1z M21 8h1v1h-1z M9 9h2v1H9z M21 9h1v1h-1z M10 10h1v1h-1z M9 11h2v1H9z M21 11h1v1h-1z M10 12h1v1h-1z M21 12h1v1h-1z M9 13h1v1H9z M22 13h1v1h-1z M11 14h1v1h-1z M20 14h1v1h-1z M12 15h1v1h-1z M19 15h1v1h-1z M11 16h1v1h-1z M20 16h1v1h-1z M12 17h1v1h-1z M19 17h1v1h-1z M11 18h1v1h-1z M20 18h1v1h-1z M12 19h1v1h-1z M19 19h1v1h-1z M12 20h1v1h-1z M19 20h1v1h-1z M13 21h1v1h-1z M18 21h1v1h-1z M14 22h1v1h-1z M17 22h1v1h-1z M13 23h1v1h-1z M18 23h1v1h-1z M15 24h1v1h-1z M16 24h1v1h-1z M14 25h1v1h-1z M17 25h1v1h-1z M16 26h1v1h-1z M16 27h1v1h-1z" />
        <path fill={colors[3]} d="M16 6h2v1h-2z M10 7h1v1h-1z M13 7h1v1h-1z M20 7h1v1h-1z M12 8h1v1h-1z M14 8h2v1h-2z M17 8h3v1h-3z M11 9h1v1h-1z M13 9h1v1h-1z M18 9h1v1h-1z M12 10h2v1h-2z M18 10h2v1h-2z M13 11h1v1h-1z M18 11h1v1h-1z M12 12h2v1h-2z M18 12h2v1h-2z M10 13h2v1h-2z M20 13h2v1h-2z M12 14h2v1h-2z M18 14h2v1h-2z M13 15h1v1h-1z M18 15h1v1h-1z M12 16h2v1h-2z M18 16h2v1h-2z M13 17h1v1h-1z M18 17h1v1h-1z M13 18h2v1h-2z M17 18h2v1h-2z M13 19h1v1h-1z M18 19h1v1h-1z M14 20h1v1h-1z M17 20h1v1h-1z M13 22h1v1h-1z M18 22h1v1h-1z M14 23h1v1h-1z M17 23h1v1h-1z M15 25h2v1h-2z M15 26h1v1h-1z M15 27h1v1h-1z" />
        <path fill={colors[4]} d="M11 6h1v1h-1z M18 7h1v1h-1z M10 9h1v1h-1z M14 9h4v1h-4z M20 9h1v1h-1z M11 11h1v1h-1z M14 11h4v1h-4z M20 11h1v1h-1z M9 12h1v1H9z M22 12h1v1h-1z M8 14h2v1H8z M14 14h4v1h-4z M22 14h1v1h-1z M10 15h2v1h-2z M20 15h2v1h-2z M8 16h1v1H8z M14 16h4v1h-4z M23 16h1v1h-1z M10 17h2v1h-2z M20 17h2v1h-2z M12 18h1v1h-1z M18 18h1v1h-1z M14 19h4v1h-4z M15 20h2v1h-2z M14 21h4v1h-4z M15 22h2v1h-2z M16 23h2v1h-2z M16 25h1v1h-1z" />
        <path fill={colors[5]} d="M14 10h4v1h-4z M13 12h1v1h-1z M18 12h1v1h-1z M11 13h2v1h-1v1h-1v-2z M19 13h2v1h-2z M13 14h1v1h-1z M18 14h1v1h-1z M11 15h1v1h-1z M14 15h4v1h-4z M20 15h1v1h-1z M10 16h1v1h-1z M13 16h1v1h-1z M18 16h1v1h-1z M21 16h1v1h-1z M11 17h2v1h-2z M19 17h2v1h-2z M15 18h2v1h-2z M13 20h1v1h-1z M18 20h1v1h-1z M14 24h1v1h-1z M17 24h1v1h-1z" />
        <path fill={colors[6]} d="M12 13h1v1h-1z M19 13h1v1h-1z M10 14h1v1h-1z M21 14h1v1h-1z M12 15h1v1h-1z M19 15h1v1h-1z M11 16h1v1h-1z M20 16h1v1h-1z M12 17h1v1h-1z M19 17h1v1h-1z M12 18h1v1h-1z M15 18h1v1h-1z M17 18h2v1h-2z M12 19h1v1h-1z M19 19h1v1h-1z M13 20h1v1h-1z M18 20h1v1h-1z M13 21h1v1h-1z M18 21h1v1h-1z M14 22h1v1h-1z M17 22h1v1h-1z M15 23h1v1h-1z M13 24h1v1h-1z M18 24h1v1h-1z M14 25h1v1h-1z M17 25h1v1h-1z M15 26h1v1h-1z M16 26h1v1h-1z M16 27h1v1h-1z" />
        <path fill={colors[7]} d="M16 12h1v1h-1z M15 13h2v1h-2z M14 17h1v1h-1z M17 17h1v1h-1z M15 19h1v1h-1z M16 20h1v1h-1z" />
        <path fill={colors[8]} d="M16 12h1v1h-1z M15 13h2v1h-2z M14 17h1v1h-1z M17 17h1v1h-1z M15 19h1v1h-1z M16 20h1v1h-1z" />
    </svg>
);

export const DynamicDiamond: React.FC<DynamicDiamondProps> = ({ level, hpPercentage, isShaking, isExploding, isHit }) => {
    const config = getDiamondConfig(level);
    
    // Diamond shrinks slightly as it takes damage
    const scale = 1 - ( (100 - hpPercentage) / 100 ) * 0.1;
    
    // Damage glow grows as HP decreases
    const glowScale = (100 - hpPercentage) / 100;
    
    const glowColor = config.colors[4]; // Pick a vibrant color from the palette for the main glow

    return (
        <div 
            className={`diamond-container ${isShaking ? 'shake' : ''} ${isHit ? 'hit-flash' : ''}`}
            style={{ '--diamond-scale': scale } as React.CSSProperties}
        >
            <div
                className="gem-wrapper"
                style={{ '--glow-color': glowColor } as React.CSSProperties}
            >
                <div className="absolute inset-0">
                    <DiamondSVG colors={config.colors} />
                </div>
                <div
                    className={`damage-glow ${isExploding ? 'exploding' : ''}`}
                    style={{ '--glow-scale': glowScale } as React.CSSProperties}
                ></div>
            </div>
        </div>
    );
};

export const getDiamondConfig = (level: number) => DIAMOND_CONFIG[level % DIAMOND_CONFIG.length];
export const getDiamondConfigCount = () => DIAMOND_CONFIG.length;