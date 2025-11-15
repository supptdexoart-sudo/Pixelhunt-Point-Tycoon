import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface GenesisDiamondProps {
    onComplete: () => void;
}

const CRACKS_TO_AWAKEN = 10;

const CrackPaths = [
  <path key="c1" d="M16 4 L16 14 L12 18 L14 20 L16 18 L16 28" />,
  <path key="c2" d="M16 14 L20 12 L22 16 L20 18 L16 16" />,
  <path key="c3" d="M16 8 L10 12 L12 18" />,
  <path key="c4" d="M14 22 L11 20 L9 24 L13 26 Z" />,
  <path key="c5" d="M11 12 L8 14 L6 12 L8 10 Z" />,
  <path key="c6" d="M20 12 L24 10 L26 12 L24 14 Z" />,
  <path key="c7" d="M16 14 L18 10 L20 12" />,
  <path key="c8" d="M16 18 L18 22 L20 20" />,
  <path key="c9" d="M12 18 L10 22 L8 20" />,
  <path key="c10" d="M10 12 L8 8 L6 10" />,
];

export const GenesisDiamond: React.FC<GenesisDiamondProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [clicks, setClicks] = useState(0);

    const handleClick = () => {
        const newClicks = clicks + 1;
        if (newClicks >= CRACKS_TO_AWAKEN) {
            setClicks(newClicks); // Update state to show full progress bar before completing
            setTimeout(onComplete, 200); // Give a moment for the final state to render
        } else {
            setClicks(newClicks);
        }
    };

    const progress = (clicks / CRACKS_TO_AWAKEN) * 100;
    const colors = ['#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#101010'];

    return (
        <div 
            className="fixed inset-0 flex flex-col items-center justify-center p-4 clicker-zone bg-gray-900"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={t('genesis_prompt')}
        >
            <div className="absolute top-[20%] text-center">
                <p className="text-lg text-yellow-300 text-shadow-hard animate-pulse">{t('genesis_prompt')}</p>
            </div>
            
            <div className="w-full max-w-xs h-auto aspect-square sm:max-w-sm mx-auto relative flex items-center justify-center">
                <div className="w-full h-full relative">
                    <div className="diamond-pedestal" style={{width: '85%', height: '40px' }}></div>
                    <div className="genesis-diamond-wrapper">
                        <div className="genesis-diamond-inner">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 32 32" 
                                shapeRendering="crispEdges" 
                                className={`genesis-diamond-svg ${clicks > 0 ? 'awakening' : ''}`}
                            >
                                {/* This is the Onyx diamond SVG from DynamicDiamond, but desaturated */}
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
                            <svg className="genesis-crack-overlay" viewBox="0 0 32 32" shapeRendering="crispEdges">
                                {CrackPaths.map((path, i) => (
                                    React.cloneElement(path, {
                                        style: {
                                            opacity: clicks > i ? 1 : 0,
                                            strokeDashoffset: clicks > i ? 0 : 100,
                                        }
                                    })
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[15%] w-full max-w-md px-4">
                <p className="text-sm text-gray-400 mb-1 text-center">{t('genesis_progress')}</p>
                <div className="genesis-progress-bar-bg">
                    <div className="genesis-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};