import React from 'react';
import { PointIndicator as PointIndicatorType } from '../types';

interface PointIndicatorProps {
  indicator: PointIndicatorType;
  // FIX: Add onComplete prop to be called when the animation ends.
  onComplete: () => void;
}

export const PointIndicator: React.FC<PointIndicatorProps> = ({ indicator, onComplete }) => {
  let className = "point-indicator text-shadow-hard font-bold ";
  let innerClassName = "";

  if (indicator.type.startsWith('combo')) {
      innerClassName = "crit-pop-animation";
      if (indicator.type === 'combo1') className += "text-cyan-400 text-xl";
      else if (indicator.type === 'combo2') className += "text-yellow-400 text-2xl";
      else if (indicator.type === 'combo3') className += "text-purple-400 text-3xl";
      else className += "text-cyan-400 text-xl"; // Fallback for old 'combo' type
  } else {
    switch(indicator.type) {
      case 'bonus':
        className += "text-purple-400 text-2xl";
        break;
      case 'crit':
        className += "text-orange-400 text-2xl";
        innerClassName = "crit-pop-animation";
        break;
      case 'echo':
        className += "text-sky-300 text-base opacity-80";
        break;
      default: // 'click'
        className += "text-yellow-300 text-lg";
        break;
    }
  }


  return (
    <div
      className={className}
      style={{
        left: `${indicator.x}px`,
        top: `${indicator.y}px`,
      }}
      // FIX: Call onComplete when the CSS animation finishes.
      onAnimationEnd={onComplete}
    >
      <span className={innerClassName}>{indicator.value}</span>
    </div>
  );
};