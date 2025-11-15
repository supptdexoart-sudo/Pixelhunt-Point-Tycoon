import React from 'react';

export const FlickeringSproutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Stem */}
    <path fill="#a855f7" d="M11 10h2v8h-2z" />
    {/* Leaves */}
    <path fill="#c084fc" d="M11 12l-4-2v2h4z M13 12l4-2v2h-4z" />
    <path fill="#9333ea" d="M11 14l-3-1v1h3z M13 14l3-1v1h-3z" />
    {/* Sparks/Flicker */}
    <path fill="#fef08a" d="M8 8h1v1H8z M15 8h1v1h-1z M11 7h1v1h-1z" />
  </svg>
);
