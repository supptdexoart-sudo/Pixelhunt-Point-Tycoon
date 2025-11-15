import React from 'react';

export const CloverIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Stem */}
    <path fill="#16a34a" d="M11 14h2v4h-2z" />
    {/* Leaves */}
    <path fill="#22c55e" d="M9 7h3v3H9z M12 7h3v3h-3z M9 10h3v3H9z M12 10h3v3h-3z" />
    <path fill="#4ade80" d="M10 8h1v1h-1z M13 8h1v1h-1z M10 11h1v1h-1z M13 11h1v1h-1z" />
  </svg>
);