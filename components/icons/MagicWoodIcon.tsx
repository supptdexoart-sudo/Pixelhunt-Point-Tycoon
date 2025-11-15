import React from 'react';

export const MagicWoodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Dark brown bark */}
    <path fill="#422a0e" d="M2 5h12v6H2z"/>
    {/* Lighter brown main wood */}
    <path fill="#a16207" d="M3 5h10v6H3z"/>
    {/* Rings/End of log */}
    <path fill="#fde047" d="M3 5h2v6H3z"/>
    <path fill="#eab308" d="M3 6h1v4H3z"/>
    {/* Magical element */}
    <path fill="#22d3ee" d="M8 7h1v2H8z"/>
    <path fill="#a5f3fc" d="M9 8h1v1H9z"/>
    {/* Bark texture */}
    <path fill="#5c3c14" d="M6 5h1v1H6z M9 5h1v1H9z M12 6h1v1h-1z M7 7h1v1H7z M10 8h1v1h-1z M6 9h1v1H6z M12 9h1v1h-1z M9 10h1v1H9z"/>
  </svg>
);
