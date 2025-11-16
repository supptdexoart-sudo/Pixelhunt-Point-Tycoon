import React from 'react';
import { SharpeningStoneEvent as SharpeningStoneEventType } from '../types';
import { SharpeningStoneIcon } from './icons/SharpeningStoneIcon';

interface SharpeningStoneEventProps {
  stone: SharpeningStoneEventType;
  onClick: (stone: SharpeningStoneEventType, x: number, y: number) => void;
}

export const SharpeningStoneEvent: React.FC<SharpeningStoneEventProps> = ({ stone, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(stone, e.clientX, e.clientY);
  };

  return (
    <button
      className="sharpening-stone"
      style={{
        left: `${stone.x}vw`,
        top: `${stone.y}vh`,
      }}
      onClick={handleClick}
      aria-label="Click the sharpening stone for a bonus"
    >
        <SharpeningStoneIcon className="w-12 h-12" />
    </button>
  );
};
