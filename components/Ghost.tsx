import React, { useRef, useEffect } from 'react';
import { Anomaly as AnomalyType } from '../types';

interface AnomalyProps {
  anomaly: AnomalyType;
  onClick: (id: number, x: number, y: number) => void;
  onFire: (startX: number, startY: number) => void;
}

export const Anomaly: React.FC<AnomalyProps> = ({ anomaly, onClick, onFire }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (anomaly.disappearing) return;

    // Set up a randomized timer to fire projectiles
    const fireInterval = Math.random() * 1500 + 1500; // 1.5s to 3s
    const timerId = setInterval(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Fire from the center of the anomaly
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        onFire(startX, startY);
      }
    }, fireInterval);

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, [anomaly.disappearing, onFire]);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // We pass screen coordinates for the particle effect
    onClick(anomaly.id, e.clientX, e.clientY);
  };

  const animationClass = `anim-${anomaly.animationType || 1}`;

  return (
    <button
      ref={ref}
      className={`anomaly ${animationClass} ${anomaly.disappearing ? 'disappearing' : ''}`}
      style={{
        left: `${anomaly.x}vw`,
        top: `${anomaly.y}vh`,
      }}
      onClick={handleClick}
      aria-label="Click to stabilize the anomaly"
    >
      {/* Jagged, crystalline anomaly SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shapeRendering="crispEdges" className="w-full h-full filter drop-shadow-[0_0_4px_#c084fc]">
        <path fill="#581c87" d="M3 5h1v1H3z M12 5h1v1h-1z M4 6h1v1H4z M11 6h1v1h-1z M5 7h1v1H5z M10 7h1v1h-1z M6 8h1v1H6z M9 8h1v1H9z M4 9h1v1H4z M11 9h1v1h-1z M5 10h1v1H5z M10 10h1v1h-1z" />
        <path fill="#7e22ce" d="M4 5h1v1H4z M11 5h1v1h-1z M5 6h1v1H5z M10 6h1v1h-1z M6 7h1v1H6z M9 7h1v1H9z M7 8h2v1H7z M5 9h1v1H5z M10 9h1v1h-1z" />
        <path fill="#9333ea" d="M5 5h1v1H5z M10 5h1v1h-1z M6 6h4v1H6z M7 7h2v1H7z M6 9h4v1H6z" />
        <path fill="#c084fc" d="M6 5h4v1H6z M7 6h2v1H7z M7 9h2v1H7z M8 10h1v1H8z" />
        <path fill="#e9d5ff" d="M8 4h1v1H8z M7 5h2v1H7z M9 5h1v1H9z M8 8h1v1H8z" />
      </svg>
    </button>
  );
};